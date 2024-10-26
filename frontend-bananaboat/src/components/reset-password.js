import React, { useState } from "react";
import ResetPasswordCode from "./reset-password-code.js"; // Import the reset password code component
import "./style.css"; // Import the CSS file

const PasswordReset = ({ handleBackToLoginClick }) => {
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("reset-password");

  const handleInputChange = (e) => setEmail(e.target.value);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    console.log("Email for password reset:", email);
    setActiveSection("reset-password-code");
  };

  const renderSectionContent = () => {
    if (activeSection === "reset-password") {
      return (
        <form onSubmit={handleResetSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Get Code" className="submit-button" />
          </div>
        </form>
      );
    } else if (activeSection === "reset-password-code") {
      return <ResetPasswordCode />;
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <header className="header">
          <h3>Password Reset</h3>
        </header>

        {renderSectionContent()}

        {activeSection === "reset-password" && (
          <button onClick={handleBackToLoginClick} className="back-button">
            Back to Login
          </button>
        )}
      </main>
    </div>
  );
};

export default PasswordReset;
