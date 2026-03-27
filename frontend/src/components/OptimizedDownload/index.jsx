import React, { useState } from "react";
import "./index.css";

const OptimizedDownload = ({ improvedResume }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://airesumeatsanalyser.onrender.com/resume/download",
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

        <h2>Download Optimized Resume</h2>

        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "⬇ Optimized Resume"}
        </button>

      </section>
    </div>
  );
};

export default OptimizedDownload;