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

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Subject View</h1>
        </header>

        {/* Search Section */}
        <section style={styles.searchSection}>
          
          <input
            type="text"
            placeholder="Search subjects (Databases, Math, etc.)..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {/* Subjects Section */}
        <section style={styles.subjectsSection}>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <div key={index} style={styles.subjectCard}>
                <h2>{subject}</h2>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No subjects found.</p>
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
  subjectsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  subjectCard: {
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  noResults: {
    textAlign: "center",
    fontSize: "18px",
    color: "#999",
  },
};

export default SubjectView;
