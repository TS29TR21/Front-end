import React, { useState } from "react";

// Register Component
const Register = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors when user starts typing
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    const { firstname, lastname, username, email, password, confirmpassword } =
      formData;

    // Check required fields
    if (!firstname) newErrors.firstname = "First name is required.";
    if (!lastname) newErrors.lastname = "Last name is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmpassword)
      newErrors.confirmpassword = "Please confirm your password.";

    // Check if passwords match
    if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors if found
      return;
    }

    try {
      const response = await fetch("register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        // Redirect or reset form if necessary
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering.");
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.firstname && (
              <p style={styles.errorText}>{errors.firstname}</p>
            )}
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.lastname && (
              <p style={styles.errorText}>{errors.lastname}</p>
            )}
          </div>
        </div>
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.username && (
              <p style={styles.errorText}>{errors.username}</p>
            )}
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>
        </div>
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
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
          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.confirmpassword && (
              <p style={styles.errorText}>{errors.confirmpassword}</p>
            )}
          </div>
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
    WebkitBoxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Safari
    MozBoxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Firefox
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
  inputWrapper: {
    width: "48%", // Ensure each input takes 48% of the width in two-column layout
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box", // Firefox
    boxSizing: "border-box", // Standard
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    WebkitTransition: "background-color 0.3s ease", // Safari
    MozTransition: "background-color 0.3s ease", // Firefox
    transition: "background-color 0.3s ease", // Standard
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
};

export default Register;
