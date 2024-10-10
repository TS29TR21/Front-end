import React, { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., filtering subjects)
    console.log("Search query:", searchQuery);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "subject-view":
        return <p>Subject View Content...</p>;
      case "resource-search":
        return <p>Search Results Content...</p>;
      case "file-upload":
        return <p>File Upload and Contribute Section...</p>;
      case "oer":
        return <p>Other Useful OERs Content...</p>;
      case "contributors":
        return <p>Contributors Section...</p>;
      case "self-directed":
        return <p>Self-Directed Learning Section...</p>;
      case "register":
        return <p>Account Creation Section...</p>;
      case "reset-password":
        return <p>Password Reset Section...</p>;
      case "about-us":
        return <p>About Us Content...</p>;
      case "faq":
        return <p>FAQ Content...</p>;
      default:
        return (
          <>
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
            {/* Other overview content */}
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
                Search Results
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
            {/* Render dynamic content here */}
            {renderSectionContent()}
          </div>
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
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s", // Add transition for smooth hover effect
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
};

export default Home;
