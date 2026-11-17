import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import BookCard from '../BookCard/BookCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import './SavedBooks.css';

function SavedBooks({
  books,
  isReady,
  errorMessage,
  onDeleteBook,
  pendingBookId,
  bookActionErrors,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='saved-books'>
      <h1 className='saved-books__title'>Libros guardados</h1>

      <p className='saved-books__description'>
        {currentUser.name}, este es tu rincón de lecturas por descubrir.
      </p>

      {errorMessage && (
        <p className='saved-books__error' role='alert'>
          {errorMessage}
        </p>
      )}

      {!isReady && !errorMessage && <Preloader />}

      {isReady && (
        <>
          <p className='saved-books__count' aria-live='polite'>
            {books.length === 1
              ? 'Tienes 1 libro guardado.'
              : `Tienes ${books.length} libros guardados.`}
          </p>

          {books.length === 0 ? (
            <p className='saved-books__empty'>
              Tu colección está esperando su primera lectura.{' '}
              <Link className='saved-books__link' to='/buscar'>
                Explorar libros
              </Link>
            </p>
          ) : (
            <ul className='saved-books__list'>
              {books.map((book) => (
                <li className='saved-books__item' key={book._id}>
                  <BookCard
                    book={book}
                    onDelete={onDeleteBook}
                    isPending={pendingBookId === book.openLibraryId}
                    errorMessage={bookActionErrors[book.openLibraryId]}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

export default SavedBooks;
