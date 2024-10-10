import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., filtering subjects)
    console.log("Search query:", searchQuery);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>This is the User Management page</h1>
        </header>
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
  sidebar: {
    width: "200px", // Reduced width
    backgroundColor: "#2c2c2c",
    padding: "10px", // Reduced padding
    color: "white",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarListItem: {
    marginBottom: "8px", // Reduced margin
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px 12px", // Reduced padding for links
    borderRadius: "4px",
    display: "block",
    transition: "background-color 0.3s, transform 0.3s", // Add transition for smooth hover effect
  },
  // Add hover effect using pseudo-element in CSS
  linkHover: {
    backgroundColor: "#4CAF50",
    transform: "scale(1.05)", // Slightly enlarge on hover
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
  banner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  bannerText: {
    textAlign: "left",
  },
  navSection: {
    textAlign: "center",
  },
};

export default UserManagement;
