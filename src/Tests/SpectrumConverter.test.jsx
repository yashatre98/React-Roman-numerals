/*
  This file contains the test cases for the SpectrumConverter component.
  The SpectrumConverter component is responsible for converting numbers to Roman numerals.
  The component makes an API call to fetch the result and displays it on the screen.
  The component also handles various edge cases such as empty input, invalid input, and API errors.
  The tests cover the following scenarios:
      1. Render Check: Checks if the input field and button are rendered correctly.
      2. Empty Input Error Message: Checks if an error message is displayed for an empty input.
      3. Displays Result for Valid Input: Checks if the component displays the correct result for a valid input.
      4. Handles Same Input as Previous: Checks if the component reuses the cached result for the same input.
      5. Handles API Errors Gracefully: Checks if the component displays an error message for API errors.
      6. Invalid Input Logs Warning: Checks if the component logs a warning for invalid input.
      7. Handles Input Out of Range: Checks if the component displays an error message for input out of range.
*/



import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import SpectrumConverter from '../components/adobeSpectrumConverter'; // Adjust path if necessary
import log from '../../logger';

jest.mock('axios'); // Mock axios
jest.mock('../../logger'); // Mock logger

describe('SpectrumConverter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  // Test 1: Render Check
  test('renders input and button', () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  // Test 2: Empty Input Error Message
  test('displays error message for empty input', async () => {
    render(<SpectrumConverter />);
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    fireEvent.click(buttonElement); 

    const errorMessage = await screen.findByText(/Please enter a number/i);
    expect(errorMessage).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('Empty input field');
  });

  // Test 3: Displays Result for Valid Input
  test('displays result for valid input', async () => {
    axios.get.mockResolvedValueOnce({ data: { output: 'X' } }); 

    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.type(inputElement, '10');
    fireEvent.click(buttonElement);

    const result = await screen.findByTestId('result');
    expect(result).toHaveTextContent(/Roman numeral: X/i);
    expect(log.info).toHaveBeenCalledWith('Fetching result for number: 10');
  });

  // Test 4: Handles Same Input as Previous
  test('reuses cached result for repeated inputs', async () => {
    axios.get.mockResolvedValueOnce({ data: { output: 'X' } }); 

    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.type(inputElement, '10');
    fireEvent.click(buttonElement);

    // First call
    const result = await screen.findByTestId('result');
    expect(result).toHaveTextContent(/Roman numeral: X/i);
    expect(log.info).toHaveBeenCalledWith('Fetching result for number: 10');

    // Second call with the same input
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('result')).toHaveTextContent(/Roman numeral: X/i);
    expect(log.debug).toHaveBeenCalledWith('Same number as previous input');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  // Test 5: Handles API Errors Gracefully
  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); 

    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.type(inputElement, '10');
    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/Error connecting to server/i);
    expect(errorMessage).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('API Error');
  });

  // Test 6: Invalid Input Logs Warning
  test('logs a warning for invalid input', async () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });

    await userEvent.type(inputElement, 'i');
    expect(log.warn).toHaveBeenCalledWith('Invalid input: i');
  });

  // Test 7: Handles Input Out of Range
  test('displays error for input out of range', async () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.type(inputElement, '5000'); 
    fireEvent.click(buttonElement);

    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    expect(log.warn).toHaveBeenCalledWith('Invalid input: 5000');
  });

  test('handles API error with response data', async () => {
    // Mock axios to throw an error with a response object
    axios.get.mockRejectedValueOnce({
        response: {
            data: 'Custom error message from server',
        },
    });

    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    // Simulate entering a valid number and clicking the button
    await userEvent.type(inputElement, '10');
    fireEvent.click(buttonElement);

    // Assert that the custom error message is displayed
    const errorMessage = await screen.findByText(/Custom error message from server/i);
    expect(errorMessage).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('API Error');
});

});