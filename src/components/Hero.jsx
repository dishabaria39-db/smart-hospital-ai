import "../styles/Hero.css";

function Hero() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-content">

          <div className="hero-text">
            <h1>AI-Powered Healthcare for Everyone</h1>

            <h3>
              Smart, Secure & Instant Healthcare Solutions
            </h3>

            <p>
              Book appointments, chat with AI, analyze medical
              reports, and connect with expert doctors—all from
              one platform.
            </p>
          </div>

          <div className="hero-visual">
            <div className="medical-icon">🏥</div>
            <div className="ai-icon">🤖</div>
            <div className="heart-icon">❤️</div>
          </div>

        </div>
      </section>


      {/* ================= ABOUT ================= */}

      <section className="about-hospital">

        <div className="about-content">

          <h2>About Smart Hospital AI</h2>

          <p>
            Smart Hospital AI is an AI-powered healthcare platform
            designed to make healthcare services more accessible,
            convenient, and intelligent.
          </p>

          <p>
            Patients can find doctors, manage appointments, use an
            AI assistant, analyze medical reports, manage their
            profile, and access emergency assistance—all from one
            platform.
          </p>

          <div className="about-highlights">

            <span>🩺 Find Doctors</span>
            <span>📅 Appointments</span>
            <span>🤖 AI Assistant</span>
            <span>📄 Report Analysis</span>

          </div>

        </div>

      </section>
    </>
  );
}

export default Hero;