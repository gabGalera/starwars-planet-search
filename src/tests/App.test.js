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
  userEvent.selectOptions(compareFilter, 'maior que')
  userEvent.type(numberFilter, '12120')
  userEvent.click(buttonFilter)

  userEvent.selectOptions(columnFilter, 'orbital_period')
  userEvent.selectOptions(compareFilter, 'menor que')
  userEvent.click(buttonFilter)

  userEvent.selectOptions(columnFilter, 'diameter')
  userEvent.selectOptions(compareFilter, 'igual a')
  userEvent.click(buttonFilter)
  
  let deleteButtons = await screen.findAllByText(/apagar/i)
  userEvent.click(deleteButtons[2])
  
  deleteButtons = await screen.findAllByText(/apagar/i)
  expect(deleteButtons).toHaveLength(2)

  const removeAllButton = await screen.findByText(/remover/i)
  userEvent.click(removeAllButton)

  expect(deleteButtons[0]).not.toBeInTheDocument()
  const sortButton = await screen.findByRole('button', {  name: /Ordenar/i })
  const sortInputs = await screen.findByRole("textbox", { value: 'ASC' })
  userEvent.click(sortInputs);
  userEvent.click(sortButton);
  screen.debug()

});
