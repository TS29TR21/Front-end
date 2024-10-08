import React, { useState } from 'react';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  // Handle input changes
  const handleFirstnameChange = (e) => setFirstname(e.target.value);
  const handleLastnameChange = (e) => setLastname(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation (add more checks as needed)
    if (password !== confirmpassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

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
    // Logic to retrieve CSRF token goes here (e.g., from a cookie)
    return document.cookie.split(';').find(item => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div>
      <header>
        <center>This is the registration page</center>
      </header>

      {/* Back Button Form */}
      <form onSubmit={() => (window.location.href = '/')}>
        <center>
          <input type="submit" value="Back" name="backButton" />
        </center>
      </form>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <table border="1" style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  onChange={handleFirstnameChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={handleLastnameChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordChange}
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" value="Register" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Register;
