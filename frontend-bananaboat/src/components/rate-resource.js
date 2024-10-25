import React, { useState } from "react";

const RateResource = () => {
  const [resourceId, setResourceId] = useState("");
  const [rating, setRating] = useState("");
  const [ratedResources, setRatedResources] = useState([]);
  const [errors, setErrors] = useState({}); // State for validation errors

  // Example resource list (replace with your actual resources)
  const resources = [
    { id: "1", name: "Resource 1" },
    { id: "2", name: "Resource 2" },
    { id: "3", name: "Resource 3" },
    { id: "4", name: "Resource 4" },
    { id: "5", name: "Resource 5" },
  ];

  // Handle input changes
  const handleResourceIdChange = (e) => {
    setResourceId(e.target.value);
    setErrors((prev) => ({ ...prev, resourceId: "" })); // Clear error
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setErrors((prev) => ({ ...prev, rating: "" })); // Clear error
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation checks
    if (!resourceId) {
      newErrors.resourceId = "Please select a resource.";
    }
    if (!rating) {
      newErrors.rating = "Please select a rating.";
    } else if (rating < 1 || rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }

    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("resourceId", resourceId);
    formData.append("rating", rating);

    try {
      const response = await fetch("resourceRating", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });

      if (response.ok) {
        alert("Rating submitted successfully!");
        // Update the rated resources list
        setRatedResources([...ratedResources, { id: resourceId, rating }]);
        // Clear input fields
        setResourceId("");
        setRating("");
      } else {
        alert("Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating.");
    }
  };

  // Example function to get CSRF token
  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Rate Resources</h1>

      <div style={styles.flexContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <select
              name="resourceId"
              value={resourceId}
              onChange={handleResourceIdChange}
              style={styles.input}
            >
              <option value="" disabled>
                Select a resource
              </option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name}
                </option>
              ))}
            </select>
            {errors.resourceId && (
              <p style={styles.error}>{errors.resourceId}</p>
            )}
          </div>
          <div style={styles.inputGroup}>
            <select
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              style={styles.input}
            >
              <option value="" disabled>
                Select a rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {errors.rating && <p style={styles.error}>{errors.rating}</p>}
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit Rating
          </button>
        </form>

        <div style={styles.ratedResourcesContainer}>
          <h2 style={styles.subTitle}>Rated Resources</h2>
          {ratedResources.length === 0 ? (
            <p>No resources rated</p>
          ) : (
            <ul style={styles.ratedResourcesList}>
              {ratedResources.map((resource, index) => (
                <li key={index} style={styles.resourceItem}>
                  <strong>Resource ID:</strong> {resource.id},{" "}
                  <strong>Rating:</strong> {resource.rating}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
    flex: 1,
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  ratedResourcesContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    flex: 1,
    boxSizing: "border-box",
  },
  subTitle: {
    marginBottom: "10px",
  },
  ratedResourcesList: {
    listStyleType: "none",
    padding: "0",
  },
  resourceItem: {
    padding: "5px 0",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "5px 0 0 0",
  },
};

export default RateResource;
