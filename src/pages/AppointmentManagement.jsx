import { useState } from "react";
import "../styles/AppointmentManagement.css";

function AppointmentManagement({ setPage, user }) {
    const [reschedulingAppointment, setReschedulingAppointment] =
  useState(null);
  const [newDate, setNewDate] = useState("");
const [newTime, setNewTime] = useState("");
const [newHour, setNewHour] = useState("");
const [newMinute, setNewMinute] = useState("");
const [newPeriod, setNewPeriod] = useState("");
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || {};

    const patientAppointments = user
      ? savedAppointments[user.email] || []
      : [];

    // Handle older single-appointment format
    return Array.isArray(patientAppointments)
      ? patientAppointments
      : [patientAppointments];
  });

  const saveRescheduledAppointment = () => {
  if (!newDate || !newTime) {
    alert("Please select a new date and time.");
    return;
  }

  const updatedAppointments = appointments.map(
    (appointment) =>
      appointment.id === reschedulingAppointment.id
        ? {
            ...appointment,
            date: newDate,
            time: newTime,
            status: "Rescheduled",
          }
        : appointment
  );

  const savedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || {};

  savedAppointments[user.email] = updatedAppointments;

  localStorage.setItem(
    "appointments",
    JSON.stringify(savedAppointments)
  );

  setAppointments(updatedAppointments);

  setReschedulingAppointment(null);
  setNewDate("");
  setNewTime("");

  alert("Appointment rescheduled successfully.");
};

  const cancelAppointment = (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );

    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || {};

    savedAppointments[user.email] = updatedAppointments;

    localStorage.setItem(
      "appointments",
      JSON.stringify(savedAppointments)
    );

    setAppointments(updatedAppointments);

    alert("Appointment cancelled successfully.");
  };

  return (
    <div className="appointment-management-page">

      <div className="appointment-management-header">

        <button
          className="appointment-back-button"
          onClick={() => setPage("dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1>📅 Appointment Management</h1>

        <p>
          View and manage your booked appointments.
        </p>

        <button
  className="book-another-button"
  onClick={() => setPage("doctors")}
>
  ➕ Book Another Appointment
</button>

      </div>

      {reschedulingAppointment && (
  <div className="reschedule-form">

    <h2>✏️ Reschedule Appointment</h2>

    <p>
      <strong>Doctor:</strong>{" "}
      {reschedulingAppointment.doctor}
    </p>

    <label>New Date</label>

    <input
      type="date"
      value={newDate}
      onChange={(e) => setNewDate(e.target.value)}
    />

    <label>New Time</label>

<div className="time-selection">

  <select
    value={newHour}
    onChange={(e) => {
      const hour = e.target.value;
      setNewHour(hour);

      if (hour && newMinute && newPeriod) {
        setNewTime(`${hour}:${newMinute} ${newPeriod}`);
      }
    }}
  >
    <option value="">Hour</option>
    <option value="09">09</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="01">01</option>
    <option value="02">02</option>
    <option value="03">03</option>
    <option value="04">04</option>
    <option value="05">05</option>
    <option value="06">06</option>
    <option value="07">07</option>
    <option value="08">08</option>
  </select>

  <select
    value={newMinute}
    onChange={(e) => {
      const minute = e.target.value;
      setNewMinute(minute);

      if (newHour && minute && newPeriod) {
        setNewTime(`${newHour}:${minute} ${newPeriod}`);
      }
    }}
  >
    <option value="">Min</option>
    <option value="00">00</option>
    <option value="15">15</option>
    <option value="30">30</option>
    <option value="45">45</option>
  </select>

  <select
    value={newPeriod}
    onChange={(e) => {
      const period = e.target.value;
      setNewPeriod(period);

      if (newHour && newMinute && period) {
        setNewTime(`${newHour}:${newMinute} ${period}`);
      }
    }}
  >
    <option value="">AM/PM</option>
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>

</div>

    <div className="reschedule-form-actions">

      <button
        onClick={saveRescheduledAppointment}
      >
        Save Changes
      </button>

      <button
        onClick={() => {
          setReschedulingAppointment(null);
          setNewDate("");
          setNewTime("");
          setNewHour("");
          setNewMinute("");
          setNewPeriod("");
        }}
      >
        Cancel
      </button>
      

    </div>

  </div>
)}

      <div className="appointments-container">

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <h2>No Appointments</h2>

            <p>
              You currently have no booked appointments.
            </p>

            <button
              onClick={() => setPage("doctors")}
            >
              Find a Doctor
            </button>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              className="appointment-management-card"
              key={appointment.id}
            >

              <div className="appointment-card-header">
                <h2>{appointment.doctor}</h2>

                <span className="appointment-status">
                  {appointment.status || "Booked"}
                </span>
              </div>

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

              <p>
                <strong>Appointment ID:</strong>{" "}
                {appointment.id}
              </p>

              <div className="appointment-actions">

                <button
                  className="reschedule-button"
                  onClick={() =>
                    
                      setReschedulingAppointment(appointment)
                    
                  }
                >
                  ✏️ Reschedule
                </button>

                <button
                  className="cancel-appointment-button"
                  onClick={() =>
                    cancelAppointment(appointment.id)
                  }
                >
                  ❌ Cancel
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default AppointmentManagement;