import Modal from '../Modal/Modal.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import './Register.css';

function Register({
  onClose,
  onRegister,
  onOpenLogin,
  isSubmitting,
  errorMessage,
}) {
  const { values, errors, isValid, handleChange } = useFormValidation({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    onRegister({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  }

  return (
    <Modal title='Regístrate' onClose={onClose}>
      <form
        className='register'
        onSubmit={handleSubmit}
        noValidate
      >
        <label className='register__field' htmlFor='register-name'>
          Nombre
          <input
            id='register-name'
            className='register__input'
            type='text'
            name='name'
            autoComplete='name'
            value={values.name}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby='register-name-error'
          />
          <span
            id='register-name-error'
            className='register__field-error'
            aria-live='polite'
          >
            {errors.name}
          </span>
        </label>

        <label className='register__field' htmlFor='register-email'>
          Correo electrónico
          <input
            id='register-email'
            className='register__input'
            type='email'
            name='email'
            autoComplete='email'
            value={values.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby='register-email-error'
          />
          <span
            id='register-email-error'
            className='register__field-error'
            aria-live='polite'
          >
            {errors.email}
          </span>
        </label>

        <label className='register__field' htmlFor='register-password'>
          Contraseña
          <input
            id='register-password'
            className='register__input'
            type='password'
            name='password'
            autoComplete='new-password'
            value={values.password}
            onChange={handleChange}
            minLength={8}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.password)}
            aria-describedby='register-password-hint register-password-error'
          />
          <span
            id='register-password-hint'
            className='register__hint'
          >
            Usa al menos 8 caracteres.
          </span>
          <span
            id='register-password-error'
            className='register__field-error'
            aria-live='polite'
          >
            {errors.password}
          </span>
        </label>

        <p className='register__server-error' role='alert'>
          {errorMessage}
        </p>

        <button
          className='register__submit'
          type='submit'
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Registrando…' : 'Registrarse'}
        </button>

        <p className='register__footer'>
          ¿Ya tienes una cuenta?{' '}
          <button
            className='register__link'
            type='button'
            onClick={onOpenLogin}
            disabled={isSubmitting}
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default Register;
