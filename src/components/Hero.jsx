import { useEffect, useState } from "react";
import "../styles/Hero.css";

function Hero({ setPage, user, viewAppointment }) {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (!user) {
      setAppointment(null);
      return;
    }

    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || {};

    const patientAppointment =
      savedAppointments[user.email];

    setAppointment(patientAppointment || null);
  }, [user]);

  return (
    <section className="hero">

      {/* LEFT SIDE */}
      <div className="hero-left">

        <h1>
          AI-Powered Healthcare for Everyone
        </h1>

        <h3>
          Smart, Secure & Instant Healthcare Solutions
        </h3>

        <p>
          Book appointments, chat with AI, analyze medical
          reports, and connect with expert doctors—all from
          one platform.
        </p>

        <div className="hero-buttons">

          <button
            onClick={() => setPage("doctors")}
          >
            Find a Doctor
          </button>

          <button
            onClick={() =>
              alert("AI Assistant coming soon!")
            }
          >
            Talk to AI
          </button>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="hero-right">

        {appointment ? (

          <div className="appointment-card">

            <h2>
              📅 Upcoming Appointment
            </h2>

            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctor}
            </p>

            <p>
              <strong>Specialty:</strong>{" "}
              {appointment.specialty}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointment.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointment.time}
            </p>

            <button
              className="view-appointment"
              onClick={() =>
                viewAppointment(appointment)
              }
            >
              View Appointment
            </button>

          </div>

        ) : (

          <div className="appointment-card no-appointment">

            <div className="calendar-icon">
              📅
            </div>

            <h2>
              No Upcoming Appointment
            </h2>

            <p>
              Find a doctor and book your appointment.
            </p>

            <button
              className="view-appointment"
              onClick={() =>
                setPage("doctors")
              }
            >
              Find a Doctor
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default Hero;