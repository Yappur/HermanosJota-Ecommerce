"use client";

import { useState, useEffect } from "react";
import "./About.css";

const AboutEnhanced = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector(".about-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <div
            className={`about-header ${
              isVisible ? "about-header-visible" : ""
            }`}
          >
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Nuestro equipo</span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 className="heading about-title">
              Tres generaciones,
              <span className="about-title-accent"> una misma pasión</span>
            </h2>
            <p className="text-body">
              Detrás de cada mueble hay manos expertas, corazones dedicados y
              una tradición familiar que se transmite con orgullo. Conoce a las
              personas que dan vida a cada pieza.
            </p>
          </div>

          <div className="about-grid">
            <div
              className={`about-card about-card-main ${
                isVisible ? "about-card-visible" : ""
              }`}
            >
              <div className="about-card-image-wrapper">
                <img
                  src="https://res.cloudinary.com/doh6efk57/image/upload/v1759596207/Carla-Jota_pkhrnw.webp"
                  alt="Carla Jota, CEO de Hermanos Jota"
                  className="about-card-image"
                />
                <div className="about-card-overlay"></div>
              </div>
              <div className="about-card-content">
                <h3 className="about-card-name">Carla Jota</h3>
                <p className="about-card-role">Directora General (CEO)</p>
                <p className="text-body">
                  Tercera generación al frente de Hermanos Jota, Carla combina
                  la herencia familiar con una visión contemporánea. Lidera la
                  estrategia global de la marca, asegurando que cada decisión
                  honre la tradición artesanal mientras impulsa la innovación y
                  la sustentabilidad.
                </p>
              </div>
            </div>

            <div className="about-secondary-grid">
              <div
                className={`about-card about-card-secondary ${
                  isVisible ? "about-card-visible about-card-delay-1" : ""
                }`}
              >
                <div className="about-card-image-wrapper">
                  <img
                    src="https://res.cloudinary.com/doh6efk57/image/upload/v1759596221/Martin-Elizalde_t1hjt4.webp"
                    alt="Martín Elizalde, CPO de Hermanos Jota"
                    className="about-card-image"
                  />
                  <div className="about-card-overlay"></div>
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-name">Martin Elizalde</h3>
                  <p className="about-card-role">
                    Director de Diseño e Innovación (CPO)
                  </p>
                  <p className="text-body ">
                    Diseñador industrial apasionado por la madera y los procesos
                    sustentables. Martín encabeza el desarrollo de nuevas
                    colecciones, buscando siempre el equilibrio entre nostalgia
                    e innovación, con líneas limpias y materiales nobles.
                  </p>
                </div>
              </div>

              <div
                className={`about-card about-card-secondary ${
                  isVisible ? "about-card-visible about-card-delay-2" : ""
                }`}
              >
                <div className="about-card-image-wrapper">
                  <img
                    src="https://res.cloudinary.com/doh6efk57/image/upload/v1759596231/Sofia-Rinaldi_otjwns.webp"
                    alt="Sofía Rinaldi, COO de Hermanos Jota"
                    className="about-card-image"
                  />
                  <div className="about-card-overlay"></div>
                </div>
                <div className="about-card-content">
                  <h3 className="about-card-name">Sofía Rinaldi</h3>
                  <p className="about-card-role">
                    Directora de Sustentabilidad y Operaciones (COO)
                  </p>
                  <p className="text-body">
                    Ingeniera en gestión ambiental, Sofía asegura que cada etapa
                    de producción respete la naturaleza y la filosofía
                    sustentable de la empresa. Supervisa la certificación de
                    materiales, los programas ecológicos y la excelencia en los
                    procesos operativos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="values-container">
          <h2 className="values-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Artesanía</h3>
              <p>
                Cada pieza es trabajada con dedicación y técnicas transmitidas
                por generaciones, garantizando calidad excepcional.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h3>Sustentabilidad</h3>
              <p>
                Comprometidos con el medio ambiente, utilizamos maderas
                certificadas y procesos eco-responsables.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Tradición Familiar</h3>
              <p>
                Tres generaciones de experiencia y pasión por la madera, creando
                muebles que perduran en el tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>¿Listo para transformar tu espacio?</h2>
          <p>
            Descubre nuestra colección de muebles artesanales o contáctanos para
            un proyecto personalizado.
          </p>
          <div className="cta-buttons">
            <button
              className="cta-button cta-primary"
              onClick={() => onNavigate("products")}
            >
              Ver Productos
            </button>
            <button
              className="cta-button cta-secondary"
              onClick={() => onNavigate("contact")}
            >
              Contactar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutEnhanced;
