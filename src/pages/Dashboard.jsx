import "../styles/Dashboard.css";

function Dashboard({ setPage, user, setUser }) {

  // Get all saved appointments
  const savedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || {};

  // Get appointment for the currently logged-in patient
  const appointment = user
    ? savedAppointments[user.email]
    : null;

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

  return (
    <div className="dashboard-page">

      {/* ========================= */}
      {/* DASHBOARD HEADER */}
      {/* ========================= */}

      <div className="dashboard-header">

        <div>
          <h1>Patient Dashboard</h1>

          <p>
            Welcome, {user?.name || "Patient"} 👋
          </p>
        </div>

        <div>

          <button
            onClick={() => setPage("home")}
          >
            Home
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
        {/* APPOINTMENTS */}
        {/* ========================= */}

        <div className="dashboard-card">

          <span>📅</span>

          <h2>Appointments</h2>

          {appointment ? (
            <>
              <p>
                <strong>Doctor:</strong>{" "}
                {appointment.doctor}
              </p>

              <p>
                <strong>Specialty:</strong>{" "}
                {appointment.specialty}
              </p>

              <p>
                📅 {appointment.date}
              </p>

              <p>
                🕐 {appointment.time}
              </p>
            </>
          ) : (
            <p>
              No upcoming appointment
            </p>
          )}

          <button
            onClick={() => setPage("doctors")}
          >
            Find a Doctor
          </button>

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