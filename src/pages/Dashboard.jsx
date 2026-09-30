import { useState } from "react";
import "../styles/Dashboard.css";

function Dashboard({ setPage, user, setUser }) {
  const [showEmergencyRequests, setShowEmergencyRequests] = useState(false);

  // Get all saved appointments
 const savedAppointments =
  JSON.parse(localStorage.getItem("appointments")) || {};

const appointments = user
  ? savedAppointments[user.email] || []
  : [];
    // Get saved emergency request
  const allEmergencyRequests =
  JSON.parse(localStorage.getItem("emergencyRequests")) || [];

const savedEmergencyRequests = user
  ? allEmergencyRequests.filter(
      (request) => request.patientEmail === user.email
    )
  : [];

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    // Remove only the current login session
    localStorage.removeItem("patientUser");

    // Keep registeredUsers and appointments
    setUser(null);

    // Return to home
    setPage("home");
  };
  if (showEmergencyRequests) {
  return (
    <div className="emergency-requests-page">

      <div className="emergency-requests-header">

        <button
          className="back-dashboard-button"
          onClick={() => setShowEmergencyRequests(false)}
        >
          ← Back to Dashboard
        </button>

        <h1>🚨 Emergency Requests</h1>

        <p>
          All emergency requests submitted by the patient.
        </p>

      </div>

      <div className="emergency-requests-container">

        {savedEmergencyRequests.map((emergency) => (
          <div
            className="emergency-request-card"
            key={emergency.requestId}
          >

            <div className="request-card-top">
              <h2>{emergency.requestId}</h2>

              <span className="request-status">
                {emergency.status}
              </span>
            </div>

            <div className="request-details">

              <p>
                <strong>Patient Name:</strong>{" "}
                {emergency.patientName}
              </p>

              <p>
                <strong>Patient ID:</strong>{" "}
                {emergency.patientId}
              </p>

              <p>
                <strong>Contact Number:</strong>{" "}
                {emergency.contactNumber}
              </p>

              <p>
                <strong>Emergency Type:</strong>{" "}
                {emergency.emergencyType}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {emergency.time}
              </p>

              <p>
                <strong>Current Location:</strong>{" "}
                {emergency.currentLocation}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {emergency.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

  return (
    <div className="dashboard-page">

  

      {/* ========================= */}
      {/* DASHBOARD HEADER */}
      {/* ========================= */}

      <div className="dashboard-header">

        <div>
          <h1>Patient Dashboard</h1>

          <h2 className="welcome-text">
            Welcome, {user?.name || "Patient"} 👋
          </h2>
        </div>

        <div>

          <button
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            onClick={() => setPage("patient-profile")}
          >
            Profile
          </button>

          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* ========================= */}
      {/* DASHBOARD CARDS */}
      {/* ========================= */}

      <div className="dashboard-grid">
        {/* ========================= */}
{/* EMERGENCY */}
{/* ========================= */}

<div className="dashboard-card emergency-dashboard-card">

  <span>🚨</span>

  <h2>Emergency</h2>

  <p>
    Get quick access to emergency assistance
    and important emergency services.
  </p>

  <button
    onClick={() => setPage("emergency")}
  >
    Emergency Assistance
  </button>

</div>
{savedEmergencyRequests.length > 0 && (
  <div className="dashboard-card emergency-request-dashboard-card">

    <span>🚨</span>

    <h2>Emergency Requests</h2>

    <p>
      You have{" "}
      <strong>{savedEmergencyRequests.length}</strong>{" "}
      emergency request
      {savedEmergencyRequests.length > 1 ? "s" : ""}.
    </p>

    <button
  onClick={() => 
    setShowEmergencyRequests(true)}

    
>
  View Requests
</button>

  </div>
)}


        {/* ========================= */}
        {/* APPOINTMENTS */}
        {/* ========================= */}

        <div className="dashboard-card">

  <span>📅</span>

  <h2>Appointments</h2>

  {appointments.length > 0 ? (
    <>
      <p>
        You have{" "}
        <strong>{appointments.length}</strong>{" "}
        booked appointment
        {appointments.length > 1 ? "s" : ""}.
      </p>

      <button
        onClick={() => setPage("appointment-management")}
      >
        Manage Appointments
      </button>
    </>
  ) : (
    <>
      <p>No upcoming appointment</p>

      <button
        onClick={() => setPage("doctors")}
      >
        Find a Doctor
      </button>
      
    </>
  )}

</div>

        {/* ========================= */}
        {/* AI ASSISTANT */}
        {/* ========================= */}

        <div className="dashboard-card">

          <span>🤖</span>

          <h2>AI Assistant</h2>

          <p>
            Get help with doctors, appointments,
            hospital services, and reports.
          </p>

          <button
            onClick={() => setPage("chatbot")}
          >
            Talk to AI
          </button>

        </div>


        {/* ========================= */}
        {/* MEDICAL REPORTS */}
        {/* ========================= */}

        <div className="dashboard-card">

          <span>📄</span>

          <h2>Medical Reports</h2>

          <p>
            Analyze your medical reports and
            understand important information.
          </p>

          <button
            onClick={() =>
              setPage("medical-reports")
            }
          >
            View Reports
          </button>

        </div>


        {/* ========================= */}
        {/* PATIENT PREDICTION */}
        {/* ========================= */}

        <div className="dashboard-card">

          <span>🧠</span>

          <h2>Patient Prediction</h2>

          <p>
            Access your AI-powered patient
            prediction results.
          </p>

          <button
  onClick={() => setPage("patient-prediction")}
>
  View Prediction
</button>

        </div>

      </div>
      
    </div>
  );
}

export default Dashboard;