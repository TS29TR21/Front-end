import React, { useState } from 'react';

const ResourceReport = () => {
  const [resourceId, setResourceId] = useState('');
  const [userId, setUserId] = useState('');
  const [reportComplaint, setReportComplaint] = useState('');

  // Handle input changes
  const handleResourceIdChange = (e) => setResourceId(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handleReportComplaintChange = (e) => setReportComplaint(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      resourceId,
      userId,
      reportComplaint,
    };

    try {
      const response = await fetch('resourceReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // Adjust based on your CSRF token implementation
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert('Report submitted successfully!');
        // Optionally, clear the form or redirect
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report.');
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    return document.cookie.split(';').find(item => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div>
      <header>
        <center>This is the login page</center>
      </header>

      {/* Back Button Form */}
      <form onSubmit={() => (window.location.href = '/')}>
        <center>
          <input type="submit" value="Back" name="backButton" />
        </center>
      </form>

      {/* Resource Report Form */}
      <form onSubmit={handleSubmit}>
        <table border="1" style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Resource Id"
                  name="resourceId"
                  value={resourceId}
                  onChange={handleResourceIdChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Report User"
                  name="userId"
                  value={userId}
                  onChange={handleUserIdChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Resource Complaint"
                  name="reportComplaint"
                  value={reportComplaint}
                  onChange={handleReportComplaintChange}
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <input type="submit" name="reportBtn" value="Submit Report" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ResourceReport;
