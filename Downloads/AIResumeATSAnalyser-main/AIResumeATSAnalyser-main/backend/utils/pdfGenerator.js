import PDFDocument from "pdfkit";

export const generatePDF = (resumeData) => {
  const doc = new PDFDocument();

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  doc.on("end", () => {});

  // Title
  doc.fontSize(20).text("Updated Resume", { align: "center" });
  doc.moveDown();

  // Summary
  doc.fontSize(14).text("Professional Summary");
  doc.fontSize(12).text(resumeData.professional_summary || "");
  doc.moveDown();

  // Skills
  doc.fontSize(14).text("Skills");
  resumeData.skills?.forEach(skill => {
  doc.text("• " + (typeof skill === "string" ? skill : skill.name || skill.skill || JSON.stringify(skill)));
  });
  doc.moveDown();

  // Experience
  doc.fontSize(14).text("Experience");
  resumeData.experience_points?.forEach(p => {
  doc.text("• " + (typeof p === "string" ? p : p.point || p.description || JSON.stringify(p)));
  });
  doc.moveDown();

  // Projects
  doc.fontSize(14).text("Projects");
  resumeData.projects?.forEach(p => {
  doc.text("• " + (typeof p === "string" ? p : p.name || p.title || JSON.stringify(p)));
  });
  

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });
};