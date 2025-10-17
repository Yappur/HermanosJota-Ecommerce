import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const NavBar = ({ cartCount = 0, cartItems = [], onClearCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClearCart = () => {
    if (onClearCart) {
      onClearCart();
      setIsCartOpen(false);
    }
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

  // Cerrar menú móvil al hacer clic en un link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          {/* Logo con Link a home */}
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
              <li role="none" className="cart">
                <button
                  className="cart-button"
                  onClick={toggleCart}
                  aria-label="Ver carrito de compras"
                >
                  <span className="cart-icon">
                    🛒 <span className="cart-count">{cartCount}</span>
                  </span>
                </button>

                {isCartOpen && (
                  <div className="cart-dropdown">
                    <div className="cart-header">
                      <h3>Carrito de Compras</h3>
                      <button
                        className="cart-close"
                        onClick={toggleCart}
                        aria-label="Cerrar carrito"
                      >
                        ✕
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
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
