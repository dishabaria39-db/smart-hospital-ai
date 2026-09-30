# 🏥 Smart Hospital AI

> An AI-powered healthcare web application that brings appointments, doctors, patient management, AI assistance, medical report analysis, patient prediction, and emergency assistance together in one platform.

## 📌 Overview

Smart Hospital AI is a modern healthcare web application designed to provide patients with a simple and organized digital healthcare experience.

The platform combines traditional hospital services with AI-powered features, allowing patients to manage appointments, explore doctors, maintain their profile, interact with an AI assistant, analyze medical reports, access patient prediction, and submit emergency assistance requests.

The project is built as a portfolio-focused full-stack web application using React, Vite, CSS, Node.js, Express.js, and Google Gemini API.

## ✨ Key Features

### 👤 Patient Login & Profile
- Patient registration and login
- Patient profile management
- Editable patient information
- Medical conditions and allergy information
- Emergency contact details

### 👨‍⚕️ Doctor Directory
- Explore available doctors
- Doctor specialization
- Doctor qualification
- Doctor experience
- Appointment access through the doctor directory

### 📅 Appointment Management
- Book doctor appointments
- View upcoming appointments
- View completed appointments
- View cancelled appointments
- Cancel appointments
- Reschedule appointments
- Appointment status tracking
- Unique appointment IDs

### 🤖 AI Healthcare Assistant
- AI-powered healthcare chatbot
- Interactive symptom-related assistance
- Quick healthcare options
- Context-based responses

### 📄 AI Medical Report Analysis
Supports:
- PDF medical reports
- JPG/JPEG medical reports
- TXT medical reports

The AI analysis provides:
- Detected medical values
- Important findings
- Simple explanations
- Out-of-range values
- Medical terminology explanations
- Educational information
- AI-generated insights
- Questions to ask a doctor

For image-based reports, the system uses AI vision analysis to read medical report tables and extract visible values.

> ⚠️ Medical report analysis is educational and does not provide a medical diagnosis. Results should be reviewed with a qualified healthcare professional.

### 🧠 Patient Prediction
- Dedicated patient prediction module
- AI-assisted patient-related analysis

### 🚨 Emergency Assistance
- Emergency assistance information
- Ambulance information
- Hospital emergency contact
- Hospital location information
- Emergency request submission
- Emergency type selection
- Patient and contact details
- Emergency request ID generation
- Emergency request status tracking

> ⚠️ The emergency module is a demonstration feature and does not replace real emergency services.

### 📊 Patient Dashboard
Centralized dashboard providing access to:
- Doctors
- Appointments
- AI Assistant
- Medical Reports
- Patient Prediction
- Patient Profile
- Emergency Assistance

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST API

### AI

- Google Gemini API
- Gemini Vision for medical report image analysis

### Medical Report Processing

- PDF.js
- Tesseract.js
- FileReader API
- Gemini Vision

### Data Storage

- Browser LocalStorage for patient sessions, profiles, appointments, and emergency requests

### Development Tools

- Git
- GitHub
- Visual Studio Code
- Vite

##  Application Architecture
'''text
Smart Hospital AI
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── JavaScript
│   └── CSS
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   └── Google Gemini API
│
└── AI Medical Report Analysis
    ├── PDF Text Extraction
    ├── OCR for Scanned Documents
    ├── Image Analysis
    └── Gemini AI Analysis
'''text
## Project Structure
'''text
smart-hospital-ai/
│
├── backend/
│   └── server.js
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Appointments.jsx
│   │   ├── AppointmentManagement.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Doctors.jsx
│   │   ├── Emergency.jsx
│   │   ├── EmergencyRequests.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MedicalReports.jsx
│   │   ├── PatientPrediction.jsx
│   │   └── PatientProfile.jsx
│   │
│   ├── styles/
│   │   ├── Appointments.css
│   │   ├── Dashboard.css
│   │   ├── Emergency.css
│   │   ├── Hero.css
│   │   ├── MedicalReports.css
│   │   └── ...
│   │
│   └── App.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── server.js
├── vite.config.js
└── README.md
'''text
# 🚀 Getting Started
1. Clone the repository
git clone https://github.com/dishabaria39-db/smart-hospital-ai.git
2. Navigate to the project
cd smart-hospital-ai
3. Install frontend dependencies
npm install
4. Configure the Gemini API
Create a .env file for the backend and add:
GEMINI_API_KEY=your_gemini_api_key
Never commit your API key to GitHub.
5. Start the frontend
npm run dev
The Vite development server will provide a local URL such as:
http://localhost:5173
6. Start the backend
Run the Express backend separately:
node server.js
The backend runs locally on:
http://localhost:5000

# 🔐 Environment Variables
The Gemini API key must be stored as an environment variable on the backend.
GEMINI_API_KEY=your_gemini_api_key
The .env file is excluded from Git using .gitignore.

# 💡 Project Highlights
Patient-focused healthcare experience
AI-powered medical report analysis
Vision-based medical report understanding
Appointment lifecycle management
Patient profile management
AI healthcare assistant
Emergency request workflow
Responsive React interface
Separate frontend and backend architecture
Environment-based API key management

# ⚠️ Disclaimer
Smart Hospital AI is an educational and portfolio project.
The AI-powered healthcare features are intended to provide general educational information and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
The emergency module is a demonstration feature and should not be relied upon for real-world emergency situations.

# 🔮 Future Enhancements
Possible future improvements include:
Secure database integration
Production-grade authentication
Real-time notifications
Doctor-side management portal
Secure cloud storage for medical reports
Advanced AI models for patient prediction
Integration with healthcare APIs
Appointment reminders
Production-level security and privacy controls

# 👩‍💻 Developer
Disha Ravi Baria
B.Tech in Artificial Intelligence
Usha Mittal Institute of Technology
SNDT Women's University, Mumbai
