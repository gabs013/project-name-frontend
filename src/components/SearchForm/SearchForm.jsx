import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleChange(event) {
    setQuery(event.target.value);
    setValidationError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setValidationError('Escribe un título o un autor.');
      return;
    }

    setValidationError('');
    onSearch(trimmedQuery);
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} role='search'>
      <label className='search-form__label' htmlFor='book-query'>
        Título o autor
      </label>

      <div className='search-form__controls'>
        <input
          className='search-form__input'
          id='book-query'
          name='query'
          type='search'
          placeholder='Don Quijote o Miguel de Cervantes'
          value={query}
          onChange={handleChange}
          disabled={isLoading}
          required
          aria-invalid={Boolean(validationError)}
          aria-describedby={
            validationError ? 'book-query-error' : undefined
          }
        />

        <button
          className='search-form__button'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Buscando…' : 'Buscar'}
        </button>
      </div>

      {validationError && (
        <p
          className='search-form__error'
          id='book-query-error'
          role='alert'
        >
          {validationError}
        </p>
      )}
    </form>
  );
}

export default SearchForm;
