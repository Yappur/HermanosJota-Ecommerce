import React from 'react'
import "./products-toolbar.css"

const ProductsToolbar = ({ value, onSearch }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <div className='products-toolbar'>
        <form className="searchbar" role="search" aria-label="Buscar productos" onSubmit={handleSubmit}>
            <input id="product-search" className="searchbar-input" type="search" placeholder="Buscar productos..." value={value} onChange={(e) => onSearch(e.target.value)} />
        </form>
    </div>
  )
}

export default ProductsToolbar