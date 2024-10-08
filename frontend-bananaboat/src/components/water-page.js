import React, { useState } from 'react';

const WatermarkPDFs = () => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('upload_file', file);

    try {
      const response = await fetch('watermarkAdd', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        // Optionally reset the file input
        setFile(null);
      } else {
        alert('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie.split(';').find(item => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div>
      <header>
        <center>This is the Watermarking/Licencing page</center>
      </header>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="file"
                  placeholder="Upload File"
                  name="upload_file"
                  onChange={handleFileChange}
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" name="Submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default WatermarkPDFs;
