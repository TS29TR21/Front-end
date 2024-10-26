import React, { useState } from "react";
import GoogleAnalytics from "./GoogleAnalytics.js";
import "./style.css";

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
    mod_status: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.source_id) newErrors.source_id = "Resource ID is required.";
    if (!formData.mod_comment) newErrors.mod_comment = "Comment is required.";
    if (!formData.mod_status) newErrors.mod_status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted with data:", formData);
    setSubmitted(true);
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
                {resource.name}
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
            <option value="rejected">Reject</option>
          </select>
          {errors.mod_status && <p className="error">{errors.mod_status}</p>}
        </div>

        <div className="inputGroup">
          <button type="submit" className="submitButton">
            Submit
          </button>
        </div>
      </form>

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

export default ModerationForm;
