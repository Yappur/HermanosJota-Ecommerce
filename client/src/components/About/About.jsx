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
          <h2 className="heading about-title">
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
              <h3 className="about-card-name">Carla Jota</h3>
              <p className="about-card-role">Directora General (CEO)</p>
              <p className="text-body">
                Tercera generación al frente de Hermanos Jota, Carla combina la
                herencia familiar con una visión contemporánea. Lidera la
                estrategia global de la marca, asegurando que cada decisión
                honre la tradición artesanal mientras impulsa la innovación y la
                sustentabilidad.
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
                <h3 className="about-card-name">Martin Elizalde</h3>
                <p className="about-card-role">
                  Director de Diseño e Innovación (CPO)
                </p>
                <p className="text-body ">
                  Diseñador industrial apasionado por la madera y los procesos
                  sustentables. Martín encabeza el desarrollo de nuevas
                  colecciones, buscando siempre el equilibrio entre nostalgia e
                  innovación, con líneas limpias y materiales nobles.
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
                <h3 className="about-card-name">Sofia Rinaldi</h3>
                <p className="about-card-role">
                  Directora de Sustentabilidad y Operaciones (COO)
                </p>
                <p className="text-body">
                  Ingeniera en gestión ambiental, Sofía asegura que cada etapa
                  de producción respete la naturaleza y la filosofía sustentable
                  de la empresa. Supervisa la certificación de materiales, los
                  programas ecológicos y la excelencia en los procesos
                  operativos.
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
