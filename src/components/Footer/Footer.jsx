import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <p className='footer__name'>Entre páginas</p>
        <p className='footer__credits'>
          Desarrollado por Gabriela Arroyo
        </p>
        <p className='footer__source'>
          Datos y portadas de{' '}
          <a
            className='footer__link'
            href='https://openlibrary.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Open Library
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
