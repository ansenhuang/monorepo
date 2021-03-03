import { screen } from '@testing-library/react';

test('renders form', () => {
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
