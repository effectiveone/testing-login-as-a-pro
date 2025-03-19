import { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../utils/validationSchema';

/**
 * Custom hook zarządzający stanem i logiką formularza logowania
 *
 * @param {Object} options - opcje konfiguracyjne hooka
 * @param {boolean} options.isTest - flaga określająca czy hook jest używany w testach
 * @returns {Object} - obiekt zawierający formik i informacje o stanie logowania
 */
export const useLoginForm = (options = {}) => {
  const { isTest = false } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Inicjalizacja formika z walidacją Yup
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError('');

        // Symulacja opóźnienia sieci (pomijana w testach)
        if (!isTest) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // W rzeczywistej aplikacji byłoby tu wywołanie API
        console.log('Dane logowania:', values);

        // Zakończenie procesu logowania
        setSuccessMessage('Logowanie udane');
        setIsSubmitting(false);

        // W środowisku produkcyjnym resetujemy komunikat po 3 sekundach
        if (!isTest) {
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        }
      } catch (err) {
        setIsSubmitting(false);
        setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
        console.error('Błąd logowania:', err);
      }
    },
  });

  return {
    formik,
    isSubmitting,
    successMessage,
    error,
    resetSuccess: () => setSuccessMessage(''),
  };
};
