import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const OER = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Example list of useful resources
  const resources = [
    { title: "Khan Academy", url: "https://www.khanacademy.org" },
    { title: "Coursera", url: "https://www.coursera.org" },
    { title: "edX", url: "https://www.edx.org" },
    { title: "MIT OpenCourseWare", url: "https://ocw.mit.edu" },
    { title: "OpenStax", url: "https://openstax.org" },
    { title: "GitHub Education", url: "https://education.github.com" },
    { title: "Codecademy", url: "https://www.codecademy.com" },
    { title: "Udemy", url: "https://www.udemy.com" },
    { title: "FreeCodeCamp", url: "https://www.freecodecamp.org" },
    { title: "Pluralsight", url: "https://www.pluralsight.com" },
    { title: "FutureLearn", url: "https://www.futurelearn.com" },
    { title: "LinkedIn Learning", url: "https://www.linkedin.com/learning" },
    { title: "Stanford Online", url: "https://online.stanford.edu" },
    { title: "Harvard Online", url: "https://online-learning.harvard.edu" },
  ];

  // Filter resources based on search query
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>This is the Other Useful Resources Page</h1>
        </header>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>
        </section>

        {/* Resources List */}
        <section style={styles.resourceSection}>
          {filteredResources.length > 0 ? (
            <ul style={styles.resourceList}>
              {filteredResources.map((resource, index) => (
                <li key={index} style={styles.resourceItem}>
                  <a href={resource.url} style={styles.resourceLink}>
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noResults}>No resources found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

// Styles for the page
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
    paddingBottom: "20px",
  },
  searchSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
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
  resourceSection: {
    textAlign: "center",
  },
  resourceList: {
    listStyleType: "none",
    padding: 0,
  },
  resourceItem: {
    marginBottom: "10px",
  },
  resourceLink: {
    color: "#4CAF50",
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s, transform 0.3s",
  },
  resourceLinkHover: {
    color: "#333",
    transform: "scale(1.05)",
  },
  noResults: {
    fontSize: "18px",
    color: "#999",
  },
};

export default OER;
