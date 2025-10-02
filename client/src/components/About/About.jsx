import { useState, useEffect } from "react";
import "./about.css";

const About = () => {
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
    <section className="about-section">
      <div className="about-container">
        <div
          className={`about-header ${isVisible ? "about-header-visible" : ""}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Nuestro equipo</span>
            <span className="eyebrow-line"></span>
          </div>
          <h2 className="about-title">
            Tres generaciones,
            <span className="about-title-accent"> una misma pasión</span>
          </h2>
          <p className="text-body">
            Detrás de cada mueble hay manos expertas, corazones dedicados y una
            tradición familiar que se transmite con orgullo. Conoce a las
            personas que dan vida a cada pieza.
          </p>
        </div>

        <div className="about-grid">
          {/* Persona Principal */}
          <div
            className={`about-card about-card-main ${
              isVisible ? "about-card-visible" : ""
            }`}
          >
            <div className="about-card-image-wrapper">
              {/* URL de imagen momentanea */}
              <img
                src="https://maderia.es/wp-content/uploads/2024/04/que-habilidades-de-trabajo-en-equipo-son-importantes-para-un-carpintero.jpg"
                alt="Maestro artesano trabajando madera"
                className="about-card-image"
              />
              <div className="about-card-overlay"></div>
            </div>
            <div className="about-card-content">
              <h3 className="about-card-name">Roberto Martínez</h3>
              <p className="about-card-role">Maestro Ebanista · Fundador</p>
              <p className="text-body">
                Con más de 40 años de experiencia, Roberto fundó el taller en
                1987. Su filosofía: "La madera habla, solo hay que saber
                escucharla". Cada pieza lleva su sello de excelencia y
                dedicación.
              </p>
            </div>
          </div>

          {/* Personas Secundarias */}
          <div className="about-secondary-grid">
            <div
              className={`about-card about-card-secondary ${
                isVisible ? "about-card-visible about-card-delay-1" : ""
              }`}
            >
              <div className="about-card-image-wrapper">
                {/* URL de imagen momentanea */}
                <img
                  src="https://media.istockphoto.com/id/973329650/es/foto/mujer-joven-haciendo-carpinter%C3%ADa-en-un-taller.jpg?s=612x612&w=0&k=20&c=Ielb-HSsNaeaTDSCeTbtPZswe3ICqUXlAY_9FbLfFzY="
                  alt="Diseñadora de muebles"
                  className="about-card-image"
                />
                <div className="about-card-overlay"></div>
              </div>
              <div className="about-card-content">
                <h3 className="about-card-name">Ana Martínez</h3>
                <p className="about-card-role">
                  Diseñadora · Segunda Generación
                </p>
                <p className="text-body">
                  Fusiona la tradición familiar con diseño contemporáneo. Su
                  visión moderna mantiene viva la esencia artesanal en cada
                  creación.
                </p>
              </div>
            </div>

            <div
              className={`about-card about-card-secondary ${
                isVisible ? "about-card-visible about-card-delay-2" : ""
              }`}
            >
              <div className="about-card-image-wrapper">
                {/* URL de imagen momentanea */}
                <img
                  src="https://www.iberianpress.es/wp-content/uploads/2025/02/694795-Carpinteria-Gomez-Pardiel.jpg"
                  alt="Joven artesano aprendiz"
                  className="about-card-image"
                />
                <div className="about-card-overlay"></div>
              </div>
              <div className="about-card-content">
                <h3 className="about-card-name">Diego Martínez</h3>
                <p className="about-card-role">Artesano · Tercera Generación</p>
                <p className="text-body">
                  La nueva generación que honra el legado familiar. Combina
                  técnicas ancestrales con innovación sostenible para el futuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
