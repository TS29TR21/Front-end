import React, { useState } from 'react';

const ReportResource = ({ email }) => {
  const [code, setCode] = useState('');

  // Handle input change for the verification code
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Handle back button click
  const handleBack = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Redirect to the homepage
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
    <div>
      <header>
        <h2 style={{ textAlign: 'center' }}>Report Resource</h2>
      </header>

      {/* Back Button Form */}
      <form onSubmit={handleBack}>
        <div style={{ textAlign: 'center' }}>
          <input type="submit" value="Back" name="backButton" />
        </div>
      </form>

      <center>
        A verification code has been sent to {email}, you have 5 minutes to enter the code below.
      </center>

      {/* Code Validation Form */}
      <form onSubmit={handleSubmit}>
        <table border="1" style={{ margin: 'auto', marginTop: '20px' }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Enter verification code here"
                  name="code"
                  value={code}
                  onChange={handleCodeChange}
                  required
                />
                <input type="hidden" value={email} name="email" />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" name="submitCode" value="Submit Code" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ReportResource;
