import React, { useState, useEffect } from "react";
import "./style.css"; // Import the external CSS file

const Contributors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState({}); // Object to store users by their ID

  // Retrieve the access token from local storage or any other source
  const accessToken = localStorage.getItem("accessToken");

  // Fetch resources and users from the API when the component mounts
  useEffect(() => {
    const fetchResourcesAndUsers = async () => {
      try {
        const [resourcesResponse, usersResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/resource/deserial", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token in the header
            },
          }),
          fetch("http://127.0.0.1:8000/api/user/deserial", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (!resourcesResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch resources or users");
        }

        const [resourcesData, usersData] = await Promise.all([
          resourcesResponse.json(),
          usersResponse.json(),
        ]);

        setResources(resourcesData); // Store the raw resources
        // Create an object to map user IDs to names for easier access
        const userMap = {};
        usersData.forEach((user) => {
          userMap[user.id] = `${user.first_name} ${user.last_name}`;
        });
        setUsers(userMap); // Store users in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResourcesAndUsers();
  }, [accessToken]);

  const handleSearch = (e) => {
    e.preventDefault();
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
          {resources
            .filter((resource) =>
              users[resource.contributor] && 
              users[resource.contributor].toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((resource, index) => (
              <div key={index} className="contributorItem" style={{ marginLeft: "20px" }}>
                <p className="contributorName">
                  {users[resource.contributor]} - {resource.resource_name}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Contributors;
