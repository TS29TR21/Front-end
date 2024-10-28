import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const RateResource = () => {
  const [resourceId, setResourceId] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState({});
  const [resources, setResources] = useState([]); // State for storing resources

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/resource/deserial", {
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

  const handleResourceIdChange = (e) => {
    setResourceId(e.target.value);
    setErrors((prev) => ({ ...prev, resourceId: "" }));
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!resourceId) {
      newErrors.resourceId = "Please select a resource.";
    }
    if (!rating) {
      newErrors.rating = "Please select a rating.";
    } else if (rating < 1 || rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare the data for the request
    const requestData = {
      resourceId: parseInt(resourceId, 10), // Convert resourceId to integer
      rating: parseInt(rating, 10), // Convert rating to integer
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/rate-resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Send authorization token
        },
        body: JSON.stringify(requestData), // Send resourceId and rating as JSON
      });

      if (response.ok) {
        alert("Rating submitted successfully!");
        setResourceId("");
        setRating("");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit rating: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("An error occurred while submitting the rating.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Rate Resources</h1>

      <div className="flex-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <select
              name="resourceId"
              value={resourceId}
              onChange={handleResourceIdChange}
              className="input"
            >
              <option value="" disabled>
                Select a resource
              </option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.resource_name} {/* Display resource name */}
                </option>
              ))}
            </select>
            {errors.resourceId && <p className="error">{errors.resourceId}</p>}
          </div>
          <div className="input-group">
            <select
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              className="input"
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
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>
          <button type="submit" className="submit-button">
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateResource;
