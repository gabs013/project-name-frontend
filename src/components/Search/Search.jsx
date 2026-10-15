import SearchForm from '../SearchForm/SearchForm.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import './Search.css';

function Search({
  onSearch,
  books,
  isLoading,
  error,
  hasSearched,
  visibleCount,
  onShowMore,
}) {
  return (
    <main className='search'>
      <h1 className='search__title'>
        Encuentra tu próxima lectura
      </h1>

      <SearchForm onSearch={onSearch} isLoading={isLoading} />

      <div className='search__feedback' aria-live='polite'>
        {isLoading && <Preloader />}

        {!isLoading && error && (
          <p className='search__error'>{error}</p>
        )}

        {!isLoading && !error && !hasSearched && (
          <p className='search__description'>
            Busca un libro por título o autor.
          </p>
        )}

        {!isLoading && !error && hasSearched && books.length === 0 && (
          <p className='search__description'>
            No se ha encontrado nada
          </p>
        )}
      </div>

      {!isLoading && !error && books.length > 0 && (
        <section aria-labelledby='results-title'>
          <h2 id='results-title' className='search__results-title'>
            Resultados
          </h2>

          <ul className='search__results'>
            {books.slice(0, visibleCount).map((book) => (
              <li className='search__result' key={book.key}>
                {book.title || 'Título no disponible'}
              </li>
            ))}
          </ul>

          {visibleCount < books.length && (
            <button
              className='search__more'
              type='button'
              onClick={onShowMore}
            >
              Mostrar más
            </button>
          )}
        </section>
      )}
    </main>
  );
}

export default Search;
