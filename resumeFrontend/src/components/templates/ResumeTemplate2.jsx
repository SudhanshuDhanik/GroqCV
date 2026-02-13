import React from "react";
import "./ResumeTemplate2.css";

const ResumeTemplate2 = ({ resume }) => {
  const hasContent = (obj) =>
    obj && Object.values(obj).some((val) => val && val.trim() !== "");

  return (
    <div className="resume2-container">
      <header className="resume2-header">
        <h1>{resume.fullName}</h1>
        <div className="resume2-contact">
          {resume.email && <a href={`mailto:${resume.email}`}>Email</a>}
          {resume.phone && <span> | {resume.phone}</span>}
          {resume.linkedin && (
            <span> | <a href={resume.linkedin}>LinkedIn</a></span>
          )}
          {resume.github && (
            <span> | <a href={resume.github}>GitHub</a></span>
          )}
        </div>
      </header>

      {resume.summary?.trim() && (
        <section>
          <h2>Profile Summary</h2>
          <p>{resume.summary}</p>
        </section>
      )}

      {resume.educationList?.some(hasContent) && (
        <section>
          <h2>Education</h2>
          {resume.educationList.filter(hasContent).map((edu, i) => (
            <div key={i}>
              <strong>{edu.degree}</strong>, {edu.institution} ({edu.grade})
            </div>
          ))}
        </section>
      )}

      {resume.skills?.some((s) => s?.trim()) && (
        <section>
          <h2>Core Skills</h2>
          <div className="skills-grid">
            {resume.skills.filter((s) => s.trim()).map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </section>
      )}

      {resume.experiences?.some(hasContent) && (
        <section>
          <h2>Experience</h2>
          {resume.experiences.filter(hasContent).map((exp, i) => (
            <div key={i}>
              <strong>{exp.position}</strong> – {exp.company} ({exp.duration})
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.projects?.some(hasContent) && (
        <section>
          <h2>Projects</h2>
          {resume.projects.filter(hasContent).map((proj, i) => (
            <div key={i}>
              <strong>{proj.title}</strong> ({proj.technologies})
              <p>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.internships?.some(hasContent) && (
        <section>
          <h2>Internships</h2>
          {resume.internships.filter(hasContent).map((intern, i) => (
            <div key={i}>
              <strong>{intern.role}</strong> at {intern.company} ({intern.duration})
              <p>{intern.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.achievements?.some((a) => a?.trim()) && (
        <section>
          <h2>Achievements</h2>
          <ul>
            {resume.achievements.filter((a) => a.trim()).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate2;
