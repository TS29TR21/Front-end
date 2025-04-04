import React, { useState, useEffect } from "react";
import GoogleAnalytics from "./GoogleAnalytics3.js"; // Import the Google Analytics component
import "./style.css";

const ModerationForm = () => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    source_id: "",
    mod_comment: "",
    mod_status: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null); // Track analytics data to send

  const API_URL = "https://share2teach.onrender.com";

  // Fetch resources from the API on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resource/deserial`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }

        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
        alert("Failed to load resources.");
      }
    };

    fetchResources();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.source_id) newErrors.source_id = "Resource ID is required.";
    if (!formData.mod_comment) newErrors.mod_comment = "Comment is required.";
    if (!formData.mod_status) newErrors.mod_status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://contained-share2teach.onrender.com/api/moderate-resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Display success message
        setFormData({ source_id: "", mod_comment: "", mod_status: "" }); // Reset form
        setSubmitted(true);

        // Prepare analytics data
        setAnalyticsData({
          page: "ModerationForm",
          userId: localStorage.getItem("userId") || "unknown",
          eventType: "form_submit",
        });

        console.log("Form submitted successfully.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to moderate resource."}`);
      }
    } catch (error) {
      console.error("Error submitting moderation:", error);
      alert("An error occurred while submitting moderation.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Moderate Resources</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <select
            name="source_id"
            value={formData.source_id}
            onChange={handleInputChange}
            className="select"
          >
            <option value="">Select Resource ID</option>
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.resource_name}
              </option>
            ))}
          </select>
          {errors.source_id && <p className="error">{errors.source_id}</p>}
        </div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Moderation Comment"
            name="mod_comment"
            value={formData.mod_comment}
            onChange={handleInputChange}
            className="input"
          />
          {errors.mod_comment && <p className="error">{errors.mod_comment}</p>}
        </div>

        <div className="inputGroup">
          <select
            name="mod_status"
            value={formData.mod_status}
            onChange={handleInputChange}
            className="select"
          >
            <option value="" disabled>
              Select Moderation Status
            </option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.mod_status && <p className="error">{errors.mod_status}</p>}
        </div>

        <div className="inputGroup">
          <button type="submit" className="submitButton">
            Submit
          </button>
        </div>
      </form>

      {submitted && analyticsData && (
        <GoogleAnalytics
          page={analyticsData.page}
          userId={analyticsData.userId}
          eventType={analyticsData.eventType}
        />
      )}
    </div>
  );
};

export default ModerationForm;
