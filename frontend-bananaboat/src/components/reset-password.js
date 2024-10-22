import React, { useState } from 'react';

// Password Reset Component
const PasswordReset = () => {
  const [email, setEmail] = useState('');

  // Handle input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission for password reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation (e.g., check for empty email)
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('A reset code has been sent to your email.');
        // Optionally, redirect or reset form if necessary
      } else {
        alert('Failed to send reset code. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('An error occurred while sending the reset code.');
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
    <div style={styles.container}>
      <h1 style={styles.title}>Password Reset</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Get Code</button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '900px', // Increased width for more horizontal space
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    WebkitBoxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Safari
    MozBoxShadow: '0 2px 4px rgba(0,0,0,0.1)',    // Firefox
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
    marginBottom: '15px', // Margin between input groups
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%', // Full width for the input
    WebkitBoxSizing: 'border-box', // Safari
    MozBoxSizing: 'border-box',    // Firefox
    boxSizing: 'border-box',       // Standard
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    WebkitTransition: 'background-color 0.3s ease', // Safari
    MozTransition: 'background-color 0.3s ease',    // Firefox
    transition: 'background-color 0.3s ease',       // Standard
  },
};

export default PasswordReset;
