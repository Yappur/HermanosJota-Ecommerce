import React from 'react'


const ProductItem = (props) => {
    const {
        product,
    } = props;

  return (
    <article className='products-card'>
        <a className='products-link' href={`./product.html?id=${encodeURIComponent(product.id)}`}>
            <img className='products-image' src={`${product.image}`} alt={product.name} />
            <h4 className='products-name'>{product.name}</h4>
        </a>
        <p className='products-description'>{product.description}</p>
        <span className='products-price'>${Number(product.precio || 0).toLocaleString('es-AR')}</span>
    </article>
  )
}

export default ProductItem