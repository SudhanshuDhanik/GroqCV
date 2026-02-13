import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const ResumeForm = ({ onSubmit }) => {
  const containerRef = useRef(null);

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    summary: "",
    educationList: [{ degree: "", institution: "", grade: "" }],
    skills: [""],
    experiences: [{ company: "", position: "", duration: "", description: "" }],
    projects: [{ title: "", description: "", technologies: "" }],
    internships: [{ company: "", role: "", duration: "", description: "" }],
    achievements: [""],
    selectedTemplate: "",
  });

  // --- GSAP Animation Hook ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main card entry
      gsap.from(".resume-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Stagger animate all sections and inputs
      gsap.from(".anim-group", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.4,
      });

      // Animate buttons specifically
      gsap.from(".action-btn", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "elastic.out(1, 0.5)",
        delay: 1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- Handlers (Unchanged functionality) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    const updated = [...resume[section]];
    updated[index][field] = value;
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const handleArrayChange = (section, index, value) => {
    const updated = [...resume[section]];
    updated[index] = value;
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const addNestedField = (section, newField) => {
    setResume((prev) => ({ ...prev, [section]: [...prev[section], newField] }));
  };

  const removeNestedField = (section, index) => {
    const updated = resume[section].filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(resume);
  };

  // --- NEW: Prevent form submission on Enter key, unless in a textarea ---
  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter (key code 13 or key string 'Enter')
    // AND if the target element is NOT a <textarea>
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  // --- Render ---
  return (
    <div >
      {/* Decorative Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      {/* ADDED: onKeyDown handler to prevent accidental submission */}
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="resume-card">
        {/* Logo and Title */}
        <h1 className="form-title anim-group">💎 GemAI CV</h1>

        <div className="form-section anim-group">
          <h2>Basic Details</h2>
          <div className="grid-2">
            <input className="glass-input" name="fullName" placeholder="Full Name" value={resume.fullName} onChange={handleChange} />
            <input className="glass-input" name="email" placeholder="Email" value={resume.email} onChange={handleChange} />
            <input className="glass-input" name="phone" placeholder="Phone" value={resume.phone} onChange={handleChange} />
            <input className="glass-input" name="address" placeholder="Address" value={resume.address} onChange={handleChange} />
            <input className="glass-input" name="linkedin" placeholder="LinkedIn URL" value={resume.linkedin} onChange={handleChange} />
            <input className="glass-input" name="github" placeholder="GitHub URL" value={resume.github} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section anim-group">
          <h2>Summary</h2>
          <textarea className="glass-input" name="summary" placeholder="Write a professional summary..." rows="3" value={resume.summary} onChange={handleChange} />
        </div>

        <div className="form-section anim-group">
          <div className="section-header">
            <h2>Education</h2>
            <button type="button" className="add-btn action-btn" onClick={() => addNestedField("educationList", { degree: "", institution: "", grade: "" })}>+</button>
          </div>
          {resume.educationList.map((edu, i) => (
            <div key={i} className="nested-group">
              <input className="glass-input" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange("educationList", i, "degree", e.target.value)} />
              <input className="glass-input" placeholder="Institution" value={edu.institution} onChange={(e) => handleNestedChange("educationList", i, "institution", e.target.value)} />
              <div className="row-control">
                <input className="glass-input" placeholder="Grade/CGPA" value={edu.grade} onChange={(e) => handleNestedChange("educationList", i, "grade", e.target.value)} />
                <button type="button" className="remove-btn action-btn" onClick={() => removeNestedField("educationList", i)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        <div className="form-section ">
          <div className="section-header">
            <h2>Skills</h2>
            <button type="button" className="add-btn " onClick={() => addNestedField("skills", "")}>+</button>
          </div>
          {resume.skills.map((skill, i) => (
            <div key={i} className="row-control mb-2">
              <input className="glass-input" placeholder="Skill Name" value={skill} onChange={(e) => handleArrayChange("skills", i, e.target.value)} />
              <button type="button" className="remove-btn action-btn" onClick={() => removeNestedField("skills", i)}>x</button>
            </div>
          ))}
        </div>

        <div className="form-section ">
          <div className="section-header">
            <h2>Experience</h2>
            <button type="button" className="add-btn " onClick={() => addNestedField("experiences", { company: "", position: "", duration: "", description: "" })}>+</button>
          </div>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="nested-group">
              <input className="glass-input" placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange("experiences", i, "company", e.target.value)} />
              <div className="grid-2">
                <input className="glass-input" placeholder="Position" value={exp.position} onChange={(e) => handleNestedChange("experiences", i, "position", e.target.value)} />
                <input className="glass-input" placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange("experiences", i, "duration", e.target.value)} />
              </div>
              <textarea className="glass-input" placeholder="Description" value={exp.description} onChange={(e) => handleNestedChange("experiences", i, "description", e.target.value)} />
              <button type="button" className="remove-btn full-width action-btn" onClick={() => removeNestedField("experiences", i)}>Remove Entry</button>
            </div>
          ))}
        </div>

        <div className="form-section ">
          <div className="section-header">
            <h2>Projects</h2>
            <button type="button" className="add-btn " onClick={() => addNestedField("projects", { title: "", description: "", technologies: "" })}>+</button>
          </div>
          {resume.projects.map((proj, i) => (
            <div key={i} className="nested-group">
              <input className="glass-input" placeholder="Project Title" value={proj.title} onChange={(e) => handleNestedChange("projects", i, "title", e.target.value)} />
              <input className="glass-input" placeholder="Tech Stack" value={proj.technologies} onChange={(e) => handleNestedChange("projects", i, "technologies", e.target.value)} />
              <textarea className="glass-input" placeholder="Description" value={proj.description} onChange={(e) => handleNestedChange("projects", i, "description", e.target.value)} />
              <button type="button" className="remove-btn full-width action-btn" onClick={() => removeNestedField("projects", i)}>Remove Project</button>
            </div>
          ))}
        </div>

        <div className="form-section anim-group">
          <div className="section-header">
            <h2>Internships</h2>
            <button type="button" className="add-btn action-btn" onClick={() => addNestedField("internships", { company: "", role: "", duration: "", description: "" })}>+</button>
          </div>
          {resume.internships.map((intern, i) => (
            <div key={i} className="nested-group">
              <input className="glass-input" placeholder="Company" value={intern.company} onChange={(e) => handleNestedChange("internships", i, "company", e.target.value)} />
              <div className="grid-2">
                <input className="glass-input" placeholder="Role" value={intern.role} onChange={(e) => handleNestedChange("internships", i, "role", e.target.value)} />
                <input className="glass-input" placeholder="Duration" value={intern.duration} onChange={(e) => handleNestedChange("internships", i, "duration", e.target.value)} />
              </div>
              <textarea className="glass-input" placeholder="Description" value={intern.description} onChange={(e) => handleNestedChange("internships", i, "description", e.target.value)} />
              <button type="button" className="remove-btn full-width action-btn" onClick={() => removeNestedField("internships", i)}>Remove Internship</button>
            </div>
          ))}
        </div>

        <div className="form-section anim-group">
          <div className="section-header">
            <h2>Achievements</h2>
            <button type="button" className="add-btn " onClick={() => addNestedField("achievements", "")}>+</button>
          </div>
          {resume.achievements.map((ach, i) => (
            <div key={i} className="row-control mb-2">
              <input className="glass-input" value={ach} onChange={(e) => handleArrayChange("achievements", i, e.target.value)} />
              <button type="button" className="remove-btn action-btn" onClick={() => removeNestedField("achievements", i)}>x</button>
            </div>
          ))}
        </div>

        <div className="form-section anim-group">
          <h2>Select Template</h2>
          <select className="glass-input" value={resume.selectedTemplate} name="selectedTemplate" onChange={handleChange}>
            <option value="" className="dark-option">Choose a Style...</option>
            <option value="template1" className="dark-option">Modern Minimalist</option>
            <option value="template2" className="dark-option">Professional Corp</option>
            <option value="template3" className="dark-option">Creative Developer</option>
          </select>
        </div>

        <div className="button-container anim-group">
          <button type="submit" className="submit-btn">Generate Resume</button>
        </div>

      </form>
    </div>
  );
};

export default ResumeForm;