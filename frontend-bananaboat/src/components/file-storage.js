import React, { useState } from "react";

const FileStorage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please upload a smaller file.");
        setSelectedFile(null);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a .jpg, .png, or .pdf file.");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("upload_file", selectedFile);

    fetch("/fileStorage", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus("File uploaded successfully.");
        setUploadProgress(100);
        console.log("File uploaded successfully:", data);
      })
      .catch((error) => {
        setUploadStatus("Error uploading file. Please try again.");
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div>
      <center>
        <header>
          <h1>This is the Upload File page</h1>
        </header>
      </center>
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

      {uploadProgress > 0 && (
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${uploadProgress}%` }} />
        </div>
      )}

      {uploadStatus && (
        <p
          style={
            uploadStatus === "File uploaded successfully."
              ? styles.success
              : styles.error
          }
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

// Styling for the progress bar and status messages
const styles = {
  progressWrapper: {
    width: "50%",
    backgroundColor: "#e0e0e0",
    height: "10px",
    borderRadius: "5px",
    margin: "10px auto",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: "5px",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default FileStorage;
