
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

    fireEvent.click(buttonElement); // Click convert without typing anything

    const errorMessage = await screen.findByText(/Please enter a number/i);
    expect(errorMessage).toBeInTheDocument();
    expect(log.error).toHaveBeenCalledWith('Empty input field');
  });

  // Test 3: Displays Result for Valid Input
  test('displays result for valid input', async () => {
    axios.get.mockResolvedValueOnce({ data: { output: 'X' } }); // Mock API response

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
    axios.get.mockResolvedValueOnce({ data: { output: 'X' } }); // Mock API response

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
    expect(axios.get).toHaveBeenCalledTimes(1); // Ensure API is only called once
  });

  // Test 5: Handles API Errors Gracefully
  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Mock API error

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

    await userEvent.type(inputElement, '5000'); // Out of range input
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