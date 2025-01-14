/*
    This file tests the vitals.js file. The vitals.js file listens for Web Vitals metrics and sends them to an analytics endpoint.
    The file uses the web-vitals library to listen for metrics and axios to send the metrics to the endpoint.
    The tests cover the following scenarios:
        1. Attaching sendToAnalytics to Web Vitals functions: Checks if the sendToAnalytics function is attached to the Web Vitals functions.
        2. Sending metrics to analytics: Checks if the sendToAnalytics function sends the correct data to the analytics endpoint.
        3. Error handling for failed requests: Checks if the sendToAnalytics function logs an error when the request fails.
*/


import { onCLS, onLCP, onFCP, onTTFB } from 'web-vitals';
import axios from 'axios';
import { sendToAnalytics } from '../vitals';

jest.mock('web-vitals', () => ({
    onCLS: jest.fn(),
    onLCP: jest.fn(),
    onFCP: jest.fn(),
    onTTFB: jest.fn(),
}));

jest.mock('axios');

describe('Vitals Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // The vitals.js file should attach the sendToAnalytics function to the Web Vitals functions.
    test('should attach sendToAnalytics to Web Vitals functions', () => {
        jest.isolateModules(() => {
            require('../vitals');
        });

        expect(onCLS).toHaveBeenCalledWith(expect.any(Function));
        expect(onLCP).toHaveBeenCalledWith(expect.any(Function));
        expect(onFCP).toHaveBeenCalledWith(expect.any(Function));
        expect(onTTFB).toHaveBeenCalledWith(expect.any(Function));
    });

    // The sendToAnalytics function should send the correct data to the analytics endpoint.
    test('should call axios.post with correct data when sendToAnalytics is invoked', async () => {
        const mockMetric = {
            name: 'LCP',
            value: 1234,
        };

        await sendToAnalytics(mockMetric);

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/react-metrics',
            mockMetric,
            { headers: { 'Content-Type': 'application/json' } }
        );
    });

    // The sendToAnalytics function should log an error when the request fails.
    test('should log an error if axios.post fails', async () => {
        const mockMetric = {
            name: 'CLS',
            value: 0.1,
        };

        const mockError = new Error('Network error');
        axios.post.mockRejectedValueOnce(mockError);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await sendToAnalytics(mockMetric);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending metric:', mockError);

        consoleErrorSpy.mockRestore();
    });
});