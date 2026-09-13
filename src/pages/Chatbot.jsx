import { useState } from "react";
import "../styles/Chatbot.css";

function Chatbot({ setPage }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! 👋 I'm your Smart Hospital AI Assistant. " +
        "I can help you find a suitable specialist, book appointments, " +
        "and learn about hospital services.",
    },
  ]);

  const [input, setInput] = useState("");

  const [showSymptoms, setShowSymptoms] = useState(false);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // ================================
  // AVAILABLE SYMPTOMS
  // ================================

  const symptoms = [
    "Headache",
    "Migraine",
    "Dizziness",
    "Memory Problems",

    "Chest Pain",
    "Heart Palpitations",

    "Skin Rash",
    "Acne",
    "Itching",

    "Knee Pain",
    "Joint Pain",
    "Back Pain",
    "Bone Pain",

    "Fever",
    "Cough",
    "Cold",
    "Weakness",

    "Child Health Problem",
  ];


  // ================================
  // SPECIALIST RECOMMENDATIONS
  // ================================

  const getRecommendations = (selected) => {
    const recommendations = [];

    const has = (symptom) =>
      selected.includes(symptom);


    // Cardiologist
    if (
      has("Chest Pain") ||
      has("Heart Palpitations")
    ) {
      recommendations.push({
        specialty: "Cardiologist",
        doctor: "Dr. Priya Sharma",
        reason:
          "Your selected symptoms may be related to the heart or cardiovascular system.",
      });
    }


    // Neurologist
    if (
      has("Headache") ||
      has("Migraine") ||
      has("Dizziness") ||
      has("Memory Problems")
    ) {
      recommendations.push({
        specialty: "Neurologist",
        doctor: "Dr. Rahul Verma",
        reason:
          "Your selected symptoms may involve the nervous system.",
      });
    }


    // Dermatologist
    if (
      has("Skin Rash") ||
      has("Acne") ||
      has("Itching")
    ) {
      recommendations.push({
        specialty: "Dermatologist",
        doctor: "Dr. Neha Kapoor",
        reason:
          "Your selected symptoms are related to skin concerns.",
      });
    }


    // Orthopedic
    if (
      has("Knee Pain") ||
      has("Joint Pain") ||
      has("Back Pain") ||
      has("Bone Pain")
    ) {
      recommendations.push({
        specialty: "Orthopedic",
        doctor: "Dr. Arjun Mehta",
        reason:
          "Your selected symptoms may involve bones, joints, or muscles.",
      });
    }


    // General Physician
    if (
      has("Fever") ||
      has("Cough") ||
      has("Cold") ||
      has("Weakness")
    ) {
      recommendations.push({
        specialty: "General Physician",
        doctor: "Dr. Anjali Patel",
        reason:
          "For common or general health concerns, a General Physician may be a suitable first point of contact.",
      });
    }


    // Pediatrician
    if (has("Child Health Problem")) {
      recommendations.push({
        specialty: "Pediatrician",
        doctor: "Dr. Vikram Shah",
        reason:
          "For health concerns involving children, a Pediatrician is the appropriate specialist.",
      });
    }

    return recommendations;
  };


  // ================================
  // OPEN SYMPTOM LIST
  // ================================

  const openSymptoms = () => {
    setShowSymptoms(true);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "bot",
        text:
          "Please select one or more symptoms from the list below and then click Get Recommendation.",
      },
    ]);
  };


  // ================================
  // SELECT / UNSELECT SYMPTOM
  // ================================

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((previousSymptoms) => {

      if (previousSymptoms.includes(symptom)) {
        return previousSymptoms.filter(
          (item) => item !== symptom
        );
      }

      return [
        ...previousSymptoms,
        symptom,
      ];
    });
  };


  // ================================
  // GET RECOMMENDATION
  // ================================

  const getRecommendation = () => {

    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    const recommendations =
      getRecommendations(selectedSymptoms);

    const selectedText =
      "Selected symptoms: " +
      selectedSymptoms.join(", ");


    // No matching specialist
    if (recommendations.length === 0) {

      setMessages((previousMessages) => [
        ...previousMessages,

        {
          sender: "user",
          text: selectedText,
        },

        {
          sender: "bot",
          text:
            "I couldn't find a matching specialist for these symptoms. " +
            "A General Physician may be a suitable first point of contact.\n\n" +
            "⚠️ This is a general recommendation, not a medical diagnosis.",
        },
      ]);

      setSelectedSymptoms([]);

      setShowSymptoms(false);

      return;
    }


    // Build response
    let response =
      "Based on your selected symptoms:\n\n";

    response +=
      "Selected: " +
      selectedSymptoms.join(", ") +
      "\n\n";

    response +=
      "Recommended specialist(s):\n\n";


    recommendations.forEach(
      (recommendation) => {

        response +=
          "👨‍⚕️ " +
          recommendation.doctor +
          "\n";

        response +=
          "🩺 " +
          recommendation.specialty +
          "\n";

        response +=
          recommendation.reason +
          "\n\n";
      }
    );


    response +=
      "⚠️ This is a general specialist recommendation, " +
      "not a medical diagnosis. Please consult a qualified " +
      "healthcare professional for medical advice.";


    // Add result to chat
    setMessages((previousMessages) => [
      ...previousMessages,

      {
        sender: "user",
        text: selectedText,
      },

      {
        sender: "bot",
        text: response,
      },
    ]);


    // Clear selection
    setSelectedSymptoms([]);

    setShowSymptoms(false);
  };


  // ================================
  // NORMAL CHATBOT RESPONSE
  // ================================

  const getResponse = (message) => {

    const text = message.toLowerCase();


    if (
      text.includes("doctor") ||
      text.includes("specialist")
    ) {
      return (
        "We have Cardiologists, Neurologists, General Physicians, " +
        "Orthopedists, Dermatologists, and Pediatricians. " +
        "You can visit the Doctors page to view available doctors."
      );
    }


    if (
      text.includes("appointment") ||
      text.includes("book")
    ) {
      return (
        "To book an appointment, go to the Doctors page, " +
        "choose a doctor, click Book Appointment, and select your date and time."
      );
    }


    if (
      text.includes("service") ||
      text.includes("hospital")
    ) {
      return (
        "Smart Hospital AI provides doctor appointments, " +
        "AI assistance, medical report analysis, and patient prediction services."
      );
    }


    if (text.includes("report")) {
      return (
        "You can use our Medical Report Analysis feature " +
        "to upload a report and get a simple explanation of its information."
      );
    }


    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return (
        "Hello! 👋 You can ask me about doctors, appointments, " +
        "hospital services, reports, or use the Symptoms option " +
        "to find a suitable specialist."
      );
    }


    if (text.includes("thank")) {
      return (
        "You're welcome! 😊 I'm here if you need help navigating Smart Hospital AI."
      );
    }


    return (
      "I can help you find a specialist, book appointments, " +
      "learn about hospital services, and understand medical reports."
    );
  };


  // ================================
  // SEND NORMAL MESSAGE
  // ================================

  const sendMessage = (message) => {

    if (!message.trim()) {
      return;
    }

    const userMessage = {
      sender: "user",
      text: message,
    };

    const botMessage = {
      sender: "bot",
      text: getResponse(message),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };


  // ================================
  // FORM SUBMIT
  // ================================

  const handleSubmit = (e) => {

    e.preventDefault();

    sendMessage(input);
  };


  // ================================
  // PAGE
  // ================================

  return (
    <div className="chatbot-page">


      {/* ================= HEADER ================= */}

      <div className="chatbot-header">

        <div>
          <h1>🤖 Smart Hospital AI</h1>

          <p>
            Healthcare Assistant
          </p>
        </div>
         <div className="chatbot-header-buttons">

  <button
    type="button"
    onClick={() => setPage("dashboard")}
  >
    Dashboard
  </button>

  <button
    type="button"
    onClick={() => setPage("home")}
  >
    Home
  </button>

</div>
</div>

      {/* ================= CHAT CONTAINER ================= */}

      <div className="chatbot-container">


        {/* CHAT MESSAGES */}

        <div className="chat-messages">

          {messages.map(
            (message, index) => (

              <div
                key={index}
                className={`message ${
                  message.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }`}
              >
                {message.text}
              </div>

            )
          )}

        </div>


        {/* ================= SYMPTOM SELECTION ================= */}

        {showSymptoms && (

          <div className="symptom-selection">

            <h3>
              Select your symptoms
            </h3>


            <div className="symptom-list">

              {symptoms.map(
                (symptom) => (

                  <button
                    type="button"
                    key={symptom}
                    className={
                      selectedSymptoms.includes(
                        symptom
                      )
                        ? "symptom-button selected"
                        : "symptom-button"
                    }
                    onClick={() =>
                      toggleSymptom(symptom)
                    }
                  >

                    {selectedSymptoms.includes(
                      symptom
                    )
                      ? "✓ "
                      : ""}

                    {symptom}

                  </button>

                )
              )}

            </div>


            {/* SELECTED COUNT */}

            <p className="selected-count">

              {selectedSymptoms.length}{" "}
              symptom
              {selectedSymptoms.length !== 1
                ? "s"
                : ""}{" "}
              selected

            </p>


            {/* RECOMMENDATION BUTTON */}

            <button
              type="button"
              className="recommend-button"
              onClick={getRecommendation}
            >
              Get Recommendation
            </button>

          </div>

        )}


        {/* ================= QUICK OPTIONS ================= */}

        <div className="quick-options">


          <button
            type="button"
            onClick={() =>
              sendMessage(
                "Find a doctor"
              )
            }
          >
            🩺 Find a Doctor
          </button>


          <button
            type="button"
            onClick={() =>
              sendMessage(
                "How do I book an appointment?"
              )
            }
          >
            📅 Book Appointment
          </button>


          <button
            type="button"
            onClick={() =>
              sendMessage(
                "What hospital services are available?"
              )
            }
          >
            🏥 Hospital Services
          </button>


          <button
            type="button"
            onClick={() =>
              sendMessage(
                "How does medical report analysis work?"
              )
            }
          >
            📄 Report Analysis
          </button>


          {/* SYMPTOMS BUTTON */}

          <button
            type="button"
            onClick={openSymptoms}
          >
            🩺 Symptoms
          </button>

        </div>


        {/* ================= INPUT ================= */}

        <div className="chat-input">

  <input
    type="text"
    placeholder="Ask something..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(input);
      }
    }}
  />

  <button
    type="button"
    onClick={() => sendMessage(input)}
  >
    Send
  </button>

</div>

      </div>

    </div>
  );
}

export default Chatbot;