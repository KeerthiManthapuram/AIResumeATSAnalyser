import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const YourResumes = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a resume to upload.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setLoading(true);
      setError("");

      // Upload
      const uploadResponse = await fetch(
        "http://localhost:5000/resume/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      // Analyze
      const analyzeResponse = await fetch(
        "http://localhost:5000/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resumeText: uploadData.text,
            jobDescription:
              jobDescription ||
              "Full stack developer with React, Node.js, MongoDB",
          }),
        }
      );

      const analyzeData = await analyzeResponse.json();

      console.log("FULL RESPONSE:", analyzeData);

      setAnalysisResult(analyzeData);
      setShowModal(true);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-container">
      <h2>Upload Your Resume</h2>

      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <textarea
        placeholder="Paste Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="job-input"
      />

      <button onClick={handleUploadAndAnalyze} disabled={loading}>
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      {analysisResult && (
        <button onClick={() => setShowModal(true)}>
          View Report
        </button>
      )}

      {/* MODAL */}
      {showModal && analysisResult?.success && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>ATS Resume Analysis Report</h2>

            {(() => {
              const report = analysisResult?.analysis || {};

              return (
                <>
                  <p>
                    <strong>Compatibility Score:</strong>{" "}
                    {report.compatibility_score || analysisResult.score || 0}%
                  </p>

                  {/* Resume Skills */}
                  <h3>Resume Skills</h3>
                  {report.resume_skills?.length ? (
                    <ul>
                      {report.resume_skills.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : <p>No skills found</p>}

                  {/* JD Skills */}
                  <h3>Job Description Skills</h3>
                  {report.job_description_skills?.length ? (
                    <ul>
                      {report.job_description_skills.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : <p>No JD skills found</p>}

                  {/* Missing */}
                  <h3>Missing Skills</h3>
                  {report.missing_skills?.from_resume_for_job_description?.length ? (
                    <ul>
                      {report.missing_skills.from_resume_for_job_description.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : <p>No missing skills</p>}

                  {/* Tips */}
                  <h3>ATS Tips</h3>
                  {report.ats_optimization_tips?.length ? (
                    <ul>
                      {report.ats_optimization_tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  ) : <p>No tips available</p>}

                  {/* Overall */}
                  <h3>Overall</h3>
                  <p>{report.overall_assessment || "No assessment"}</p>

                  {/* Buttons */}
                  <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                    <button
                      onClick={() =>
                        navigate("/optimize-resume", {
                          state: {
                            improvedResume: analysisResult.improved_resume,
                          },
                        })
                      }
                    >
                      Optimize & Download
                    </button>

                    <button onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default YourResumes;