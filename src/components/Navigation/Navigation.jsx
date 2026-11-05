import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Navigation.css';

function Navigation({ onOpenLogin, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const getLinkClassName = ({ isActive }) =>
    isActive
      ? 'navigation__link navigation__link_active'
      : 'navigation__link';

  return (
    <nav className='navigation' aria-label='Navegación principal'>
      <ul className='navigation__list'>
        <li>
          <NavLink to='/' end className={getLinkClassName}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to='/buscar' className={getLinkClassName}>
            Buscar libros
          </NavLink>
        </li>

        {currentUser && (
          <li>
            <NavLink to='/guardados' className={getLinkClassName}>
              Libros guardados
            </NavLink>
          </li>
        )}

        <li>
          {currentUser ? (
            <button
              type='button'
              className='navigation__button'
              onClick={onSignOut}
              aria-label={`Cerrar sesión de ${currentUser.name}`}
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              type='button'
              className='navigation__button'
              onClick={onOpenLogin}
            >
              Iniciar sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
