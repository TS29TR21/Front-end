import React, { useState } from "react";

// Register Component
const Register = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // State variable for messages (optional)
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/deserial", {
        // Adjust the URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // const data = await response.json(); // Parse JSON response
        setMessage("Registration successful! Please log in.");
        // Optionally, redirect to a login page or reset the form
      } else {
        const data = await response.json(); // Parse JSON error response
        setMessage(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred while registering.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      {message && <p style={styles.message}>{message}</p>}{" "}
      {/* Display messages */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "48%",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default Register;
