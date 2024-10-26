import React, { useState } from "react";
import "./style.css";

const Analytics = () => {
  // Define metrics for each component
  const metricsData = [
    { page: "Home", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    {
      page: "Subject View",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Resource Search",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Contribute",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Other Useful OERs",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Moderate Resources",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Contributors",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Self-Directed Learning",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    { page: "Login", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    {
      page: "Account Creation",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Password Reset",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "Analytics",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    {
      page: "About Us",
      metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 },
    },
    { page: "FAQ", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMetrics, setFilteredMetrics] = useState(metricsData);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = metricsData.filter((item) =>
      item.page.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMetrics(filtered);
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>User Analytics</h1>
        </header>

        {/* Search Section */}
        <section className="searchSection">
          <input
            type="text"
            placeholder="Search analytics..."
            className="searchInput"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearch}>
            Search
          </button>
        </section>

        {/* Key Metrics Section */}
        <section className="metricsSection">
          {filteredMetrics.map((item, index) => (
            <div key={index} className="metricCard">
              <h2>{item.page}</h2>
              <p>Total Users: {item.metrics.totalUsers}</p>
              <p>Active Users: {item.metrics.activeUsers}</p>
              <p>Page Views: {item.metrics.pageViews}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Analytics;
