import { onCLS, onLCP, onFCP, onTTFB } from 'web-vitals';
import axios from 'axios';


const sendToAnalytics = async (metric) => {
    try {
        
        await axios.post('http://localhost:3000/react-metrics', metric, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Metric sent:', metric); 
    } catch (error) {
        console.error('Error sending metric:', error); 
    }
};


// Capture Web Vitals
onCLS(sendToAnalytics);  // Cumulative Layout Shift
onLCP(sendToAnalytics);  // Largest Contentful Paint
onFCP(sendToAnalytics);  // First Contentful Paint
onTTFB(sendToAnalytics); // Time to First Byte