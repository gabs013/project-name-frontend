import { useState } from 'react';
import { BOOK_COVERS_URL } from '../../utils/constants.js';
import './BookCard.css';

function BookCard({ book }) {
  const [failedCoverUrl, setFailedCoverUrl] = useState(null);

  const title = book.title || 'Título no disponible';

  const authors = book.author_name?.length
    ? book.author_name.join(', ')
    : 'Autor no disponible';

  const year = book.first_publish_year || 'No disponible';

  const coverUrl = book.cover_i > 0
    ? `${BOOK_COVERS_URL}/${book.cover_i}-M.jpg?default=false`
    : null;

  const canShowCover = coverUrl && failedCoverUrl !== coverUrl;

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
      </div>
    </article>
  );
}

export default BookCard;
