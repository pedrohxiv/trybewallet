import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchCurrencies, editExpense } from '../redux/actions';

const INITIAL_CURRENCY = 'USD';
const INITIAL_METHOD = 'Dinheiro';
const INITIAL_TAG = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: INITIAL_CURRENCY,
    method: INITIAL_METHOD,
    tag: INITIAL_TAG,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const { dispatch, expenses } = this.props;
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(addExpenses({ ...this.state, id: expenses.length, exchangeRates: data }));
      this.setState({
        value: '',
        description: '',
        currency: INITIAL_CURRENCY,
        method: INITIAL_METHOD,
        tag: INITIAL_TAG,
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleEdit = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    expenses.forEach((expense) => {
      if (expense.id === idToEdit) {
        expenses[expense.id] = {
          ...this.state,
          id: expense.id,
          exchangeRates: expense.exchangeRates,
        };
      }
    });
    dispatch(editExpense(expenses));
    this.setState({
      value: '',
      description: '',
      currency: INITIAL_CURRENCY,
      method: INITIAL_METHOD,
      tag: INITIAL_TAG,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const tagOptionsList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methodOptionsList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <div className="wallet-form-container">
        <div className="wallet-form-all-inputs">
          <div className="wallet-form-upper-inputs">
            <label
              className="wallet-form-label"
              htmlFor="description"
            >
              Descrição da despesa
              <input
                className="wallet-form-description"
                type="text"
                data-testid="description-input"
                name="description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label
              className="wallet-form-label"
              htmlFor="tag"
            >
              Categoria da despesa
              <select
                className="wallet-form-tag"
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                {tagOptionsList.map((tagOption) => (
                  <option key={ tagOption }>{tagOption}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="wallet-form-under-inputs">
            <label
              className="wallet-form-label"
              htmlFor="value"
            >
              Valor
              <input
                className="wallet-form-value"
                type="number"
                data-testid="value-input"
                name="value"
                id="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label
              className="wallet-form-label"
              htmlFor="method"
            >
              Método de pagamento
              <select
                className="wallet-form-method"
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.handleChange }
              >
                {methodOptionsList.map((methodOption) => (
                  <option key={ methodOption }>{methodOption}</option>
                ))}
              </select>
            </label>
            <label
              className="wallet-form-label"
              htmlFor="currency"
            >
              Moeda
              <select
                className="wallet-form-currency"
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {currencies.map((currencie) => (
                  <option key={ currencie }>{currencie}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="wallet-form-button-container">
          <button
            className="wallet-form-button"
            type="submit"
            disabled={ !value || !description || !currency || !method || !tag }
            onClick={ editor ? this.handleEdit : this.handleSubmit }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
