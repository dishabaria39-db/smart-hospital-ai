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
      doctor,
      specialty,
      date,
      time,
    };

    // Get all existing patient appointments
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || {};

    // Save appointment under the logged-in patient's email
    savedAppointments[user.email] = appointment;

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

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

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