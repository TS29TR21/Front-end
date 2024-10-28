import React, { useState, useEffect } from "react";
import "./style.css";

const ResourceSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [allResources, setAllResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://contained-share2teach.onrender.com/api/resource/deserial");
        if (!response.ok) throw new Error("Failed to fetch resources");
        
        const data = await response.json();
        const approvedResources = data.filter(resource => resource.approval_status === "approved");
        setAllResources(approvedResources);
        setFilteredResources(approvedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError(error.message); // Set error message
      }
    };

    fetchResources();
  }, []);

  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    setKeywords(value);

    const filtered = allResources.filter((resource) => {
      const resourceKeywords = resource.keywords.toLowerCase();
      return (
        resource.resource_name.toLowerCase().includes(value.toLowerCase()) ||
        resourceKeywords.split(",").some((keyword) => keyword.trim().includes(value.toLowerCase()))
      );
    });

    setFilteredResources(filtered);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="searchForm">
        <label htmlFor="keywords" className="label">Keywords:</label>
        <input
          type="text"
          name="keywords"
          id="keywords"
          placeholder="Search for resources based on keywords"
          value={keywords}
          onChange={handleKeywordsChange}
          className="searchInput"
        />
      </form>

      <h2>Search Results:</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <ul>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <li key={resource.id} className="resourceItem">
              <div className="resourceDetails">
                <h3>{resource.resource_name}</h3>
                <p>Subject: {resource.subject}</p>
                <p>Grade: {resource.grade}</p>
              </div>
              <div className="fileLinks">
                {resource.file_path1 && (
                  <div>
                    <h4>PDF 1:</h4>
                    <a 
                      href={`https://cpmg323-project-file-storage-django.s3.af-south-1.amazonaws.com${resource.file_path1}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="viewLink"
                    >
                      View PDF
                    </a>
                    <a 
                      href={`https://cpmg323-project-file-storage-django.s3.af-south-1.amazonaws.com${resource.file_path1}`} 
                      download
                      className="downloadLink"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
                {resource.file_path2 && (
                  <div>
                    <h4>PDF 2:</h4>
                    <a 
                      href={`https://cpmg323-project-file-storage-django.s3.af-south-1.amazonaws.com${resource.file_path2}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="viewLink"
                    >
                      View PDF
                    </a>
                    <a 
                      href={`https://cpmg323-project-file-storage-django.s3.af-south-1.amazonaws.com${resource.file_path2}`} 
                      download
                      className="downloadLink"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default ResourceSearch;
