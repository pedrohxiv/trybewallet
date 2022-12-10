import {
  ADD_EXPENSES_VALUES,
  DELETE_EXPENSES_VALUES,
  REQUEST_SUCCESSFUL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES_VALUES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES_VALUES:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
