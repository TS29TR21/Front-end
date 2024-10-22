import React, { useState } from 'react';

// Register Component
const Register = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

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
      const response = await fetch('register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        // Redirect or reset form if necessary
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while registering.');
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie.split(';').find(item => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
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
        <button type="submit" style={styles.submitButton}>Register</button>
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
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px', // Margin between input groups
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '48%', // Reduced width to allow two inputs side by side
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

export default Register;
