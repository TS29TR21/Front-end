import React, { useState } from 'react';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      alert("Please enter your email.");
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/resetPassword/deserial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // CSRF protection
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setMessage('A reset code has been sent to your email.');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to send reset code. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('An error occurred while sending the reset code.');
    }
  };

  const getCSRFToken = () => {
    // Logic to retrieve CSRF token (if necessary for your app)
    return document.cookie.split('=')[1]; // Simplified example
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Password Reset</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Send Reset Code</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
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
    width: '100%',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#ff0000',
  },
};

export default PasswordReset;
