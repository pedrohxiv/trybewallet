export const LOGIN = 'LOGIN';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const EXPENSES_VALUES = 'EXPENSES_VALUES';

export const login = (value) => ({
  type: LOGIN,
  payload: value,
});

const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
    dispatch(requestSuccessful(currencies));
  } catch (error) {
    console.error(error);
  }
};

export const addExpenses = (values) => ({
  type: EXPENSES_VALUES,
  payload: { ...values },
});
