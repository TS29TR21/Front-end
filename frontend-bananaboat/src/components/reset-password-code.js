import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Importing style.css

const ResetPasswordCode = ({ email }) => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, code: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!code) {
      newErrors.code = "Verification code is required.";
    } else if (code.length !== 6) {
      newErrors.code = "Code must be exactly 6 characters long.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch("validateCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ code, email }),
      });

      if (response.ok) {
        alert("Code validated successfully!");
        navigate("/new-password-page");
      } else {
        alert("Failed to validate code. Please try again.");
      }
    } catch (error) {
      console.error("Error during code validation:", error);
      alert("An error occurred while validating the code.");
    }
  };

  const getCSRFToken = () => {
    return document.cookie
      .split("; ")
      .find((item) => item.startsWith("csrftoken="))
      ?.split("=")[1];
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <p className="center-text">
          A verification code has been sent to {email}, you have 5 minutes to
          enter the code below.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter verification code"
              name="code"
              value={code}
              onChange={handleCodeChange}
              required
              className="input"
            />
            {errors.code && <p className="error-text">{errors.code}</p>}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit Code"
              className="submit-button"
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResetPasswordCode;
