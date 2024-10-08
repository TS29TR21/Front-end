import React, { useState, useEffect } from 'react';

const ResourceSearch = () => {
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [resources, setResources] = useState([]);

  // Handle input changes
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleKeywordsChange = (e) => setKeywords(e.target.value);

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`resourceSearch?subject=${subject}&keywords=${keywords}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResources(data.resources || []); // Update the resources state with the fetched data
      } else {
        alert('Failed to fetch resources. Please try again.');
      }
    } catch (error) {
      console.error('Error during resource search:', error);
      alert('An error occurred while searching for resources.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={handleSubjectChange}
        />

        <label htmlFor="keywords">Keywords:</label>
        <input
          type="text"
          name="keywords"
          id="keywords"
          value={keywords}
          onChange={handleKeywordsChange}
        />

        <button type="submit">Search</button>
      </form>

      <h2>Search Results:</h2>
      <ul>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <li key={resource.id}>
              {resource.resource_name} - {resource.subject} - {resource.grade}
            </li>
          ))
        ) : (
          <li>No resources found.</li>
        )}
      </ul>
    </div>
  );
};

export default ResourceSearch;
