import React, { useState } from "react";
import PasswordReset from "./reset-password.js";

const Login = () => {
  // Manage form state
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  // Manage section state
  const [activeSection, setActiveSection] = useState("login");

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (login button)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Logic for handling login action
    console.log("Form data:", formData);
  };

  // Function to handle navigation to password reset
  const handleForgotPasswordClick = () => {
    setActiveSection("reset-password");
  };

  // Function to handle back navigation to login
  const handleBackToLoginClick = () => {
    setActiveSection("login");
  };

  // Render content based on the active section
  const renderSectionContent = () => {
    if (activeSection === "login") {
      return (
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Username or Email"
              name="username_or_email"
              value={formData.username_or_email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="submit"
              value="Login"
              style={styles.submitButton}
            />
          </div>
        </form>
      );
    } else if (activeSection === "reset-password") {
      return <PasswordReset handleBackToLoginClick={handleBackToLoginClick} />;
    }
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Login</h1>
        </header>

        {/* Render login form or password reset component */}
        {renderSectionContent()}

        {activeSection === "login" && (
          <center>
            <br />
            <a
              href="#"
              onClick={handleForgotPasswordClick}
              style={styles.forgotPassword}
            >
              Forgot Password?
            </a>
          </center>
        )}
      </main>
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    display: "flex",
    height: "70vh",
    //padding: "20px",
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
  forgotPassword: {
    textDecoration: "none",
    color: "#4CAF50",
    cursor: "pointer",
  },
};

export default Login;
