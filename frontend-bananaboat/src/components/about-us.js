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
          <h2>Overview</h2>
          <p>
            Share2Teach is introduced as a vibrant open educational resource
            (OER) project crafted to nurture a global community of learners and
            educators.
          </p>
          <p>
            At its core lies the principle that knowledge should be accessible,
            collaborative, and freely available. Share2Teach is a testament to
            the power of collective endeavor, co-crafted by students under the
            guidance of their facilitators.
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
            Share2Teach serves as a beacon for educational innovation, extending
            an invitation to educators and learners worldwide to contribute,
            explore, and evolve within this open, inclusive community.
          </p>
          <p>
            Joining this journey means participating in the endeavor to
            transform learning into a shared adventure, dismantling barriers and
            erecting bridges toward a more knowledgeable and interconnected
            world.
          </p>

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
    display: "-webkit-box",    // For Safari
    display: "-moz-box",       // For older Firefox
    display: "-ms-flexbox",    // For IE10
    display: "-webkit-flex",   // For newer Safari and Chrome
    display: "flex",           // Standard flexbox
    height: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
    overflowY: "auto",
    // Adding browser prefixes for transitions (as an example)
    "-webkit-transition": "all 0.3s ease", // Safari
    "-moz-transition": "all 0.3s ease",    // Firefox
    transition: "all 0.3s ease",           // Standard
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
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    "-webkit-border-radius": "4px",   // Safari
    "-moz-border-radius": "4px",      // Firefox
  },
  searchButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "-webkit-transition": "background-color 0.3s ease",  // Safari
    "-moz-transition": "background-color 0.3s ease",     // Firefox
    transition: "background-color 0.3s ease",            // Standard
  },
};

export default AboutUs;
