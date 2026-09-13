import "../styles/Doctors.css";

function Doctors({ setPage, openAppointment }) {
  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      experience: "12 Years Experience",
      availability: "Available Today",
      icon: "👩‍⚕️",
    },
    {
      name: "Dr. Rahul Verma",
      specialty: "Neurologist",
      experience: "10 Years Experience",
      availability: "Available Today",
      icon: "👨‍⚕️",
    },
    {
      name: "Dr. Anjali Patel",
      specialty: "General Physician",
      experience: "8 Years Experience",
      availability: "Available Tomorrow",
      icon: "👩‍⚕️",
    },
    {
      name: "Dr. Arjun Mehta",
      specialty: "Orthopedic",
      experience: "15 Years Experience",
      availability: "Available Today",
      icon: "👨‍⚕️",
    },
    {
      name: "Dr. Neha Kapoor",
      specialty: "Dermatologist",
      experience: "9 Years Experience",
      availability: "Available Tomorrow",
      icon: "👩‍⚕️",
    },
    {
      name: "Dr. Vikram Shah",
      specialty: "Pediatrician",
      experience: "11 Years Experience",
      availability: "Available Today",
      icon: "👨‍⚕️",
    },
  ];

  return (
    <div className="doctors-page">

      <div className="doctors-header">
        <h1>Our Doctors</h1>

        <p>
          Connect with experienced doctors and find the right
          specialist for your healthcare needs.
        </p>
      </div>

      <div className="doctors-grid">

        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>

            <div className="doctor-icon">
              {doctor.icon}
            </div>

            <h2>{doctor.name}</h2>

            <h3>{doctor.specialty}</h3>

            <p>{doctor.experience}</p>

            <p className="availability">
              ● {doctor.availability}
            </p>

            <button
              onClick={() => openAppointment(doctor)}
            >
              Book Appointment
            </button>

          </div>
        ))}

      </div>

      <button
  onClick={() => openAppointment(doctor)}
>
  Book Appointment
</button>

    </div>
  );
}

export default Doctors;