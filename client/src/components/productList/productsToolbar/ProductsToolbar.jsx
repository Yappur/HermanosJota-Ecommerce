import React from 'react'
import "./products-toolbar.css"

const ProductsToolbar = () => {
  return (
    <div className='products-toolbar'>
        <form class="searchbar" role="search" aria-label="Buscar productos">
            <input id="product-search" class="searchbar-input" type="search" placeholder="Buscar productos..."></input>
            <button id="product-search-btn" class="searchbar-btn" type="submit" aria-label="Buscar">
                Buscar
            </button>
        </form>
    </div>
  )
}

export default ProductsToolbar