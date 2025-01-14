
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
// import '../vitals'; // Ensure vitals is imported
import '../index.css';

// Mock the DOM element and the createRoot function
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(),
}));

describe('Main entry point', () => {
    let rootMock;

    beforeEach(() => {
        // Mock the DOM element
        const rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);

        // Mock the render method
        rootMock = {
            render: jest.fn(),
        };
        createRoot.mockReturnValue(rootMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render the App component inside StrictMode', () => {
        // Dynamically import the main file to trigger its execution
        require('../main');

        // Ensure createRoot is called with the correct DOM element
        expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));

        // Ensure render is called with StrictMode and App component
        expect(rootMock.render).toHaveBeenCalledWith(
            <StrictMode>
                <App />
            </StrictMode>
        );
    });
});