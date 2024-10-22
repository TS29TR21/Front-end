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
    display: "-webkit-box",    // Safari
    display: "-moz-box",       // Firefox
    display: "-ms-flexbox",    // IE 10
    display: "-webkit-flex",   // Safari, Chrome
    display: "flex",           // Standard
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
    display: "-webkit-box",    // Safari
    display: "-moz-box",       // Firefox
    display: "-webkit-flex",   // Safari, Chrome
    display: "flex",           // Standard flexbox
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
  metricsSection: {
    display: "-moz-grid",                    // Older Firefox
    display: "-webkit-grid",                 // Safari, Chrome
    display: "grid",                         // Standard grid
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  metricCard: {
    backgroundColor: "#e4e4e4",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    "-webkit-box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Safari
    "-moz-box-shadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",     // Firefox
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",             // Standard
  },
};


export default Analytics;
