import React from "react";
import "./style.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="pageContainer">
      {/* Main Content */}
      <main className="mainContent">
        <header className="header">
          <h1>About Us</h1>
        </header>

        <section className="section">
          <h2>Overview</h2>
          <p style={{ textAlign: "left" }}>
            Share2Teach is introduced as a vibrant open educational resource
            (OER) project crafted to nurture a global community of learners and
            educators. At its core lies the principle that knowledge should be
            accessible, collaborative, and freely available. Share2Teach is a
            testament to the power of collective endeavor, co-crafted by
            students under the guidance of their facilitators.
          </p>
          <p style={{ textAlign: "left" }}>
            The project was initiated by Dr. Chantelle Bosch, a dedicated
            lecturer and sub-area leader for Blended Learning to Enhance
            Self-Directed Learning within the Research Unit Self-Directed
            Learning at the North-West University (NWU). Alongside her, Prof.
            Dorothy Laubscher, the chair-holder of the UNESCO Chair on
            Multi-modal Learning and OER, has played a pivotal role in shaping
            the vision and trajectory of Share2Teach. Together, a platform has
            been cultivated where diverse educational resources are brought to
            life, crafted by students for students.
          </p>
        </section>

        <section className="section">
          <h2>Who We Are</h2>
          <p style={{ textAlign: "left" }}>
            We are a team of passionate individuals dedicated to providing
            high-quality educational resources and tools. Our mission is to make
            learning accessible to everyone, regardless of their background or
            location.
          </p>
        </section>

        <section className="section">
          <h2>Mission Statement</h2>
          <p style={{ textAlign: "left" }}>
            Our mission is to empower individuals to achieve their full
            potential through innovative and accessible education. We believe
            that learning should be engaging, available to all, and adaptable to
            the needs of each student.
          </p>
        </section>

        <section className="section">
          <h2>Core Values</h2>
          <p style={{ textAlign: "left" }}>
            <strong>Accessibility:</strong> We strive to remove barriers to
            education.
          </p>
          <p style={{ textAlign: "left" }}>
            <strong>Innovation:</strong> We are constantly evolving our methods
            and materials to better serve learners.
          </p>
          <p style={{ textAlign: "left" }}>
            <strong>Collaboration:</strong> We believe that education is a
            collaborative process between learners, educators, and the
            community.
          </p>
          <p style={{ textAlign: "left" }}>
            <strong>Excellence:</strong> We are committed to providing
            high-quality resources that meet the highest standards.
          </p>
        </section>

        <section className="section">
          <h2>Meet Our Team</h2>
          <p>
            Our team is composed of educators, developers, and passionate
            individuals who work together to create an inclusive and dynamic
            learning environment.
          </p>
          <h2>Development Team</h2>
          <p>
            <strong>Junier Herandien:</strong> Backend Dev
          </p>
          <p>
            <strong>Ayanda Mqomo:</strong> Fullstack Dev
          </p>
          <p>
            <strong>Tendabono Sinthumule:</strong> Frontend Dev
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
