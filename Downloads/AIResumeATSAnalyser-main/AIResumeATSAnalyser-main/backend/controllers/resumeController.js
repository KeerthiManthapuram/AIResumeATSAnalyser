import Resume from "../models/Resume.js";
import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { analyzeWithGemini } from "../utils/aiAnalyzer.js";
import { generatePDF } from "../utils/pdfGenerator.js";

/* =========================
   UPLOAD + PARSE RESUME
   ========================= */

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ CRITICAL FIX → Convert Buffer → Uint8Array
    const uint8Array = new Uint8Array(req.file.buffer);

    // ✅ Parse PDF
    const text = await parseResume(uint8Array);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text extracted from PDF" });
    }
    
    console.log("Resume parsed. Length:", text.length);

    res.json({
      success: true,
      preview: text.substring(0, 500),
      text
    });

  } catch (err) {
    console.error("Upload Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   ANALYZE RESUME + JD
   ========================= */

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing resumeText or jobDescription" });
    }

    // ✅ Keyword extraction
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    // ✅ ATS Score
    const score = calculateATSScore(jdKeywords, resumeKeywords);

    console.log("ATS Score:", score);

    // ✅ Gemini AI analysis
    const aiResult = await analyzeWithGemini(resumeText, jobDescription);

    res.json({
      success: true,
      score,
      analysis: aiResult.analysis,
      improved_resume: aiResult.improved_resume
  });

  } catch (err) {
    console.error("Analyze Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DOWNLOAD UPDATED RESUME
   ========================= */

export const downloadResume = async (req, res) => {
  try {
    console.log("DOWNLOAD BODY:", req.body);
    const { improved_resume } = req.body;

    if (!improved_resume) {
      return res.status(400).json({ error: "No resume data" });
    }

    const pdfBuffer = await generatePDF(improved_resume);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=optimized_resume.pdf"
    );

    res.send(pdfBuffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};