import React, { useState } from "react";
import "./style.css"; // Importing style.css

const ResourceReport = () => {
  const [resourceId, setResourceId] = useState("");
  const [userId, setUserId] = useState("");
  const [reportComplaint, setReportComplaint] = useState("");
  const [errors, setErrors] = useState({});

  const handleResourceIdChange = (e) => setResourceId(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleReportComplaintChange = (e) => setReportComplaint(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!resourceId) newErrors.resourceId = "Resource ID is required.";
    if (!userId) newErrors.userId = "User ID is required.";
    if (!reportComplaint) newErrors.reportComplaint = "Complaint is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reportData = { resourceId, userId, reportComplaint };

    try {
      const response = await fetch("resourceReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        setResourceId("");
        setUserId("");
        setReportComplaint("");
        setErrors({});
      } else {
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Resource Report Form</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <select
            id="resourceId"
            name="resourceId"
            value={resourceId}
            onChange={handleResourceIdChange}
            className="select"
          >
            <option value="">Select Resource ID</option>
            <option value="1">Resource 1</option>
            <option value="2">Resource 2</option>
            <option value="3">Resource 3</option>
          </select>
          {errors.resourceId && (
            <p className="error-message">{errors.resourceId}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
            className="input"
            placeholder="Enter User ID"
          />
          {errors.userId && <p className="error-message">{errors.userId}</p>}
        </div>

        <div className="form-group">
          <textarea
            id="reportComplaint"
            name="reportComplaint"
            value={reportComplaint}
            onChange={handleReportComplaintChange}
            className="textarea"
            placeholder="Enter your complaint"
          />
          {errors.reportComplaint && (
            <p className="error-message">{errors.reportComplaint}</p>
          )}
        </div>

        <div className="submit-button-wrapper">
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceReport;
