import React, { useEffect } from 'react';

const GoogleAnalytics = ({ userId, eventType }) => {
  useEffect(() => {
    const trackAnalytics = async () => {
      const pageTitle = document.title; // Get the current page title
      const timestamp = new Date().toISOString(); // Current timestamp in ISO format

      const data = {
        userId,
        page: pageTitle,
        eventType,
        timestamp,
      };

      // Log to console for testing
      console.log('Analytics Data:', data);

      // Send data to Google Analytics
      if (window.gtag) {
        window.gtag('event', eventType, {
          event_category: 'User Interaction',
          event_label: pageTitle,
          user_id: userId,
          timestamp,
        });
      }

      // Send data to the backend
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user-interaction/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Send the data as JSON
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error sending data to backend:', errorData);
        } else {
          console.log('Data successfully sent to backend');
        }
      } catch (error) {
        console.error('Network error while sending data to backend:', error);
      }
    };

    trackAnalytics();
  }, [userId, eventType]);

  return null; // This component doesn't need to render anything
};

export default GoogleAnalytics;
