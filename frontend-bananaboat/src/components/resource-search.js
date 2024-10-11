import React, { useState, useEffect } from "react";

const ResourceSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [allResources, setAllResources] = useState([]); // Store all resources
  const [filteredResources, setFilteredResources] = useState([]); // Store filtered resources

  // Fetch resources from the API on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/resource/deserial'); // API endpoint
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setAllResources(data); // Set the fetched resources
        setFilteredResources(data); // Initialize filtered resources
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  // Handle input changes
  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    setKeywords(value);

    // Filter resources based on the search input
    const filtered = allResources.filter(resource => {
      const resourceKeywords = resource.keywords.toLowerCase();
      return (
        resource.resource_name.toLowerCase().includes(value.toLowerCase()) ||
        resourceKeywords.split(',').some(keyword => keyword.trim().includes(value.toLowerCase()))
      );
    });
    
    setFilteredResources(filtered); // Update filtered resources
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} style={styles.searchForm}>
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
      </form>

      <h2>Search Results:</h2>
      <ul>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
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
};

export default ResourceSearch;
