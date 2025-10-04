import React from 'react'
import "./product-item.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";


const ProductItem = (props) => {
    const {
        product,
    } = props;

  return (
    <article className='products-card'>
        <a className='products-link' href={`./product.html?id=${encodeURIComponent(product.id)}`}>
            <img className='products-image' src={`${API_BASE}${product.imagen}`} alt={product.nombre} />
            <h4 className='products-name'>{product.nombre}</h4>
        </a>
        <p className='products-description'>{product.descripcion}</p>
        <span className='products-price'>${Number(product.precio || 0).toLocaleString('es-AR')}</span>
    </article>
  )
}

export default ProductItem