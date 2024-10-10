import React, { useState } from "react";

const Contributors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const contributors = [
    {
      name: "John Doe",
      resources: [
        "Resource 1 - Introduction to React",
        "Resource 2 - Advanced JavaScript",
        "Resource 3 - API Development with Node.js",
      ],
    },
    {
      name: "Jane Smith",
      resources: [
        "Resource 1 - Understanding CSS",
        "Resource 2 - Frontend Performance Optimization",
      ],
    },
    {
      name: "Alice Johnson",
      resources: [
        "Resource 1 - Introduction to Python",
        "Resource 2 - Data Analysis with Pandas",
      ],
    },
    // Add more contributors as needed
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Contributors</h1>
        </header>

        <div style={styles.searchSection}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search contributors..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
        </div>

        <div style={styles.contributorList}>
          {contributors
            .filter(contributor =>
              contributor.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((contributor, index) => (
              <div key={index} style={styles.contributorItem}>
                <h3 onClick={() => toggleExpand(index)} style={styles.contributorName}>
                  {contributor.name}
                </h3>
                {expandedIndex === index && (
                  <ul style={styles.resourceList}>
                    {contributor.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} style={styles.resourceItem}>
                        {resource}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

// Styles for the page
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
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
  contributorList: {
    marginTop: "20px",
  },
  contributorItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  contributorName: {
    margin: "0",
  },
  resourceList: {
    listStyleType: "none",
    paddingLeft: "20px",
  },
  resourceItem: {
    marginBottom: "5px",
    color: "#555",
  },
};

export default Contributors;
