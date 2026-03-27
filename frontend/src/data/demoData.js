const demoAnalysisResult = {
success: true,
suggestions: {
analysis: {
compatibility_score: 72,


  resume_skills: [
    "React.js",
    "Node.js",
    "MongoDB",
    "RESTful APIs",
  ],

  job_description_skills: [
    "React.js",
    "Node.js",
    "MongoDB",
    "AWS",
    "Docker",
    "RESTful APIs",
  ],

  missing_skills: {
    from_resume_for_job_description: ["AWS", "Docker"],
    from_job_description_for_resume: ["GraphQL"],
  },

  ats_optimization_tips: [
    "Add quantified achievements like 'improved performance by 30%'",
    "Include cloud technologies such as AWS",
    "Use strong action verbs like 'Engineered', 'Optimized'",
  ],

  ats_optimized_bullet_point_improvements: [
    {
      original_summary:
        "Worked on backend APIs using Node.js",
      reasoning:
        "The sentence is weak and lacks measurable impact",
      suggested_bullets: [
        "Engineered scalable REST APIs using Node.js handling 10K+ requests/day",
        "Optimized backend performance improving response time by 25%",
      ],
    },
  ],

  overall_assessment:
    "Your resume has strong backend skills but lacks cloud technologies and measurable achievements.",
},


},
};

export default demoAnalysisResult;
