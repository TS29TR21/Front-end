import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ResetPasswordCode = ({ email }) => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate(); // Initialize navigate

  // Handle input change for the verification code
  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, code: "" })); // Clear errors when input changes
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Check if code is empty
    if (!code) {
      newErrors.code = "Verification code is required.";
    } else if (!/^\d{6}$/.test(code)) {
      // Assuming the verification code is a 6-digit number
      newErrors.code = "Code must be a 6-digit number.";
    }

    return newErrors;
  };

  // Handle form submission for code validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Display validation errors
      return;
    }

    try {
      const response = await fetch("validateCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify({ code, email }),
      });

      if (response.ok) {
        alert("Code validated successfully!");
        navigate("/new-password-page"); // Navigate to NewPassword component
      } else {
        alert("Failed to validate code. Please try again.");
      }
    } catch (error) {
      console.error("Error during code validation:", error);
      alert("An error occurred while validating the code.");
    }
  };

  // Function to get CSRF token
  const getCSRFToken = () => {
    return document.cookie
      .split("; ")
      .find((item) => item.startsWith("csrftoken="))
      ?.split("=")[1];
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <p style={styles.centerText}>
          A verification code has been sent to {email}, you have 5 minutes to
          enter the code below.
        </p>

        {/* Code Validation Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter verification code"
              name="code"
              value={code}
              onChange={handleCodeChange}
              required
              style={styles.input}
            />
            {errors.code && <p style={styles.errorText}>{errors.code}</p>}
          </div>
          <div style={styles.formGroup}>
            <input
              type="submit"
              value="Submit Code"
              style={styles.submitButton}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    display: "flex",
    height: "60vh",
    width: "90vh",
    backgroundColor: "#f4f4f4",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
  },
  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
};

export default ResetPasswordCode;
