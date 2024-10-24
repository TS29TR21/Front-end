import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const PasswordReset = ({ handleBackToLoginClick }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const [success, setSuccess] = useState(""); // To handle success messages

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission (Get Code button)
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    console.log("Email for password reset:", email);
    
    // Logic for handling password reset request
    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset-password/", { // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset code. Please try again.");
      }

      const data = await response.json();
      setSuccess(data.message); // Assuming the API returns a success message
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Password Reset</h1>
        </header>

        <form onSubmit={handleResetSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              style={styles.input}
              required // Ensure input is required
            />
          </div>
          <div style={styles.formGroup}>
            <Link to="/reset-code" style={styles.linkButton}>
              Get Code
            </Link>
          </div>
          {error && <p style={styles.errorMessage}>{error}</p>} {/* Show error messages */}
          {success && <p style={styles.successMessage}>{success}</p>} {/* Show success messages */}
        </form>

        {/* Navigate to the ResetPasswordCode component using Link */}
        {success && (
          <Link to="/reset-code" style={styles.linkButton}>
            Go to Reset Code
          </Link>
        )}

        {/* Back to Login button */}
        <Link to="/login-page" style={styles.backLink}>
          Back
        </Link>
      </main>
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    display: "flex",
    height: "60vh",
    width: "100vh",
    backgroundColor: "#f4f4f4",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflowY: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  header: {
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
  linkButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none", // Styling to make it look like a button
    textAlign: "center",
    display: "block",
    marginTop: "10px",
  },
  backLink: {
    textDecoration: "none",
    color: "#4CAF50",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
  successMessage: {
    color: "green",
    marginTop: "10px",
  },
};

export default PasswordReset;
