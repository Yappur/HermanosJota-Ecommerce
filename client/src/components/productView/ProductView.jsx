import { useState, useEffect } from 'react';
import ProductGallery from './ProductGallery';
import ProductDetail from '../productDetail/ProductDetail';
import ProductSpecs from './ProductSpecs';
import Footer from '../Footer/Footer';
import './productView.css';

const ProductView = ({ productId, onNavigate, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        
        // Llamada a la API real del backend
        const response = await fetch(`http://localhost:5001/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const productData = await response.json();
        
        // Transformar los datos del backend al formato que espera el componente
        const formattedProduct = {
          id: productData.id,
          name: productData.nombre,
          description: productData.descripcion,
          price: productData.precio,
          currency: "ARS",
          image: productData.imagen,
          availability: "InStock",
          specs: [
            { label: "Medidas", value: productData.medidas },
            { label: "Materiales", value: productData.materiales },
            { label: "Acabado", value: productData.acabado }
          ]
        };
        
        setProduct(formattedProduct);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product && onAddToCart) {
      onAddToCart(product);
      console.log('Producto añadido al carrito:', product.name);
    }
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
        
        <ProductDetail 
          product={product}
          onAddToCart={handleAddToCart}
          onNavigate={onNavigate}
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

export default ProductView;