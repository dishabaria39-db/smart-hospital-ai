import { useState } from "react";
import Chatbot from "./pages/Chatbot";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MedicalReports from "./pages/MedicalReports";
import PatientPrediction from "./pages/PatientPrediction";
function App() {
  const [page, setPage] = useState("home");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("patientUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // When selecting a doctor from Doctors page
  const openAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setPage("appointments");
  };

  // When viewing an already booked appointment
  const viewAppointment = (appointment) => {
    setSelectedDoctor({
      name: appointment.doctor,
      specialty: appointment.specialty,
    });

    setPage("appointments");
  };

  return (
    <>
      {/* HOME */}
      {page === "home" && (
        <Home
          setPage={setPage}
          user={user}
          viewAppointment={viewAppointment}
        />
      )}

      {/* DOCTORS */}
      {page === "doctors" && (
        <Doctors
          setPage={setPage}
          openAppointment={openAppointment}
        />
      )}

      {/* APPOINTMENTS */}
      {page === "appointments" && (
        <Appointments
          setPage={setPage}
          selectedDoctor={selectedDoctor}
          user={user}
        />
      )}

      {/* LOGIN */}
      {page === "login" && (
        <Login
          setPage={setPage}
          setUser={setUser}
        />
      )}
      {/* AI CHATBOT */}
{page === "chatbot" && (
  <Chatbot setPage={setPage} />
)}
{/* MEDICAL REPORTS */}
{page === "medical-reports" && (
  <MedicalReports setPage={setPage} />
)}
{/* PATIENT PREDICTION */}
{page === "patient-prediction" && (
  <PatientPrediction setPage={setPage} />
)}
      {/* DASHBOARD */}
      {page === "dashboard" && (
        <Dashboard
          setPage={setPage}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default App;