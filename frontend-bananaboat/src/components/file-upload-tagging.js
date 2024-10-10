import React, { useState } from "react";

const UploadTaggingResource = () => {
  // Define state variables for the form fields
  const [formData, setFormData] = useState({
    upload_file: null,
    upload_file1: null,
    upload_file2: null,
    upload_file3: null,
    contributor: "",
    resourceName: "",
    subject: "",
    grade: "",
    keywords: "",
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append the form data
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // Example API call (You should replace this with your API endpoint)
    try {
      const response = await fetch("/resourceUploadTagging", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log(result);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        This is the Uploading & Tagging Resource page
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" align="center">
          <tbody>
            <tr>
              <td>
                <input
                  type="file"
                  name="upload_file"
                  onChange={handleFileChange}
                />
                <br />
                <input
                  type="file"
                  name="upload_file1"
                  onChange={handleFileChange}
                />
                <br />
                <input
                  type="file"
                  name="upload_file2"
                  onChange={handleFileChange}
                />
                <br />
                <input
                  type="file"
                  name="upload_file3"
                  onChange={handleFileChange}
                />
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
                <input
                  type="text"
                  placeholder="Grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="keywords"
                  placeholder="Keywords/Tags - CSV"
                  rows="4"
                  cols="50"
                  style={{ fontSize: "16px" }}
                  value={formData.keywords}
                  onChange={handleInputChange}
                ></textarea>
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

export default UploadTaggingResource;
