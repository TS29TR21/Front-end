import React, { useState } from "react";
import "./style.css"; // Import the CSS file

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
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/newPassword/deserial",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password has been updated successfully!");
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
    <div className="container">
      <h1 className="title">Change Password</h1>

      {/* Display success or error message */}
      {message && <p>{message}</p>}

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="input"
          />
          <input type="hidden" value={email} name="email" />
        </div>
        <button type="submit" className="submit-button">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
