import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, amount } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {amount
            .map(
              (value) => Object.values(value.exchangeRates).find(
                (exchangeRate) => exchangeRate.code === value.currency,
              ).ask * value.value,
            )
            .reduce((totalValue, currValue) => totalValue + currValue, 0)
            .toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
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
