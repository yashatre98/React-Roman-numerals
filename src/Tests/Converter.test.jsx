/*
    Test Plan:
    - Test if the component renders correctly
    - Test if the component toggles to dark mode correctly
    - Test if the component toggles back to light mode correctly
    - Test if the component displays an error message for invalid input
    - Test if the component displays a result for valid input
    - Test if the component handles API errors correctly
    - Test if the component reuses cached results for repeated inputs
    - Test if the component displays an error message when the API fails
    - Test if the component handles empty input correctly
    - Test if the component displays a server error message when the API fails with response data
    - Test if the component does not update state for non-numeric input
    - Test if the component updates state for valid numeric input
    - Test if the component does not update state for non-numeric input
    - Test if the component does not update state for input outside the valid range
    - Test if the component handles empty input correctly
    - Test if the component logs a warning for non-numeric input
*/


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Converter from '../components/manualConverter';
import log from '../../logger';

jest.mock('axios');
jest.mock('../../logger');

describe('Converter Component', () => {
    const mockSetDarkMode = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test if the component renders correctly
    test('renders input and button', () => {
        render(<Converter />);
        const inputElement = screen.getByPlaceholderText(/Enter a number/i);
        const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    // Test if the component toggles to dark mode correctly
    test('toggles to dark mode correctly', () => {
        render(<Converter darkMode={false} setDarkMode={mockSetDarkMode} />);
        const toggleElement = screen.getByRole('button', { name: /switch to dark mode/i });

        fireEvent.click(toggleElement);

        expect(mockSetDarkMode).toHaveBeenCalledWith(true);
        expect(log.info).toHaveBeenCalledWith('Manual theme toggle: Switched to dark mode.');
    });

    // Test if the component toggles back to light mode correctly
    test('toggles back to light mode correctly', () => {
      render(<Converter darkMode={true} setDarkMode={mockSetDarkMode} />);
      const toggleElement = screen.getByRole('button', { name: /switch to light mode/i });

      fireEvent.click(toggleElement);

      expect(mockSetDarkMode).toHaveBeenCalledWith(false);
      expect(log.info).toHaveBeenCalledWith('Manual theme toggle: Switched to light mode.');
  });

    // Test if the component displays an error message for invalid input
    test('displays error message for invalid input', async () => {
        render(<Converter />);
        const inputElement = screen.getByPlaceholderText(/Enter a number/i);
        const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });

        fireEvent.change(inputElement, { target: { value: 'invalid' } });
        fireEvent.click(buttonElement);

        const errorMessage = await screen.findByText(/Please enter/i, { exact: false });
        expect(errorMessage).toBeInTheDocument();
    });

    // Test if the component displays a result for valid input
    test('displays result for valid input', async () => {
        axios.get.mockResolvedValueOnce({ data: { output: 'X' } });

        render(<Converter />);
        const inputElement = screen.getByPlaceholderText(/Enter a number/i);
        const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });

        fireEvent.change(inputElement, { target: { value: '10' } });
        fireEvent.click(buttonElement);

        const result = await screen.findByTestId('result');
        expect(result).toBeInTheDocument();
    });
    
    // Test if the component handles API errors correctly
    test('handles API errors correctly', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<Converter />);
        const inputElement = screen.getByPlaceholderText(/Enter a number/i);
        const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });

        fireEvent.change(inputElement, { target: { value: '10' } });
        fireEvent.click(buttonElement);

        const errorMessage = await screen.findByText(/error connecting to server/i);
        expect(errorMessage).toBeInTheDocument();
        expect(log.error).toHaveBeenCalledWith('API Error');
    });

    // Test if the component reuses cached results for repeated inputs
    test('reuses cached result for repeated inputs', async () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);
      const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });
  
      axios.get.mockResolvedValueOnce({ data: { output: 'X' } });
  
      // First conversion
      fireEvent.change(inputElement, { target: { value: '10' } });
      fireEvent.click(buttonElement);
  
      const result = await screen.findByText(/roman numeral: x/i);
      expect(result).toBeInTheDocument();
  
      // Repeat conversion
      fireEvent.click(buttonElement);
      expect(axios.get).toHaveBeenCalledTimes(1); 
  });

    // Test if the component displays an error message when the API fails
    test('displays an error message when API fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network Error'));

      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);
      const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });

      fireEvent.change(inputElement, { target: { value: '10' } });
      fireEvent.click(buttonElement);

      const errorMessage = await screen.findByText(/error connecting to server/i);
      expect(errorMessage).toBeInTheDocument();
      expect(log.error).toHaveBeenCalledWith('API Error');
    });

    // Test if the component handles empty input correctly
    test('handles empty input correctly', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: ' ' } }); // Simulate clearing the input
      expect(inputElement.value).toBe(''); // Ensure input is empty
    });

    // Test if the component displays a server error message when the API fails with response data
    test('displays server error message when API fails with response data', async () => {
      axios.get.mockRejectedValueOnce({
          response: { data: 'Server error occurred' }, // Mock the response with data
      });

      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);
      const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });

      fireEvent.change(inputElement, { target: { value: '10' } });
      fireEvent.click(buttonElement);

      const errorMessage = await screen.findByText(/server error occurred/i); // Check for server error message
      expect(errorMessage).toBeInTheDocument();
      expect(log.error).toHaveBeenCalledWith('API Error'); // Verify that the error was logged
    });

    // Test if the component does not update state for non-numeric input
    test('handles empty input and does not throw an error', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);


      fireEvent.change(inputElement, { target: { value: 'erer' } }); // Simulate clearing the input
      expect(inputElement.value).toBe(''); // Ensure the value is empty
    });

    //  Test if the component updates state for valid numeric input
    test('does not update state for non-numeric input', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: 'abc' } }); // Simulate invalid input
      expect(inputElement.value).toBe(''); // Input should remain empty (unchanged)
    });

    // Test if the component does not update state for input outside the valid range
    test('updates state for valid numeric input', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: '10' } }); // Valid input
      expect(inputElement.value).toBe('10'); // Input should update
    });

    // Test if the component does not update state for non-numeric input
    test('does not update state for non-numeric input', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: 'abc' } }); // Invalid input
      expect(inputElement.value).toBe(''); // Input should remain empty
    });

    // Test if the component does not update state for input outside the valid range
    test('does not update state for input outside valid range', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);
      fireEvent.change(inputElement, { target: { value: '0' } }); // Below range
      expect(inputElement.value).toBe(''); // State should not update

      fireEvent.change(inputElement, { target: { value: '4000' } }); // Out-of-range input
      expect(inputElement.value).toBe(''); // Input should remain empty
    });
    
    // Test if the component handles empty input correctly
    test('handles empty input correctly', () => {
      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: '' } }); // Empty input
      expect(inputElement.value).toBe(''); // Input should remain empty
    });

    // Test if the component logs a warning for non-numeric input
    test('logs a warning for non-numeric input', () => {
      jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log

      render(<Converter darkMode={false} setDarkMode={jest.fn()} />);
      const inputElement = screen.getByPlaceholderText(/Enter a number/i);

      fireEvent.change(inputElement, { target: { value: 'abc' } }); // Simulate non-numeric input
      expect(console.log).toHaveBeenCalledWith('Invalid input: Non-numeric characters detected');

      console.log.mockRestore(); // Restore original implementation after test
    });

});