import { useState, useEffect, useRef } from "react";
import "./ProductosDestacados.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const ProductosDestacados = ({ onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayIntervalRef = useRef(null);
  const carouselRef = useRef(null);

  const featuredProductIds = [
    "aparador-uspallata",
    "biblioteca-recoleta",
    "butaca-mendoza",
    "sillon-copacabana",
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }
        const data = await response.json();
        const products = Array.isArray(data.data) ? data.data : [];

        const featured = products.filter((product) =>
          featuredProductIds.includes(product.id)
        );

        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchFeaturedProducts();
  }, []);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextSlide = () => {
    if (featuredProducts.length > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % featuredProducts.length;
        return newIndex;
      });
    }
  };

  const prevSlide = () => {
    if (featuredProducts.length > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          (prevIndex - 1 + featuredProducts.length) % featuredProducts.length;
        return newIndex;
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startAutoPlay = () => {
    autoPlayIntervalRef.current = setInterval(nextSlide, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const updateCarousel = () => {
    if (carouselRef.current && featuredProducts.length > 0) {
      const track = carouselRef.current.querySelector(".carousel-track");
      if (track) {
        const itemWidth = 100;
        const translateX = -currentIndex * itemWidth;
        track.style.transform = `translateX(${translateX}%)`;
      }
    }
  };

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  useEffect(() => {
    if (featuredProducts.length > 0 && !loading) {
      startAutoPlay();
    }

    return () => stopAutoPlay();
  }, [featuredProducts.length, loading]);

  const handleMouseEnter = () => {
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    startAutoPlay();
  };

  const handlePrevClick = () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  };

  const handleNextClick = () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  };

  if (loading) {
    return (
      <section
        className="featured-products"
        id="productos"
        aria-labelledby="products-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="products-title">
              Productos Destacados
            </h2>
            <p className="section-description">
              Cada pieza envejece con gracia, desarrollando carácter mientras
              mantiene su belleza esencial.
            </p>
          </div>

          <div
            className="loading active"
            aria-live="polite"
            aria-label="Cargando productos"
          >
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>Cargando productos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="featured-products"
      id="productos"
      aria-labelledby="products-title"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="products-title">
            Productos Destacados
          </h2>
          <p className="section-description">
            Cada pieza envejece con gracia, desarrollando carácter mientras
            mantiene su belleza esencial.
          </p>
        </div>

        <div
          className="products-carousel"
          role="region"
          aria-label="Carousel de productos destacados"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={handlePrevClick}
            aria-label="Producto anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="carousel-container">
            <div className="carousel-track">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  data-index={index}
                >
                  <div className="product-card">
                    <img
                      src={`${API_BASE}${product.imagen}`}
                      alt={product.nombre}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-info">
                      <h3 className="product-name">{product.nombre}</h3>
                      <p className="product-description">
                        {product.descripcion}
                      </p>
                      <p className="product-price">
                        {formatPrice(product.precio)}
                      </p>
                      <span className="product-badge">Sustentable</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-btn carousel-btn-next"
            onClick={handleNextClick}
            aria-label="Producto siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="carousel-indicators">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="section-footer">
          <button
            className="btn btn-outline"
            onClick={() => onNavigate("products")}
            role="button"
            aria-label="Ver toda la colección de muebles"
          >
            VER TODA LA COLECCIÓN
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductosDestacados;
