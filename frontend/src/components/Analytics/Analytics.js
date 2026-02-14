import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics Component
 * Add your Google Analytics tracking ID in the environment variable
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Replace with your actual Google Analytics tracking ID
    const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

    if (!GA_TRACKING_ID) {
      console.warn('Google Analytics tracking ID not found. Set REACT_APP_GA_TRACKING_ID in .env');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });

    // Expose gtag function globally
    window.gtag = gtag;
  }, []);

  // Track page views when route changes
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;
