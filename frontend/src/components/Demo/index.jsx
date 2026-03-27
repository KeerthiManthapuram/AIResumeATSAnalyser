import "./index.css";
import demoAnalysisResult from "../../data/demoData";

const Demo = () => {
  const report =
    demoAnalysisResult.suggestions?.analysis ??
    demoAnalysisResult.suggestions ??
    demoAnalysisResult;

  return (
    <div className="demo-wrapper">
      <section className="demo">

        {/* Background */}
        <div className="demo-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="jd-container">
          <h3 className="jd-title">Job Description</h3>
          <p className="jd-text">
          We are looking for a Full Stack Developer with experience in building
          scalable web applications. The candidate should be proficient in React.js,
          Node.js, and MongoDB. Familiarity with RESTful APIs, cloud platforms like AWS,
          and containerization tools such as Docker is highly preferred.
          </p>
        </div>
        <div className="report-container">

          <h2 className="report-title">ATS Resume Analysis Report</h2>

          <p className="score-text">
            <strong>Compatibility Score:</strong> {report?.compatibility_score}%
          </p>

          {/* Resume Skills */}
          <div className="report-section">
            <h3>RESUME SKILLS</h3>
            {report?.resume_skills?.map((skill, i) => (
              <div key={i} className="skill-item">→ {skill}</div>
            ))}
          </div>

          {/* Job Skills */}
          <div className="report-section">
            <h3>JOB DESCRIPTION SKILLS</h3>
            {report?.job_description_skills?.map((skill, i) => (
              <div key={i} className="skill-item">→ {skill}</div>
            ))}
          </div>

          {/* Missing Skills */}
          <div className="report-section">
            <h3>MISSING SKILLS (ADD TO RESUME)</h3>
            {report?.missing_skills?.from_resume_for_job_description?.map((skill, i) => (
              <div key={i} className="skill-item">→ {skill}</div>
            ))}
          </div>

          {/* Extra Skills */}
          <div className="report-section">
            <h3>EXTRA SKILLS (NOT REQUIRED BY JOB)</h3>
            {report?.missing_skills?.from_job_description_for_resume?.map((skill, i) => (
              <div key={i} className="skill-item">→ {skill}</div>
            ))}
          </div>

          {/* ATS Tips */}
          <div className="report-section">
            <h3>ATS OPTIMIZATION TIPS</h3>
            {report?.ats_optimization_tips?.map((tip, i) => (
              <div key={i} className="tip-item">→ {tip}</div>
            ))}
          </div>

          {/* Bullet Improvements */}
          <div className="report-section">
            <h3>BULLET POINT IMPROVEMENTS</h3>

            {report?.ats_optimized_bullet_point_improvements?.map((item, i) => (
              <div key={i} className="bullet-card">

                <p><strong>Original:</strong> {item.original_summary}</p>

                <p><strong>Reasoning:</strong> {item.reasoning}</p>

                <strong>Suggested Bullets:</strong>
                {item.suggested_bullets?.map((b, j) => (
                  <div key={j} className="skill-item">→ {b}</div>
                ))}

              </div>
            ))}
          </div>

          {/* Overall */}
          <div className="report-section">
            <h3>OVERALL ASSESSMENT</h3>
            <p className="overall-text">{report?.overall_assessment}</p>
          </div>

        </div>
        
      </section>
    </div>
  );
};

export default Demo;