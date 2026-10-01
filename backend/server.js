import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: "20mb" }));

app.post("/api/analyze-report", async (req, res) => {
  try {
    const {
      reportText,
      reportImage,
      reportMimeType,
    } = req.body;

    console.log("Image received:", !!reportImage);
    console.log("Image MIME type:", reportMimeType);
    console.log(
      "Image data length:",
      reportImage ? reportImage.length : 0
    );

    if (
      (!reportText || !reportText.trim()) &&
      !reportImage
    ) {
      return res.status(400).json({
        error: "No medical report was provided.",
      });
    }

    const model = reportImage
      ? "gemini-3.5-flash"
      : "gemini-3.5-flash-lite";

    /*
     =====================================================
     PASS 1 — VISUAL TABLE EXTRACTION
     =====================================================
    */

    let extractedReport = reportText || "";

    if (reportImage) {
      console.log("PASS 1: Extracting table from image...");

      const extractionPrompt = `
You are extracting data from a medical laboratory report image.

The attached image is the ONLY source of truth.

Your task is ONLY to visually read the complete laboratory table
and return the data as valid JSON.

Return ONLY this JSON structure:

{
  "patientInformation": {
    "name": "",
    "age": "",
    "gender": "",
    "patientId": "",
    "reportDate": ""
  },
  "laboratoryValues": [
    {
      "parameter": "",
      "result": "",
      "unit": "",
      "referenceRange": ""
    }
  ],
  "remarks": ""
}

VERY IMPORTANT:

1. Read the laboratory table visually from TOP TO BOTTOM.

2. Include EVERY visible laboratory row.

3. For EVERY row identify separately:
   - parameter
   - result
   - unit
   - referenceRange

4. NEVER confuse the result with the reference range.

5. If a result is visibly present, NEVER write "Not provided".

6. Preserve decimal values exactly as shown.

7. Preserve commas and units exactly where possible.

8. Include normal values too.

9. Do not skip rows.

10. Do not infer or invent values.

11. If a field genuinely cannot be read from the image,
use "Not provided" only for that field.

12. Before returning the JSON, visually inspect the COMPLETE
table one more time and make sure every row has been included.

This is a DATA EXTRACTION task only.
Do not provide medical advice.
Do not interpret the results.
`;

      const extractionResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: extractionPrompt,
                  },
                  {
                    inline_data: {
                      mime_type:
                        reportMimeType === "image/jpg"
                          ? "image/jpeg"
                          : reportMimeType || "image/jpeg",
                      data: reportImage,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0,
              maxOutputTokens: 3000,
            },
          }),
        }
      );

      const extractionData =
        await extractionResponse.json();

      if (!extractionResponse.ok) {
        throw new Error(
          extractionData?.error?.message ||
            "Image extraction failed."
        );
      }

      const extractionText =
        extractionData?.candidates?.[0]?.content
          ?.parts?.[0]?.text;

      if (!extractionText) {
        throw new Error(
          "Gemini returned no extracted table data."
        );
      }

      console.log(
        "PASS 1 RESULT:",
        extractionText
      );

      const parsedExtraction =
        JSON.parse(extractionText);

      extractedReport = JSON.stringify(
        parsedExtraction,
        null,
        2
      );
    }

    /*
     =====================================================
     PASS 2 — MEDICAL REPORT ANALYSIS
     =====================================================
    */

    console.log(
      "PASS 2: Generating medical report analysis..."
    );

    const analysisPrompt = `
Analyze the following extracted medical report data.

The extracted data was obtained from the original medical
report and should be treated as the report's source data.

Return ONLY valid JSON with exactly these fields:

{
  "detectedValues": [
    {
      "parameter": "",
      "value": "",
      "referenceRange": "",
      "status": ""
    }
  ],
  "importantFindings": [],
  "simpleExplanation": "",
  "outOfRangeValues": [],
  "terminology": [
    {
      "term": "",
      "explanation": ""
    }
  ],
  "educationalInformation": [],
  "aiInsights": [],
  "questionsForDoctor": []
}

RULES:

1. DETECTED VALUES

Use EVERY laboratory value from the extracted report.

For each laboratoryValues item:

parameter = parameter
value = result
referenceRange = referenceRange

Do NOT replace a visible result with "Not provided".

Include EVERY laboratory row.

Preserve the exact reported values.

Status must be one of:

"Normal"
"High"
"Low"
"Not specified"

Determine status ONLY by comparing the result with
the reference range provided for that SAME test.

Do not invent values.

Do not omit normal values.

Do not combine multiple laboratory tests into one item.

2. IMPORTANT FINDINGS

Identify notable findings from the actual report data.

Do not invent findings.

If all reported values are within their provided ranges,
state that the report does not show an out-of-range value
based on the supplied reference ranges.

3. SIMPLE EXPLANATION

Explain the report in simple educational language.

Base the explanation only on the supplied report.

4. OUT-OF-RANGE VALUES

List only values that are actually outside their provided
reference ranges.

Do not invent abnormal results.

5. MEDICAL TERMINOLOGY

Explain important medical terms that actually appear
in the report.

6. EDUCATIONAL INFORMATION

Provide general educational information related to the
tests and findings in this report.

7. AI INSIGHTS

Provide report-specific educational observations.

Do not diagnose the patient.

Do not prescribe medicines.

Do not provide medication dosages.

8. QUESTIONS FOR DOCTOR

Generate useful questions the patient could ask a qualified
healthcare professional based on this report.

GENERAL RULES:

- Be specific to this report.
- Never invent information.
- Never diagnose.
- Never recommend medication or dosage.
- Keep the response clear.
- Return ONLY valid JSON.
- Do not include Markdown.
- Do not include text before or after the JSON.

EXTRACTED MEDICAL REPORT DATA:

${extractedReport}
`;

    const analysisResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: analysisPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 4000,
          },
        }),
      }
    );

    const analysisData =
      await analysisResponse.json();

    if (!analysisResponse.ok) {
      throw new Error(
        analysisData?.error?.message ||
          "Medical analysis failed."
      );
    }

    const generatedText =
      analysisData?.candidates?.[0]?.content
        ?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error(
        "Gemini returned an empty analysis."
      );
    }

    console.log(
      "PASS 2 RESULT:",
      generatedText
    );

    const analysis =
      JSON.parse(generatedText);

    res.json(analysis);

  } catch (error) {
    console.error(
      "AI ANALYSIS ERROR:",
      error
    );

    res.status(500).json({
      error:
        error.message ||
        "AI analysis failed.",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Medical AI backend is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Medical AI backend running on port ${PORT}`);
});