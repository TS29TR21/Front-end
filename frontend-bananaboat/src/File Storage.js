import React, { useState } from 'react';

const FileStorage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('upload_file', selectedFile);

    fetch('/fileStorage', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File uploaded successfully', data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
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
                <input type="file" name="upload_file" onChange={handleFileChange} />
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

export default FileStorage;
