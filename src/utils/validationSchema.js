import * as Yup from 'yup';

/**
 * Schemat walidacji formularza logowania
 *
 * Definiuje reguły walidacji dla pól:
 * - login: wymagane, minimum 6 znaków
 * - hasło: wymagane, minimum 6 znaków
 */
export const loginSchema = Yup.object().shape({
  login: Yup.string()
    .required('Pole login jest wymagane')
    .min(6, 'Login musi mieć co najmniej 6 znaków'),
  password: Yup.string()
    .required('Pole hasło jest wymagane')
    .min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});
