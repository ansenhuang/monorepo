import { screen } from '@testing-library/react';

test('renders sortable', () => {
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
