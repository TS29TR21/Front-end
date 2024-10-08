import React, { useState } from 'react';

const FileUploadTagging = () => {
  const [files, setFiles] = useState({
    upload_file: null,
    upload_file1: null,
    upload_file2: null,
    upload_file3: null,
  });
  const [contributor, setContributor] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('upload_file', files.upload_file);
    formData.append('upload_file1', files.upload_file1);
    formData.append('upload_file2', files.upload_file2);
    formData.append('upload_file3', files.upload_file3);
    formData.append('contributor', contributor);
    formData.append('resourceName', resourceName);
    formData.append('subject', subject);
    formData.append('grade', grade);
    formData.append('keywords', keywords);

    fetch('/resourceUploadTagging', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File and data uploaded successfully', data);
      })
      .catch((error) => {
        console.error('Error uploading file and data:', error);
      });
  };

  return (
    <div>
      <center>
        <header>
          <h1>This is the Uploading & Tagging Resource page</h1>
        </header>
      </center>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" align="center">
          <tbody>
            <tr>
              <td>
                <input type="file" name="upload_file" onChange={handleFileChange} /><br />
                <input type="file" name="upload_file1" onChange={handleFileChange} /><br />
                <input type="file" name="upload_file2" onChange={handleFileChange} /><br />
                <input type="file" name="upload_file3" onChange={handleFileChange} /><br />
                <input 
                  type
