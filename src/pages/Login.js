import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

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
      <div>
        <div>
          <input
            type="text"
            placeholder="Email"
            data-testid="email-input"
            onChange={ ({ target: { value } }) => this.setState({ email: value }) }
          />
          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => this.setState({ password: value }) }
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={ !/\S+@\S+\.\S+/.test(email) || password.length < minLength }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
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
