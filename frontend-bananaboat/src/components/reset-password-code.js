import React, { useState } from 'react';

const ResetPasswordCode = ({ email }) => {
  const [code, setCode] = useState('');

  // Handle input change for the verification code
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Handle form submission for code validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      alert("Please enter the verification code.");
      return;
    }

    try {
      const response = await fetch('validateCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify({ code, email }),
      });

      if (response.ok) {
        alert('Code validated successfully!');
        // Optionally, redirect or reset form if necessary
      } else {
        alert('Failed to validate code. Please try again.');
      }
    } catch (error) {
      console.error('Error during code validation:', error);
      alert('An error occurred while validating the code.');
    }
  };

  // Function to get CSRF token
  const getCSRFToken = () => {
    return document.cookie
      .split('; ')
      .find(item => item.startsWith('csrftoken='))
      ?.split('=')[1];
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>

        <p style={styles.centerText}>
          A verification code has been sent to {email}, you have 5 minutes to enter the code below.
        </p>

        {/* Code Validation Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter verification code"
              name="code"
              value={code}
              onChange={handleCodeChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input type="submit" value="Submit Code" style={styles.submitButton} />
          </div>
        </form>
      </main>
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    display: "flex",
    height: "60vh",
    width: "90vh",
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
  centerText: {
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

export default ResetPasswordCode;
