import { useEffect, useId, useRef } from 'react';
import './Modal.css';

function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className='modal'
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className='modal__content'>
        <button
          type='button'
          className='modal__close'
          aria-label='Cerrar ventana'
          onClick={onClose}
        >
          ×
        </button>
        <h2 id={titleId} className='modal__title'>
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
