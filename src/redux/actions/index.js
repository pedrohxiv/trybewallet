export const LOGIN = 'LOGIN';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const ADD_EXPENSES_VALUES = 'ADD_EXPENSES_VALUES';
export const DELETE_EXPENSES_VALUES = 'DELETE_EXPENSES_VALUES';
export const SET_EDITOR_TRUE = 'SET_EDITOR_TRUE';
export const EDIT_EXPENSE_VALUES = 'EDIT_EXPENSE_VALUES';

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
  type: ADD_EXPENSES_VALUES,
  payload: { ...values },
});

export const removeExpense = (expenses) => ({
  type: DELETE_EXPENSES_VALUES,
  payload: expenses,
});

export const setEditorTrue = (id) => ({
  type: SET_EDITOR_TRUE,
  payload: id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE_VALUES,
  payload: expense,
});
