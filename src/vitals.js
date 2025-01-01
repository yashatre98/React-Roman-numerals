import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';
import axios from 'axios';

// Send metrics to monitoring system (example using console log)
const sendToAnalytics = async (metric) => {
    try {
        // Use Axios to send a POST request
        await axios.post('http://localhost:3000/react-metrics', metric, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Metric sent:', metric); // Log successful metric send
    } catch (error) {
        console.error('Error sending metric:', error); // Log errors
    }
};


// Capture Web Vitals
onCLS(sendToAnalytics);  // Cumulative Layout Shift
onFID(sendToAnalytics);  // First Input Delay
onLCP(sendToAnalytics);  // Largest Contentful Paint
onFCP(sendToAnalytics);  // First Contentful Paint
onTTFB(sendToAnalytics); // Time to First Byte