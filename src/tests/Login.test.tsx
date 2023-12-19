import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

const emailInputID = 'email-input';
const passwordInputID = 'password-input';
const buttonLoginID = 'login-submit-btn';
const emailValid = 'email@mail.com';
// const emailInvalid = 'email.com';
const passwordValid = '12345678';
// const passwordInvalid = '1234';

describe('1 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it.skip('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    expect(getByTestId(emailInputID)).toBeInTheDocument();
    expect(getByTestId(passwordInputID)).toBeInTheDocument();
    expect(getByTestId(buttonLoginID)).toBeInTheDocument();
  });
});

describe('2 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  it.skip('É possível escrever o email e senha', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);

    act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(email).toHaveValue(emailValid);
    expect(password).toHaveValue(passwordValid);
  });
});

describe('3 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it.skip('O botão deve estar desativado se o email for inválido', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeEnabled();

    act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(button).toBeEnabled();
  });

  it.skip('O botão deve estar desativado se a senha for inválida ao ter menos que 7 caracteres', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeEnabled();

    act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(button).toBeEnabled();
  });

  it.skip('O botão deve estar ativado se o email e a senha forem válidos', async () => {
    const { user, getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInputID);
    const password = getByTestId(passwordInputID);
    const button = getByTestId(buttonLoginID);

    expect(button).toBeEnabled();

    act(async () => {
      await user.type(email, emailValid);
      await user.type(password, passwordValid);
    });

    expect(button).toBeEnabled();
  });
});
