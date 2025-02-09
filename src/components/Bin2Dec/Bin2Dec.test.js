// Bin2Dec.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Bin2Dec from './Bin2Dec';

describe('Bin2Dec Component', () => {
  test('displays correct decimal when valid binary is entered', () => {
    render(<Bin2Dec />);
    const input = screen.getByPlaceholderText(/e\.g\. 1011/i);
    fireEvent.change(input, { target: { value: '1011' } });
    // The decimal conversion of binary "1011" is 11.
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  test('shows error on invalid binary input', () => {
    render(<Bin2Dec />);
    const input = screen.getByPlaceholderText(/e\.g\. 1011/i);
    fireEvent.change(input, { target: { value: '1021' } });
    expect(screen.getByText(/please enter only 0 or 1/i)).toBeInTheDocument();
  });

  test('opens and closes the details modal', () => {
    render(<Bin2Dec />);
    const input = screen.getByPlaceholderText(/e\.g\. 1011/i);
    fireEvent.change(input, { target: { value: '1011' } });
    
    // The info button should be in the document.
    const infoButton = screen.getByTitle(/view details/i);
    expect(infoButton).toBeInTheDocument();

    // Click the info button to open the modal.
    fireEvent.click(infoButton);
    expect(screen.getByText(/Math Expression/i)).toBeInTheDocument();

  });
});
