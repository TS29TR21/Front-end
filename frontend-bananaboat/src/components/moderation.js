import React, { useState } from "react";

const ModerationForm = () => {
  // Sample list of resources
  const resources = [
    { id: "1", name: "Resource One" },
    { id: "2", name: "Resource Two" },
    { id: "3", name: "Resource Three" },
    { id: "4", name: "Resource Four" },
  ];

  // State to hold form values
  const [formData, setFormData] = useState({
    source_id: "",
    mod_comment: "",
    mod_status: "approved",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div>
      <header>
        <center>Moderate Resources</center>
      </header>

      <form onSubmit={handleSubmit} action="resourceModeration" method="POST">
        <table border="1" style={{ margin: "auto" }}>
          <tbody>
            {/* Resource ID Dropdown */}
            <tr>
              <td>
                <select
                  name="source_id"
                  value={formData.source_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Resource ID</option>
                  {resources.map((resource) => (
                    <option key={resource.id} value={resource.id}>
                      {resource.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* Moderation Comment Input */}
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Moderation Comment"
                  name="mod_comment"
                  value={formData.mod_comment}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            {/* Status Select Field */}
            <tr>
              <td>
                <select
                  id="status"
                  name="mod_status"
                  value={formData.mod_status}
                  onChange={handleInputChange}
                >
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </td>
            </tr>

            {/* Submit Button */}
            <tr>
              <td>
                <center>
                  <input type="submit" value="Submit" name="modButton" />
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ModerationForm;
