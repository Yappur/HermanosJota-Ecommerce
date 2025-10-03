import React from 'react'
import "./product-item.css";


const ProductItem = (props) => {
    const {
        producto,
    } = props;

  return (
    <article className='products-card'>
        <a className='products-link' href={`./product.html?id=${encodeURIComponent(producto.id)}`}>
            <img className='products-image' src={`${producto.imagen}`} alt={producto.nombre} />
            <h4 className='products-name'>{producto.nombre}</h4>
        </a>
        <p className='products-description'>{producto.descripcion}</p>
        <span className='products-price'>${Number(producto.precio || 0).toLocaleString('es-AR')}</span>
    </article>
  )
}

export default ProductItem