import React, { useState } from "react";
import PasswordReset from "./reset-password.js";
import "./style.css"; // Importing style.css

const Login = ({ onLogin }) => {
  // Sample users
  const sampleUsers = [
    { username_or_email: "openuser", password: "pass123", role: "openUser" },
    { username_or_email: "educator", password: "pass123", role: "educator" },
    { username_or_email: "moderator", password: "pass123", role: "moderator" },
    { username_or_email: "admin", password: "pass123", role: "administrator" },
  ];

  // Manage form state
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const [activeSection, setActiveSection] = useState("login");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { username_or_email, password } = formData;

    if (!username_or_email) {
      newErrors.username_or_email = "Username or Email is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const matchedUser = sampleUsers.find(
      (user) =>
        user.username_or_email === formData.username_or_email &&
        user.password === formData.password
    );

    if (matchedUser) {
      onLogin(matchedUser);
      console.log("Logged in successfully:", matchedUser);
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleForgotPasswordClick = () => {
    setActiveSection("reset-password");
  };

  const handleBackToLoginClick = () => {
    setActiveSection("login");
  };

  const renderSectionContent = () => {
    if (activeSection === "login") {
      return (
        <form onSubmit={handleLoginSubmit} className="form">
          <div className="formGroup">
            <input
              type="text"
              placeholder="Username or Email"
              name="username_or_email"
              value={formData.username_or_email}
              onChange={handleInputChange}
              className="input"
            />
            {errors.username_or_email && (
              <p className="errorText">{errors.username_or_email}</p>
            )}
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
            />
            {errors.password && <p className="errorText">{errors.password}</p>}
          </div>
          <div className="formGroup">
            <input type="submit" value="Login" className="submitButton" />
          </div>
          {error && <p className="errorText">{error}</p>}
        </form>
      );
    } else if (activeSection === "reset-password") {
      return <PasswordReset handleBackToLoginClick={handleBackToLoginClick} />;
    }
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>Login</h1>
        </header>

        {/* Render login form or password reset component */}
        {renderSectionContent()}

        {activeSection === "login" && (
          <center>
            <br />
            <a
              href="#"
              onClick={handleForgotPasswordClick}
              className="forgotPassword"
            >
              Forgot Password?
            </a>
          </center>
        )}
      </main>
    </div>
  );
};

export default Login;
