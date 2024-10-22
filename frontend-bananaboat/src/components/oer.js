import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const OER = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Example list of useful resources
  const resources = [
    { title: "Khan Academy", description: "Free educational courses on various subjects", url: "https://www.khanacademy.org" },
    { title: "Coursera", description: "Courses from top universities and institutions", url: "https://www.coursera.org" },
    { title: "edX", description: "Free and paid courses from universities", url: "https://www.edx.org" },
    { title: "MIT OpenCourseWare", description: "Free lecture notes, exams, and videos from MIT", url: "https://ocw.mit.edu" },
    { title: "OpenStax", description: "Free educational textbooks", url: "https://openstax.org" },
    { title: "GitHub Education", description: "Developer resources and educational programs", url: "https://education.github.com" },
    { title: "Codecademy", description: "Interactive coding tutorials", url: "https://www.codecademy.com" },
    { title: "Udemy", description: "Online learning platform with courses on various topics", url: "https://www.udemy.com" },
    { title: "FreeCodeCamp", description: "Learn to code for free", url: "https://www.freecodecamp.org" },
    { title: "Pluralsight", description: "Tech skills learning platform", url: "https://www.pluralsight.com" },
    { title: "FutureLearn", description: "Online courses from top institutions", url: "https://www.futurelearn.com" },
    { title: "LinkedIn Learning", description: "Online learning platform with video courses", url: "https://www.linkedin.com/learning" },
    { title: "Stanford Online", description: "Free and paid courses from Stanford University", url: "https://online.stanford.edu" },
    { title: "Harvard Online", description: "Courses from Harvard University", url: "https://online-learning.harvard.edu" },
  ];

  // Filter resources based on search query
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Other Useful Educational Resources</h1>
        </header>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <input
            type="text"
            placeholder="Search resources..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {/* Resources Section */}
        <section style={styles.resourcesSection}>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div key={index} style={styles.resourceCard}>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Access Resource
                </a>
              </div>
            ))
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
  resourcesSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  resourceCard: {
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    color: "#999",
  },
};

export default OER;
