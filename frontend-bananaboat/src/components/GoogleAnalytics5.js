import React, { useEffect } from 'react';

const GoogleAnalytics = ({ userId, eventType, page }) => {
  useEffect(() => {
    const trackAnalytics = async () => {
      const timestamp = new Date().toISOString(); // Current timestamp in ISO format

      const data = {
        userId,
        page,
        eventType,
        timestamp,
      };

      // Log to console for testing
      console.log('Analytics Data:', data);

      // Send data to Google Analytics
      if (window.gtag) {
        window.gtag('event', eventType, {
          event_category: 'User Interaction',
          event_label: page,
          user_id: userId,
          timestamp,
        });
      }

      // Send data to the backend with access token
      const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from local storage

      try {
        const response = await fetch('http://127.0.0.1:8000/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the header
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
  }, [userId, eventType, page]);

  return null; // This component doesn't need to render anything
};

export default GoogleAnalytics;
