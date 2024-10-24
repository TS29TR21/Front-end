import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./login.js";
import ResourceSearch from "./resource-search.js";
import ModerationForm from "./moderation.js";
import NewPassword from "./new-password.js";
import RateResource from "./rate-resource.js";
import Register from "./register.js";
import PasswordReset from "./reset-password.js";
import ResourceReport from "./resource-report.js";
import UpdateUserRole from "./update-user-role.js";
import UploadTaggingResource from "./file-upload-tagging.js";
import SubjectView from "./subject-view.js";
import FAQ from "./faq.js";
import AboutUs from "./about-us.js";
import OER from "./oer.js";
import Contributors from "./contributors.js";
import Self from "./sdl.js";
import Analytics from "./analytics.js";

const Home = () => {
  const [user, setUser] = useState(null); // State to manage user information
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleLogin = (userData) => {
    setUser(userData); // Store user data after login
    navigate("/"); // Redirect to home after login
  };

  const renderSectionContent = () => {
    return (
      <>
        <h2>Welcome to Share2Teach</h2>
        {/* Add more content based on user roles or other criteria here */}
      </>
    );
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <nav>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem}>
              <Link to="/" style={styles.link}>Home</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/subject-view-page" style={styles.link}>Subject View</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/resource-search-page" style={styles.link}>Search Resources</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/file-upload-page" style={styles.link}>Contribute</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/oer-page" style={styles.link}>Other Useful OERs</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/rate-resource-page" style={styles.link}>Rate Resources</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/moderate-page" style={styles.link}>Moderate Resources</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/contributors-page" style={styles.link}>Contributors</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/self-directed-page" style={styles.link}>Self-Directed Learning</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/analytics-page" style={styles.link}>Analytics</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/about-us-page" style={styles.link}>About Us</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/faq-page" style={styles.link}>FAQ</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/resource-report-page" style={styles.link}>Resource Report</Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/update-role-page" style={styles.link}>Update User Role</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.logo}>Share2Teach</h1>
          <div style={styles.authButtons}>
            {user ? (
              <span>Welcome, {user.username}!</span> // Display user info
            ) : (
              <>
                <Link to="/login-page">
                  <button style={styles.authButton}>Login</button>
                </Link>
                <Link to="/register-page">
                  <button style={styles.authButton}>Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </header>

        <section style={styles.banner}>
          <div style={styles.bannerText}>{renderSectionContent()}</div>
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
    width: "100vw", // Ensures full width
    margin: 0, // Removes any default margin
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#2c2c2c",
    padding: "10px",
    color: "white",
    height: "100vh", // Ensures the sidebar takes full height
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
    overflowY: "auto",
    height: "100vh", // Ensures the main content takes full height
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarListItem: {
    marginBottom: "8px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    display: "block",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s", // Standard property
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  authButtons: {
    display: "flex",
    gap: "10px", // Space between buttons
  },
  authButton: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50", // Button background color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s", // Standard
  },
  banner: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Standard property
  },
  bannerText: {
    textAlign: "left",
  },
};

export default Home;
