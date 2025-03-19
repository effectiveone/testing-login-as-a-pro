# testing-login-as-a-pro

## Overview

This project focuses on testing a login system using the **Yup** validation library. The core of the documentation is built around unit and integration tests, ensuring form validation and proper login behavior.

## Tech Stack

- **React** (for the login form UI)
- **Yup** (for validation)
- **@testing-library/react** (for unit and integration tests)
- **Jest** (for test execution)

## Features Tested

- **Form field rendering**: Ensures that all necessary input fields and labels are present.
- **Validation rules**: Checks if Yup correctly validates login credentials.
- **Error handling**: Ensures errors appear for invalid input (empty fields, short passwords, etc.).
- **Form submission behavior**: Tests if correct credentials allow successful login.

## Test Examples

The test suite covers multiple scenarios:

### Checking element existence

```js
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Element existence in the login form', () => {
  it('should render login and password inputs', () => {
    render(<App />);
    expect(screen.getByTestId('login-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('should have a login button', () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
```

### Validation Tests

```js
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Login validation', () => {
  it('should show an error when login is empty', async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/login/i));
    expect(
      await screen.findByText(/Login field is required/i),
    ).toBeInTheDocument();
  });

  it('should show an error for short login', async () => {
    render(<App />);
    await userEvent.type(screen.getByTestId('login-input'), 'abc');
    fireEvent.click(screen.getByText(/login/i));
    expect(
      await screen.findByText(/Login must be at least 6 characters/i),
    ).toBeInTheDocument();
  });
});
```

### Testing Successful Login

````js
describe('Form submission', () => {
  it('should submit successfully with valid data', async () => {
    render(<App />);
    await userEvent.type(screen.getByTestId('login-input'), 'validUser');
    await userEvent.type(screen.getByTestId('password-input'), 'strongPass123');
    fireEvent.click(screen.getByText(/login/i));
    expect(await screen.findByText(/Login successful/i
    ```
````
