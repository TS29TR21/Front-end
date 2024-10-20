import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "subject-view":
        return <SubjectView />;
      case "resource-search":
        return <ResourceSearch />;
      case "file-upload":
        return <UploadTaggingResource />;
      case "oer":
        return <OER />;
      case "contributors":
        return <Contributors />;
      case "self-directed":
        return <Self />;
      case "register":
        return <Register />;
      case "reset-password":
        return <PasswordReset />;
      case "new-password":
        return <NewPassword />;
      case "about-us":
        return <AboutUs />;
      case "faq":
        return <FAQ />;
      case "login":
        return <Login />;
      case "analytics":
        return <Analytics />;
      case "moderate":
        return <ModerationForm />;
      case "rate-resource":
        return <RateResource />;
      case "resource-report":
        return <ResourceReport />;
      case "update-user-role":
        return <UpdateUserRole />;
      default:
        return (
          <>
            <h2>Welcome to Share2Teach</h2>
          </>
        );
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <nav>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem}>
              <button style={styles.link} onClick={() => setActiveSection("/")}>
                Home
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("subject-view")}
              >
                Subject View
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("resource-search")}
              >
                Search Resources
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("file-upload")}
              >
                Contribute
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("oer")}
              >
                Other Useful OERs
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("rate-resource")}
              >
                Rate Resources
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("moderate")}
              >
                Moderate Resources
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("contributors")}
              >
                Contributors
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("self-directed")}
              >
                Self-Directed Learning
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("login")}
              >
                Login
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("register")}
              >
                Account Creation
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("reset-password")}
              >
                Password Reset
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("new-password")}
              >
                New Reset
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("analytics")}
              >
                Analytics
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("about-us")}
              >
                About Us
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("faq")}
              >
                FAQ
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("resource-report")}
              >
                Resource Report
              </button>
            </li>
            <li style={styles.sidebarListItem}>
              <button
                style={styles.link}
                onClick={() => setActiveSection("update-user-role")}
              >
                Update User Role
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Share2Teach</h1>
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
    transition: "background-color 0.3s, transform 0.3s",
  },
  header: {
    textAlign: "center",
    paddingBottom: "20px",
  },
  banner: {
    /*display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4e4e4",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "30px",*/
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "white",
  },
  bannerText: {
    textAlign: "left",
  },
};

export default Home;
