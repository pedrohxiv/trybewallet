import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(addExpenses({ ...this.state }));
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Valor"
            data-testid="value-input"
            onChange={ ({ target: { value } }) => this.setState({ value }) }
          />
          <input
            type="text"
            placeholder="Descrição"
            data-testid="description-input"
            onChange={ ({ target: { value } }) => this.setState({ description: value }) }
          />
          <select
            data-testid="currency-input"
            onChange={ ({ target: { value } }) => this.setState({ currency: value }) }
          >
            {currencies.map((currencie) => (
              <option key={ currencie }>{currencie}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            onChange={ ({ target: { value } }) => this.setState({ method: value }) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            onChange={ ({ target: { value } }) => this.setState({ tag: value }) }
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
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
