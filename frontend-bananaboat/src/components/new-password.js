import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

// New Password Component
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const [email, setEmail] = useState(""); // State to store email

  useEffect(() => {
    // Get the email from localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

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


  const API_URL = "https://share2teach.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      // Make API call to change the password
      const response = await fetch(`${API_URL}/api/new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ newPassword, confirmPassword, email }), // Send passwords and email
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "An error occurred while changing the password.");
        return;
      }

      const data = await response.json();
      setMessage(data.message); // Display success message

      // Optionally, you can clear the email from localStorage or navigate to another page
      localStorage.removeItem("resetEmail"); // Clear email after successful password change
      // window.location.href = "/login"; // Uncomment to redirect to login page

    } catch (error) {
      setMessage("An error occurred while changing the password.");
      console.error("Error during password change:", error);
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
