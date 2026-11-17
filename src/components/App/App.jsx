import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Search from '../Search/Search.jsx';
import Footer from '../Footer/Footer.jsx';
import { searchBooks } from '../../utils/OpenLibraryApi.js';
import {
  API_ERROR_MESSAGE,
  RESULTS_PER_PAGE,
  BOOK_COVERS_URL,
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
  getSavedBooks,
  saveBook,
  deleteBook,
} from '../../utils/MainApi.js';
import Preloader from '../Preloader/Preloader.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import SavedBooks from '../SavedBooks/SavedBooks.jsx';


function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [sessionError, setSessionError] = useState('');
  const modalName = activeModal || (location.state?.openLogin ? 'login' : '');
  const [savedBooks, setSavedBooks] = useState([]);
  const [isSavedBooksReady, setIsSavedBooksReady] = useState(false);
  const [savedBooksError, setSavedBooksError] = useState('');
  const [pendingBookId, setPendingBookId] = useState('');
  const [bookActionErrors, setBookActionErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isActive = true;
    const token = localStorage.getItem('jwt');

    const sessionRequest = token
      ? getCurrentUser(token)
      : Promise.resolve(null);

    sessionRequest
      .then((user) => {
        if (isActive) {
          setCurrentUser(user);
        }
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        if (requestError.status === 401) {
          localStorage.removeItem('jwt');
          setCurrentUser(null);
        } else {
          setSessionError(
            'No pudimos comprobar tu sesión. Revisa tu conexión y recarga la página para intentarlo de nuevo.',
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsCheckingSession(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    let isActive = true;
    const token = localStorage.getItem('jwt');

    getSavedBooks(token)
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('La respuesta no contiene una lista de libros.');
        }

        if (isActive) {
          setSavedBooks(data);
          setSavedBooksError('');
          setIsSavedBooksReady(true);
        }
      })
      .catch(() => {
        if (isActive) {
          setSavedBooksError(
            'No pudimos cargar tus libros guardados. Recarga la página para intentarlo de nuevo.',
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, [currentUser]);

  useEffect(() => {
    if (activeModal !== 'registration-success') {
      return;
    }

    const timeoutId = setTimeout(() => {
      setActiveModal('');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [activeModal]);

  function handleSearch(query) {
    if (isLoading) {
      return;
    }

    setSearchQuery(query.trim());
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

  function clearLoginRedirect() {
    if (location.state?.openLogin) {
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
        {
          replace: true,
          state: null,
        },
      );
    }
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
    clearLoginRedirect();
  }

  async function startSession(credentials) {
    const data = await login(credentials);

      if (typeof data?.token !== 'string' || !data.token) {
      throw new Error('El servidor no devolvió un token válido.');
      }

    const user = await getCurrentUser(data.token);

      localStorage.setItem('jwt', data.token);
        setCurrentUser(user);
        setSessionError('');
        clearLoginRedirect();
  }

  async function handleRegister(userData) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');
    let accountCreated = false;

    try {
      await register(userData);
      accountCreated = true;

      const { email, password } = userData;
      await startSession({ email, password });

      setActiveModal('registration-success');
    } catch (requestError) {
      if (accountCreated) {
        setAuthError(
          'Tu cuenta se creó, pero no pudimos iniciar sesión automáticamente. Usa el enlace «Inicia sesión» para entrar.',
        );
      } else {
        setAuthError(
          requestError.status === 409
            ? 'Este correo electrónico ya está registrado.'
            : 'No pudimos completar el registro. Inténtalo de nuevo.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogin(credentials) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    try {
      await startSession(credentials);
      setActiveModal('');
    } catch (requestError) {
      setAuthError(
        requestError.status === 401
          ? 'El correo o la contraseña son incorrectos.'
          : 'No pudimos iniciar sesión. Inténtalo de nuevo.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

    function handleSaveBook(book) {
    if (!currentUser) {
      openLogin();
      return;
    }

    if (!isSavedBooksReady || pendingBookId) {
      return;
    }

    if (savedBooks.some((savedBook) => savedBook.openLibraryId === book.key)) {
      return;
    }

    const token = localStorage.getItem('jwt');

    const bookData = {
      openLibraryId: book.key,
      title: book.title || 'Título no disponible',
      authors: book.author_name || [],
      firstPublishYear: Number.isInteger(book.first_publish_year)
        ? book.first_publish_year
        : null,
      coverUrl: book.cover_i > 0
        ? `${BOOK_COVERS_URL}/${book.cover_i}-M.jpg?default=false`
        : '',
      keyword: searchQuery,
    };

    setPendingBookId(book.key);
    setBookActionErrors((previousErrors) => ({
      ...previousErrors,
      [book.key]: '',
    }));

    saveBook(bookData, token)
      .then((savedBook) => {
        if (localStorage.getItem('jwt') !== token) {
          return;
        }

        setSavedBooks((previousBooks) => [
          savedBook,
          ...previousBooks,
        ]);
      })
      .catch(() => {
        if (localStorage.getItem('jwt') !== token) {
          return;
        }

        setBookActionErrors((previousErrors) => ({
          ...previousErrors,
          [book.key]: 'No pudimos guardar este libro. Inténtalo de nuevo.',
        }));
      })
      .finally(() => {
        if (localStorage.getItem('jwt') === token) {
          setPendingBookId('');
        }
      });
  }

  function handleDeleteBook(book) {
    if (!currentUser || pendingBookId) {
      return;
    }

    const token = localStorage.getItem('jwt');

    setPendingBookId(book.openLibraryId);
    setBookActionErrors((previousErrors) => ({
      ...previousErrors,
      [book.openLibraryId]: '',
    }));

    deleteBook(book._id, token)
      .then(() => {
        if (localStorage.getItem('jwt') !== token) {
          return;
        }

        setSavedBooks((previousBooks) =>
          previousBooks.filter((savedBook) => savedBook._id !== book._id),
        );
      })
      .catch(() => {
        if (localStorage.getItem('jwt') !== token) {
          return;
        }

        setBookActionErrors((previousErrors) => ({
          ...previousErrors,
          [book.openLibraryId]:
            'No pudimos eliminar este libro. Inténtalo de nuevo.',
        }));
      })
      .finally(() => {
        if (localStorage.getItem('jwt') === token) {
          setPendingBookId('');
        }
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
    setSessionError('');
    setSavedBooks([]);
    setIsSavedBooksReady(false);
    setSavedBooksError('');
    setPendingBookId('');
    setBookActionErrors({});
    setSearchQuery('');
  }

  if (isCheckingSession) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header
          onOpenLogin={openLogin}
          onSignOut={handleSignOut}
        />
        {sessionError && (
          <p className='app__session-error' role='alert'>
            {sessionError}
          </p>
        )}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/buscar'
            element={
              <ProtectedRoute>
                <Search
                  onSearch={handleSearch}
                  books={books}
                  isLoading={isLoading}
                  error={error}
                  hasSearched={hasSearched}
                  visibleCount={visibleCount}
                  onShowMore={handleShowMore}
                  savedBooks={savedBooks}
                  onSaveBook={handleSaveBook}
                  pendingBookId={pendingBookId}
                  bookActionErrors={bookActionErrors}
                  isSavedBooksReady={isSavedBooksReady}
                  savedBooksError={savedBooksError}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path='/guardados'
            element={
              <ProtectedRoute>
                <SavedBooks
                  books={savedBooks}
                  isReady={isSavedBooksReady}
                  errorMessage={savedBooksError}
                  onDeleteBook={handleDeleteBook}
                  pendingBookId={pendingBookId}
                  bookActionErrors={bookActionErrors}
                />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
          {modalName === 'login' && (
            <Login
              onClose={closeModal}
              onLogin={handleLogin}
              onOpenRegister={openRegister}
              isSubmitting={isSubmitting}
              errorMessage={authError}
            />
          )}

          {modalName === 'register' && (
            <Register
              onClose={closeModal}
              onRegister={handleRegister}
              onOpenLogin={openLogin}
              isSubmitting={isSubmitting}
              errorMessage={authError}
            />
          )}

          {modalName === 'registration-success' && (
            <RegistrationSuccess
              onClose={closeModal}
            />
          )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
