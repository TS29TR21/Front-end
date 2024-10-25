import React, { useState, useEffect } from "react";
import "./style.css"; // Import the external CSS file

const Contributors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contributors, setContributors] = useState([]);

  // Fetch contributors from the API when the component mounts
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/contributors");
        const data = await response.json();
        // Map the data from the API to match the structure of the contributors
        const formattedContributors = data.map((user) => ({
          name: `${user.first_name} ${user.last_name}`,
          resources: user.groups, // Adjust this based on the actual structure of user data
        }));
        setContributors(formattedContributors);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="pageContainer">
      {/* Main Content */}
      <main className="mainContent">
        <header className="header">
          <h1>Contributors</h1>
        </header>

        <div className="searchSection">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search contributors..."
              className="searchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="searchButton">
              Search
            </button>
          </form>
        </div>

        <div className="contributorList">
          {contributors
            .filter((contributor) =>
              contributor.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((contributor, index) => (
              <div key={index} className="contributorItem">
                <h3
                  onClick={() => toggleExpand(index)}
                  className="contributorName"
                >
                  {contributor.name}
                </h3>
                {expandedIndex === index && (
                  <ul className="resourceList">
                    {contributor.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} className="resourceItem">
                        {resource}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Contributors;
