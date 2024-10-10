import React, { useState } from "react";

// New Password Component
const NewPassword = ({ email }) => {
  // State to hold password values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle password changes
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission for password change
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic to handle password change
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Change Password submitted with:", {
      email,
      newPassword,
      confirmPassword,
    });

    // Add your API call logic here to change the password
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Change Password</h1>

      {/* Change Password Form */}
      <form onSubmit={handleChangePasswordSubmit} style={styles.form}>
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
        <button type="submit" style={styles.submitButton}>Change Password</button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%', // Full width for single inputs
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '10px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NewPassword;
