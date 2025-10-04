import React from 'react'
import "./product-card.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const ProductCard = (props) => {
    const {
        product,
        onNavigate
    } = props;

    const handleProductClick = (e) => {
        e.preventDefault();
        onNavigate("product-detail", product.id);
    };

  return (
    <article className='products-card'>
        <a className='products-link' href="#" onClick={handleProductClick}>
            <img className='products-image' src={`${API_BASE}${product.imagen}`} alt={product.nombre} />
            <h4 className='products-name'>{product.nombre}</h4>
        </a>
        <p className='products-description'>{product.descripcion}</p>
        <span className='products-price'>${Number(product.precio || 0).toLocaleString('es-AR')}</span>
    </article>
  )
}

export default ProductCard