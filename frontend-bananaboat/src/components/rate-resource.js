import React, { useState } from "react";
import "./style.css"; // Import the CSS file

const RateResource = () => {
  const [resourceId, setResourceId] = useState("");
  const [rating, setRating] = useState("");
  const [ratedResources, setRatedResources] = useState([]);
  const [errors, setErrors] = useState({});

  const resources = [
    { id: "1", name: "Resource 1" },
    { id: "2", name: "Resource 2" },
    { id: "3", name: "Resource 3" },
    { id: "4", name: "Resource 4" },
    { id: "5", name: "Resource 5" },
  ];

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
        setRatedResources([...ratedResources, { id: resourceId, rating }]);
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

  const getCSRFToken = () => {
    return document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("csrftoken="))
      .split("=")[1];
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
                  {resource.name}
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
