import React, { useState } from "react";

// Utility function to get the CSRF token from the cookie
const getCSRFToken = () => {
  let csrfToken = null;
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    if (cookie.trim().startsWith("csrftoken=")) {
      csrfToken = cookie.split("=")[1];
    }
  });
  return csrfToken;
};

// New Password Component
const NewPassword = ({ email }) => {
  // State to hold password values and messages
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages

  // Handle password changes
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Password validation logic
  const validatePassword = () => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return false;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return false;
    }

    if (!passwordPattern.test(newPassword)) {
      setMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    }

    return true;
  };

  // Handle form submission for password change
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords before making the request
    if (!validatePassword()) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/newPassword/deserial",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(), // CSRF protection
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password has been updated successfully!");
        // Redirect to the login page after successful password reset
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setMessage(
          data.error || "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("An error occurred while updating the password.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Change Password</h1>

      {/* Display success or error message */}
      {message && <p>{message}</p>}

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={styles.input}
          />
          <input type="hidden" value={email} name="email" />
        </div>
        <button type="submit" style={styles.submitButton}>
          Change Password
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
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%", // Full width for single inputs
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default NewPassword;
