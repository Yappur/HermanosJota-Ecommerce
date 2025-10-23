import { useState, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import ProductDetail from "../productDetail/ProductDetail";
import ProductSpecs from "./ProductSpecs";
import "./productView.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const ProductView = ({ productId, onNavigate, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const responseData = await response.json();
        const productData = responseData.data;

        const imageUrl = `${productData.imagen}`;

        const formattedProduct = {
          id: productData.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          currency: "ARS",
          image: imageUrl,
          availability: "InStock",
          category: productData.category,
          stock: productData.stock,
          specs: [
            { label: "Medidas", value: productData.medidas },
            { label: "Materiales", value: productData.materiales },
            { label: "Acabado", value: productData.acabado },
          ].filter((spec) => spec.value),
        };

        setProduct(formattedProduct);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      loadProduct();
    }
  }, [productId]);

    const handleUpdated = (updatedFromServer) => {
    const p = updatedFromServer;
    setProduct((old) => ({
      ...old,
      name: p.name,
      description: p.description,
      price: p.price,
      currency: p.currency || "ARS",
      image: p.imageUrl,
      availability: p.availability || "InStock",
      category: p.category,
      stock: p.stock ?? 0,
    }));
  };

  const handleAddToCart = () => {
    if (product && onAddToCart) {
      onAddToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || "Producto no encontrado"}</p>
      </div>
    );
  }

  return (
    <main
      className="product container"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="gallery-container">
        <ProductGallery
          image={product.image}
          alt={product.name}
          productName={product.name}
          apiBase={API_BASE}
          productId={product.id}
          onUpdated={handleUpdated}
        />
        <aside className="badge">
          <span className="dot"></span>
          Madera certificada FSC® — Hecho en Argentina
        </aside>
      </div>

      <div>
        <ProductDetail
          product={product}
          onAddToCart={handleAddToCart}
          onNavigate={onNavigate}
          apiBase={API_BASE}
          onUpdated={handleUpdated}
        />

        {product.specs.length > 0 && <ProductSpecs specs={product.specs} />}
      </div>
    </main>
  );
};

export default ProductView;
