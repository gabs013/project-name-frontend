import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='header__logo'>
        Entre páginas
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
