/*
    This test file is used to test the main entry point of the application.
    The main entry point is the file that is executed when the application is loaded.
    In this case, the main entry point is the main.jsx file.
    The main entry point is responsible for rendering the root component of the application.
    The root component is the component that contains the entire application.
    In this case, the root component is the App component.
    The main entry point should render the root component inside a StrictMode component.
    The StrictMode component is used to detect potential problems in the application.
    This test file uses Jest to test the main entry point of the application.
    It mocks the DOM element and the createRoot function to simulate the rendering process.
    It then checks if the createRoot function is called with the correct DOM element and if the render method is called with the correct components.
*/

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import '../index.css';

// Mock the DOM element and the createRoot function
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(),
}));

describe('Main entry point', () => {
    let rootMock;
    //
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

    // Test if the App component is rendered inside StrictMode
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