/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
