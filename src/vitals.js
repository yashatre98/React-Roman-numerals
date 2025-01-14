/*
    This file is used to capture Web Vitals and send them to the server.
    The file uses the web-vitals library to listen for metrics and axios to send the metrics to the server.
    The sendToAnalytics function sends the metrics to the server.
    The file also includes error handling for failed requests.
*/


import { onCLS, onLCP, onFCP, onTTFB } from 'web-vitals';
import axios from 'axios';


export const sendToAnalytics = async (metric) => {
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