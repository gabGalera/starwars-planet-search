import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { mockData } from './mockData'
import userEvent from '@testing-library/user-event';

test('I am your test', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  render(<App />);
  const linkElement = screen.getByText(/loading/i);
  expect(linkElement).toBeInTheDocument();

  await waitForElementToBeRemoved(linkElement)
  const textFilter = await screen.findByTestId(/name-filter/)
  
  userEvent.type(textFilter, 'Tat')
  expect(screen.queryByText(/tatooine/i)).toBeInTheDocument();
});
