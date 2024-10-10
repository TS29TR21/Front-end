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
    <div>
      <h1 style={{ textAlign: "center" }}>
        Upload and Tag Keywords to Resources
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" align="center">
          <tbody>
            <tr>
              <td>
                <input type="file" name="upload_file" onChange={handleFileChange} />
                <br />
                <input type="file" name="upload_file1" onChange={handleFileChange} />
                <br />
                <input type="file" name="upload_file2" onChange={handleFileChange} />
                <br />
                <input type="file" name="upload_file3" onChange={handleFileChange} />
                <br />
                <input
                  type="text"
                  placeholder="Resource Name"
                  name="resourceName"
                  value={formData.resourceName}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                <br />
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
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
                <br />
              </td>
            </tr>
            <tr>
              <td>
                Add keywords and press Enter
                <div className="keyword-input-container" style={styles.keywordContainer}>
                  {formData.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-bubble" style={styles.keywordBubble}>
                      {keyword}
                      <button type="button" onClick={() => removeKeyword(index)} className="remove-button" style={styles.removeButton}>×</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add keyword and press Enter"
                    name="currentKeyword"
                    value={formData.currentKeyword}
                    onChange={handleKeywordInputChange}
                    onKeyDown={handleKeyDown}
                    className="keyword-input"
                    style={styles.keywordInput}
                  />
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" value="Submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  keywordContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '10px',
    gap: '5px',
  },
  keywordBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
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
    border: 'none',
    outline: 'none',
    flex: '1',
    padding: '5px',
  },
};

export default UploadTaggingResource;
