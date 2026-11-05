import './Preloader.css';

function Preloader() {
  return (
    <div className='preloader' role='status'>
      <span className='preloader__circle' aria-hidden='true' />
      <p className='preloader__text'>Buscando libros…</p>
    </div>
  );
}

export default Preloader;
