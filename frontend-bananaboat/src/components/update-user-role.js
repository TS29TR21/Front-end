import React, { useState } from "react";
import "./style.css"; // Import the CSS file

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(""); // Set initial role to empty
  const [error, setError] = useState("");

  // Handle input changes
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setError(""); // Clear error on input change
  };

  const handleRoleChange = (e) => setRole(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate userId
    if (!userId) {
      setError("User ID cannot be empty.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return; // Ensure a role is selected
    }

    const roleData = {
      user_id: userId,
      role,
    };

    try {
      const response = await fetch("updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        alert("User role updated successfully!");
        // Clear the form after successful submission
        setUserId("");
        setRole(""); // Reset to empty on successful submission
        setError(""); // Clear error on successful submission
      } else {
        alert("Failed to update user role. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("An error occurred while updating the user role.");
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Update User Role</h1>
      </header>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <input
              type="text"
              id="user_id"
              placeholder="Enter User ID"
              name="user_id"
              value={userId}
              onChange={handleUserIdChange}
              className="input" // Update to use className
            />
            {error && <p className="error">{error}</p>}{" "}
            {/* Display error message */}
          </div>

          <div className="formGroup">
            <select
              id="user_role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="select" // Update to use className
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="adminUser">Admin</option>
              <option value="moderatorUser">Moderator</option>
              <option value="educatorUser">Educator</option>
            </select>
          </div>

          <div className="formGroup">
            <button type="submit" className="submitButton">
              Update Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserRole;
