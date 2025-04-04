import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = "https://share2teach.onrender.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/deserial`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setError("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID cannot be empty.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    const roleData = {
      user_id: userId,
      role: role,
    };

    try {
      const response = await fetch(`${API_URL}/api/update-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(roleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user role.");
      }

      alert("User role updated successfully!");
      setUserId("");
      setRole("");
      setError("");
    } catch (error) {
      console.error("Error updating user role:", error);
      alert(error.message || "An unexpected error occurred.");
    }
  };

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
            {error && <p className="error">{error}</p>}
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
