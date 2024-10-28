import React, { useState } from "react";
import ResetPasswordCode from "./reset-password-code.js"; // Import the reset password code component
import "./style.css"; // Import the CSS file

const PasswordReset = ({ handleBackToLoginClick }) => {
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("reset-password");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error message on input change
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Validate email before proceeding
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Make API call to reset password
      const response = await fetch("https://contained-share2teach.onrender.com/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }), // Use URLSearchParams for form-urlencoded data
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "An error occurred.");
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);

      // Save the email to localStorage
      localStorage.setItem("resetEmail", email);

      setActiveSection("reset-password-code");

    } catch (error) {
      setErrorMessage("An error occurred while sending the verification code.");
      console.error("Error during password reset:", error);
    }
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
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <div className="form-group">
            <input type="submit" value="Get Code" className="submit-button" />
          </div>
        </form>
      );
    } else if (activeSection === "reset-password-code") {
      return <ResetPasswordCode />; // Handle the next step after success
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
