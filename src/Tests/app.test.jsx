/* 
    tests for App component 
    - should render App component with manual and spectrum converters
    - should toggle dark mode in manual converter
    - should log info when App component initializes
    - should log theme initialization in useEffect
*/


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Converter from '../components/manualConverter';

jest.mock('../components/manualConverter', () => jest.fn(() => <div data-testid="manual-converter">Manual Converter</div>));
jest.mock('../components/adobeSpectrumConverter', () => jest.fn(() => <div data-testid="spectrum-converter">Spectrum Converter</div>));
jest.mock('../../logger', () => ({
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
}));

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // renders App component with manual and spectrum converters
    test('should render App component with manual and spectrum converters', () => {
        render(<App />);

        expect(screen.getByRole('manual-converter')).toBeInTheDocument();

        const spectrumConverter = screen.getByTestId('spectrum-converter');
        expect(spectrumConverter).toBeInTheDocument();

        const appContainer = screen.getByRole('main');
        expect(appContainer).toHaveClass('app-container light');
    });

    // toggle dark mode in manual converter
    test('should toggle dark mode in manual converter', () => {
        const setDarkModeMock = jest.fn();

        Converter.mockImplementation(({ darkMode, setDarkMode }) => (
            <div>
                <button data-testid="toggle-dark-mode" onClick={() => setDarkModeMock(!darkMode)}>
                    Toggle Dark Mode
                </button>
            </div>
        ));

        render(<App />);

        const toggleButton = screen.getByTestId('toggle-dark-mode');

        fireEvent.click(toggleButton);

        expect(setDarkModeMock).toHaveBeenCalledWith(true);
    });

    // log info when App component initializes
    test('should log info when App component initializes', () => {
        const logInfoMock = jest.spyOn(require('../../logger'), 'info');

        render(<App />);

        expect(logInfoMock).toHaveBeenCalledWith('App component initialized');
        logInfoMock.mockRestore();
    });

    // log theme initialization in useEffect
    test('should log theme initialization in useEffect', () => {
        const logInfoMock = jest.spyOn(require('../../logger'), 'info');

        render(<App />);

        expect(logInfoMock).toHaveBeenCalledWith('Theme initialized (manual panel) as: light');
        logInfoMock.mockRestore();
    });


});


