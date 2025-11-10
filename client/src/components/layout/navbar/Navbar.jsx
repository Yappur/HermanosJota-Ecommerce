import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useCart } from "../../../contexts/CartContext";
import { useTheme } from "../../../contexts/ThemeContext";
import "./navbar.css";

// Componentes de iconos SVG
const MoonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const CartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

const NavBar = () => {
  const { cartItems = [], cartCount = 0, clearCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme} = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClearCart = () => {
    if (clearCart) {
      clearCart();
      setIsCartOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <img
              src="/logo.svg"
              alt="Logo de Hermanos Jota"
              className="logo-img"
              role="img"
              loading="eager"
            />
            <div className="logo-text">
              <h2 className="logo-title">HERMANOS JOTA</h2>
              <p className="logo-subtitle">Piezas que cuentan historias</p>
            </div>
          </Link>

          <nav
            className="nav"
            role="navigation"
            aria-label="Navegación principal"
          >
            <button
              className="nav-toggle"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              aria-controls="nav-menu"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>

            <ul
              className={`nav-list ${isMenuOpen ? "nav-list--open" : ""}`}
              id="nav-menu"
              role="menubar"
            >
              <li role="none">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  Inicio
                </NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/productos"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  Productos
                </NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  Nosotros
                </NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/contacto"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  Contacto
                </NavLink>
              </li>
              {isAuthenticated && (
                <li role="none">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive ? "nav-link nav-link--active" : "nav-link"
                    }
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              
              {/* Grupo de acciones - Separador visual */}
              <li role="none" className="nav-separator"></li>
              
              {/* Botón de Ingresar/Cerrar Sesión */}
              <li role="none" className="nav-auth">
                {isAuthenticated ? (
                  <button
                    className="nav-auth-button"
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-auth-button nav-auth-button--active"
                        : "nav-auth-button"
                    }
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    Ingresar
                  </NavLink>
                )}
              </li>

              {/* Grupo de iconos - Carrito y Tema */}
              <li role="none" className="nav-actions">
                <div className="cart-container">
                  <button
                    className="nav-icon-button cart-button"
                    onClick={toggleCart}
                    aria-label="Ver carrito de compras"
                  >
                    <span className="cart-icon-wrapper">
                      <CartIcon className="cart-icon-svg" />
                      {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                      )}
                    </span>
                  </button>

                  {/* Dropdown del carrito */}
                  {isCartOpen && (
                    <div className="cart-dropdown">
                      <div className="cart-header">
                        <h3>Carrito de Compras</h3>
                        <button
                          className="cart-close"
                          onClick={toggleCart}
                          aria-label="Cerrar carrito"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="cart-close-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="cart-content">
                        {cartItems.length === 0 ? (
                          <p className="cart-empty">Tu carrito está vacío</p>
                        ) : (
                          <>
                            <div className="cart-items">
                              {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                  <div className="cart-item-info">
                                    <h4 className="cart-item-name">
                                      {item.name}
                                    </h4>
                                    <p className="cart-item-details">
                                      Cantidad: {item.quantity} ×{" "}
                                      {formatPrice(item.price)}
                                    </p>
                                    <p className="cart-item-total">
                                      Subtotal:{" "}
                                      {formatPrice(item.price * item.quantity)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="cart-footer">
                              <div className="cart-total">
                                <strong>
                                  Total: {formatPrice(getTotalPrice())}
                                </strong>
                              </div>
                              <button
                                className="cart-clear-btn"
                                onClick={handleClearCart}
                              >
                                Vaciar Carrito
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="nav-icon-button theme-toggle-button"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="theme-icon" />
                  ) : (
                    <MoonIcon className="theme-icon" />
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
