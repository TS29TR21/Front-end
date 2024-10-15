import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>About Us</h1>
        </header>

        <section style={styles.section}>
          <h2>Overview</h2>
          <p>
            Share2Teach is an open educational resource (OER) project dedicated
            to creating a global community of learners and educators. At its
            core is the belief that knowledge should be accessible and
            collaborative.
          </p>
          <p>
            Initiated by Dr. Chantelle Bosch and Prof. Dorothy Laubscher, this
            project was created to provide educational resources by students,
            for students, nurturing self-directed learning strategies.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Who We Are</h2>
          <p>
            We are a passionate team dedicated to making learning accessible to
            all through high-quality educational resources and tools.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Mission Statement</h2>
          <p>
            Our mission is to empower learners through innovative and accessible
            education, making learning engaging and adaptable.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Core Values</h2>
          <ul>
            <li>
              <strong>Accessibility:</strong> Removing barriers to education.
            </li>
            <li>
              <strong>Innovation:</strong> Continuously evolving our methods to
              serve learners better.
            </li>
            <li>
              <strong>Collaboration:</strong> Education as a cooperative
              process.
            </li>
            <li>
              <strong>Excellence:</strong> Providing high-quality educational
              resources.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Meet Our Team</h2>
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
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  mainContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  ul: {
    listStyle: "none",
    paddingLeft: "0",
  },
  li: {
    marginBottom: "10px",
  },
};

export default AboutUs;
