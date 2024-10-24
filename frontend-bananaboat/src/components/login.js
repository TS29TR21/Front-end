import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const [error, setError] = useState(""); // To handle error messages

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (login button)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling login action
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/deserial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      onLogin(data); // Call the parent component's onLogin method with user data
      console.log("Logged in successfully:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Login</h1>
        </header>

        {error && <div style={styles.error}>{error}</div>} {/* Display error message */}

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

        <center>
          <br />
          {/* Link to the Password Reset page */}
          <Link to="/reset-password-page" style={styles.forgotPassword}>
            Forgot Password?
          </Link>
        </center>
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
  forgotPassword: {
    textDecoration: "none",
    color: "#4CAF50",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
