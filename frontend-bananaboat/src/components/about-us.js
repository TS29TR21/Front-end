import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AboutUs = () => {
  return (
    <div className="container my-5">
      <main className="bg-white p-4 rounded shadow">
        <header className="text-center mb-4">
          <h1>About Us</h1>
        </header>

        <section className="mb-4">
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

        <section className="mb-4">
          <h2>Who We Are</h2>
          <p>
            We are a passionate team dedicated to making learning accessible to
            all through high-quality educational resources and tools.
          </p>
        </section>

        <section className="mb-4">
          <h2>Mission Statement</h2>
          <p>
            Our mission is to empower learners through innovative and accessible
            education, making learning engaging and adaptable.
          </p>
        </section>

        <section className="mb-4">
          <h2>Core Values</h2>
          <ul className="list-unstyled">
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

        <section className="mb-4">
          <h2>Meet Our Team</h2>
          <ul className="list-unstyled">
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

export default AboutUs;
