import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  return (
    <main className='main'>
      <section className='main__hero' aria-labelledby='hero-title'>
        <h1 id='hero-title' className='main__title'>
          Tu próxima lectura comienza aquí
        </h1>
        <p className='main__description'>
          Explora libros por título o autor y encuentra nuevas
          historias por descubrir.
        </p>
        <Link to='/buscar' className='main__button'>
          Explorar libros
        </Link>
      </section>
    </main>
  );
}

export default Main;
