import { useState, useEffect } from 'react';
import NavBar from './Navbar';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductSpecs from './ProductSpecs';
import Footer from './Footer';
import './ProductDetail.css';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de producto - reemplazar con API real
    const loadProduct = async () => {
      try {
        // Aquí iría la llamada a la API
        // const response = await fetch(`/api/products/${productId}`);
        // const productData = await response.json();
        
        // Datos de ejemplo mientras no hay API
        const productData = {
          id: productId,
          name: "Mesa de Comedor Artesanal",
          description: "Mesa de comedor fabricada con madera certificada FSC®. Diseño moderno con toques vintage que aporta calidez a cualquier espacio.",
          price: 125000,
          currency: "ARS",
          image: "/img/productos/mesa-comedor.jpg",
          availability: "InStock",
          specs: [
            { label: "Material", value: "Madera de Roble" },
            { label: "Dimensiones", value: "180 x 90 x 75 cm" },
            { label: "Peso", value: "45 kg" },
            { label: "Acabado", value: "Barniz natural" },
            { label: "Certificación", value: "FSC®" }
          ]
        };
        
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Aquí agregarías la lógica para añadir al carrito
    console.log('Producto añadido al carrito');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <>
      <NavBar cartCount={cartCount} />
      
      <main 
        className="product container" 
        itemScope 
        itemType="https://schema.org/Product"
      >
        <ProductGallery 
          image={product.image} 
          alt={product.name}
          productName={product.name}
        />
        
        <ProductInfo 
          product={product}
          onAddToCart={handleAddToCart}
        />
        
        <ProductSpecs specs={product.specs} />
        
        <aside className="badge">
          <span className="dot"></span>
          Madera certificada FSC® — Hecho en Argentina
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;