import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Medical report API is running.",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { reportText, reportImage, reportMimeType } = req.body || {};

    if (!reportText && !reportImage) {
      return res.status(400).json({
        error: "No medical report content was provided.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");
      return res.status(500).json({
        error: "Gemini API key is not configured.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
You are an AI medical report analysis assistant.

Analyze ONLY the medical report content provided by the user.

Your task is to produce a detailed, report-specific educational analysis.

IMPORTANT RULES:
- Use the actual values and information present in the report.
- Do not invent values.
- Do not guess missing information.
- Preserve laboratory values exactly when possible.
- For each detected laboratory value, include its reference range if visible.
- Determine Normal, High, Low, or Not specified only when the report/reference range supports it.
- Do not diagnose diseases.
- Do not prescribe medicines.
- Do not recommend medication names or dosages.
- Keep the explanation educational and understandable.
- Make the analysis specific to this report, not generic medical advice.
- If a reference range is not available, use "Not specified".
- Include all clearly visible important laboratory values.

Return ONLY valid JSON.

Use exactly this structure:

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

Section requirements:

detectedValues:
List the laboratory/test values actually detected in the report.

importantFindings:
List the important findings supported by the report.

simpleExplanation:
Explain the overall report in simple language.

outOfRangeValues:
List only values that are clearly outside the provided reference range.
If none are clearly outside the range, return an empty array.

terminology:
Explain important medical terms appearing in this particular report.

educationalInformation:
Give useful educational information related to the findings.

aiInsights:
Give report-specific educational observations based on the actual report.
Do not provide a diagnosis or medication recommendation.

questionsForDoctor:
Give useful questions the patient could discuss with a qualified healthcare professional based on this report.
`;

    const contents = [];

    if (reportText) {
      contents.push({
        text: `MEDICAL REPORT TEXT:\n${reportText}`,
      });
    }

    if (reportImage) {
      contents.push({
        inlineData: {
          mimeType: reportMimeType || "image/jpeg",
          data: reportImage,
        },
      });

      contents.push({
        text: `
The attached image is a medical report.

Read the image carefully, including:
- test names
- results
- units
- reference ranges
- abnormal/high/low indicators
- table rows
- other clearly visible report information

Do not omit visible laboratory rows merely because they appear inside a table.
Do not infer values that cannot be read clearly.
`,
      });
    }

    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        maxOutputTokens: 4000,
      },
    });

    let resultText = response.text;

    if (!resultText) {
      throw new Error("Gemini returned an empty response.");
    }

    resultText = resultText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const analysis = JSON.parse(resultText);

    return res.status(200).json(analysis);
  } catch (error) {
    console.error("Medical report analysis error:", error);

    return res.status(500).json({
      error: "Unable to analyze the medical report.",
      details: error.message,
    });
  }
}
