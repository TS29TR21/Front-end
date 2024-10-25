import React, { useState, useEffect } from "react";

const Contributors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contributors, setContributors] = useState([]);

  // Fetch contributors from the API when the component mounts
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contributors");
        const data = await response.json();
        // Set the fetched data directly to contributors
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.pageContainer}>
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
              <div key={contributor.id} style={styles.contributorItem}>
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

// Styles for the page (unchanged)
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
