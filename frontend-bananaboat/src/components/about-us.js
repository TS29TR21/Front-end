import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>About Us</h1>
        </header>

        <section style={styles.section}>
          <h2>Who We Are</h2>
          <p>
            We are a team of passionate individuals dedicated to providing
            high-quality educational resources and tools. Our mission is to make
            learning accessible to everyone, regardless of their background or
            location.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Mission Statement</h2>
          <p>
            Our mission is to empower individuals to achieve their full
            potential through innovative and accessible education. We believe
            that learning should be engaging, available to all, and adaptable to
            the needs of each student.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Core Values</h2>
          <ul>
            <li>
              <strong>Accessibility:</strong> We strive to remove barriers to
              education.
            </li>
            <li>
              <strong>Innovation:</strong> We are constantly evolving our
              methods and materials to better serve learners.
            </li>
            <li>
              <strong>Collaboration:</strong> We believe that education is a
              collaborative process between learners, educators, and the
              community.
            </li>
            <li>
              <strong>Excellence:</strong> We are committed to providing
              high-quality resources that meet the highest standards.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Meet Our Team</h2>
          <p>
            Our team is composed of educators, developers, and passionate
            individuals who work together to create an inclusive and dynamic
            learning environment.
          </p>
          <ul>
            <li>
              <strong>Tendabono Sinthumule:</strong> Software Developer
            </li>
            <li>
              <strong>Jane Doe:</strong> Project Manager
            </li>
            <li>
              <strong>John Smith:</strong> Content Specialist
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Our History</h2>
          <p>
            Founded in 2023, we began as a small team with a shared vision of
            transforming the educational landscape. Over the years, we have
            grown into a thriving community of learners and educators,
            continually expanding our offerings and improving our platform.
          </p>
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
  section: {
    marginBottom: "20px",
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
};

export default AboutUs;
