import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const TOTAL_FIELD_TEST_ID = 'total-field';
const VALUE_INPUT_TEST_ID = 'value-input';
const DESCRIPTION_INPUT_TEST_ID = 'description-input';
const TAG_STRING_TEST = 'Alimentação';

describe('Renderize a página Wallet', () => {
  describe('Verifica o componente "Header" da página', () => {
    test('Verifica se existe um elemento que exiba o email do usuário que fez login', () => {
      const initialEntries = ['/carteira'];
      const initialState = { user: { email: 'pedrohenrique@gmail.com' } };
      renderWithRouterAndRedux(<App />, { initialState, initialEntries });

      const emailTextFieldEl = screen.getByText(/pedrohenrique@gmail\.com/i);
      expect(emailTextFieldEl).toBeInTheDocument();
    });

    test('Verifica se existe um elemento com o valor total das despesas e um elemento que mostre o cambio "BRL"', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const totalExpensesFieldEl = screen.getByTestId(TOTAL_FIELD_TEST_ID);
      const currencyFieldEl = screen.getByTestId('header-currency-field');
      expect(totalExpensesFieldEl).toBeInTheDocument();
      expect(currencyFieldEl).toBeInTheDocument();
    });
  });
  describe('Verifica o componente "WalletForm" da página', () => {
    test('Verifica se a API foi chamada quando a página for renderizada', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue(mockData)({
        json: jest.fn().mockResolvedValue(mockData),
      });
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://economia.awesomeapi.com.br/json/all',
      );
    });

    test('Verifica se existe um campo para adicionar valor da despesa', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const valueInputEl = screen.getByTestId(VALUE_INPUT_TEST_ID);
      expect(valueInputEl).toBeInTheDocument();
    });
    test('Verifica se existe um campo para adicionar a descrição da despesa', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const descriptionInputEl = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
      expect(descriptionInputEl).toBeInTheDocument();
    });
    test('Verifica se existe um campo para selecionar em qual moeda será registrada a despesa', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const currencyInputEl = screen.getByTestId('currency-input');
      expect(currencyInputEl).toBeInTheDocument();
    });
    test('Verifica se existe um campo para adicionar qual método de pagamento será utilizado', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const methodInputEl = screen.getByTestId('method-input');
      expect(methodInputEl).toBeInTheDocument();
    });
    test('Verifica se existe um campo para selecionar uma categoria (tag) para a despesa', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });

      const tagInputEl = screen.getByTestId('tag-input');
      expect(tagInputEl).toBeInTheDocument();
    });

    test('Verifica se é possivel adicionar os valores dos inputs a store', () => {
      const initialEntries = ['/carteira'];
      const initialState = {
        wallet: {
          currencies: [
            'USD',
            'CAD',
            'GBP',
            'ARS',
            'BTC',
            'LTC',
            'EUR',
            'JPY',
            'CHF',
            'AUD',
            'CNY',
            'ILS',
            'ETH',
            'XRP',
            'DOGE',
          ],
          expenses: [],
          editor: false,
          idToEdit: 0,
        },
      };
      renderWithRouterAndRedux(<App />, {
        initialEntries,
        initialState,
      });

      const valueInputEl = screen.getByTestId(VALUE_INPUT_TEST_ID);
      const descriptionInputEl = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
      const currencyInputEl = screen.getByTestId('currency-input');
      const methodInputEl = screen.getByTestId('method-input');
      const tagInputEl = screen.getByTestId('tag-input');
      const addExpenseButtonEl = screen.getByRole('button', {
        name: /adicionar despesa/i,
      });

      act(() => {
        userEvent.type(valueInputEl, '10');
        userEvent.type(descriptionInputEl, 'Almoço');
        userEvent.selectOptions(
          currencyInputEl,
          screen.getByRole('option', { name: 'USD' }),
        );
        userEvent.selectOptions(
          methodInputEl,
          screen.getByRole('option', { name: 'Dinheiro' }),
        );
        userEvent.selectOptions(
          tagInputEl,
          screen.getByRole('option', { name: TAG_STRING_TEST }),
        );
      });

      expect(addExpenseButtonEl).toBeEnabled();
      act(() => {
        userEvent.click(addExpenseButtonEl);
      });
    });

    describe('Verifica o componente "Table" da página', () => {
      test('Verifica se existe uma tabela na página', () => {
        const initialEntries = ['/carteira'];
        const initialState = {
          wallet: {
            currencies: Object.keys(mockData),
            expenses: [
              {
                value: '10',
                description: 'Almoço',
                currency: 'USD',
                method: 'Dinheiro',
                tag: TAG_STRING_TEST,
                id: 0,
                exchangeRates: mockData,
              },
            ],
            editor: false,
            idToEdit: 0,
          },
        };
        renderWithRouterAndRedux(<App />, { initialEntries, initialState });

        const descriptionColumnHeader = screen.getByRole('columnheader', {
          name: /descrição/i,
        });
        expect(descriptionColumnHeader).toBeInTheDocument();
        const descriptionCell = screen.getByRole('cell', {
          name: /almoço/i,
        });
        expect(descriptionCell).toBeInTheDocument();

        const tagColumnHeader = screen.getByRole('columnheader', {
          name: /tag/i,
        });
        expect(tagColumnHeader).toBeInTheDocument();
        const tagCell = screen.getByRole('cell', {
          name: /alimentação/i,
        });
        expect(tagCell).toBeInTheDocument();

        const methodColumnHeader = screen.getByRole('columnheader', {
          name: /método de pagamento/i,
        });
        expect(methodColumnHeader).toBeInTheDocument();
        const methodCell = screen.getByRole('cell', {
          name: /dinheiro/i,
        });
        expect(methodCell).toBeInTheDocument();

        const valueColumnHeader = screen.getByRole('columnheader', {
          name: 'Valor',
        });
        expect(valueColumnHeader).toBeInTheDocument();
        const valueCell = screen.getByRole('cell', {
          name: /10\.00/i,
        });
        expect(valueCell).toBeInTheDocument();

        const currencyColumnHeader = screen.getByRole('columnheader', {
          name: 'Moeda',
        });
        expect(currencyColumnHeader).toBeInTheDocument();
        const currencyCell = screen.getByRole('cell', {
          name: /dólar americano\/real brasileiro/i,
        });
        expect(currencyCell).toBeInTheDocument();

        const exchangeColumnHeader = screen.getByRole('columnheader', {
          name: /câmbio utilizado/i,
        });
        expect(exchangeColumnHeader).toBeInTheDocument();
        const exchangeCell = screen.getByRole('cell', {
          name: /4\.75/i,
        });
        expect(exchangeCell).toBeInTheDocument();

        const convertedValueColumnHeader = screen.getByRole('columnheader', {
          name: /valor convertido/i,
        });
        expect(convertedValueColumnHeader).toBeInTheDocument();
        const convertedValueCell = screen.getByRole('cell', {
          name: /47\.53/i,
        });
        expect(convertedValueCell).toBeInTheDocument();

        const conversionCurrencyColumnHeader = screen.getByRole('columnheader', {
          name: /moeda de conversão/i,
        });
        expect(conversionCurrencyColumnHeader).toBeInTheDocument();
        const conversionCurrencyCell = screen.getByRole('cell', {
          name: 'Real',
        });
        expect(conversionCurrencyCell).toBeInTheDocument();

        const removeEditColumnHeader = screen.getByRole('columnheader', {
          name: /editar\/excluir/i,
        });
        expect(removeEditColumnHeader).toBeInTheDocument();
        const deleteButtonEl = screen.getByTestId('delete-btn');
        const editButtonEl = screen.getByTestId('edit-btn');
        expect(deleteButtonEl).toBeInTheDocument();
        expect(editButtonEl).toBeInTheDocument();
      });

      test('Verifica se o botão "excluir" funciona', async () => {
        const initialEntries = ['/carteira'];
        const initialState = {
          wallet: {
            currencies: Object.keys(mockData),
            expenses: [
              {
                value: '10',
                description: 'Almoço',
                currency: 'USD',
                method: 'Dinheiro',
                tag: TAG_STRING_TEST,
                id: 0,
                exchangeRates: mockData,
              },
              {
                value: '18',
                description: 'Jantar',
                currency: 'USD',
                method: 'Dinheiro',
                tag: TAG_STRING_TEST,
                id: 1,
                exchangeRates: mockData,
              },
            ],
            editor: false,
            idToEdit: 0,
          },
        };
        renderWithRouterAndRedux(<App />, { initialEntries, initialState });

        const totalExpensesFieldEl = screen.getByTestId(TOTAL_FIELD_TEST_ID);
        const deleteButtonEl = screen.getAllByRole('button', { name: /excluir/i });

        expect(totalExpensesFieldEl).toHaveTextContent('133.09');
        userEvent.click(deleteButtonEl[0]);
        expect(totalExpensesFieldEl).toHaveTextContent('85.56');
      });

      test('Verifica se o botão "editar" funciona', async () => {
        const initialEntries = ['/carteira'];
        const initialState = {
          wallet: {
            currencies: Object.keys(mockData),
            expenses: [
              {
                value: '10',
                description: 'Almoço',
                currency: 'USD',
                method: 'Dinheiro',
                tag: TAG_STRING_TEST,
                id: 0,
                exchangeRates: mockData,
              },
              {
                value: '18',
                description: 'Jantar',
                currency: 'USD',
                method: 'Dinheiro',
                tag: TAG_STRING_TEST,
                id: 1,
                exchangeRates: mockData,
              },
            ],
            editor: false,
            idToEdit: 0,
          },
        };
        renderWithRouterAndRedux(<App />, { initialEntries, initialState });

        const totalExpensesFieldEl = screen.getByTestId(TOTAL_FIELD_TEST_ID);
        const valueInputEl = screen.getByTestId(VALUE_INPUT_TEST_ID);
        const descriptionInputEl = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
        const addExpenseButtonEl = screen.getByRole('button', {
          name: /adicionar despesa/i,
        });
        const editButtonEl = screen.getAllByRole('button', { name: /editar/i });

        expect(totalExpensesFieldEl).toHaveTextContent('133.09');
        userEvent.click(editButtonEl[0]);
        expect(addExpenseButtonEl).toHaveTextContent(/Editar despesa/i);
        userEvent.type(valueInputEl, '15');
        userEvent.type(descriptionInputEl, 'Valor do almoço alterado');
        userEvent.click(addExpenseButtonEl);
        expect(totalExpensesFieldEl).toHaveTextContent('156.85');
        expect(addExpenseButtonEl).toHaveTextContent(/Adicionar despesa/i);
      });
    });
  });
});
