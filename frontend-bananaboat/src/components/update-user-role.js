import React, { useState } from 'react';

const UpdateUserRole = () => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('adminUser');

  // Handle input changes
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      user_id: userId,
      role,
    };

    try {
      const response = await fetch('updateRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        alert('User role updated successfully!');
        // Optionally, clear the form or redirect
        setUserId('');
        setRole('adminUser'); // Reset to default role
      } else {
        alert('Failed to update user role. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('An error occurred while updating the user role.');
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie.split(';').find(item => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div>
      <header>
        <center>This Update User Role page</center>
      </header>
      <center>
        <form onSubmit={handleSubmit}>
          <p>
            User ID:
            <input
              type="text"
              placeholder="User ID"
              name="user_id"
              value={userId}
              onChange={handleUserIdChange}
            />
          </p>
          
          <p>
            Role:
            <select id="user_role" name="role" value={role} onChange={handleRoleChange}>
              <option value="adminUser">Admin</option>
              <option value="moderatorUser">Moderator</option>
              <option value="educatorUser">Educator</option>
            </select>
          </p>

          <br />
          <input type="submit" name="Update" value="Update" />
        </form>
      </center>
    </div>
  );
};

export default UpdateUserRole;
