import React, { useState } from 'react';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  // Handle input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle back button click
  const handleBack = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Redirect to the homepage
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
    <div>
      <header>
        <h2 style={{ textAlign: 'center' }}>FORGOT PASSWORD</h2>
      </header>

      {/* Back Button Form */}
      <form onSubmit={handleBack}>
        <div style={{ textAlign: 'center' }}>
          <input type="submit" value="Back" name="backButton" />
        </div>
      </form>

      {/* Password Reset Form */}
      <form onSubmit={handleSubmit}>
        <table border="1" style={{ margin: 'auto', marginTop: '20px' }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" name="getCode" value="Get Code" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PasswordReset;
