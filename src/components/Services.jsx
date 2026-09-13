import "../styles/Services.css";

function Services() {
  return (
    <section className="services">
      <h2>Our Services</h2>

      <div className="service-container">

        <div className="service-card">
          <h3>🤖 AI Chatbot</h3>
          <p>Get instant health guidance from our AI assistant.</p>
        </div>

        <div className="service-card">
          <h3>📅 Appointment Booking</h3>
          <p>Book appointments with doctors in just a few clicks.</p>
        </div>

        <div className="service-card">
          <h3>📄 Report Analysis</h3>
          <p>Upload medical reports and receive easy-to-understand insights.</p>
        </div>

        <div className="service-card">
          <h3>👨‍⚕️ Doctor Recommendation</h3>
          <p>Find the right specialist based on your symptoms.</p>
        </div>

      </div>
    </section>
  );
}

export default Services;