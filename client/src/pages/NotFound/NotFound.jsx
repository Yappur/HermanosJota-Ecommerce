import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-icon">404</div>
        <h1 className="notfound-title">Página no encontrada</h1>
        <p className="notfound-message">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-button primary">
            Volver al inicio
          </Link>
          <Link to="/productos" className="notfound-button secondary">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
