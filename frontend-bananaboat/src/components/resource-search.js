import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const ResourceSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [allResources, setAllResources] = useState([]); // Store all resources
  const [filteredResources, setFilteredResources] = useState([]); // Store filtered resources

  // Fetch resources from the API on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://contained-share2teach.onrender.com/api/resource/deserial"
        ); // API endpoint
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        
        // Filter to include only approved resources
        const approvedResources = data.filter(resource => resource.approval_status === "approved");
        setAllResources(approvedResources); // Set the fetched approved resources
        setFilteredResources(approvedResources); // Initialize filtered resources
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  // Handle input changes
  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    setKeywords(value);

    // Filter resources based on the search input
    const filtered = allResources.filter((resource) => {
      const resourceKeywords = resource.keywords.toLowerCase();
      return (
        resource.resource_name.toLowerCase().includes(value.toLowerCase()) ||
        resourceKeywords
          .split(",")
          .some((keyword) => keyword.trim().includes(value.toLowerCase()))
      );
    });

    setFilteredResources(filtered); // Update filtered resources
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="searchForm">
        <label htmlFor="keywords" className="label">
          Keywords:
        </label>
        <input
          type="text"
          name="keywords"
          id="keywords"
          placeholder="Search for resources based on keywords"
          value={keywords}
          onChange={handleKeywordsChange}
          className="searchInput" // Update to use className
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
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default ResourceSearch;
