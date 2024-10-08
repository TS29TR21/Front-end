import React, { useState } from "react";

const FileUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    try {
      const response = await fetch("pdfConversion", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <header>
        <center>This is the Upload File page</center>
      </header>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" style={{ margin: "auto" }}>
          <tbody>
            {/* File Upload Input */}
            <tr>
              <td>
                <input
                  type="file"
                  placeholder="Upload File"
                  name="pdfFile"
                  onChange={handleFileChange}
                />
              </td>
            </tr>
            {/* Submit Button */}
            <tr>
              <td align="center">
                <input type="submit" name="Submit" value="Upload" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FileUpload;
