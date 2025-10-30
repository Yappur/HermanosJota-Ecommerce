import { Link } from "react-router-dom";
import "./product-card.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product && onAddToCart) {
      const formattedProduct = {
        id: product._id,
        name: product.nombre,
        description: product.descripcion,
        price: product.precio,
        currency: "ARS",
        image: `${API_BASE}${product.imagen}`,
        availability: "InStock",
      };
      onAddToCart(formattedProduct);
    }
  };

  return (
    <article className="products-card">
      <Link className="products-link" to={`/productos/${product.id}`}>
        <img
          className="products-image"
          src={`${product.imagen}`}
          alt={product.nombre}
        />
        <h4 className="products-name">{product.nombre}</h4>
      </Link>
      <p className="products-description">{product.descripcion}</p>
      <span className="products-price">
        ${Number(product.precio || 0).toLocaleString("es-AR")}
      </span>
      <div className="products-actions">
        <Link to={`/productos/${product.id}`} className="btn btn-see-product">
          Ver producto
        </Link>
        <button
          type="button"
          className={`btn btn-add-cart }`}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
