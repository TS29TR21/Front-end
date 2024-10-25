import React, { useState } from "react";
import PasswordReset from "./reset-password.js";

const Login = ({ onLogin }) => {
  // Sample users
  const sampleUsers = [
    { username_or_email: "openuser", password: "pass123", role: "openUser" },
    { username_or_email: "educator", password: "pass123", role: "educator" },
    { username_or_email: "moderator", password: "pass123", role: "moderator" },
    { username_or_email: "admin", password: "pass123", role: "administrator" },
  ];
  
  // Manage form state
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const [activeSection, setActiveSection] = useState("login");
  const [errors, setErrors] = useState({}); // State to manage validation errors
  const [error, setError] = useState(""); // To handle server error messages

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors when input changes
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    const { username_or_email, password } = formData;

    // Check if username or email is empty
    if (!username_or_email) {
      newErrors.username_or_email = "Username or Email is required.";
    }

    // Check if password is empty
    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  // Handle form submission (login button)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }

    // Logic for handling login action
    /*try {
      const response = await fetch("http://127.0.0.1:8000/api/user/deserial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      onLogin(data); // Call the parent component's onLogin method with user data
      console.log("Logged in successfully:", data);
    } catch (err) {
      setError(err.message); // Set error from server
    }*/
   // Find a matching user from sample users
   const matchedUser = sampleUsers.find(
    (user) =>
      user.username_or_email === formData.username_or_email &&
      user.password === formData.password
    );

    if (matchedUser) {
      onLogin(matchedUser); // Call the parent component's onLogin method with the matched user data
      console.log("Logged in successfully:", matchedUser);
    } else {
      setError("Login failed. Please check your credentials.");
    }
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
            {errors.username_or_email && (
              <p style={styles.errorText}>{errors.username_or_email}</p>
            )}
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
            {errors.password && (
              <p style={styles.errorText}>{errors.password}</p>
            )}
          </div>
          <div style={styles.formGroup}>
            <input type="submit" value="Login" style={styles.submitButton} />
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
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
    backgroundColor: "#f4f4f4",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    WebkitBoxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Safari
    MozBoxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Firefox
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Standard property
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box", // Firefox
    boxSizing: "border-box", // Standard property
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
    MozTransition: "background-color 0.3s ease", // Firefox
    transition: "background-color 0.3s ease", // Standard property
  },
  forgotPassword: {
    textDecoration: "none",
    color: "#4CAF50",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
};

export default Login;
