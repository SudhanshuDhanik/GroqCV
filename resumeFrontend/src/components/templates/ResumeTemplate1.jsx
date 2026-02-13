import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import "./ResumeTemplate1.css";

const ResumeTemplate1 = ({ resume }) => {
  const resumeRef = useRef();

  // Helper to check if a section has valid data
  const hasContent = (obj) => {
    if (!obj) return false;
    // If it's a string (like simple arrays), check content
    if (typeof obj === "string") return obj.trim() !== "";
    // If it's an object, check if any value is filled
    return Object.values(obj).some((val) => val && val.toString().trim() !== "");
  };

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // Top, Left, Bottom, Right margins
      filename: `${resume.fullName || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="template-wrapper">
      <div className="download-section">
        <button onClick={handleDownload} className="download-btn">
          ⬇️ Download PDF
        </button>
      </div>

      {/* Printable Resume Area */}
      <div ref={resumeRef} className="resume-paper">
        {/* Header */}
        <header className="resume-header">
          <h1>{resume.fullName}</h1>
          <div className="contact-info">
            {resume.email && <span>{resume.email}</span>}
            {resume.phone && <span> | {resume.phone}</span>}
            {resume.address && <span> | {resume.address}</span>}
            {resume.linkedin && (
              <span>
                {" "}
                | <a href={resume.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </span>
            )}
            {resume.github && (
              <span>
                {" "}
                | <a href={resume.github} target="_blank" rel="noreferrer">GitHub</a>
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        {resume.summary && resume.summary.trim() && (
          <section className="resume-section">
            <h3 className="section-title">Professional Summary</h3>
            <p className="summary-text">{resume.summary}</p>
          </section>
        )}

        {/* Skills */}
        {resume.skills?.some((s) => s && s.trim()) && (
          <section className="resume-section">
            <h3 className="section-title">Technical Skills</h3>
            <div className="skills-list">
              {resume.skills
                .filter((s) => s && s.trim())
                .map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resume.experiences?.some(hasContent) && (
          <section className="resume-section">
            <h3 className="section-title">Experience</h3>
            {resume.experiences.filter(hasContent).map((exp, i) => (
              <div key={i} className="experience-item">
                <div className="item-header">
                  <span className="item-title">{exp.position}</span>
                  <span className="item-date">{exp.duration}</span>
                </div>
                <div className="item-subtitle">{exp.company}</div>
                <p className="item-description">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects?.some(hasContent) && (
          <section className="resume-section">
            <h3 className="section-title">Projects</h3>
            {resume.projects.filter(hasContent).map((proj, i) => (
              <div key={i} className="project-item">
                <div className="item-header">
                  <span className="item-title">{proj.title}</span>
                  {proj.technologies && (
                    <span className="tech-stack">[{proj.technologies}]</span>
                  )}
                </div>
                <p className="item-description">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Internships */}
        {resume.internships?.some(hasContent) && (
          <section className="resume-section">
            <h3 className="section-title">Internships</h3>
            {resume.internships.filter(hasContent).map((intern, i) => (
              <div key={i} className="experience-item">
                <div className="item-header">
                  <span className="item-title">{intern.role}</span>
                  <span className="item-date">{intern.duration}</span>
                </div>
                <div className="item-subtitle">{intern.company}</div>
                <p className="item-description">{intern.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.educationList?.some(hasContent) && (
          <section className="resume-section">
            <h3 className="section-title">Education</h3>
            {resume.educationList.filter(hasContent).map((edu, i) => (
              <div key={i} className="education-item">
                <div className="item-header">
                  <span className="item-title">{edu.degree}</span>
                  <span className="item-date">{edu.grade}</span>
                </div>
                <div className="item-subtitle">{edu.institution}</div>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {resume.achievements?.some((a) => a && a.trim()) && (
          <section className="resume-section">
            <h3 className="section-title">Achievements</h3>
            <ul className="achievements-list">
              {resume.achievements
                .filter((a) => a && a.trim())
                .map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplate1;