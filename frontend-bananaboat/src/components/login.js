import React, { useState } from "react";
import PasswordReset from "./reset-password.js";
import "./style.css"; // Importing style.css

const Login = ({ onLogin }) => {
  // Manage form state
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });
  const [activeSection, setActiveSection] = useState("login");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form inputs
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

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const tokenData = {
        username: formData.username_or_email,
        password: formData.password,
      };

      const tokenResponse = await fetch("https://contained-share2teach.onrender.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokenData),
      });

      if (!tokenResponse.ok) {
        throw new Error("Invalid username or password");
      }

      const { access, refresh } = await tokenResponse.json();
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", formData.username_or_email); // Store the username

      const roleResponse = await fetch("http://contained-share2teach.onrender.com/api/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      if (!roleResponse.ok) {
        throw new Error("Failed to retrieve user role");
      }

      const { userRole } = await roleResponse.json();
      localStorage.setItem("userRole", userRole);
      onLogin({ access, refresh, userRole });
      setIsLoggedIn(true); // Update login state

    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  // Handle password reset click
  const handleForgotPasswordClick = () => {
    setActiveSection("reset-password");
  };

  // Handle back to login click
  const handleBackToLoginClick = () => {
    setActiveSection("login");
  };

  // Render the appropriate section based on activeSection
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
