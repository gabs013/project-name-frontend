import { MAIN_API_URL } from './constants.js';

function checkResponse(response) {
  return response.json().catch(() => null).then((data) => {
    if (!response.ok) {
      const error = new Error(
        data?.message || `Error HTTP: ${response.status}`,
      );

      error.status = response.status;
      throw error;
    }

    return data;
  });
}

function getAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function register({ name, email, password }) {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getCurrentUser(token) {
  return fetch(`${MAIN_API_URL}/users/me`, {
    headers: getAuthHeaders(token),
  }).then(checkResponse);
}

export function getSavedBooks(token) {
  return fetch(`${MAIN_API_URL}/books`, {
    headers: getAuthHeaders(token),
  }).then(checkResponse);
}

export function saveBook(book, token) {
  const {
    openLibraryId,
    title,
    authors,
    firstPublishYear,
    coverUrl,
    keyword,
  } = book;

  return fetch(`${MAIN_API_URL}/books`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      openLibraryId,
      title,
      authors,
      firstPublishYear,
      coverUrl,
      keyword,
    }),
  }).then(checkResponse);
}

export function deleteBook(bookId, token) {
  return fetch(`${MAIN_API_URL}/books/${encodeURIComponent(bookId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  }).then(checkResponse);
}
