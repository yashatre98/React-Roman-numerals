import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Converter from '../components/manualConverter';
import SpectrumConverter from '../components/adobeSpectrumConverter';

jest.mock('../components/manualConverter', () => jest.fn(() => <div data-testid="manual-converter">Manual Converter</div>));
jest.mock('../components/spectrumConverter', () => jest.fn(() => <div data-testid="spectrum-converter">Spectrum Converter</div>));
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

    test('should render App component with manual and spectrum converters', () => {
        render(<App />);

        // Check if manual converter is rendered
        expect(screen.getByRole('manual-converter')).toBeInTheDocument();

        // Check if spectrum converter is rendered
        const spectrumConverter = screen.getByTestId('spectrum-converter');
        expect(spectrumConverter).toBeInTheDocument();

        // Check the container class for light mode by default
        const appContainer = screen.getByRole('main');
        expect(appContainer).toHaveClass('app-container light');
    });

    test('should toggle dark mode in manual converter', () => {
        const setDarkModeMock = jest.fn();

        // Mock the manual converter with dark mode props
        Converter.mockImplementation(({ darkMode, setDarkMode }) => (
            <div>
                <button data-testid="toggle-dark-mode" onClick={() => setDarkModeMock(!darkMode)}>
                    Toggle Dark Mode
                </button>
            </div>
        ));

        render(<App />);

        const toggleButton = screen.getByTestId('toggle-dark-mode');

        // Click to toggle dark mode
        fireEvent.click(toggleButton);

        // Ensure dark mode was toggled
        expect(setDarkModeMock).toHaveBeenCalledWith(true);
    });

    test('should log info when App component initializes', () => {
        const logInfoMock = jest.spyOn(require('../../logger'), 'info');

        render(<App />);

        expect(logInfoMock).toHaveBeenCalledWith('App component initialized');
        logInfoMock.mockRestore();
    });

    test('should log theme initialization in useEffect', () => {
        const logInfoMock = jest.spyOn(require('../../logger'), 'info');

        render(<App />);

        expect(logInfoMock).toHaveBeenCalledWith('Theme initialized (manual panel) as: light');
        logInfoMock.mockRestore();
    });


});


