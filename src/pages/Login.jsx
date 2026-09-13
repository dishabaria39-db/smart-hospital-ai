import { useState } from "react";
import "../styles/Login.css";

function Login({ setPage, setUser }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // =========================
    // LOGIN
    // =========================

    if (!isRegistering) {
      if (!email.trim()) {
        alert("Please enter your email.");
        return;
      }

      const registeredUsers =
        JSON.parse(
          localStorage.getItem("registeredUsers")
        ) || [];

      const existingUser = registeredUsers.find(
        (user) =>
          user.email.toLowerCase() ===
          email.trim().toLowerCase()
      );

      if (!existingUser) {
        alert("No account found with this email.");
        return;
      }

      // Save current logged-in user
      localStorage.setItem(
        "patientUser",
        JSON.stringify(existingUser)
      );

      setUser(existingUser);
      setPage("dashboard");

      return;
    }

    // =========================
    // REGISTER
    // =========================

    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const registeredUsers =
      JSON.parse(
        localStorage.getItem("registeredUsers")
      ) || [];

    // Check whether email already exists
    const alreadyExists = registeredUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
    };

    // Add new account without deleting old accounts
    const updatedUsers = [
      ...registeredUsers,
      newUser,
    ];

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    // Make new patient the current logged-in user
    localStorage.setItem(
      "patientUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);
    setPage("dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🏥
        </div>

        <h1>
          {isRegistering
            ? "Create Account"
            : "Welcome Back"}
        </h1>

        <p>
          {isRegistering
            ? "Create your Smart Hospital patient profile."
            : "Login to access your patient dashboard."}
        </p>

        <form onSubmit={handleSubmit}>

          {isRegistering && (
            <>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </>
          )}

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            {isRegistering
              ? "Create Account"
              : "Login"}
          </button>

        </form>

        <button
          className="switch-button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setName("");
            setEmail("");
          }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "New patient? Create an account"}
        </button>

        <button
          className="back-button"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;