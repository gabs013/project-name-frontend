import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
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
      </ul>
    </nav>
  );
}

export default Navigation;
