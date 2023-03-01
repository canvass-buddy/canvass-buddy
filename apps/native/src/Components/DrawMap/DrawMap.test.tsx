import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DrawMap from './DrawMap';

describe('<DrawMap />', () => {
  test('it should mount', () => {
    render(<DrawMap />);
    
    const drawMap = screen.getByTestId('DrawMap');

    expect(drawMap).toBeInTheDocument();
  });
});