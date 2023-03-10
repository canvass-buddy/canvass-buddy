import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectList from './ProjectList';

describe('<ProjectList />', () => {
  test('it should mount', () => {
    render(<ProjectList />);
    
    const projectList = screen.getByTestId('ProjectList');

    expect(projectList).toBeInTheDocument();
  });
});