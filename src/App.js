import React from 'react';
import { useLoginForm } from './hooks/useLoginForm';
import FormInput from './components/Login/FormInput';
import './App.css';

/**
 * Główny komponent aplikacji
 *
 * @param {Object} props - Właściwości komponentu
 * @param {boolean} props.isTest - Flaga określająca czy komponent jest używany w testach
 * @returns {JSX.Element} - Element JSX reprezentujący aplikację
 */
function App({ isTest = process.env.NODE_ENV === 'test' }) {
  const { formik, isSubmitting, successMessage, error } = useLoginForm({
    isTest,
  });

  return (
    <div className='App'>
      <div className='login-container'>
        <h2>Formularz logowania</h2>

        {/* Komunikat o sukcesie */}
        {successMessage && (
          <div className='success-message'>{successMessage}</div>
        )}

        {/* Komunikat o błędzie */}
        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={formik.handleSubmit}>
          <FormInput
            id='login'
            label='Login'
            name='login'
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.login}
            touched={formik.touched.login}
            dataTestId='login-input'
          />

          <FormInput
            id='password'
            label='Hasło'
            type='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            dataTestId='password-input'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className={isSubmitting ? 'submitting' : ''}
            data-testid='login-button'
          >
            <span data-testid='button-text'>
              {isSubmitting ? 'Logowanie...' : 'Login'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
