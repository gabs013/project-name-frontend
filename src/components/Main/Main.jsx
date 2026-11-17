import { Link } from 'react-router-dom';
import About from '../About/About.jsx';
import HowItWorks from '../HowItWorks/HowItWorks.jsx';
import booksIllustration from '../../images/books-illustration.jpg';
import './Main.css';

function Main() {
  return (
    <main className='main'>
      <section className='main__hero' aria-labelledby='hero-title'>
        <h1 id='hero-title' className='main__title'>
          Tu onírica lectura comienza aquí
        </h1>
        <p className='main__description'>
          Explora libros por título o autor y encuentra nuevos sueños taninos por descubrir.
        </p>
        <Link to='/buscar' className='main__button'>
          Explorar libros
        </Link>
        <img
          className='main__illustration'
          src={booksIllustration}
          alt=''
        />
      </section>

      <HowItWorks />
      <About />
    </main>
  );
}

export default Main;
