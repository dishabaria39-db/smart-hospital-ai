import { useState } from "react";
import "../styles/Appointments.css";

function Appointments({ setPage, selectedDoctor, user }) {
  const [doctor, setDoctor] = useState(
    selectedDoctor ? selectedDoctor.name : ""
  );

  const [specialty, setSpecialty] = useState(
    selectedDoctor ? selectedDoctor.specialty : ""
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const bookAppointment = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login before booking an appointment.");
      setPage("login");
      return;
    }

    if (!doctor || !specialty || !date || !time) {
      alert("Please fill all the fields.");
      return;
    }

    const appointment = {
  id:
    "APT-" +
    new Date().getFullYear() +
    "-" +
    String(Date.now()).slice(-6),
  doctor,
  specialty,
  date,
  time,
  status: "Booked",
};

// Get all existing patient appointments
const savedAppointments =
  JSON.parse(localStorage.getItem("appointments")) || {};

// Get this patient's existing appointments
let patientAppointments =
  savedAppointments[user.email] || [];

// Convert old single appointment format to an array
if (!Array.isArray(patientAppointments)) {
  patientAppointments = [
    {
      ...patientAppointments,
      id:
        "APT-" +
        new Date().getFullYear() +
        "-" +
        String(Date.now()).slice(-6),
      status: "Booked",
    },
  ];
}

// Add the new appointment
patientAppointments.push(appointment);

// Save all appointments for this patient
savedAppointments[user.email] = patientAppointments;

localStorage.setItem(
  "appointments",
  JSON.stringify(savedAppointments)
);

    alert("Appointment booked successfully!");

    setPage("dashboard");
  };

  return (
    <div className="appointments-page">

      <h1>Book an Appointment</h1>

      <p>
        Choose your preferred date and time.
      </p>

      <form
        className="appointment-form"
        onSubmit={bookAppointment}
      >

        <label>Doctor</label>

        {selectedDoctor ? (
          <input
            type="text"
            value={doctor}
            readOnly
          />
        ) : (
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Priya Sharma">
              Dr. Priya Sharma
            </option>
            <option value="Dr. Rahul Verma">
              Dr. Rahul Verma
            </option>
            <option value="Dr. Anjali Patel">
              Dr. Anjali Patel
            </option>
            <option value="Dr. Arjun Mehta">
              Dr. Arjun Mehta
            </option>
            <option value="Dr. Neha Kapoor">
              Dr. Neha Kapoor
            </option>
            <option value="Dr. Vikram Shah">
              Dr. Vikram Shah
            </option>
          </select>
        )}

        <label>Specialty</label>

        {selectedDoctor ? (
          <input
            type="text"
            value={specialty}
            readOnly
          />
        ) : (
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Select Specialty</option>
            <option value="Cardiologist">
              Cardiologist
            </option>
            <option value="Neurologist">
              Neurologist
            </option>
            <option value="General Physician">
              General Physician
            </option>
            <option value="Orthopedic">
              Orthopedic
            </option>
            <option value="Dermatologist">
              Dermatologist
            </option>
            <option value="Pediatrician">
              Pediatrician
            </option>
          </select>
        )}

        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time</label>

        <div className="time-selection">

  <select
  value={time.split(":")[0] || ""}
  onChange={(e) => {
    const minutes = time.split(":")[1] || "00";
    const period = time.split(":")[2] || "AM";

    setTime(`${e.target.value}:${minutes}:${period}`);
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
    value={time.split(":")[1] || ""}
    onChange={(e) => {
      const hour = time.split(":")[0] || "1";
      const period = time.split(":")[2] || "AM";

      setTime(`${hour}:${e.target.value}:${period}`);
    }}
  >
    <option value="">Min</option>
    <option value="00">00</option>
    <option value="15">15</option>
    <option value="30">30</option>
    <option value="45">45</option>
  </select>

  <select
    value={time.split(":")[2] || ""}
    onChange={(e) => {
      const hour = time.split(":")[0] || "1";
      const minutes = time.split(":")[1] || "00";

      setTime(`${hour}:${minutes}:${e.target.value}`);
    }}
  >
    <option value="">AM/PM</option>
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>

</div>

        <button type="submit">
          Confirm Appointment
        </button>

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("dashboard")}
        >
          Back to Dashboard
        </button>

      </form>

    </div>
  );
}

export default Appointments;