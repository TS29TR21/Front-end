import React, { useState } from "react";
import GoogleAnalytics from "./GoogleAnalytics.js";

const ModerationForm = () => {
  const resources = [
    { id: "1", name: "Resource One" },
    { id: "2", name: "Resource Two" },
    { id: "3", name: "Resource Three" },
    { id: "4", name: "Resource Four" },
  ];

  const [formData, setFormData] = useState({
    source_id: "",
    mod_comment: "",
    mod_status: "", // Initialize mod_status to an empty string
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // State to track submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.source_id) {
      newErrors.source_id = "Resource ID is required.";
    }
    if (!formData.mod_comment) {
      newErrors.mod_comment = "Moderation Comment is required.";
    }
    if (!formData.mod_status) {
      newErrors.mod_status = "Moderation status must be selected.";
    }

    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted with data:", formData);
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <header>
        <h1 style={styles.title}>Moderate Resources</h1>
      </header>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <select
            name="source_id"
            value={formData.source_id}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select Resource ID</option>
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}
          </select>
          {errors.source_id && <p style={styles.error}>{errors.source_id}</p>}
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Moderation Comment"
            name="mod_comment"
            value={formData.mod_comment}
            onChange={handleInputChange}
            style={styles.input}
          />
          {errors.mod_comment && (
            <p style={styles.error}>{errors.mod_comment}</p>
          )}
        </div>

        <div style={styles.inputGroup}>
          <select
            name="mod_status"
            value={formData.mod_status}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="" disabled>
              Select Moderation Status
            </option>
            <option value="approved">Approved</option>
            <option value="rejected">Reject</option>
          </select>
          {errors.mod_status && <p style={styles.error}>{errors.mod_status}</p>}
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>

      {/* Render GoogleAnalytics after form submission */}
      {submitted && (
        <GoogleAnalytics
          page="ModerationForm"
          userId="example_user_id"
          eventType="form_submit"
          duration={0}
          customParam="ModerationForm"
        />
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    WebkitBoxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Safari
    MozBoxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Firefox
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Standard
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box", // Firefox
    boxSizing: "border-box", // Standard
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    WebkitBoxSizing: "border-box", // Safari
    MozBoxSizing: "border-box", // Firefox
    boxSizing: "border-box", // Standard
  },
  buttonContainer: {
    textAlign: "center",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    WebkitTransition: "background-color 0.3s ease", // Safari
    MozTransition: "background-color 0.3s ease", // Firefox
    transition: "background-color 0.3s ease", // Standard
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "5px 0 0 0",
  },
};

export default ModerationForm;
