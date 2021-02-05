import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from '@axe/router';

test('renders context', () => {
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});

test('renders link with router', () => {
  render(<Link to="/">learn react</Link>);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
