import React, { useState, useEffect } from "react";
import "./style.css"; // Importing style.css
import NewPassword from "./new-password.js"; // Importing NewPassword component

const ResetPasswordCode = () => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isCodeValid, setIsCodeValid] = useState(false); // State to track code validity
  const [email, setEmail] = useState(""); // State to store email

  useEffect(() => {
    // Get the email from localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, code: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!code) {
      newErrors.code = "Verification code is required.";
    } else if (code.length !== 8) {
      newErrors.code = "Code must be exactly 8 characters long.";
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
      // Make API call to validate verification code
      const response = await fetch("http://contained-share2teach.onrender.com/api/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ code, email }), // Send both code and email
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ code: errorData.error || "An error occurred." });
        return;
      }

      const data = await response.json();
      alert(data.message); // Optional: Show success message
      setIsCodeValid(true); // Set code as valid

    } catch (error) {
      setErrors({ code: "An error occurred while validating the code." });
      console.error("Error during code validation:", error);
    }
  };

  if (isCodeValid) {
    return <NewPassword />; // Render the NewPassword component if the code is valid
  }

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
