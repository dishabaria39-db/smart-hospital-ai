import "../styles/Navbar.css";

function Navbar({ setPage, user }) {
  return (
    <nav className="navbar">

      <h2 className="logo">
        🏥 Smart Hospital AI
      </h2>

      <div className="nav-links">

        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("doctors")}>
          Doctors
        </button>

        <button onClick={() => setPage("appointments")}>
          Appointments
        </button>

        {user ? (
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>
        ) : (
          <button onClick={() => setPage("login")}>
            Login
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;