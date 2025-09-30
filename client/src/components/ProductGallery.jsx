const ProductGallery = ({ image, alt, productName }) => {
  return (
    <section className="gallery">
      <img 
        id="heroImg" 
        className="hero-img" 
        src={image} 
        alt={alt || productName} 
        itemProp="image" 
      />
    </section>
  );
};

export default ProductGallery;