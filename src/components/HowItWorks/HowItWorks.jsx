import './HowItWorks.css';

function HowItWorks() {
  return (
    <section
      className='how-it-works'
      aria-labelledby='how-it-works-title'
    >
      <h2 id='how-it-works-title' className='how-it-works__title'>
        Descubre tu próxima lectura
      </h2>

      <ol className='how-it-works__list'>
        <li className='how-it-works__step'>
          <span className='how-it-works__number' aria-hidden='true'>
            01
          </span>
          <h3 className='how-it-works__subtitle'>Buscar</h3>
          <p className='how-it-works__description'>
            Escribe el título de un libro o el nombre de un autor.
          </p>
        </li>

        <li className='how-it-works__step'>
          <span className='how-it-works__number' aria-hidden='true'>
            02
          </span>
          <h3 className='how-it-works__subtitle'>Explorar</h3>
          <p className='how-it-works__description'>
            Recorre los resultados y pulsa «Mostrar más» para
            descubrir otros libros.
          </p>
        </li>

        <li className='how-it-works__step'>
          <span className='how-it-works__number' aria-hidden='true'>
            03
          </span>
          <h3 className='how-it-works__subtitle'>Consultar datos</h3>
          <p className='how-it-works__description'>
            Consulta las portadas, los autores y los años
            registrados en el catálogo.
          </p>
        </li>
      </ol>
    </section>
  );
}

export default HowItWorks;
