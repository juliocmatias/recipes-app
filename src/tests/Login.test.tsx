import { act, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const emailInputID = 'email-input';
const passwordInputID = 'password-input';
const buttonLoginID = 'login-submit-btn';
const emailValid = 'email@mail.com';
const emailInvalid = 'email.com';
const passwordValid = '12345678';
const passwordInvalid = '1234';

describe('1 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    expect(getByTestId(emailInputID)).toBeInTheDocument();
    expect(getByTestId(passwordInputID)).toBeInTheDocument();
    expect(getByTestId(buttonLoginID)).toBeInTheDocument();
  });
});

describe('2 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email e senha', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);

    await act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(email).toHaveValue(emailValid);
    expect(password).toHaveValue(passwordValid);
  });
});

describe('3 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeDisabled();

    await act(async () => {
      await user.type(email, emailInvalid);
      await user.type(password, passwordValid);
    });

    expect(button).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha for inválida ao ter menos que 7 caracteres', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeDisabled();

    await act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordInvalid);
    });

    expect(button).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeDisabled();

    await act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(button).toBeEnabled();
  });
});

describe('4 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave `user`', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('Após o login, os dados devem estar salvos no localStorage', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const button = getByTestId(buttonLoginID);

    expect(button).toBeDisabled();

    await act(async () => {
      await user.type(getByTestId(emailInputID), emailValid);
      await user.type(getByTestId(passwordInputID), passwordValid);
    });

    expect(button).toBeEnabled();

    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: emailValid }));
    });
  });
});

describe('5 - Redirecione a pessoa usuária para a tela principal de receitas de comidas', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('A rota muda para a tela principal de receitas de comidas', async () => {
    const { user, getByTestId } = renderWithRouter(<App />);

    expect(getByTestId(buttonLoginID)).toBeDisabled();

    expect(localStorage.getItem('user')).toBe(null);

    await act(async () => {
      await user.type(getByTestId(emailInputID), emailValid);
      await user.type(getByTestId(passwordInputID), passwordValid);
    });

    await user.click(getByTestId(buttonLoginID));

    await waitFor(() => expect(window.location.pathname).toBe('/meals'));
  });
});
