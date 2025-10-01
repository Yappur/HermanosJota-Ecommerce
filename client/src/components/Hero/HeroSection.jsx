import { useState, useEffect } from "react";
import "./heroSection.css";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        <div
          className={`hero-content ${isVisible ? "hero-content-visible" : ""}`}
        >
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>
            <span> Desde 1987 </span>
            <span className="hero-eyebrow-line"></span>
          </div>

          <h1 className="hero-title">
            Donde cada mueble
            <span className="hero-title-accent"> cuenta una historia</span>
          </h1>

          <p className="hero-description">
            Tres generaciones transformando madera noble en legados familiares.
            Cada veta, cada unión, cada acabado lleva el alma de manos expertas
            que entienden que un mueble no es solo un objeto—es el testigo
            silencioso de tus momentos más preciados.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">37+</span>
              <span className="hero-stat-label">Años de tradición</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">Madera sostenible</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">3</span>
              <span className="hero-stat-label">Generaciones</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary">Explorar colección</button>
            <button className="btn btn-secondary">Nuestra historia</button>
          </div>

          <div className="hero-trust">
            <p className="hero-trust-text">
              "Cada pieza es única, como las familias que las eligen"
            </p>
          </div>
        </div>

        <div className={`hero-image ${isVisible ? "hero-image-visible" : ""}`}>
          <div className="hero-image-wrapper">
            <img src="/logo.svg" alt="" className="hero-image-main" />
            <div className="hero-image-accent"></div>
          </div>

          <div className="hero-badge">
            <svg
              className="hero-badge-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <div className="hero-badge-text">
              <span className="hero-badge-title">Garantía </span>
              <span className="hero-badge-subtitle">De por vida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
