import Modal from '../Modal/Modal.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import './Login.css';

function Login({
  onClose,
  onLogin,
  onOpenRegister,
  isSubmitting,
  errorMessage,
}) {
  const { values, errors, isValid, handleChange } = useFormValidation({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    onLogin({
      email: values.email.trim(),
      password: values.password,
    });
  }

  return (
    <Modal title='Inicia sesión' onClose={onClose}>
      <form className='login' onSubmit={handleSubmit} noValidate>
        <label className='login__field' htmlFor='login-email'>
          Correo electrónico
          <input
            id='login-email'
            className='login__input'
            type='email'
            name='email'
            autoComplete='email'
            value={values.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby='login-email-error'
          />
          <span
            id='login-email-error'
            className='login__field-error'
            aria-live='polite'
          >
            {errors.email}
          </span>
        </label>

        <label className='login__field' htmlFor='login-password'>
          Contraseña
          <input
            id='login-password'
            className='login__input'
            type='password'
            name='password'
            autoComplete='current-password'
            value={values.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.password)}
            aria-describedby='login-password-error'
          />
          <span
            id='login-password-error'
            className='login__field-error'
            aria-live='polite'
          >
            {errors.password}
          </span>
        </label>

        <p className='login__server-error' role='alert'>
          {errorMessage}
        </p>

        <button
          className='login__submit'
          type='submit'
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
        </button>

        <p className='login__footer'>
          ¿Todavía no tienes una cuenta?{' '}
          <button
            className='login__link'
            type='button'
            onClick={onOpenRegister}
            disabled={isSubmitting}
          >
            Regístrate
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default Login;
