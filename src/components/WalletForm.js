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
    return (
      <div>
        <div>
          <input
            type="number"
            placeholder="Valor"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Descrição"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencie) => (
              <option key={ currencie }>{currencie}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <div>
          <button
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
