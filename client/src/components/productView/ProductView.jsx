"use client";

import { useState, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import ProductDetail from "../productDetail/ProductDetail";
import ProductSpecs from "./ProductSpecs";
import CartNotification from "./cartNotification";
import "./productView.css";

const ProductView = ({ productId, onNavigate, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5001/api/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const responseData = await response.json();
        const productData = responseData.data;

        const imageUrl = `http://localhost:5001${productData.imagen}`;

        const formattedProduct = {
          id: productData.id,
          name: productData.nombre,
          description: productData.descripcion,
          price: productData.precio,
          currency: "ARS",
          image: imageUrl,
          availability: "InStock",
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

  const handleAddToCart = () => {
    if (product && onAddToCart) {
      onAddToCart(product);
      setNotificationProduct(product.name);
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
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
    <>
      <CartNotification
        show={showNotification}
        productName={notificationProduct}
        onClose={handleCloseNotification}
      />

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
          />

          {product.specs.length > 0 && <ProductSpecs specs={product.specs} />}
        </div>
      </main>
    </>
  );
};

export default ProductView;
