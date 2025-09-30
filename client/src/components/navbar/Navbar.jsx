import { useState } from 'react';
import './navbar.css';

const NavBar = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img
              src="/img/logo.svg"
              alt="Logo de Hermanos Jota"
              className="logo-img"
              role="img"
              loading="eager"
            />
            <div className="logo-text">
              <h2 className="logo-title">HERMANOS JOTA</h2>
              <p className="logo-subtitle">Piezas que cuentan historias</p>
            </div>
          </div>

          <nav className="nav" role="navigation" aria-label="Navegaci�n principal">
            <button
              className="nav-toggle"
              aria-label="Abrir men� de navegaci�n"
              aria-expanded={isMenuOpen}
              aria-controls="nav-menu"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
            <ul 
              className={`nav-list ${isMenuOpen ? 'nav-list--open' : ''}`}
              id="nav-menu" 
              role="menubar"
            >
              <li role="none">
                <a
                  href="/"
                  className="nav-link"
                  role="menuitem"
                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
              <li role="none">
                <a href="/productos" className="nav-link" role="menuitem">
                  Productos
                </a>
              </li>
              <li role="none">
                <a href="/nosotros" className="nav-link" role="menuitem">
                  Nosotros
                </a>
              </li>
              <li role="none">
                <a href="/contacto" className="nav-link" role="menuitem">
                  Contacto
                </a>
              </li>
              <li role="none" className="cart">
                <span className="cart-icon">
                  🛒 <span className="cart-count">{cartCount}</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;