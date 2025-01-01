import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpectrumConverter from '../components/SpectrumConverter'; // Adjust path if necessary

describe('SpectrumConverter Component', () => {
  // Test 1: Render Check
  test('renders input and button', () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  // Test 2: Invalid Input Error Message
  test('displays error message for invalid input', async () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.click(inputElement); // Focus input
    await userEvent.keyboard('invalid'); // Type value
    fireEvent.click(buttonElement);

    // Use findByText for async rendering
    const errorMessage = await screen.findByText(/invalid input/i, { exact: false });
    expect(errorMessage).toBeInTheDocument();
  });

  // Test 3: Valid Input Result
  test('displays result for valid input', async () => {
    render(<SpectrumConverter />);
    const inputElement = screen.getByLabelText(/enter a number/i, { exact: false });
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });

    await userEvent.click(inputElement); // Focus input
    await userEvent.keyboard('10'); // Simulate typing valid input
    fireEvent.click(buttonElement);
    // Use test ID for result
    const result = await screen.findByTestId('result');
    expect(result).toHaveTextContent(/Roman numeral: X/i); // Replace 'X' with actual output
  });
});