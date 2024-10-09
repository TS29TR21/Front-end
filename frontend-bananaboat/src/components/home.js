import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., filtering subjects)
    console.log("Search query:", searchQuery);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <nav>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem}>
              <Link to="/subject-view-page" style={styles.link}>
                Subject View
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/resource-search-page" style={styles.link}>
                Search Results
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/file-upload-page" style={styles.link}>
                Contribute
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/other-oers" style={styles.link}>
                Other Useful OERs
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/contributors" style={styles.link}>
                Contributors
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/self-directed-learning" style={styles.link}>
                Self-Directed Learning
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/register-page" style={styles.link}>
                Account Creation
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/reset-password-page" style={styles.link}>
                Password Reset
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/about-us-page" style={styles.link}>
                About Us
              </Link>
            </li>
            <li style={styles.sidebarListItem}>
              <Link to="/faq-page" style={styles.link}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Share2Teach</h1>
        </header>
        <section style={styles.searchSection}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>
        </section>
        <section style={styles.banner}>
          <div style={styles.bannerText}>
            <h2>Overview</h2>
            <p>
              Share2Teach is introduced as a vibrant open educational resource
              (OER) project crafted to nurture a global community of learners
              and educators.
            </p>
            <p>
              At its core lies the principle that knowledge should be
              accessible, collaborative, and freely available. Share2Teach is a
              testament to the power of collective endeavor, co-crafted by
              students under the guidance of their facilitators.
            </p>
            <p>
              The project was initiated by Dr. Chantelle Bosch, a dedicated
              lecturer and sub-area leader for Blended Learning to Enhance
              Self-Directed Learning within the Research Unit Self-Directed
              Learning at the North-West University (NWU).
            </p>
            <p>
              Alongside her, Prof. Dorothy Laubscher, the chair-holder of the
              UNESCO Chair on Multi-modal Learning and OER, has played a pivotal
              role in shaping the vision and trajectory of Share2Teach.
            </p>
            <p>
              Together, a platform has been cultivated where diverse educational
              resources are brought to life, crafted by students for students.
              From comprehensive semester planning documents to topic-specific
              insights, Share2Teach offers a wide array of materials tailored to
              enhance self-directed learning through cooperative learning and
              project-based teaching strategies.
            </p>
            <p>
              Share2Teach serves as a beacon for educational innovation,
              extending an invitation to educators and learners worldwide to
              contribute, explore, and evolve within this open, inclusive
              community.
            </p>
            <p>
              Joining this journey means participating in the endeavor to
              transform learning into a shared adventure, dismantling barriers
              and erecting bridges toward a more knowledgeable and
              interconnected world.
            </p>
          </div>
        </section>

        <section style={styles.navSection}></section>
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

export default Home;
