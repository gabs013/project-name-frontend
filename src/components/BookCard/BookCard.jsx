import { useState } from 'react';
import { BOOK_COVERS_URL } from '../../utils/constants.js';
import './BookCard.css';

function BookCard({
  book,
  onSave,
  onDelete,
  isSaved = false,
  isPending = false,
  errorMessage = '',
}) {
  const [failedCoverUrl, setFailedCoverUrl] = useState(null);

  const title = book.title || 'Título no disponible';

  const authorNames = book.author_name ?? book.authors ?? [];

  const authors = authorNames.length
    ? authorNames.join(', ')
    : 'Autor no disponible';

  const year = book.first_publish_year
    ?? book.firstPublishYear
    ?? 'No disponible';

  const coverUrl = book.coverUrl || (
    book.cover_i > 0
      ? `${BOOK_COVERS_URL}/${book.cover_i}-M.jpg?default=false`
      : null
  );

  const canShowCover = coverUrl && failedCoverUrl !== coverUrl;

  function handleAction() {
    if (isPending) {
      return;
    }

    if (onDelete) {
      onDelete(book);
    } else if (onSave && !isSaved) {
      onSave(book);
    }
  }

  let actionLabel = 'Guardar libro';

  if (onDelete) {
    actionLabel = isPending ? 'Eliminando…' : 'Eliminar de guardados';
  } else if (isPending) {
    actionLabel = 'Guardando…';
  } else if (isSaved) {
    actionLabel = 'Guardado';
  }

  return (
    <article className='book-card'>
      <div className='book-card__cover'>
        {canShowCover ? (
          <img
            className='book-card__image'
            src={coverUrl}
            alt={`Portada de ${title}`}
            loading='lazy'
            onError={() => setFailedCoverUrl(coverUrl)}
          />
        ) : (
          <p className='book-card__placeholder'>
            Sin portada disponible
          </p>
        )}
      </div>

      <div className='book-card__content'>
        <h3 className='book-card__title'>{title}</h3>
        <p className='book-card__authors'>{authors}</p>
        <p className='book-card__year'>
          Año registrado: {year}
        </p>

        {(onSave || onDelete) && (
          <button
            className='book-card__action'
            type='button'
            onClick={handleAction}
            disabled={isPending || (!onDelete && isSaved)}
            aria-label={`${actionLabel}: ${title}`}
          >
            {actionLabel}
          </button>
        )}

        {errorMessage && (
          <p className='book-card__error' role='alert'>
            {errorMessage}
          </p>
        )}
      </div>
    </article>
  );
}

export default BookCard;
