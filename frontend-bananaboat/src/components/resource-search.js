import React, { useState } from "react";

const ResourceSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [resources, setResources] = useState([]);

  // Static list of resources
  const allResources = [
    { id: 1, resource_name: "Math Basics", subject: "Math", grade: "Grade 5" },
    { id: 2, resource_name: "Science Fundamentals", subject: "Science", grade: "Grade 6" },
    { id: 3, resource_name: "History Overview", subject: "History", grade: "Grade 7" },
    // Add more resources as needed
  ];

  // Handle input changes
  const handleKeywordsChange = (e) => setKeywords(e.target.value);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResources = allResources.filter(resource =>
      resource.resource_name.toLowerCase().includes(keywords.toLowerCase())
    );
    setResources(filteredResources);
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <label htmlFor="keywords" style={styles.label}>Keywords:</label>
        <input
          type="text"
          name="keywords"
          id="keywords"
		  placeholder="Search for resources based on keywords"
          value={keywords}
          onChange={handleKeywordsChange}
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>Search</button>
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

// Styles for the search section
const styles = {
  searchForm: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  label: {
    marginRight: "10px",
    alignSelf: "center",
  },
  searchInput: {
    padding: "10px",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  searchButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ResourceSearch;
