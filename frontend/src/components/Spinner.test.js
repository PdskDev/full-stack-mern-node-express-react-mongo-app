import { render, screen } from '@testing-library/react';

import React from 'react';
import Spinner from './Spinner';


describe('Spinner', () => {
  test('render correctly', () => {
    render(<Spinner />);

    const containerDiv = screen.getAllByTestId('spin-container');

    expect(containerDiv[0]).toBeInTheDocument();

    const innerDiv = screen.getAllByTestId('inner-container');
    expect(innerDiv[0]).toBeInTheDocument();
  });
});
