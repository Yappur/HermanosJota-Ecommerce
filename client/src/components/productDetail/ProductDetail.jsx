
const ProductDetail = ({ product, onAddToCart, onNavigate }) => {

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency || "ARS",
    }).format(price);
  };

  const handleWhatsAppConsult = () => {
    const phoneNumber = "+541145678900";

    const message = `Hola! Me interesa consultar sobre:\n\n*${
      product.name
    }*\n\nPrecio: ${formatPrice(
      product.price,
      product.currency
    )}\n\n¿Podrían brindarme más información?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

   return (
    <section className="details">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h1 id="title" className="title" itemProp="name">{product.name}</h1>
      </div>

      <p id="desc" className="desc" itemProp="description">{product.description}</p>

      <div className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="priceCurrency" content={product.currency || "ARS"} />
        <span className="price-label">Precio</span>
        <span id="priceValue" className="price-value" itemProp="price">
          {formatPrice(product.price, product.currency)}
        </span>
        <link id="availability" itemProp="availability" href={`https://schema.org/${product.availability || "InStock"}`} />
      </div>

      <div className="cta-row">
        <button className="btn btn-outline" onClick={() => onNavigate && onNavigate("products")}>
          Ver más productos
        </button>
        <button className="btn btn-whatsapp" onClick={handleWhatsAppConsult} aria-label="Consultar por WhatsApp">
          Consultar
        </button>
        <button id="btnAddToCart" className="btn btn-primary" onClick={onAddToCart}>
          Añadir al Carrito
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
