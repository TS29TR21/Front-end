import React, { useState, useEffect } from "react";
import GoogleAnalytics from './GoogleAnalytics2.js'; // Import the Google Analytics component
import "./style.css"; // Import the external CSS file

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [faqs, setFaqs] = useState([]); // State for storing FAQs
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages
  const [analyticsData, setAnalyticsData] = useState(null); // Track analytics data

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/faq/deserial", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        const data = await response.json();
        setFaqs(data); // Set fetched FAQs to state
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    
    // Trigger analytics when a question is expanded or collapsed
    if (expandedIndex !== index) {
      const userId = localStorage.getItem("userId") || "unknown"; // Use stored user ID or default to 'unknown'
      const eventType = "faq_interaction"; // Define the event type for interaction
      setAnalyticsData({ userId, eventType }); // Prepare analytics data
    }
  };

  // Track analytics for the FAQ page view
  useEffect(() => {
    const userId = localStorage.getItem("userId") || "unknown"; // Set user ID to stored value or 'unknown'
    const eventType = "view_faq"; // Define the event type
    setAnalyticsData({ userId, eventType }); // Prepare analytics data for the view
  }, []); // Only run on mount

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>Frequently Asked Questions</h1>
        </header>

        {loading ? (
          <p>Loading FAQs...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="searchSection">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="searchInput"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="searchButton">
                  Search
                </button>
              </form>
            </div>

            <div className="faqList">
              {faqs
                .filter((faq) =>
                  faq.question.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((faq, index) => (
                  <div key={index} className="faqItem">
                    <h3 onClick={() => toggleExpand(index)} className="faqQuestion">
                      {faq.question}
                    </h3>
                    {expandedIndex === index && (
                      <p className="faqAnswer">{faq.answer}</p>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      {analyticsData && (
        <GoogleAnalytics
          page="FAQPage"
          userId={analyticsData.userId}
          eventType={analyticsData.eventType}
        />
      )}
    </div>
  );
};

export default FAQ;
