// Dec2Bin.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dec2Bin from './Dec2Bin';

describe('Dec2Bin Component', () => {
  test('displays correct binary when valid decimal is entered', () => {
    render(<Dec2Bin />);
    const input = screen.getByPlaceholderText(/e\.g\. 13/i);
    fireEvent.change(input, { target: { value: '13' } });
    // The binary conversion of decimal 13 is "1101".
    // Note: if you have formatting (e.g., spaces every 4 digits), adjust the expected text accordingly.
    expect(screen.getByText(/1101/)).toBeInTheDocument();
  });

  test('shows error when non-numeric input is entered', () => {
    render(<Dec2Bin />);
    const input = screen.getByPlaceholderText(/e\.g\. 13/i);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText(/please enter only decimal digits/i)).toBeInTheDocument();
  });

  test('opens and closes the details modal for division steps', () => {
    render(<Dec2Bin />);
    const input = screen.getByPlaceholderText(/e\.g\. 13/i);
    fireEvent.change(input, { target: { value: '13' } });
    
    const infoButton = screen.getByTitle(/view details/i);
    expect(infoButton).toBeInTheDocument();
    
    // Click to open modal
    fireEvent.click(infoButton);
    expect(screen.getByText(/We repeatedly divide by 2/i)).toBeInTheDocument();
    
    // Click the close button inside modal
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(screen.queryByText(/We repeatedly divide by 2/i)).not.toBeInTheDocument();
  });
});
