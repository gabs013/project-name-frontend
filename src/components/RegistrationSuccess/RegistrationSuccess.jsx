import Modal from '../Modal/Modal.jsx';
import './RegistrationSuccess.css';

function RegistrationSuccess({ onClose }) {
  return (
    <Modal title='¡Registro exitoso!' onClose={onClose}>
      <div className='registration-success'>
        <p className='registration-success__message'>
          Tu cuenta en La biblioteca de Asterión está lista.
          Ya has iniciado sesión.
        </p>
      </div>
    </Modal>
  );
}

export default RegistrationSuccess;
