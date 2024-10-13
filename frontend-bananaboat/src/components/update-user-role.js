import React, { useState, useEffect } from "react";

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("adminUser");
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user list from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/deserial"); // Update with your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data); // Set fetched users
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Could not load users. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  // Handle form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      user_id: userId,
      role,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/deserial`, {
        method: "PUT", // Use PUT to update the user role
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
      } else {
        const errorMessage = await response.json();
        alert(`Failed to update user role. Error: ${errorMessage.message}`);
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
        {isLoading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="user_id" style={styles.label}>
                User ID
              </label>
              <select
                id="user_id"
                name="user_id"
                value={userId}
                onChange={handleUserIdChange}
                style={styles.select}
              >
                <option value="">Select User ID</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.id} - {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="user_role" style={styles.label}>
                Role
              </label>
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
        )}
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
    textAlign: "center",
  },
};

export default UpdateUserRole;
