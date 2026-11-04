import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Search from '../Search/Search.jsx';
import Footer from '../Footer/Footer.jsx';
import { searchBooks } from '../../utils/OpenLibraryApi.js';
import {
  API_ERROR_MESSAGE,
  RESULTS_PER_PAGE,
} from '../../utils/constants.js';
import './App.css';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import RegistrationSuccess from '../RegistrationSuccess/RegistrationSuccess.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import {
  register,
  login,
  getCurrentUser,
} from '../../utils/MainApi.js';

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
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

    function openLogin() {
    setAuthError('');
    setActiveModal('login');
  }

  function openRegister() {
    setAuthError('');
    setActiveModal('register');
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setActiveModal('');
    setAuthError('');
  }

  function handleRegister(userData) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    register(userData)
      .then(() => {
        setActiveModal('registration-success');
      })
      .catch((requestError) => {
        setAuthError(
          requestError.status === 409
            ? 'Este correo electrónico ya está registrado.'
            : 'No pudimos completar el registro. Inténtalo de nuevo.',
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleLogin(credentials) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    login(credentials)
      .then((data) => {
        if (typeof data?.token !== 'string' || !data.token) {
          throw new Error('El servidor no devolvió un token válido.');
        }

        return getCurrentUser(data.token).then((user) => ({
          user,
          token: data.token,
        }));
      })
      .then(({ user, token }) => {
        localStorage.setItem('jwt', token);
        setCurrentUser(user);
        setActiveModal('');
      })
      .catch((requestError) => {
        setAuthError(
          requestError.status === 401
            ? 'El correo o la contraseña son incorrectos.'
            : 'No pudimos iniciar sesión. Inténtalo de nuevo.',
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setActiveModal('');
    setAuthError('');
    setBooks([]);
    setHasSearched(false);
    setError('');
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          onOpenLogin={openLogin}
          onSignOut={handleSignOut}
        />
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
        <Footer />
          {activeModal === 'login' && (
            <Login
              onClose={closeModal}
              onLogin={handleLogin}
              onOpenRegister={openRegister}
              isSubmitting={isSubmitting}
              errorMessage={authError}
            />
          )}

          {activeModal === 'register' && (
            <Register
              onClose={closeModal}
              onRegister={handleRegister}
              onOpenLogin={openLogin}
              isSubmitting={isSubmitting}
              errorMessage={authError}
            />
          )}

          {activeModal === 'registration-success' && (
            <RegistrationSuccess
              onClose={closeModal}
              onOpenLogin={openLogin}
            />
          )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
