import React, { useEffect } from 'react';

const GoogleAnalytics = ({ page, userId, eventType, duration, customParam }) => {
  useEffect(() => {
    const trackAnalytics = () => {
      const data = {
        page,
        userId,
        eventType,
        duration,
        customParam,
        timestamp: new Date(),
      };

      // Log to console for testing
      console.log('Analytics Data:', data);

      // Send data to Google Analytics
      if (window.gtag) {
        window.gtag('event', 'track_event', {
          event_category: 'User Interaction',
          event_action: eventType,
          event_label: page,
          user_id: userId,
          event_duration: duration,
          custom_param: customParam,
          page_location: window.location.href,
          page_path: page,
          page_title: document.title,
        });
      }
    };

    trackAnalytics();
  }, [page, userId, eventType, duration, customParam]);

  return null; // This component doesn't need to render anything
};

export default GoogleAnalytics;
