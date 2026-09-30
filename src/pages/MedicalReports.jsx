import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import "../styles/MedicalReports.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function MedicalReports({ setPage }) {
  const [file, setFile] = useState(null);
  const [reportText, setReportText] = useState("");
  const [reportImage, setReportImage] = useState(null);
  const [reportMimeType, setReportMimeType] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ================= FILE PROCESSING =================

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    console.log(
      "SELECTED FILE:",
      selectedFile.name,
      selectedFile.type
    );

    setIsProcessing(true);
    setFile(selectedFile);
    setAnalysis(null);

    // Clear previous report data
    setReportText("");
    setReportImage(null);
    setReportMimeType("");

    try {
      // ================= TXT =================

      if (selectedFile.type === "text/plain") {
        const text = await selectedFile.text();

        if (!text.trim()) {
          throw new Error("The text file is empty.");
        }

        setReportText(text);
        setIsProcessing(false);

        return;
      }

      // ================= JPEG / JPG =================

      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg"
      ) {
        const reader = new FileReader();

        const base64Image = await new Promise(
          (resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(selectedFile);
          }
        );

        const imageParts = base64Image.split(",");

        if (imageParts.length < 2) {
          throw new Error(
            "The image could not be converted."
          );
        }

        const imageBase64 = imageParts[1];

        setReportImage(imageBase64);
        setReportMimeType("image/jpeg");
        setReportText("");

        console.log(
          "Medical report image prepared for Gemini Vision."
        );

        console.log(
          "Image base64 length:",
          imageBase64.length
        );

        setIsProcessing(false);

        return;
      }

      // ================= PDF =================

      if (selectedFile.type === "application/pdf") {
        const arrayBuffer =
          await selectedFile.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;

        let extractedText = "";

        // Local variable.
        // React state updates are asynchronous, so we
        // cannot depend on reportImage immediately here.
        let scannedImageBase64 = null;
        let scannedImageMimeType = "";

        for (
          let pageNumber = 1;
          pageNumber <= pdf.numPages;
          pageNumber++
        ) {
          const page = await pdf.getPage(pageNumber);

          const textContent =
            await page.getTextContent();

          console.log(
            "PDF PAGE:",
            pageNumber
          );

          console.log(
            "PDF TEXT ITEMS:",
            textContent.items.length
          );

          const items = textContent.items
            .filter(
              (item) =>
                item.str &&
                item.str.trim()
            )
            .map((item) => ({
              text: item.str.trim(),
              x: item.transform[4],
              y: item.transform[5],
            }));

          /*
           * For a normal text PDF, use the extracted
           * PDF text directly.
           */
          const pageText = items
            .sort((a, b) => {
              if (
                Math.abs(a.y - b.y) > 4
              ) {
                return b.y - a.y;
              }

              return a.x - b.x;
            })
            .map((item) => item.text)
            .join(" ")
            .trim();

          console.log(
            "PDF EXTRACTED TEXT:",
            pageText
          );

          if (pageText) {
            extractedText +=
              pageText + "\n";
          } else {
            /*
             * Scanned/image-based PDF page.
             *
             * Instead of Tesseract OCR, render the
             * page and send the image to Gemini Vision.
             */

            console.log(
              "Scanned PDF page detected:",
              pageNumber
            );

            const viewport =
              page.getViewport({
                scale: 2,
              });

            const canvas =
              document.createElement(
                "canvas"
              );

            const context =
              canvas.getContext("2d");

            if (!context) {
              throw new Error(
                "Could not create PDF canvas."
              );
            }

            canvas.width =
              viewport.width;

            canvas.height =
              viewport.height;

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            const imageData =
              canvas.toDataURL(
                "image/jpeg",
                0.95
              );

            const imageParts =
              imageData.split(",");

            if (imageParts.length < 2) {
              throw new Error(
                "Could not convert scanned PDF page to an image."
              );
            }

            /*
             * Keep the first scanned page.
             * For the current medical report this
             * is the page containing the table.
             */
            if (!scannedImageBase64) {
              scannedImageBase64 =
                imageParts[1];

              scannedImageMimeType =
                "image/jpeg";
            }

            console.log(
              "Scanned PDF page prepared for Gemini Vision:",
              pageNumber
            );
          }
        }

        /*
         * Save scanned PDF image after processing
         * the PDF. This avoids relying on an
         * immediately updated React state.
         */
        if (scannedImageBase64) {
          setReportImage(
            scannedImageBase64
          );

          setReportMimeType(
            scannedImageMimeType
          );

          console.log(
            "Scanned PDF image stored for Gemini Vision."
          );

          console.log(
            "Scanned image base64 length:",
            scannedImageBase64.length
          );
        }

        setReportText(
          extractedText.trim()
        );

        setIsProcessing(false);

        return;
      }

      // ================= INVALID FILE =================

      alert(
        "Please upload a PDF, JPEG, JPG, or TXT file."
      );

      setIsProcessing(false);
    } catch (error) {
      console.error(
        "File processing error:",
        error
      );

      setIsProcessing(false);

      setReportText("");
      setReportImage(null);
      setReportMimeType("");

      alert(
        "The file could not be processed. Please try another medical report."
      );
    }
  };

  // ================= AI ANALYSIS =================

  const analyzeReport = async () => {
    if (!file) {
      alert(
        "Please upload a medical report first."
      );
      return;
    }

    /*
     * A report can contain either:
     *
     * 1. Text
     * 2. An image
     * 3. Both
     */
    if (
      !reportText.trim() &&
      !reportImage
    ) {
      alert(
        "The report could not be read. Please make sure the file contains readable text or a valid image."
      );
      return;
    }

    setIsProcessing(true);
    setAnalysis(null);

    try {
      console.log(
        "Sending report for AI analysis..."
      );

      console.log(
        "Has report text:",
        !!reportText.trim()
      );

      console.log(
        "Has report image:",
        !!reportImage
      );

      console.log(
        "Report MIME type:",
        reportMimeType
      );

      const response = await fetch(
        "http://localhost:5000/api/analyze-report",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            reportText:
              reportText,

            reportImage:
              reportImage,

            reportMimeType:
              reportMimeType,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "The report could not be analyzed."
        );
      }

      console.log(
        "AI analysis received:",
        data
      );

      setAnalysis({
        detectedValues:
          data.detectedValues || [],

        importantFindings:
          data.importantFindings || [],

        simpleExplanation:
          data.simpleExplanation || "",

        outOfRangeValues:
          data.outOfRangeValues || [],

        terminology:
          data.terminology || [],

        educationalInformation:
          data.educationalInformation ||
          [],

        aiInsights:
          data.aiInsights || [],

        questionsForDoctor:
          data.questionsForDoctor || [],
      });
    } catch (error) {
      console.error(
        "Report analysis error:",
        error
      );

      alert(
        "The report could not be analyzed. Please make sure the AI backend is running."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="medical-reports-page">

      {/* ================= HEADER ================= */}

      <div className="medical-reports-header">

        <div>
          <h1>
            📄 Medical Report Analysis
          </h1>

          <p>
            Upload a medical report and get
            AI-powered information from the
            report.
          </p>
        </div>

        <button
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

      </div>

      {/* ================= MAIN ================= */}

      <div className="report-container">

        {/* ================= UPLOAD CARD ================= */}

        <div className="upload-card">

          <div className="report-icon">
            📄
          </div>

          <h2>
            Upload Medical Report
          </h2>

          <p>
            Upload a PDF, JPEG, JPG, or TXT
            medical report to analyze it.
          </p>

          <label className="file-label">

            Choose File

            <input
              type="file"
              accept=".pdf,.txt,.jpg,.jpeg"
              onChange={
                handleFileChange
              }
            />

          </label>

          {file && (
            <p className="file-success">
              ✓ Medical report selected
              successfully.
            </p>
          )}

          <button
            className="analyze-button"
            onClick={
              analyzeReport
            }
            disabled={
              isProcessing ||
              (
                !reportText.trim() &&
                !reportImage
              )
            }
          >
            {isProcessing
              ? "Analyzing Report..."
              : "Analyze Report"}
          </button>

        </div>

        {/* ================= ANALYSIS ================= */}

        {analysis && (

          <div className="analysis-card">

            <h2>
              📊 Report Analysis
            </h2>

            <div className="analysis-status">
              Analysis Complete
            </div>

            {/* ================= 1. DETECTED VALUES ================= */}

            <div className="analysis-section">

              <h3>
                📊 Detected Values
              </h3>

              {analysis.detectedValues
                .length > 0 ? (

                <div className="medical-values">

                  {analysis.detectedValues.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="medical-value"
                        key={index}
                      >

                        <div>
                          <span>
                            Parameter
                          </span>

                          <strong>
                            {
                              item.parameter
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Value
                          </span>

                          <strong>
                            {
                              item.value
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Reference Range
                          </span>

                          <strong>
                            {
                              item.referenceRange ||
                              "Not provided"
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Status
                          </span>

                          <strong>
                            {
                              item.status ||
                              "Not specified"
                            }
                          </strong>
                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p>
                  No medical values could
                  be extracted from this
                  report.
                </p>

              )}

            </div>

            {/* ================= 2. IMPORTANT FINDINGS ================= */}

            {analysis
              .importantFindings
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  ⚠️ Important Findings
                </h3>

                <ul>

                  {analysis
                    .importantFindings
                    .map(
                      (
                        finding,
                        index
                      ) => (

                        <li key={index}>
                          {finding}
                        </li>

                      )
                    )}

                </ul>

              </div>

            )}

            {/* ================= 3. SIMPLE EXPLANATION ================= */}

            {analysis.simpleExplanation && (

              <div className="analysis-section">

                <h3>
                  📖 Simple Explanation
                </h3>

                <p>
                  {
                    analysis.simpleExplanation
                  }
                </p>

              </div>

            )}

            {/* ================= 4. OUT-OF-RANGE VALUES ================= */}

            {analysis
              .outOfRangeValues
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  🚨 Out-of-Range Values
                </h3>

                <ul>

                  {analysis
                    .outOfRangeValues
                    .map(
                      (
                        item,
                        index
                      ) => (

                        <li key={index}>
                          {item}
                        </li>

                      )
                    )}

                </ul>

              </div>

            )}

            {/* ================= 5. MEDICAL TERMINOLOGY ================= */}

            {analysis
              .terminology
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  📚 Medical Terminology
                </h3>

                <div className="medical-values">

                  {analysis
                    .terminology
                    .map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          className="medical-value"
                          key={index}
                        >

                          <div>
                            <span>
                              Term
                            </span>

                            <strong>
                              {item.term}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Explanation
                            </span>

                            <strong>
                              {
                                item.explanation
                              }
                            </strong>
                          </div>

                        </div>

                      )
                    )}

                </div>

              </div>

            )}

            {/* ================= 6. EDUCATIONAL INFORMATION ================= */}

            {analysis
              .educationalInformation
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  🎓 Educational Information
                </h3>

                <ul>

                  {analysis
                    .educationalInformation
                    .map(
                      (
                        info,
                        index
                      ) => (

                        <li key={index}>
                          {info}
                        </li>

                      )
                    )}

                </ul>

              </div>

            )}

            {/* ================= 7. AI INSIGHTS ================= */}

            {analysis
              .aiInsights
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  💡 AI Insights &
                  Recommendations
                </h3>

                <ul>

                  {analysis
                    .aiInsights
                    .map(
                      (
                        insight,
                        index
                      ) => (

                        <li key={index}>
                          {insight}
                        </li>

                      )
                    )}

                </ul>

              </div>

            )}

            {/* ================= 8. QUESTIONS FOR DOCTOR ================= */}

            {analysis
              .questionsForDoctor
              .length > 0 && (

              <div className="analysis-section">

                <h3>
                  👨‍⚕️ Questions to Ask
                  Your Doctor
                </h3>

                <ul>

                  {analysis
                    .questionsForDoctor
                    .map(
                      (
                        question,
                        index
                      ) => (

                        <li key={index}>
                          {question}
</li>

                      )
                    )}

                </ul>

              </div>

            )}

          </div>

        )}

      </div>

      {/* ================= DISCLAIMER ================= */}

      <div className="report-disclaimer">

        ⚠️ This feature is a
        college-project prototype.
        AI-generated information is
        educational and does not provide
        a medical diagnosis. Please review
        the results with a qualified
        healthcare professional.

      </div>

    </div>
  );
}

export default MedicalReports;