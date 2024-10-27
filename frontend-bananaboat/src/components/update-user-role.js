import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(""); // Set initial role to empty
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]); // State for storing users
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/deserial", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Use the correct access token key
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data); // Store the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle input changes
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setError(""); // Clear error on input change
  };

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

    const userRole = localStorage.getItem("userRole"); // Get user role from local storage

    const roleData = {
      user_id: userId, // Ensure the correct userId is being sent
      role: userRole,   // Use the role from local storage
    };

    // Log the userId to the console
    console.log("Submitting userId:", userId); // Log the userId for debugging

    try {
      const response = await fetch("http://127.0.0.1:8000/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Add the authorization header
        },
        body: JSON.stringify(roleData), // Send data as JSON
      });

      // Log the response for debugging
      console.log("Update Role Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user role.");
      }

      alert("User role updated successfully!");
      // Clear the form after successful submission
      setUserId(""); // Reset userId on successful submission
      setRole("");   // Reset role to empty on successful submission
      setError("");  // Clear error on successful submission
    } catch (error) {
      console.error("Error updating user role:", error);
      alert(error.message || "An unexpected error occurred.");
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Update User Role</h1>
      </header>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Search Users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="searchInput"
        />
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <select
              id="user_id"
              name="user_id"
              value={userId}
              onChange={handleUserIdChange}
              className="select"
            >
              <option value="" disabled>
                Select User
              </option>
              {filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id} - {user.username}
                </option>
              ))}
            </select>
            {error && <p className="error">{error}</p>} {/* Display error message */}
          </div>

          <div className="formGroup">
            <select
              id="user_role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="select"
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
