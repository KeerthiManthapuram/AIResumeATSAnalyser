import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Demo from "./components/Demo"; 
import YourResumes from "./components/YourResumes"; 
import Contact from "./components/Contact"; 
import ProtectedRoute from "./components/ProtectedRoute"; 
import Navbar from "./components/Navbar"; 
import OptimizedDownload from "./components/OptimizedDownload";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/optimize-resume" element={<OptimizedDownload />} />
        <Route
          path="/your-resumes"
          element={
            <ProtectedRoute>
              <YourResumes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;