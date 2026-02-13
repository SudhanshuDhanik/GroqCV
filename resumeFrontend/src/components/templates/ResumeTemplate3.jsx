import React from "react";
import "./ResumeTemplate3.css";

const ResumeTemplate3 = ({ resume }) => {
  const hasContent = (obj) =>
    obj && Object.values(obj).some((val) => val && val.trim() !== "");

  return (
    <div className="resume3-container">
      <aside className="resume3-sidebar">
        <h1>{resume.fullName}</h1>
        <div className="resume3-links">
          {resume.email && <a href={`mailto:${resume.email}`}>Email</a>}
          {resume.linkedin && <a href={resume.linkedin}>LinkedIn</a>}
          {resume.github && <a href={resume.github}>GitHub</a>}
          {resume.phone && <p>{resume.phone}</p>}
        </div>

        {resume.skills?.some((s) => s?.trim()) && (
          <div className="resume3-section">
            <h3>Skills</h3>
            <ul>
              {resume.skills.filter((s) => s.trim()).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.achievements?.some((a) => a?.trim()) && (
          <div className="resume3-section">
            <h3>Achievements</h3>
            <ul>
              {resume.achievements.filter((a) => a.trim()).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="resume3-main">
        {resume.summary?.trim() && (
          <section>
            <h2>Summary</h2>
            <p>{resume.summary}</p>
          </section>
        )}

        {resume.educationList?.some(hasContent) && (
          <section>
            <h2>Education</h2>
            {resume.educationList.filter(hasContent).map((edu, i) => (
              <div key={i}>
                <strong>{edu.degree}</strong> – {edu.institution} ({edu.grade})
              </div>
            ))}
          </section>
        )}

        {resume.experiences?.some(hasContent) && (
          <section>
            <h2>Experience</h2>
            {resume.experiences.filter(hasContent).map((exp, i) => (
              <div key={i}>
                <strong>{exp.position}</strong> at {exp.company} ({exp.duration})
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
                <strong>{intern.role}</strong> – {intern.company} ({intern.duration})
                <p>{intern.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ResumeTemplate3;
