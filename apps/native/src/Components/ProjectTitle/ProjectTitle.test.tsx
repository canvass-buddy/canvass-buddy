import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectTitle from './ProjectTitle';

describe('<ProjectTitle />', () => {
  test('it should mount', () => {
    render(<ProjectTitle />);
    
    const projectTitle = screen.getByTestId('ProjectTitle');

    expect(projectTitle).toBeInTheDocument();
  });
});