import React from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <nav>
          <ul style={styles.sidebarList}>
            <li>
              <Link to="/subject-view">Subject View</Link>
            </li>
            <li>
              <Link to="/resource-search-page">Search Results</Link>
            </li>
            <li>
              <Link to="/file-upload-page">Contribute</Link>
            </li>
            <li>
              <Link to="/other-oers">Other Useful OERs</Link>
            </li>
            <li>
              <Link to="/contributors">Contributors</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/self-directed-learning">Self-Directed Learning</Link>
            </li>
            <li>
              <Link to="/moderate-page">Moderate</Link>
            </li>
            <li>
              <Link to="/register-page">Account Creation</Link>
            </li>
            <li>
              <Link to="/reset-password-page">Password Reset</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
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
          {/* <img
            src="https://placehold.co/600x200" // Replace with actual image source
            alt="Empower students"
            style={styles.bannerImage}
          />*/}
          <div style={styles.bannerText}>
            <h2>Overview</h2>
            <p>
              Share2Teach is introduced as a vibrant open educa onal resource
              (OER) project cra ed to nurture a global community of learners and
              educators. At its core lies the principle that knowledge should be
              accessible, collabora ve, and freely available. Share2Teach is a
              testament to the power of collec ve endeavour, co-cra ed by
              students under the guidance of their facilitators. The project was
              ini ated by Dr. Chantelle Bosch, a dedicated lecturer and sub-area
              leader for Blended Learning to Enhance Self-Directed Learning
              within the Research Unit Self-Directed Learning at the North-West
              University (NWU). Alongside her, Prof. Dorothy Laubscher, the
              chair-holder of the UNESCO Chair on Mul-modal Learning and OER,
              has played a pivotal role in shaping the vision and trajectory of
              Share2Teach. Together, a pla orm has been cul vated where diverse
              educa onal resources are brought to life, cra ed by students for
              students. From comprehensive semester planning documents to
              topic-specific insights, Share2Teach offers a wide array of
              materials tailored to enhance self directed learning through
              coopera ve learning and project-based teaching strategies.
              Share2Teach serves as a beacon for educa onal innova on, extending
              an invita on to educators and learners worldwide to contribute,
              explore, and evolve within this open, inclusive community. Joining
              this journey means par cipa ng in the endeavour to transform
              learning into a shared adventure, dismantling barriers and erec ng
              bridges toward a more knowledgeable and interconnected world. S
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
    width: "250px",
    backgroundColor: "#2c2c2c",
    padding: "20px",
    color: "white",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarListItem: {
    marginBottom: "10px",
    fontSize: "18px",
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
  banner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  bannerImage: {
    maxWidth: "50%",
    marginRight: "20px",
  },
  bannerText: {
    textAlign: "left",
  },
  donateButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  navSection: {
    textAlign: "center",
  },
  linkList: {
    listStyleType: "none",
    padding: 0,
  },
  linkListItem: {
    margin: "10px 0",
    fontSize: "18px",
  },
};

export default Home;
