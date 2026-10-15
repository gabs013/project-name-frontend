import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Search from '../Search/Search.jsx';
import { searchBooks } from '../../utils/OpenLibraryApi.js';
import {
  API_ERROR_MESSAGE,
  RESULTS_PER_PAGE,
} from '../../utils/constants.js';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  function handleSearch(query) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError('');
    setBooks([]);
    setHasSearched(true);
    setVisibleCount(RESULTS_PER_PAGE);

    searchBooks(query)
      .then((data) => {
        setBooks(data);
      })
      .catch((requestError) => {
        console.error(requestError);
        setError(API_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShowMore() {
    setVisibleCount((count) => count + RESULTS_PER_PAGE);
  }

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/buscar'
          element={
            <Search
              onSearch={handleSearch}
              books={books}
              isLoading={isLoading}
              error={error}
              hasSearched={hasSearched}
              visibleCount={visibleCount}
              onShowMore={handleShowMore}
            />
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;
