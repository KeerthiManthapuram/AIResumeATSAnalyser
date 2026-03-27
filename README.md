# 🚀 AI Resume ATS Analyzer

An AI-powered Resume ATS Analyzer built using the MERN stack that evaluates resumes against job descriptions and provides intelligent improvement suggestions along with downloadable optimized resumes.

---

## 🌟 Features

### 🔐 Authentication
- User Registration & Login (JWT-based authentication)
- Protected routes for secure access

### 📄 Resume Upload & Parsing
- Upload PDF resumes
- Extract text using `pdfjs`
- Preview extracted content

### 🧠 AI Resume Analysis
- Analyze resume vs Job Description
- Extract keywords from both resume & JD
- Calculate ATS compatibility score
- Identify missing skills
- Provide optimization suggestions

### 🤖 Gemini AI Integration
- Uses Google Gemini API for:
  - Resume improvement
  - Skill suggestions
  - ATS optimization tips
  - Bullet point enhancements

### 📊 ATS Report UI
- Clean and modern UI with:
  - Resume Skills
  - Job Description Skills
  - Missing Skills
  - Extra Skills
  - ATS Optimization Tips
  - Overall Assessment

### 📥 Optimized Resume Download
- Generate professional PDF using `pdfkit`
- Download optimized resume directly
- Handles dynamic AI-generated content

### 🎨 Modern UI/UX
- Animated gradient UI
- Glassmorphism cards
- Responsive design
- Smooth hover effects

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- CSS (Custom styling + animations)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### AI & Utilities
- Google Gemini API
- PDFKit (PDF generation)
- pdfjs-dist (Resume parsing)
- Multer (File uploads)
- JWT (Authentication)

---

## 📂 Project Structure

AIRESUMEATSANALYSER/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── data
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md


---


## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/KeerthiManthapuram/AIResumeATSAnalyser.git
cd AIRESUMEATSANALYZER  

2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key

Run backend:
node server.js


3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


🌐 API Endpoints
Auth
POST /auth/register
POST /auth/login
Resume
POST /resume/upload
POST /resume/analyze
POST /resume/download
🔄 Workflow
User logs in
Uploads resume (PDF)
Adds job description
AI analyzes resume
ATS report is generated
User clicks Optimize & Download
Optimized resume is generated as PDF

🧪 Sample Use Case
Upload resume
Paste JD (e.g., Full Stack Developer)
Get:
ATS Score
Missing Skills
Improved Resume
Downloadable PDF

🚀 Future Improvements
Add resume history dashboard
Improve PDF design (professional templates)
Add multiple resume formats
AI-based resume scoring trends
Dark/Light theme toggle
👨‍💻 Author

Keerthi Manthapuram
Aspiring Full Stack Developer 🚀

⭐ If you like this project

Give it a ⭐ on GitHub!


---



