import React, { useState } from "react";
import GoogleAnalytics from './GoogleAnalytics.js';

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
    mod_status: "approved",
  });

  const [submitted, setSubmitted] = useState(false); // State to track submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Track the event only after form submission
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
        </div>

        <div style={styles.inputGroup}>
          <select
            name="mod_status"
            value={formData.mod_status}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
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
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    WebkitBoxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Safari
    MozBoxShadow: '0 2px 4px rgba(0,0,0,0.1)',    // Firefox
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',       // Standard
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    WebkitBoxSizing: 'border-box', // Safari
    MozBoxSizing: 'border-box',    // Firefox
    boxSizing: 'border-box',       // Standard
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    WebkitBoxSizing: 'border-box', // Safari
    MozBoxSizing: 'border-box',    // Firefox
    boxSizing: 'border-box',       // Standard
  },
  buttonContainer: {
    textAlign: 'center',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    WebkitTransition: 'background-color 0.3s ease', // Safari
    MozTransition: 'background-color 0.3s ease',    // Firefox
    transition: 'background-color 0.3s ease',       // Standard
  },
};

export default ModerationForm;
