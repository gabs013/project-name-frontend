import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header({ onOpenLogin, onSignOut }) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'>
      <img
        src='/favicon.png'
        alt=''
        className='header__logo-icon'
      />
       <span>La biblioteca de Asterión</span> 
      </Link>
      <Navigation
        onOpenLogin={onOpenLogin}
        onSignOut={onSignOut}
      />
    </header>
  );
}

export default Header;
