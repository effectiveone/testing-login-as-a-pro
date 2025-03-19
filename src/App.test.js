import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Element existing in code', () => {
  it('should render login and password input', () => {
    render(<App />);
    const loginInput = screen.getByTestId('login-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should have a button with text "Login"', () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-button');
    const buttonText = screen.getByTestId('button-text');

    expect(loginButton).toBeInTheDocument();
    expect(buttonText).toHaveTextContent(/login/i);
  });

  it('should have proper labels for inputs', () => {
    render(<App />);
    const loginLabel = screen.getByLabelText(/login/i);
    const passwordLabel = screen.getByLabelText(/hasło/i);

    expect(loginLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });
});

describe('testing login behavior', () => {
  it('should show error message when login is empty', async () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-button');
    const loginInput = screen.getByTestId('login-input');

    // Kliknij przycisk login bez wprowadzania loginu
    fireEvent.click(loginButton);

    // Sprawdź czy pojawił się komunikat o błędzie
    const errorMessage = await screen.findByText(/Pole login jest wymagane/i);
    expect(errorMessage).toBeInTheDocument();

    // Sprawdź czy pole login ma klasę błędu
    expect(loginInput).toHaveClass('error');
  });

  it('should show error message if login is less than 6 characters', async () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-button');
    const loginInput = screen.getByTestId('login-input');

    // Wprowadź login krótszy niż 6 znaków
    await userEvent.type(loginInput, 'abc');

    // Kliknij przycisk login
    fireEvent.click(loginButton);

    // Sprawdź czy pojawił się komunikat o błędzie
    const errorMessage = await screen.findByText(
      /Login musi mieć co najmniej 6 znaków/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not show error when login is valid', async () => {
    render(<App />);
    const loginInput = screen.getByTestId('login-input');

    // Wprowadź prawidłowy login
    await userEvent.type(loginInput, 'poprawny_login');

    // Sprawdź czy nie ma komunikatu o błędzie
    const errorMessage = screen.queryByText(
      /Login musi mieć co najmniej 6 znaków/i,
    );
    expect(errorMessage).not.toBeInTheDocument();

    // Sprawdź czy pole nie ma klasy błędu
    expect(loginInput).not.toHaveClass('error');
  });
});

describe('testing password behavior', () => {
  it('should show error message when password is empty', async () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-button');
    const passwordInput = screen.getByTestId('password-input');

    // Kliknij przycisk login bez wprowadzania hasła
    fireEvent.click(loginButton);

    // Sprawdź czy pojawił się komunikat o błędzie
    const errorMessage = await screen.findByText(/Pole hasło jest wymagane/i);
    expect(errorMessage).toBeInTheDocument();

    // Sprawdź czy pole hasła ma klasę błędu
    expect(passwordInput).toHaveClass('error');
  });

  it('should show error message if password is less than 6 characters', async () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-button');
    const passwordInput = screen.getByTestId('password-input');

    // Wprowadź hasło krótsze niż 6 znaków
    await userEvent.type(passwordInput, 'abc');

    // Kliknij przycisk login
    fireEvent.click(loginButton);

    // Sprawdź czy pojawił się komunikat o błędzie
    const errorMessage = await screen.findByText(
      /Hasło musi mieć co najmniej 6 znaków/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not show error when password is valid', async () => {
    render(<App />);
    const passwordInput = screen.getByTestId('password-input');

    // Wprowadź prawidłowe hasło
    await userEvent.type(passwordInput, 'tajne_haslo123');

    // Sprawdź czy nie ma komunikatu o błędzie
    const errorMessage = screen.queryByText(
      /Hasło musi mieć co najmniej 6 znaków/i,
    );
    expect(errorMessage).not.toBeInTheDocument();

    // Sprawdź czy pole nie ma klasy błędu
    expect(passwordInput).not.toHaveClass('error');
  });
});

describe('testing form submission', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should successfully submit the form with valid data', async () => {
    render(<App isTest={true} />);
    const loginInput = screen.getByTestId('login-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    // Wprowadź prawidłowe dane
    await userEvent.type(loginInput, 'poprawny_login');
    await userEvent.type(passwordInput, 'tajne_haslo123');

    // Kliknij przycisk login
    fireEvent.click(loginButton);

    // Poczekaj na pojawienie się komunikatu o sukcesie
    await waitFor(() => {
      expect(screen.getByText(/Logowanie udane/i)).toBeInTheDocument();
    });
  });

  it('should not submit form with invalid data', async () => {
    render(<App />);
    const loginInput = screen.getByTestId('login-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    // Wprowadź nieprawidłowe dane
    await userEvent.type(loginInput, 'krótki');
    await userEvent.type(passwordInput, 'abc');

    // Kliknij przycisk login
    fireEvent.click(loginButton);

    // Sprawdź czy nie pojawił się komunikat o sukcesie
    const successMessage = screen.queryByText(/Logowanie udane/i);
    expect(successMessage).not.toBeInTheDocument();

    // Sprawdź czy pojawiły się komunikaty o błędach
    const passwordErrorMessage = await screen.findByText(
      /Hasło musi mieć co najmniej 6 znaków/i,
    );
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
