import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

const OptimizedDownload = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const improvedResume = location.state?.improvedResume;

  const handleDownload = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log("FRONTEND TOKEN:", token);
      const response = await fetch(
        "https://resume-ats-backend-4xxk.onrender.com/resume/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            improved_resume: improvedResume,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Optimized_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-wrapper">
      <section className="download-header">

        <div className="download-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="download-content">
          <p className="download-tag">AI Powered Optimization</p>
          <h2 className="download-title">
          Download Your <span className="gradient-text">Optimized Resume</span>
          </h2>
          <p className="download-sub">
          Your resume has been enhanced using ATS intelligence. Download the optimized version below.
          </p>
          <button
          className="download-btn"
          onClick={handleDownload}
          disabled={loading}
          >
          {loading ? "Generating PDF..." : "⬇ Download Resume"}
          </button>
          </div>
        </section>
    </div>
  );
};

export default OptimizedDownload;