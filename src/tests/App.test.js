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

  userEvent.type(textFilter, '')

  const columnFilter = await screen.findByTestId(/column-filter/)
  const compareFilter = await screen.findByTestId(/comparison-filter/)
  const numberFilter = await screen.findByTestId(/value-filter/)
  const buttonFilter = await screen.findByTestId(/button-filter/)

  userEvent.selectOptions(columnFilter, 'population')
  userEvent.selectOptions(compareFilter, 'menor que')
  userEvent.type(numberFilter, '4500000000')
  userEvent.click(buttonFilter)
  screen.debug()

});
