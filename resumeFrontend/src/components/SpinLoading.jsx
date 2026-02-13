import React from "react";
import "./SpinLoading.css";

const SpinLoading = ({ text = "Crafting your resume..." }) => {
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="loader-card">
        <div className="loader-ring">
          <div className="dot dot1" />
          <div className="dot dot2" />
          <div className="dot dot3" />
          <div className="dot dot4" />
        </div>
        <div className="loader-text">{text}</div>
      </div>
    </div>
  );
};

export default SpinLoading;
