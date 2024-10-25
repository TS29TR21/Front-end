import React, { useState } from "react";

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("adminUser");
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
        setRole("adminUser");
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Update User Role</h1>
      </header>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              id="user_id"
              placeholder="Enter User ID"
              name="user_id"
              value={userId}
              onChange={handleUserIdChange}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}{" "}
            {/* Display error message */}
          </div>

          <div style={styles.formGroup}>
            <select
              id="user_role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              style={styles.select}
            >
              <option value="adminUser">Admin</option>
              <option value="moderatorUser">Moderator</option>
              <option value="educatorUser">Educator</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <button type="submit" style={styles.submitButton}>
              Update Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styling for the page
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "border-color 0.3s",
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box", // Firefox
    boxSizing: "border-box", // Standard
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default UpdateUserRole;
