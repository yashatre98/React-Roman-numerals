import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Converter from '../components/Converter'; // Adjust based on path

describe('Converter Component', () => {
  test('renders input and button', () => {
    render(<Converter />);
    const inputElement = screen.getByPlaceholderText(/Enter a number/i);
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('displays error message for invalid input', async () => {
    render(<Converter />);
    const inputElement = screen.getByPlaceholderText(/Enter a number/i);
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral./i });    
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'invalid' } });
    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/invalid input/i, { exact: false });
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays result for valid input', async () => {
    render(<Converter />);
    const inputElement = screen.getByPlaceholderText(/Enter a number/i);
    const buttonElement = screen.getByRole('button', { name: /convert to roman numeral/i });    
   
    fireEvent.change(inputElement, { target: { value: '10' } });
    fireEvent.click(buttonElement);

    const result = await screen.findByTestId('result');
        expect(result).toBeInTheDocument();
  });
});