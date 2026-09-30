import { useState } from "react";
import "../styles/PatientProfile.css";

function PatientProfile({ setPage, user, setUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    bloodGroup: user?.bloodGroup || "",
    phone: user?.phone || "",
    emergencyContact: user?.emergencyContact || "",
    medicalConditions: user?.medicalConditions || "",
    allergies: user?.allergies || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!formData.age) {
      alert("Please enter your age.");
      return;
    }

    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Update the current patient's profile
    const updatedUsers = registeredUsers.map((registeredUser) =>
      registeredUser.email.toLowerCase() === user.email.toLowerCase()
        ? {
            ...registeredUser,
            ...formData,
          }
        : registeredUser
    );

    // Save updated registered users
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    // Update current logged-in user
    localStorage.setItem(
      "patientUser",
      JSON.stringify(formData)
    );

    // Update React state immediately
    setUser(formData);

    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <div>
            <h1>Patient Profile</h1>
            <p>Manage your personal and medical information.</p>
          </div>

          <button onClick={() => setPage("dashboard")}>
            ← Dashboard
          </button>
        </div>

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h2>{user?.name || "Patient"}</h2>
          <p>{user?.email}</p>

          <div className="profile-form">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
  <label>Emergency Contact</label>
  <input
    type="tel"
    name="emergencyContact"
    value={formData.emergencyContact}
    onChange={handleChange}
    disabled={!isEditing}
    placeholder="Enter emergency contact"
  />
</div>

<div className="form-group">
  <label>Medical Conditions</label>
  <textarea
    name="medicalConditions"
    value={formData.medicalConditions}
    onChange={handleChange}
    disabled={!isEditing}
    placeholder="Enter any existing medical conditions"
    rows="2"
  />
</div>



            <div className="form-group full-width">
              <label>Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter known allergies"
                rows="3"
              />
            </div>

          </div>

          <div className="profile-actions">

            {!isEditing ? (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="save-button"
                  onClick={handleSave}
                >
                  💾 Save Changes
                </button>

                <button
                  className="cancel-button"
                  onClick={() => {
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      age: user?.age || "",
                      gender: user?.gender || "",
                      bloodGroup: user?.bloodGroup || "",
                      phone: user?.phone || "",
                      emergencyContact:
                        user?.emergencyContact || "",
                      medicalConditions:
                        user?.medicalConditions || "",
                      allergies: user?.allergies || "",
                    });

                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default PatientProfile;