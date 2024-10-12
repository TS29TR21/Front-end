import React, { useState } from 'react';

const VerificationCode = ({ email }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleBack = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Redirect to the homepage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!code) {
      alert("Please enter the verification code.");
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/validateCode/deserial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // CSRF protection
        },
        body: JSON.stringify({ code, email }),
      });
  
      if (response.ok) {
        setMessage('Code validated successfully!');
        // You may redirect the user to the new password page upon success
        window.location.href = '/new-password'; 
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to validate code. Please try again.');
      }
    } catch (error) {
      console.error('Error during code validation:', error);
      setMessage('An error occurred while validating the code.');
    }
  };

  const getCSRFToken = () => {
    return document.cookie
      .split('; ')
      .find(item => item.startsWith('csrftoken='))
      ?.split('=')[1];
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verification Code</h1>
      <p style={styles.instructions}>
        A verification code has been sent to {email}. You have 5 minutes to enter the code below.
      </p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={handleCodeChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>

      <button onClick={handleBack} style={styles.backButton}>Back</button>
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
  instructions: {
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
  backButton: {
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#ff0000',
  },
};

export default VerificationCode;
