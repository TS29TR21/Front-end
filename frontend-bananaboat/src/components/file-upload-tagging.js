import React, { useState } from "react";

const UploadTaggingResource = () => {
  // Define state variables for the form fields
  const [formData, setFormData] = useState({
    upload_file: null,
    upload_file1: null,
    upload_file2: null,
    upload_file3: null,
    resourceName: "",
    subject: "",
    grade: "",
    keywords: [],
    currentKeyword: "",
  });

  // Handle file changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle keyword input changes
  const handleKeywordInputChange = (e) => {
    setFormData({
      ...formData,
      currentKeyword: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formData.currentKeyword) {
      e.preventDefault();
      setFormData((prevState) => ({
        ...prevState,
        keywords: [...prevState.keywords, prevState.currentKeyword],
        currentKeyword: '',
      }));
    }
  };

  const removeKeyword = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      keywords: prevState.keywords.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", {
      ...formData,
      keywords: formData.keywords.join(", "),
    });
    alert("Form submitted! Check console for details.");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Upload and Tag Keywords to Resources
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <div style={styles.fileInputGroup}>
          <input type="file" name="upload_file" onChange={handleFileChange} style={styles.fileInput} />
          <input type="file" name="upload_file1" onChange={handleFileChange} style={styles.fileInput} />
          <input type="file" name="upload_file2" onChange={handleFileChange} style={styles.fileInput} />
          <input type="file" name="upload_file3" onChange={handleFileChange} style={styles.fileInput} />
        </div>
        <input
          type="text"
          placeholder="Resource Name"
          name="resourceName"
          value={formData.resourceName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="" disabled>Select Grade</option>
          {/* Grade options from 1 to 12 */}
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={`Grade ${i + 1}`}>Grade {i + 1}</option>
          ))}
          {/* Year options from 1st to 4th year */}
          {Array.from({ length: 4 }, (_, i) => (
            <option key={i + 12} value={`${i + 1}st Year`}>{i + 1}st Year</option>
          ))}
          <option value="Honours">Honours</option>
        </select>
        <div style={styles.keywordContainer}>
          Add keywords and press Enter
          {formData.keywords.map((keyword, index) => (
            <span key={index} style={styles.keywordBubble}>
              {keyword}
              <button type="button" onClick={() => removeKeyword(index)} style={styles.removeButton}>×</button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Add keyword and press Enter"
            name="currentKeyword"
            value={formData.currentKeyword}
            onChange={handleKeywordInputChange}
            onKeyDown={handleKeyDown}
            style={styles.keywordInput}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  fileInputGroup: {
    marginBottom: '15px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '15px',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '15px',
    WebkitAppearance: 'none', // Vendor prefix for WebKit browsers
    MozAppearance: 'none',    // Vendor prefix for Firefox
    appearance: 'none',       // Standard property
  },
  keywordContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  keywordBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    margin: '5px 0',
  },
  removeButton: {
    border: 'none',
    background: 'transparent',
    color: 'red',
    cursor: 'pointer',
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  keywordInput: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    WebkitTransition: 'background-color 0.3s ease', // Vendor prefix for Safari
    MozTransition: 'background-color 0.3s ease',    // Vendor prefix for Firefox
    transition: 'background-color 0.3s ease',       // Standard property
  },
};

export default UploadTaggingResource;
