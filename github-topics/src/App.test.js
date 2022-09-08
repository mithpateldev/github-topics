import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import App from './App';

test('renders app component', () => {
  const mocks = []
  render(<MockedProvider mocks={mocks} addTypename={false}><App /></MockedProvider>);
  const element = screen.getByTestId('app');
  expect(element).toBeInTheDocument();
});
