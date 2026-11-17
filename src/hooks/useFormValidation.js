import { useState } from 'react';

export default function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const { name, value } = input;

    input.setCustomValidity('');

    if (name === 'name' && value.trim().length < 2) {
      input.setCustomValidity(
        'El nombre debe tener al menos 2 caracteres sin contar los espacios de los extremos.',
      );
    }

    if (
      name === 'password'
      && new TextEncoder().encode(value).length > 72
    ) {
      input.setCustomValidity(
        'La contraseña no debe superar los 72 bytes. Los acentos y algunos símbolos ocupan más de un byte.',
      );
    }

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: input.validationMessage,
    }));

    setIsValid(input.form.checkValidity());
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
  };
}
