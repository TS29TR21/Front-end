import React, { useState } from "react";
import "./style.css"; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

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
    const { firstname, lastname, username, email, password, confirmpassword } = formData;

    if (!firstname) newErrors.firstname = "First name is required.";
    if (!lastname) newErrors.lastname = "Last name is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) newErrors.password = "Password is required.";
    if (!confirmpassword) newErrors.confirmpassword = "Please confirm your password.";
    if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const API_URL = "https://share2teach.onrender.com";
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Log the form data to the console
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        const errorData = await response.json(); // Get the error message from the response
        alert(`Registration failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <div className="formGroup">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="input"
            />
            {errors.firstname && <p className="error">{errors.firstname}</p>}
          </div>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="input"
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </div>
        </div>
        <div className="inputGroup">
          <div className="formGroup">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
        <div className="inputGroup">
          <div className="formGroup">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="formGroup">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              className="input"
            />
            {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
          </div>
        </div>
        <button type="submit" className="submitButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
