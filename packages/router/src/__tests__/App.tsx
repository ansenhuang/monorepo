import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from '..';

test('renders router', () => {
  render(<Link to="/">learn react</Link>);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
