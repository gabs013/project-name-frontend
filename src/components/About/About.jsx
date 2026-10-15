import './About.css';

function About() {
  return (
    <section className='about' aria-labelledby='about-title'>
      <h2 id='about-title' className='about__title'>
        Detrás de Entre páginas
      </h2>
      <p className='about__text'>
        Soy Gabriela Arroyo, estudiante de desarrollo web y
        apasionada por la literatura. Creé Entre páginas para
        unir ambos intereses y facilitar el descubrimiento de libros.
      </p>
      <p className='about__text'>
        Este proyecto utiliza React y Open Library para buscar
        títulos y autores y consultar sus datos bibliográficos.
      </p>
    </section>
  );
}

export default About;
