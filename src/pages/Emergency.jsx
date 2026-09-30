import { useState } from "react";
import "../styles/Emergency.css";

function Emergency({ setPage, user }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    contactNumber: "",
    emergencyType: "",
    currentLocation: "",
    description: "",
  });

  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.patientId ||
      !formData.contactNumber ||
      !formData.emergencyType ||
      !formData.currentLocation ||
      !formData.description
    ) {
      alert("Please fill in all emergency request details.");
      return;
    }

    const requestId =
      "EMG-" +
      new Date().getFullYear() +
      "-" +
      String(Date.now()).slice(-4);

    const emergencyRequest = {
  patientEmail: user?.email,
  patientName: formData.patientName,
  patientId: formData.patientId,
  contactNumber: formData.contactNumber,
  emergencyType: formData.emergencyType,
  currentLocation: formData.currentLocation,
  description: formData.description,
  requestId,
  status: "Request Sent",
  time: new Date().toLocaleTimeString(),
};

const savedRequests =
  JSON.parse(localStorage.getItem("emergencyRequests")) || [];

savedRequests.push(emergencyRequest);

localStorage.setItem(
  "emergencyRequests",
  JSON.stringify(savedRequests)
);

alert(
  `Emergency request submitted successfully.\nRequest ID: ${requestId}`
);
  };

  return (
    <div className="emergency-page">

      {/* HEADER */}
      <div className="emergency-header">

        <button
          className="dashboard-button"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <h1>🚨 Emergency / SOS</h1>

        <p>
          Request emergency assistance and provide important
          information for urgent situations.
        </p>

      </div>

      {/* DEMO NOTICE */}
      <div className="emergency-notice">
        <strong>⚠️ Demonstration System:</strong>{" "}
        This application is a demonstration system and does
        not replace real emergency services.
      </div>

      {/* HOSPITAL EMERGENCY INFORMATION */}
      <div className="emergency-section">

        <h2>🏥 Hospital Emergency Information</h2>

        <div className="emergency-info-grid">

          <div className="emergency-info-card">
            <span>🚑</span>
            <h3>Emergency Department</h3>
            <p>Available for urgent medical situations.</p>
          </div>

          <div className="emergency-info-card">
            <span>🚑</span>
            <h3>Ambulance Information</h3>
            <p>Ambulance assistance is available through the hospital.</p>
            <p>Ambulance Contact: 020-00050-4738</p>
          </div>

          <div className="emergency-info-card">
            <span>📞</span>
            <h3>Hospital Emergency Contact</h3>
            <p>Emergency Contact: +91 90000 00000</p>
          </div>

          <div className="emergency-info-card">
            <span>📍</span>
            <h3>Hospital Address</h3>
            <p>123 Healthcare Avenue, Mumbai, Maharashtra</p>
          </div>

          <div className="emergency-info-card">
            <span>🗺️</span>
            <h3>Hospital Location</h3>
            <p>Mumbai, Maharashtra, India</p>
          </div>

          <div className="emergency-info-card">
            <span>⚠️</span>
            <h3>Emergency Instructions</h3>
            <p>
              Stay calm, provide accurate information, and
              contact real emergency services when necessary.
            </p>
          </div>

        </div>

      </div>

      {/* EMERGENCY REQUEST */}
      <div className="emergency-section emergency-request-section">

        <h2>🚨 Emergency Request</h2>

        <p className="section-description">
          Submit the following information to create a demo
          emergency request.
        </p>

        <form
          className="emergency-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
          </div>

          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder="Enter patient ID"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </div>

          <div className="form-group">
            <label>Emergency Type</label>
            <select
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
            >
              <option value="">Select emergency type</option>
              <option value="Medical Emergency">
                Medical Emergency
              </option>
              <option value="Accident">
                Accident
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group">
  <label>Current Location</label>

  <input
    type="text"
    name="currentLocation"
    value={formData.currentLocation}
    onChange={handleChange}
    placeholder="Enter current location"
  />
</div>

          <div className="form-group full-width">
            <label>Emergency Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the emergency"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="submit-emergency-button"
          >
            🚨 Submit Emergency Request
          </button>

        </form>

      </div>

      

    </div>
  );
}

export default Emergency;