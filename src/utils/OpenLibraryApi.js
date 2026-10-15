import {
  BOOKS_API_URL,
  BOOK_FIELDS,
  SEARCH_LIMIT,
} from './constants.js';

export function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    fields: BOOK_FIELDS,
    limit: String(SEARCH_LIMIT),
  });

  return fetch(`${BOOKS_API_URL}?${params}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.docs)) {
        throw new Error('La respuesta no contiene una lista de libros');
      }

      return data.docs;
    });
}
