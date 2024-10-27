import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file

const SubjectView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allResources, setAllResources] = useState([]); // Store all resources
  const [filteredSubjects, setFilteredSubjects] = useState([]); // Store filtered subjects

  // Fetch resources from the API on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token
        const response = await fetch("http://127.0.0.1:8000/api/resource/deserial", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        });
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setAllResources(data); // Set the fetched resources

        // Filter for approved resources on initial load
        const approvedSubjects = data
          .filter((resource) => resource.approval_status === "approved") // Only approved resources
          .map((resource) => resource.subject); // Extract subjects from approved resources

        setFilteredSubjects(approvedSubjects); // Initialize filtered subjects with approved resources
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  // Handle input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter subjects based on the search input and approval status
    const filtered = allResources
      .filter((resource) => resource.approval_status === "approved") // Only include approved resources
      .map((resource) => resource.subject) // Extract subjects from approved resources
      .filter((subject) => subject.toLowerCase().includes(value.toLowerCase())); // Filter subjects

    setFilteredSubjects(filtered); // Update filtered subjects
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>Subject View</h1>
        </header>

        {/* Search Section */}
        <section className="searchSection">
          <input
            type="text"
            placeholder="Search subjects"
            className="searchInput" // Update to use className
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </section>

        {/* Subjects Section */}
        <section className="subjectsSection">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <div key={index} className="subjectCard">
                <h2>{subject}</h2>
              </div>
            ))
          ) : (
            <p className="noResults">No subjects found.</p> // Update to use className
          )}
        </section>
      </main>
    </div>
  );
};

export default SubjectView;
