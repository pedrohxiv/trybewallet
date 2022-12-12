import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';

describe('Renderize a página de Login', () => {
  test('Verifica se a rota da página deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica se existe um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailInputEl = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInputEl = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
  });

  test('Verifica se existe um botão que o usuário possa clicar', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(buttonEl).toBeInTheDocument();
  });

  test('Verifica se inserir informações inválidas o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInputEl = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInputEl = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInputEl, 'pedro');
    userEvent.type(passwordInputEl, '123456');
    expect(buttonEl).toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);

    userEvent.type(emailInputEl, 'pedro@mail');
    userEvent.type(passwordInputEl, '123456');
    expect(buttonEl).toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);

    userEvent.type(emailInputEl, 'pedro@mail.');
    userEvent.type(passwordInputEl, '123456');
    expect(buttonEl).toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);

    userEvent.type(emailInputEl, 'pedro@mail');
    userEvent.type(passwordInputEl, '12345');
    expect(buttonEl).toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);

    userEvent.type(emailInputEl, 'pedro@mail.com');
    userEvent.type(passwordInputEl, '123');
    expect(buttonEl).toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);

    userEvent.type(emailInputEl, 'pedro@mail.com');
    userEvent.type(passwordInputEl, '123456');
    expect(buttonEl).not.toBeDisabled();
    userEvent.clear(emailInputEl);
    userEvent.clear(passwordInputEl);
  });

  test('Verifica se ao clicar no botão as informações são salvas no estado da aplicação', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInputEl = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInputEl = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(store.getState().user.email).toBe('');
    userEvent.type(emailInputEl, 'pedro@gmail.com');
    userEvent.type(passwordInputEl, '123456');
    userEvent.click(buttonEl);
    expect(store.getState().user.email).toBe('pedro@gmail.com');
  });

  test('Verifica se a rota muda para "/carteira" após clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInputEl = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInputEl = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEl = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInputEl, 'pedrohenrique@gmail.com');
    userEvent.type(passwordInputEl, '12345678');
    userEvent.click(buttonEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
