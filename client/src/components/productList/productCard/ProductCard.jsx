import React from 'react'
import "./product-card.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const ProductCard = ({ product, onNavigate, onAddToCart }) => {

    const handleProductClick = (e) => {
        e.preventDefault();
        onNavigate("product-detail", product.id);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (product && onAddToCart) {
            const formattedProduct = {
                id: product.id,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                currency: "ARS",
                image: `${API_BASE}${product.imagen}`,
                availability: "InStock"
            };
            onAddToCart(formattedProduct);
        }
    };

  return (
    <article className='products-card'>
        <a className='products-link' href="#" onClick={handleProductClick}>
            <img className='products-image' src={`${API_BASE}${product.imagen}`} alt={product.nombre} />
            <h4 className='products-name'>{product.nombre}</h4>
        </a>
        <p className='products-description'>{product.descripcion}</p>
        <span className='products-price'>${Number(product.precio || 0).toLocaleString('es-AR')}</span>
        <div className="products-actions">
            <a
            href="#" onClick={handleProductClick}
            className="btn btn-see-product"
            >
            Ver producto
            </a>
            <button
            type="button"
            className={`btn btn-add-cart }`}
            onClick={handleAddToCart}
            >
            Agregar al carrito
            </button>
        </div>
    </article>
  )
}

export default ProductCard