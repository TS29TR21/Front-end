import React, { useState } from "react";

const ResourceReport = () => {
  const [resourceId, setResourceId] = useState("");
  const [userId, setUserId] = useState("");
  const [reportComplaint, setReportComplaint] = useState("");
  const [errors, setErrors] = useState({}); // State for error messages

  const handleResourceIdChange = (e) => setResourceId(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleReportComplaintChange = (e) => setReportComplaint(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!resourceId) newErrors.resourceId = "Resource ID is required.";
    if (!userId) newErrors.userId = "User ID is required.";
    if (!reportComplaint) newErrors.reportComplaint = "Complaint is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are validation errors
    }

    const reportData = { resourceId, userId, reportComplaint };

    try {
      const response = await fetch("resourceReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Customize based on your CSRF token implementation
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        // Clear form fields
        setResourceId("");
        setUserId("");
        setReportComplaint("");
        setErrors({}); // Clear errors
      } else {
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  // Function to get CSRF token (adjust as needed)
  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Resource Report Form</h1>
      </header>

      {/* Resource Report Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <select
            id="resourceId"
            name="resourceId"
            value={resourceId}
            onChange={handleResourceIdChange}
            style={styles.select}
          >
            <option value="">Select Resource ID</option>
            <option value="1">Resource 1</option>
            <option value="2">Resource 2</option>
            <option value="3">Resource 3</option>
            {/* Add more options as needed */}
          </select>
          {errors.resourceId && (
            <p style={styles.errorMessage}>{errors.resourceId}</p>
          )}
        </div>

        <div style={styles.formGroup}>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
            style={styles.input}
            placeholder="Enter User ID"
          />
          {errors.userId && <p style={styles.errorMessage}>{errors.userId}</p>}
        </div>

        <div style={styles.formGroup}>
          <textarea
            id="reportComplaint"
            name="reportComplaint"
            value={reportComplaint}
            onChange={handleReportComplaintChange}
            style={styles.textarea}
            placeholder="Enter your complaint"
          />
          {errors.reportComplaint && (
            <p style={styles.errorMessage}>{errors.reportComplaint}</p>
          )}
        </div>

        <div style={styles.submitButtonWrapper}>
          <button type="submit" style={styles.submitButton}>
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

// Styles for the page and form
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    minHeight: "100px",
  },
  submitButtonWrapper: {
    textAlign: "center",
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
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default ResourceReport;
