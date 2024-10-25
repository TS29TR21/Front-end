import React, { useState } from "react";

const UploadTaggingResource = () => {
  const [formData, setFormData] = useState({
    uploadFiles: [],
    resourceName: "",
    subject: "",
    grade: "",
    currentKeyword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.uploadFiles.length > 2) {
      setErrors((prev) => ({
        ...prev,
        file: "You can upload a maximum of 2 files.",
      }));
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      uploadFiles: [...prevState.uploadFiles, ...files],
    }));
    setErrors((prev) => ({ ...prev, file: "" })); // Clear error if valid
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.uploadFiles.length === 0) {
      newErrors.file = "Please upload at least one file.";
    }
    if (!formData.resourceName) {
      newErrors.resourceName = "Resource Name is required.";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.grade) {
      newErrors.grade = "Grade is required.";
    }
    if (!formData.currentKeyword) {
      newErrors.currentKeyword = "Keyword is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Log form data (you can replace this with an API call)
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for details.");
    setIsSubmitted(true);
  };

  const removeFile = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      uploadFiles: prevState.uploadFiles.filter((_, i) => i !== index),
    }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload and Tag Keywords to Resources</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={styles.form}
      >
        <div style={styles.fileInputGroup}>
          <input
            type="file"
            multiple
            accept=".jpg,.png,.pdf,.docx"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          {errors.file && <p style={styles.error}>{errors.file}</p>}
          <div style={styles.uploadedFiles}>
            {formData.uploadFiles.map((file, index) => (
              <div key={index} style={styles.fileItem}>
                {file.name}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  style={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Resource Name"
          name="resourceName"
          value={formData.resourceName}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.resourceName && (
          <p style={styles.error}>{errors.resourceName}</p>
        )}
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.subject && <p style={styles.error}>{errors.subject}</p>}
        <select
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="" disabled>
            Select Grade
          </option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={`Grade ${i + 1}`}>
              Grade {i + 1}
            </option>
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <option key={i + 12} value={`${i + 1}st Year`}>
              {i + 1}st Year
            </option>
          ))}
          <option value="Honours">Honours</option>
        </select>
        {errors.grade && <p style={styles.error}>{errors.grade}</p>}
        <div style={styles.keywordContainer}>
          <input
            type="text"
            placeholder="Add keyword"
            name="currentKeyword"
            value={formData.currentKeyword}
            onChange={handleInputChange}
            style={styles.keywordInput}
          />
        </div>
        {errors.currentKeyword && (
          <p style={styles.error}>{errors.currentKeyword}</p>
        )}
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
      {isSubmitted && (
        <p style={styles.success}>Form submitted successfully!</p>
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
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  fileInputGroup: {
    marginBottom: "15px",
  },
  fileInput: {
    marginBottom: "10px",
  },
  uploadedFiles: {
    marginTop: "10px",
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    padding: "5px",
    margin: "5px 0",
  },
  removeButton: {
    border: "none",
    background: "transparent",
    color: "red",
    cursor: "pointer",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "5px",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%", // Ensuring the select box matches the input width
    marginBottom: "5px",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
  },
  keywordContainer: {
    marginBottom: "15px",
  },
  keywordInput: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "100%",
    marginBottom: "5px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "0 0 10px 0",
  },
  success: {
    color: "green",
  },
};

export default UploadTaggingResource;
