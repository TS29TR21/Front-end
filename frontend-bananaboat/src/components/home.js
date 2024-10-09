import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>Select an option below to navigate:</p>
      <nav style={styles.nav}>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <Link to="/subject-view">Subject View</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/resource-search-page">Search Results</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/file-upload-page">Contribute</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/other-oers">Other Useful OERs</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/contributors">Contributors</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/about-us">About Us</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/self-directed-learning">Self-Directed Learning</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/moderate-page">Moderate</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/register-page">Account Creation</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/reset-password-page">Password Reset</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/faq">FAQ</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/user-management">User Management</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  nav: {
    marginTop: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    margin: "10px 0",
    fontSize: "18px",
  },
};

export default Home;
