const ProductInfo = ({ product, onAddToCart }) => {
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'ARS'
    }).format(price);
  };

  return (
    <section className="details">
      <h1 id="title" className="title" itemProp="name">
        {product.name}
      </h1>
      
      <p id="desc" className="desc" itemProp="description">
        {product.description}
      </p>

      <div 
        className="price" 
        itemProp="offers" 
        itemScope 
        itemType="https://schema.org/Offer"
      >
        <meta itemProp="priceCurrency" content={product.currency || "ARS"} />
        <span className="price-label">Precio</span>
        <span 
          id="priceValue" 
          className="price-value" 
          itemProp="price"
        >
          {formatPrice(product.price, product.currency)}
        </span>
        <link 
          id="availability" 
          itemProp="availability" 
          href={`https://schema.org/${product.availability || 'InStock'}`} 
        />
      </div>

      <div className="cta-row">
        <a className="btn btn-secondary" href="/productos">
          Ver más productos
        </a>
        <button 
          id="btnAddToCart" 
          className="btn btn-primary"
          onClick={onAddToCart}
        >
          Añadir al Carrito
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;