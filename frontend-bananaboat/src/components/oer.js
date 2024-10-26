import React, { useState } from "react";
import "./style.css"; // Import the CSS file

const OER = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample list of resources based on your provided fields
  const resources = [
    {
      id: 1,
      file_path1: null,
      file_path2: null,
      file_path3: null,
      file_path4: null,
      date_contributed: "2024-10-20T00:00:00Z",
      resource_name: "Introduction to Quantum Computing",
      subject: "Computer Science",
      grade: "University Level",
      keywords: "quantum, computing, technology",
      resource_rating: null,
      approval_status: "approved",
      moderation_comment: "",
      moderation_date: null,
      contributor: 1,
      url: "https://quantum-computing.ibm.com/learn/intro-to-quantum-computing/",
    },
    {
      id: 2,
      file_path1: null,
      file_path2: null,
      file_path3: null,
      file_path4: null,
      date_contributed: "2024-10-21T00:00:00Z",
      resource_name: "Fundamentals of Machine Learning",
      subject: "Artificial Intelligence",
      grade: "University Level",
      keywords: "machine learning, AI, algorithms",
      resource_rating: null,
      approval_status: "pending",
      moderation_comment: "Under review",
      moderation_date: null,
      contributor: 2,
      url: "https://www.coursera.org/learn/machine-learning",
    },
    {
      id: 3,
      file_path1: null,
      file_path2: null,
      file_path3: null,
      file_path4: null,
      date_contributed: "2024-10-22T00:00:00Z",
      resource_name: "Understanding Blockchain Technology",
      subject: "Information Technology",
      grade: "College Level",
      keywords: "blockchain, cryptocurrency, decentralized",
      resource_rating: null,
      approval_status: "approved",
      moderation_comment: "",
      moderation_date: null,
      contributor: 3,
      url: "https://www.edx.org/course/blockchain-fundamentals",
    },
  ];

  // Filter resources based on search query
  const filteredResources = resources.filter((resource) =>
    resource.resource_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>Other Useful Educational Resources</h1>
        </header>

        {/* Search Section */}
        <section className="searchSection">
          <input
            type="text"
            placeholder="Search resources..."
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {/* Resources Section */}
        <section className="resourcesSection">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} className="resourceCard">
                <h2>{resource.resource_name}</h2>
                <p>Subject: {resource.subject}</p>
                <p>Grade: {resource.grade}</p>
                <p>Keywords: {resource.keywords}</p>
                <p>
                  Date Contributed:{" "}
                  {new Date(resource.date_contributed).toLocaleDateString()}
                </p>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Access Resource
                </a>
              </div>
            ))
          ) : (
            <p className="noResults">No resources found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default OER;
