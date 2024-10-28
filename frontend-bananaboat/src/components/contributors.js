import React, { useState, useEffect } from "react";
import "./style.css"; // Import the external CSS file

const Contributors = () => {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState({}); // Object to store users by their ID

  // Fetch resources and users from the API when the component mounts
  useEffect(() => {
    const fetchResourcesAndUsers = async () => {
      try {
        const [resourcesResponse, usersResponse] = await Promise.all([
          fetch("http://contained-share2teach.onrender.com/api/resource/deserial", {
            method: "GET",
          }),
          fetch("http://contained-share2teach.onrender.com/api/user/deserial", {
            method: "GET",
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
  }, []);

  return (
    <div className="pageContainer">
      {/* Main Content */}
      <main className="mainContent">
        <header className="header">
          <h1>Contributors</h1>
        </header>

        <div className="contributorList">
          {resources.map((resource, index) => (
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
