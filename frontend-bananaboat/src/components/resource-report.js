import React, { useState, useEffect } from "react";
import "./styles/resource-report.css"; // Importing style.css

const ResourceReport = () => {
  const [resourceId, setResourceId] = useState("");
  const [reportComplaint, setReportComplaint] = useState("");
  const [errors, setErrors] = useState({});
  const [resources, setResources] = useState([]); // State for storing resources

  const API_URL = "https://share2teach.onrender.com";

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resource/deserial`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Add authorization if needed
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }

        const data = await response.json();
        setResources(data); // Store the fetched resources
      } catch (error) {
        console.error("Error fetching resources:", error);
        alert("Failed to load resources.");
      }
    };

    fetchResources();
  }, []);

  const handleResourceIdChange = (e) => setResourceId(e.target.value);
  const handleReportComplaintChange = (e) => setReportComplaint(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!resourceId) newErrors.resourceId = "Resource ID is required.";
    if (!reportComplaint) newErrors.reportComplaint = "Complaint is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reportData = { resourceId, reportComplaint }; // Removed userId

    try {
      const response = await fetch(`${API_URL}/api/report-resource`, { // Adjusted URL to your report endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Send authorization token
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        setResourceId("");
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
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.resource_name} {/* Display the resource name */}
              </option>
            ))}
          </select>
          {errors.resourceId && (
            <p className="error-message">{errors.resourceId}</p>
          )}
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
