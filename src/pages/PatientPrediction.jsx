import { useState } from "react";
import "../styles/PatientPrediction.css";

function PatientPrediction({ setPage }) {
  const [age, setAge] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [exercise, setExercise] = useState("");
  const [smoking, setSmoking] = useState("");
  const [result, setResult] = useState(null);

  const analyzePatient = (e) => {
    e.preventDefault();

    if (
      !age ||
      !bloodPressure ||
      !exercise ||
      !smoking
    ) {
      alert("Please fill in all fields.");
      return;
    }

    let riskScore = 0;

    // Simple rule-based scoring for college project
    if (Number(age) >= 50) {
      riskScore += 2;
    } else if (Number(age) >= 35) {
      riskScore += 1;
    }

    if (bloodPressure === "High") {
      riskScore += 2;
    } else if (bloodPressure === "Normal") {
      riskScore += 0;
    }

    if (exercise === "Low") {
      riskScore += 2;
    } else if (exercise === "Moderate") {
      riskScore += 1;
    }

    if (smoking === "Yes") {
      riskScore += 2;
    }

    let riskLevel;
    let message;

    if (riskScore >= 5) {
      riskLevel = "Higher Risk";
      message =
        "Some of the selected factors may indicate a higher health risk. Consider discussing your health with a qualified healthcare professional.";
    } else if (riskScore >= 3) {
      riskLevel = "Moderate Risk";
      message =
        "Some health factors may require attention. Maintaining healthy habits and consulting a healthcare professional may be helpful.";
    } else {
      riskLevel = "Lower Risk";
      message =
        "The selected factors indicate a lower risk category in this simple prototype. Continue maintaining healthy habits.";
    }

    setResult({
      riskLevel,
      message,
    });
  };

  return (
    <div className="prediction-page">

      {/* Header */}
      <div className="prediction-header">

        <div>
          <h1>🧠 Patient Prediction</h1>

          <p>
            Enter basic health information to see a
            simple risk assessment.
          </p>
        </div>

        <button
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

      </div>


      {/* Main Content */}
      <div className="prediction-container">

        {/* Form */}
        <div className="prediction-card">

          <h2>Patient Information</h2>

          <form onSubmit={analyzePatient}>

            {/* Age */}
            <label>
              Age
            </label>

            <input
              type="number"
              min="1"
              max="120"
              placeholder="Enter age"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
            />


            {/* Blood Pressure */}
            <label>
              Blood Pressure
            </label>

            <select
              value={bloodPressure}
              onChange={(e) =>
                setBloodPressure(e.target.value)
              }
            >
              <option value="">
                Select blood pressure
              </option>

              <option value="Normal">
                Normal
              </option>

              <option value="High">
                High
              </option>
            </select>


            {/* Exercise */}
            <label>
              Exercise Level
            </label>

            <select
              value={exercise}
              onChange={(e) =>
                setExercise(e.target.value)
              }
            >
              <option value="">
                Select exercise level
              </option>

              <option value="High">
                High
              </option>

              <option value="Moderate">
                Moderate
              </option>

              <option value="Low">
                Low
              </option>
            </select>


            {/* Smoking */}
            <label>
              Smoking
            </label>

            <select
              value={smoking}
              onChange={(e) =>
                setSmoking(e.target.value)
              }
            >
              <option value="">
                Select option
              </option>

              <option value="Yes">
                Yes
              </option>

              <option value="No">
                No
              </option>
            </select>


            <button
              type="submit"
              className="prediction-button"
            >
              Analyze Patient
            </button>

          </form>

        </div>


        {/* Result */}
        {result && (
          <div className="prediction-result">

            <div className="prediction-result-icon">
              🧠
            </div>

            <h2>
              Prediction Result
            </h2>

            <h3>
              {result.riskLevel}
            </h3>

            <p>
              {result.message}
            </p>

          </div>
        )}

      </div>


      {/* Disclaimer */}
      <div className="prediction-disclaimer">

        ⚠️ This is a college-project prototype.
        The result is generated using simple predefined
        rules and is not a medical diagnosis or a
        substitute for professional medical advice.

      </div>

    </div>
  );
}

export default PatientPrediction;