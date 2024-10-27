import React, { useState, useEffect } from "react";
import "./style.css"; // Import the external CSS file

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [faqs, setFaqs] = useState([]); // State for storing FAQs
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/faq/deserial", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include token if necessary
          },
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
  };

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
    </div>
  );
};

export default FAQ;
