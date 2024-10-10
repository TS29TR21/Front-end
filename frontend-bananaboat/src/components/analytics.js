import React, { useState } from "react";

const Analytics = () => {
  // Define metrics for each component
  const metricsData = [
    { page: "Home", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Subject View", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Resource Search", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Contribute", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Other Useful OERs", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Moderate Resources", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Contributors", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Self-Directed Learning", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Login", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Account Creation", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Password Reset", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "Analytics", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "About Us", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
    { page: "FAQ", metrics: { totalUsers: 0, activeUsers: 0, pageViews: 0 } },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMetrics, setFilteredMetrics] = useState(metricsData);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = metricsData.filter(item =>
      item.page.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMetrics(filtered);
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>User Analytics</h1>
        </header>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <input
            type="text"
            placeholder="Search analytics..."
            style={styles.searchInput}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </section>

        {/* Key Metrics Section */}
        <section style={styles.metricsSection}>
          {filteredMetrics.map((item, index) => (
            <div key={index} style={styles.metricCard}>
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

// Styles for the page
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
    paddingBottom: "20px",
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
  },
  searchButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  metricsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  metricCard: {
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Analytics;
