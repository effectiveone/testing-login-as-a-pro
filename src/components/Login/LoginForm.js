import React, { useEffect } from 'react';
import FormInput from './FormInput';
import { useLoginForm } from '../../hooks/useLoginForm';
import '../../styles/components/LoginForm.scss';

/**
 * Komponent formularza logowania
 *
 * @param {Object} props - Właściwości komponentu
 * @param {boolean} props.isTest - Flaga określająca czy komponent jest używany w testach
 * @returns {JSX.Element} - Element JSX reprezentujący formularz logowania
 */
const LoginForm = ({ isTest = process.env.NODE_ENV === 'test' }) => {
  const { formik, isSubmitting, successMessage, error, resetSuccess } =
    useLoginForm({ isTest });

  // Resetowanie komunikatu sukcesu po 3 sekundach
  useEffect(() => {
    if (successMessage && !isTest) {
      const timer = setTimeout(() => {
        resetSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, resetSuccess, isTest]);

  return (
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
  );
};

export default LoginForm;
