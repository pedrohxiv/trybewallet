import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import logoTrybeWallet from '../images/logo-trybe-wallet.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const minLength = 6;

    return (
      <div className="login-container">
        <div className="login-box">
          <div className="image-box">
            <img
              src={ logoTrybeWallet }
              alt="Logo Trybe"
            />
          </div>
          <div className="inputs-box">
            <input
              className="input-email"
              type="text"
              placeholder="E-mail"
              data-testid="email-input"
              onChange={ ({ target: { value } }) => this.setState({ email: value }) }
            />
            <input
              className="input-password"
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              onChange={ ({ target: { value } }) => this.setState({ password: value }) }
            />
          </div>
          <div className="button-box">
            <button
              className="button-login"
              type="submit"
              disabled={ !/\S+@\S+\.\S+/.test(email) || password.length < minLength }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
