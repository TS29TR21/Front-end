import React, { useState } from "react";
import "./style.css"; // Import the external CSS file

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Please ensure items are in original condition.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, click on 'Forgot Password' at the login screen and follow the instructions.",
    },
    {
      question: "Where can I find the user manual?",
      answer:
        "The user manual can be found in the documentation section of our website.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support via the contact form or by emailing support@example.com.",
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
    <div className="pageContainer">
      <main className="mainContent">
        <header className="header">
          <h1>Frequently Asked Questions</h1>
        </header>

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
      </main>
    </div>
  );
};

export default FAQ;
