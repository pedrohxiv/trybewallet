import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoTrybeWallet from '../images/logo-trybe-wallet.png';
import moedasIcon from '../images/moedas.png';
import usuarioIcon from '../images/usuario.png';

class Header extends Component {
  render() {
    const { email, amount } = this.props;
    return (
      <div className="header-container">
        <div className="header-image-box">
          <img
            src={ logoTrybeWallet }
            alt="Logo Trybe"
          />
        </div>
        <div className="total-field-box">
          <img
            className="total-field-image"
            src={ moedasIcon }
            alt="Icone de moedas"
          />
          <p className="total-field-title">Total de despesas: </p>
          <p
            className="total-field-value"
            data-testid="total-field"
          >
            {amount
              .map(
                (value) => Object.values(value.exchangeRates).find(
                  (exchangeRate) => exchangeRate.code === value.currency,
                ).ask * value.value,
              )
              .reduce((totalValue, currValue) => totalValue + currValue, 0)
              .toFixed(2)}
          </p>
          <p
            className="total-field-currency"
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </div>
        <div className="email-box">
          <img
            className="email-image"
            src={ usuarioIcon }
            alt="Icone de usuario"
          />
          <p
            className="email-title"
            data-testid="email-field"
          >
            {email}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
