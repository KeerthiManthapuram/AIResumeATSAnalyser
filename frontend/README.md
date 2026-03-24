# 🧠 Resume ATS Analyzer

A full-stack AI-powered web application that analyzes resumes against job descriptions and provides ATS (Applicant Tracking System) scores along with actionable improvement suggestions.

## 🚀 Features

- 🔐 User Authentication (Register & Login with JWT)
- 📄 Resume Upload (PDF parsing)
- 🤖 AI-based Resume Analysis using Gemini API
- 📊 ATS Score Calculation based on keyword matching
- 💡 Smart Suggestions to improve resume quality
- 🔒 Protected Routes for authenticated users

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)
- Mongoose

### Other Tools
- JWT Authentication
- Multer (file upload)
- PDF parsing
- Gemini AI API

## ⚙️ How It Works

1. User registers and logs in
2. Uploads a resume (PDF)
3. Resume text is extracted
4. Job description is analyzed
5. ATS score is calculated
6. AI generates improvement suggestions

## 🌐 Live Demo

Frontend: http://localhost:5173  
Backend: https://your-render-url

## 🔑 Environment Variables

Create a `.env` file in backend:
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key


## 📦 Installation

```bash
# Clone repo
git clone <your-repo-url>

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd frontend
npm install
npm run dev

🎯 Future Improvements
Resume history tracking
Multiple job comparison
Better UI/UX
Deployment with custom domain

👨‍💻 Author
Keerthi Manthapuram

                    _ _ _