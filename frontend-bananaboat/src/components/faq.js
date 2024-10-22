import React, { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Please ensure items are in original condition."
    },
    {
      question: "How can I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' at the login screen and follow the instructions."
    },
    {
      question: "Where can I find the user manual?",
      answer: "The user manual can be found in the documentation section of our website."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support via the contact form or by emailing support@example.com."
    },
    // Add more FAQs as needed
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Frequently Asked Questions</h1>
        </header>

        <div style={styles.searchSection}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search FAQs..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
        </div>

        <div style={styles.faqList}>
          {faqs
            .filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <h3 onClick={() => toggleExpand(index)} style={styles.faqQuestion}>
                  {faq.question}
                </h3>
                {expandedIndex === index && (
                  <p style={styles.faqAnswer}>{faq.answer}</p>
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

// Styles for the page
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
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
  faqList: {
    marginTop: "20px",
  },
  faqItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    WebkitTransition: "background-color 0.3s ease",  // Safari
    MozTransition: "background-color 0.3s ease",     // Firefox
  },
  faqQuestion: {
    margin: "0",
  },
  faqAnswer: {
    margin: "10px 0 0 0",
    color: "#555",
  },
};

export default FAQ;
