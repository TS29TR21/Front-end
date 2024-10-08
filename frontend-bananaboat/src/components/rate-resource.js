import React, { useState } from 'react';

const RateResource = () => {
  const [resourceId, setResourceId] = useState('');
  const [rating, setRating] = useState('');

  // Handle input changes
  const handleResourceIdChange = (e) => {
    setResourceId(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resourceId || !rating) {
      alert('Please fill in all fields.');
      return;
    }

    // Make sure the rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    const formData = new FormData();
    formData.append('resourceId', resourceId);
    formData.append('rating', rating);

    try {
      const response = await fetch('resourceRating', {
        method: 'POST',
        body: formData,
        headers: {
          // Include CSRF token if needed (usually with Django)
          'X-CSRFToken': getCSRFToken(), // Replace with your CSRF token retrieval logic
        },
      });

      if (response.ok) {
        alert('Rating submitted successfully!');
      } else {
        alert('Failed to submit rating.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred while submitting the rating.');
    }
  };

  // Example function to get CSRF token (customize as needed)
  const getCSRFToken = () => {
    // Logic to retrieve CSRF token goes here (e.g., from a cookie)
    return document.cookie.split(';').find((item) => item.trim().startsWith('csrftoken=')).split('=')[1];
  };

  return (
    <div>
      <h1>Rate Resource</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Resource ID"
          name="resourceId"
          value={resourceId}
          onChange={handleResourceIdChange}
        />
        <input
          type="text"
          placeholder="Rating (1-5)"
          name="rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
};

export default RateResource;
