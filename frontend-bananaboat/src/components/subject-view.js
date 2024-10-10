import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

const SubjectView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., filtering subjects)
    console.log("Search query:", searchQuery);
  };

  return (
    <div style={styles.container}>
      <section style={styles.searchSection}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search subjects (Databases, Math, etc.)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>
      </section>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  navigation: {
    marginBottom: "20px",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    gap: "15px",
  },
  navItem: {
    display: "inline",
  },
  link: {
    textDecoration: "none",
    color: "#4CAF50",
    fontWeight: "bold",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  content: {
    marginTop: "20px",
  },
  searchSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "250px", // Adjusted width for search input
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

export default SubjectView;
