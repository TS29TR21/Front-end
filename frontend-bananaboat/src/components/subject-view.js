import React, { useState } from "react";

const SubjectView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Example subjects
  const subjects = [
    "Databases",
    "Mathematics",
    "Data Structures",
    "Operating Systems",
    "Cloud Computing",
    "Cybersecurity",
    "Software Engineering",
    "Artificial Intelligence",
    "Web Development",
    "Machine Learning",
  ];

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
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

      <section style={styles.subjectSection}>
        {filteredSubjects.length > 0 ? (
          <ul style={styles.subjectList}>
            {filteredSubjects.map((subject, index) => (
              <li key={index} style={styles.subjectItem}>
                {subject}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noResults}>No subjects found.</p>
        )}
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
  subjectSection: {
    textAlign: "center",
  },
  subjectList: {
    listStyleType: "none",
    padding: 0,
  },
  subjectItem: {
    backgroundColor: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "18px",
    color: "#333",
  },
  noResults: {
    fontSize: "18px",
    color: "#999",
  },
};

export default SubjectView;
