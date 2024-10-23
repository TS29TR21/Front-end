import React, { useState } from "react";

const PasswordReset = ({ handleBackToLoginClick }) => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Logic for handling password reset
    console.log("Email for password reset:", email);
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
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="submit"
              value="Get Code"
              style={styles.submitButton}
            />
          </div>
        </form>

        {/* Back to Login button */}
        <button onClick={handleBackToLoginClick} style={styles.backButton}>
          Back to Login
        </button>
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
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    WebkitBoxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Safari
    MozBoxShadow: "0 2px 10px rgba(0,0,0,0.1)",    // Firefox
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",       // Standard property
    overflowY: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
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
    maxWidth: "600px", // Increased max width for more horizontal space
  },
  formGroup: {
    marginBottom: "20px", // Increased margin for more spacing
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box",    // Firefox
    boxSizing: "border-box",       // Standard property
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    WebkitTransition: "background-color 0.3s ease", // Safari
    MozTransition: "background-color 0.3s ease",    // Firefox
    transition: "background-color 0.3s ease",       // Standard property
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#f4f4f4",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default PasswordReset;
