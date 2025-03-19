import React from 'react';
import '../../styles/components/FormInput.scss';

/**
 * Komponent renderujący pojedyncze pole formularza z obsługą błędów
 *
 * @param {Object} props - Właściwości komponentu
 * @param {string} props.id - ID pola
 * @param {string} props.label - Etykieta pola
 * @param {string} props.type - Typ pola (text, password, itp.)
 * @param {string} props.name - Nazwa pola
 * @param {string} props.value - Aktualna wartość pola
 * @param {Function} props.onChange - Funkcja obsługująca zmianę wartości
 * @param {Function} props.onBlur - Funkcja obsługująca zdarzenie utraty fokusu
 * @param {string} props.error - Komunikat błędu (jeśli istnieje)
 * @param {boolean} props.touched - Czy pole było dotknięte
 * @param {string} props.dataTestId - Atrybut testowy dla testów automatycznych
 * @returns {JSX.Element} - Element JSX reprezentujący pole formularza
 */
const FormInput = ({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  dataTestId,
}) => {
  // Sprawdzamy czy pole zostało dotknięte i ma błąd
  const hasError = touched && error;

  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={hasError ? 'error' : ''}
        data-testid={dataTestId}
      />
      {hasError && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default FormInput;
