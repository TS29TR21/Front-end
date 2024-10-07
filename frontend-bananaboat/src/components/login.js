import React, { useState } from "react";

const Login = () => {
  // You can manage form state here if needed
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (back button)
  const handleBackSubmit = (e) => {
    e.preventDefault();
    // Logic for handling back action
    console.log("Back button clicked");
  };

  // Handle form submission (login button)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Logic for handling login action
    console.log("Form data:", formData);
  };

  return (
    <div>
      <header>
        <center>This is the login page</center>
      </header>

      <form onSubmit={handleBackSubmit}>
        <center>
          <input type="submit" value="Back" name="backButton" />
        </center>
      </form>

      <form onSubmit={handleLoginSubmit}>
        <table border="1" align="center">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Username or Email"
                  name="username_or_email"
                  value={formData.username_or_email}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" name="loginButton" value="Login" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <center>
        <a href="/resetPasswordPage">Forgot Password</a>
        <br />
        <br />
      </center>
    </div>
  );
};

export default Login;
