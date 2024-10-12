import React, { useState, useEffect } from "react";

const ResourceReport = () => {
  const [resourceId, setResourceId] = useState("");
  const [userId, setUserId] = useState("");
  const [reportComplaint, setReportComplaint] = useState("");
  const [resources, setResources] = useState([]); // State to hold the fetched resources
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch resource IDs from the API when the component mounts
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/resource/deserial"
        ); // Update with your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data); // Set fetched resources
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError("Could not load resources. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchResources();
  }, []);

  // Handle input changes
  const handleResourceIdChange = (e) => setResourceId(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleReportComplaintChange = (e) => setReportComplaint(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      resource_id: resourceId,
      user_id: userId,
      complaint: reportComplaint,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/report/deserial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportData),
        }
      );

      if (response.ok) {
        alert("Report submitted successfully!");
        setResourceId(""); // Clear form fields after successful submission
        setUserId("");
        setReportComplaint("");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to submit report: ${errorData.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Resource Report Form</h1>
      </header>

      {isLoading ? (
        <p>Loading resources...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="resourceId" style={styles.label}>
              Resource ID:
            </label>
            <select
              id="resourceId"
              name="resourceId"
              value={resourceId}
              onChange={handleResourceIdChange}
              style={styles.select}
            >
              <option value="">Select Resource ID</option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.id}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="userId" style={styles.label}>
              Report User:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={handleUserIdChange}
              style={styles.input}
              placeholder="Enter User ID"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="reportComplaint" style={styles.label}>
              Complaint:
            </label>
            <textarea
              id="reportComplaint"
              name="reportComplaint"
              value={reportComplaint}
              onChange={handleReportComplaintChange}
              style={styles.textarea}
              placeholder="Enter your complaint"
            />
          </div>

          <div style={styles.submitButtonWrapper}>
            <button type="submit" style={styles.submitButton}>
              Submit Report
            </button>
          </div>
        </form>
      )}
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
    border: "1px solid ",
    borderRadius: "4px",
    fontSize: "14px",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid ",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid ",
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
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default ResourceReport;
