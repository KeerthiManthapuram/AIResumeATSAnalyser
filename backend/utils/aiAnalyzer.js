import dotenv from "dotenv";
dotenv.config();

export const analyzeWithGemini = async (resumeText, jobDescription) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is undefined");
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: buildPrompt(resumeText, jobDescription)
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(JSON.stringify(data));
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("====== GEMINI RAW OUTPUT ======");
    console.log(rawText);
    console.log("================================");

    if (!rawText) {
      throw new Error("Empty Gemini response");
    }

    // Try parsing
    // Try parsing
try {
  const parsed = JSON.parse(
    rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );

  return {
    success: true,
    analysis: parsed.analysis || {},
    improved_resume: parsed.improved_resume || {
      professional_summary: "Improve your summary based on job role",
      skills: [],
      experience_points: [],
      projects: []
    }
  };

} catch (parseError) {
  console.warn("JSON parsing failed. Returning safe fallback.");

  return {
    success: false,
    analysis: {},
    improved_resume: {
      professional_summary: "Could not generate optimized resume",
      skills: [],
      experience_points: [],
      projects: []
    }
  };
}

  } catch (err) {
    console.error("Gemini Fatal Error:", err.message);
    return {
      success: false,
      analysis: {},
      improved_resume: {
      professional_summary: "Error generating resume",
      skills: [],
      experience_points: [],
      projects: []
    },
    error: err.message
    };
  }
};


const buildPrompt = (resumeText, jobDescription) => `
You are an advanced ATS resume optimizer.

Analyze AND improve the resume based on the job description.

Return STRICT JSON ONLY.

{
  "success": true,
  "analysis": {
    "resume_skills": [],
    "job_description_skills": [],
    "missing_skills": {
      "from_resume_for_job_description": [],
      "from_job_description_for_resume": []
    },
    "ats_optimization_tips": [],
    "compatibility_score": 0,
    "overall_assessment": ""
  },
  "improved_resume": {
    "professional_summary": "",
    "skills": [],
    "experience_points": [],
    "projects": []
  }
}

RULES:
- Extract real skills
- Compare JD and Resume
- Suggest missing skills
- Rewrite resume with strong action verbs
- Add quantified achievements
- Make resume ATS optimized

Resume:
${resumeText}

Job Description:
${jobDescription}
`;