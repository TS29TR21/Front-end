import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

const SubjectView = () => {
  return (
    <div style={styles.container}>
      <p>
        This is the Subject View page where you can browse and search through
        different subjects.
      </p>

      <nav style={styles.navigation}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/resource-search-page" style={styles.link}>
              Search Results
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/file-upload-page" style={styles.link}>
              Contribute
            </Link>
          </li>
          <li style={styles.sidebarListItem}>
            <Link to="/about-us-page" style={styles.link}>
              About Us
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/faq-page" style={styles.link}>
              FAQ
            </Link>
          </li>
        </ul>
      </nav>

      <div style={styles.content}>
        <p>
          Explore the subjects or contribute by uploading new resources to help
          others learn. You can also check out the FAQ section for more
          information or search for specific subjects or topics.
        </p>
      </div>
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
};

export default SubjectView;
