import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumeTemplate1 from "./components/templates/ResumeTemplate1";
import ResumeTemplate2 from "./components/templates/ResumeTemplate2";
import ResumeTemplate3 from "./components/templates/ResumeTemplate3";
import SpinLoading from "./components/SpinLoading";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

  const handleGenerateResume = async (resumeData) => {
    setLoading(true);
    setGeneratedResume(null);

    try {
      const res = await fetch("http://localhost:8080/resume/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const data = await res.json();
      setGeneratedResume(data);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Something went wrong! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    if (!generatedResume) return null;
    switch (generatedResume.selectedTemplate) {
      case "template1":
        return <ResumeTemplate1 resume={generatedResume} />;
      case "template2":
        return <ResumeTemplate2 resume={generatedResume} />;
      case "template3":
        return <ResumeTemplate3 resume={generatedResume} />;
      default:
        return <ResumeTemplate1 resume={generatedResume} />;
    }
  };

  return (
    <div className="app-container">
      {loading && <SpinLoading />}

      {!loading && !generatedResume && (
        <ResumeForm onSubmit={handleGenerateResume} />
      )}

      {!loading && generatedResume && renderTemplate()}
    </div>
  );
}

export default App;
