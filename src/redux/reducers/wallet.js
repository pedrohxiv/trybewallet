import {
  ADD_EXPENSES_VALUES,
  DELETE_EXPENSES_VALUES,
  EDIT_EXPENSE_VALUES,
  SET_EDITOR_TRUE,
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
  case SET_EDITOR_TRUE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_EXPENSE_VALUES:
    return {
      ...state,
      editor: false,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
