import { useState } from "react";
import "../styles/MedicalReports.css";

function MedicalReports({ setPage }) {
  const [file, setFile] = useState(null);
  const [reportText, setReportText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setAnalysis(null);

    if (selectedFile.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (event) => {
        setReportText(event.target.result);
      };

      reader.readAsText(selectedFile);
    } else {
      setReportText("");
    }
  };


  // ================================
  // EXTRACT VALUE FROM REPORT
  // ================================

  const extractValue = (pattern) => {
    const match = reportText.match(pattern);

    if (match) {
      return match[1].trim();
    }

    return "Not found";
  };


  // ================================
  // ANALYZE REPORT
  // ================================

  const analyzeReport = () => {
    if (!file) {
      alert("Please upload a medical report first.");
      return;
    }

    if (file.type !== "text/plain") {
      setAnalysis({
        values: [],
        summary:
          "The report has been uploaded successfully. Detailed text extraction is currently available for .txt files in this prototype.",
        recommendation:
          "Please consult a qualified healthcare professional for actual medical interpretation.",
      });

      return;
    }

    if (!reportText.trim()) {
      alert("The uploaded report does not contain readable text.");
      return;
    }


    // ================================
    // EXTRACT MEDICAL VALUES
    // ================================

    const hemoglobin = extractValue(
      /hemoglobin\s*[:\-]?\s*([0-9.]+\s*g\/?dL)/i
    );

    const bloodPressure = extractValue(
      /blood pressure\s*[:\-]?\s*([0-9]+\s*\/\s*[0-9]+\s*mmHg?)/i
    );

    const glucose = extractValue(
      /(?:blood glucose|glucose|blood sugar)\s*[:\-]?\s*([0-9.]+\s*mg\/?dL)/i
    );

    const cholesterol = extractValue(
      /cholesterol\s*[:\-]?\s*([0-9.]+\s*mg\/?dL)/i
    );

    const temperature = extractValue(
      /temperature\s*[:\-]?\s*([0-9.]+\s*[FC])/i
    );

    const heartRate = extractValue(
      /heart rate\s*[:\-]?\s*([0-9]+\s*bpm)/i
    );


    // ================================
    // CREATE VALUE LIST
    // ================================

    const values = [
      {
        name: "Hemoglobin",
        value: hemoglobin,
      },
      {
        name: "Blood Pressure",
        value: bloodPressure,
      },
      {
        name: "Blood Glucose",
        value: glucose,
      },
      {
        name: "Cholesterol",
        value: cholesterol,
      },
      {
        name: "Temperature",
        value: temperature,
      },
      {
        name: "Heart Rate",
        value: heartRate,
      },
    ];


    // Remove values that were not found
    const detectedValues = values.filter(
      (item) => item.value !== "Not found"
    );


    setAnalysis({
      values: detectedValues,

      summary:
        detectedValues.length > 0
          ? `${detectedValues.length} medical value(s) detected from the uploaded report.`
          : "No recognizable medical values were found in the uploaded report.",

      recommendation:
        "This feature extracts basic information from the uploaded report. It does not diagnose medical conditions. Please consult a qualified healthcare professional for medical interpretation.",
    });
  };


  return (
    <div className="medical-reports-page">

      {/* ================= HEADER ================= */}

      <div className="medical-reports-header">

        <div>
          <h1>📄 Medical Report Analysis</h1>

          <p>
            Upload a medical report and get a simple
            summary of the information detected.
          </p>
        </div>

        <button
          onClick={() => setPage("dashboard")}
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
            Select a text-based medical report
            to analyze it.
          </p>


          <label className="file-label">

            Choose File

            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
            />

          </label>


          {file && (
            <p className="file-name">
              Selected: {file.name}
            </p>
          )}


          <button
            className="analyze-button"
            onClick={analyzeReport}
          >
            Analyze Report
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


            {/* SUMMARY */}

            <div className="analysis-section">

              <h3>
                Summary
              </h3>

              <p>
                {analysis.summary}
              </p>

            </div>


            {/* DETECTED VALUES */}

            <div className="analysis-section">

              <h3>
                Detected Values
              </h3>


              {analysis.values.length > 0 ? (

                <div className="medical-values">

                  {analysis.values.map(
                    (item, index) => (

                      <div
                        className="medical-value"
                        key={index}
                      >

                        <span>
                          {item.name}
                        </span>

                        <strong>
                          {item.value}
                        </strong>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p>
                  No medical values could be
                  extracted from this report.
                </p>

              )}

            </div>


            {/* RECOMMENDATION */}

            <div className="analysis-section">

              <h3>
                Recommendation
              </h3>

              <p>
                {analysis.recommendation}
              </p>

            </div>

          </div>

        )}

      </div>


      {/* ================= DISCLAIMER ================= */}

      <div className="report-disclaimer">

        ⚠️ This feature is a college-project
        prototype. It extracts basic information
        from the uploaded report and does not
        provide a medical diagnosis.

      </div>

    </div>
  );
}

export default MedicalReports;