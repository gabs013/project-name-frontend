import Modal from '../Modal/Modal.jsx';
import './RegistrationSuccess.css';

function RegistrationSuccess({ onClose, onOpenLogin }) {
  return (
    <Modal title='¡Registro exitoso!' onClose={onClose}>
      <div className='registration-success'>
        <p className='registration-success__message'>
          Tu cuenta en La biblioteca de Asterión está lista.
          Inicia sesión para guardar tus libros favoritos.
        </p>
        <button
          className='registration-success__button'
          type='button'
          onClick={onOpenLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </Modal>
  );
}

export default RegistrationSuccess;
