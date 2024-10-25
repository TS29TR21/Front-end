import React, { useState } from "react";
import "./style.css"; // Import your CSS file here

const UploadTaggingResource = () => {
  const [formData, setFormData] = useState({
    uploadFiles: [],
    resourceName: "",
    subject: "",
    grade: "",
    keywords: [],
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
    setErrors((prev) => ({ ...prev, file: "" }));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const addKeyword = () => {
    if (formData.currentKeyword) {
      setFormData((prevState) => ({
        ...prevState,
        keywords: [...prevState.keywords, formData.currentKeyword],
        currentKeyword: "",
      }));
      setErrors((prev) => ({ ...prev, currentKeyword: "" }));
    }
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
    if (formData.keywords.length === 0) {
      newErrors.currentKeyword = "At least one keyword is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const keywordsCSV = formData.keywords.join(", ");
    console.log("Form Data:", { ...formData, keywords: keywordsCSV });
    alert("Form submitted! Check console for details.");
    setIsSubmitted(true);
  };

  const removeFile = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      uploadFiles: prevState.uploadFiles.filter((_, i) => i !== index),
    }));
  };

  const removeKeyword = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      keywords: prevState.keywords.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container">
      <h1 className="title">Upload and Tag Keywords to Resources</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form"
      >
        <div className="fileInputGroup">
          <input
            type="file"
            multiple
            accept=".jpg,.png,.pdf,.docx"
            onChange={handleFileChange}
            className="fileInput"
          />
          {errors.file && <p className="error">{errors.file}</p>}
          <div className="uploadedFiles">
            {formData.uploadFiles.map((file, index) => (
              <div key={index} className="fileItem">
                {file.name}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="removeButton"
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
          className="input"
        />
        {errors.resourceName && <p className="error">{errors.resourceName}</p>}
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="input"
        />
        {errors.subject && <p className="error">{errors.subject}</p>}
        <select
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          className="select"
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
        {errors.grade && <p className="error">{errors.grade}</p>}
        <div className="keywordContainer">
          <input
            type="text"
            placeholder="Add keyword"
            name="currentKeyword"
            value={formData.currentKeyword}
            onChange={handleInputChange}
            className="keywordInput"
          />
          <button type="button" onClick={addKeyword} className="addButton">
            Add
          </button>
        </div>
        {errors.currentKeyword && (
          <p className="error">{errors.currentKeyword}</p>
        )}
        <div className="keywordsList">
          {formData.keywords.map((keyword, index) => (
            <span key={index} className="keywordItem">
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="removeButton"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      {isSubmitted && <p className="success">Form submitted successfully!</p>}
    </div>
  );
};

export default UploadTaggingResource;
