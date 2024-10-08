import React, { useState } from "react";

const ChangePassword = ({ email }) => {
  // State to hold password values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle password changes
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission for password change
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    // Logic to handle password change
    console.log("Change Password submitted with:", {
      email,
      newPassword,
      confirmPassword,
    });

    // Add your API call logic here to change the password
  };

  // Handle back button click
  const handleBackButtonClick = () => {
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div>
      <header>
        <center>This is the Change Password page</center>
      </header>

      {/* Back Button Form */}
      <form onSubmit={handleBackButtonClick}>
        <center>
          <input type="submit" value="Back" name="backButton" />
        </center>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handleChangePasswordSubmit}>
        <table border="1" style={{ margin: "auto" }}>
          <tbody>
            {/* New Password Input */}
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </td>
            </tr>
            {/* Confirm Password Input */}
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <input type="hidden" value={email} name="email" />
              </td>
            </tr>
            {/* Submit Button */}
            <tr>
              <td align="center">
                <input type="submit" name="newPasswordBtn" value="Change Password" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ChangePassword;
