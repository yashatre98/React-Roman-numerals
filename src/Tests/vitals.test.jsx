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

    test('should attach sendToAnalytics to Web Vitals functions', () => {
        // Dynamically import the vitals file to invoke the metric listeners
        jest.isolateModules(() => {
            require('../vitals');
        });

        expect(onCLS).toHaveBeenCalledWith(expect.any(Function));
        expect(onLCP).toHaveBeenCalledWith(expect.any(Function));
        expect(onFCP).toHaveBeenCalledWith(expect.any(Function));
        expect(onTTFB).toHaveBeenCalledWith(expect.any(Function));
    });

    test('should call axios.post with correct data when sendToAnalytics is invoked', async () => {
        const mockMetric = {
            name: 'LCP',
            value: 1234,
        };

        await sendToAnalytics(mockMetric);

        // Verify axios.post was called with the correct parameters
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/react-metrics',
            mockMetric,
            { headers: { 'Content-Type': 'application/json' } }
        );
    });

    test('should log an error if axios.post fails', async () => {
        const mockMetric = {
            name: 'CLS',
            value: 0.1,
        };

        const mockError = new Error('Network error');
        axios.post.mockRejectedValueOnce(mockError);

        // Spy on console.error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await sendToAnalytics(mockMetric);

        // Verify error was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending metric:', mockError);

        consoleErrorSpy.mockRestore();
    });
});