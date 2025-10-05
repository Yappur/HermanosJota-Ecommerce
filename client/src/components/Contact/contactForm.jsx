import { useState } from "react";
import "./contactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    pais: "Argentina",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const paises = [
    { codigo: "+54", nombre: "Argentina" },
    { codigo: "+57", nombre: "Colombia" },
    { codigo: "+52", nombre: "México" },
    { codigo: "+34", nombre: "España" },
    { codigo: "+1", nombre: "Estados Unidos" },
  ];

  // Validación tiempo real
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "nombre":
      case "apellido":
        if (!value.trim()) {
          error = "Este campo es obligatorio";
        } else if (value.length < 2) {
          error = "Debe tener al menos 2 caracteres";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = "Solo se permiten letras";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "El email es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email inválido";
        }
        break;

      case "telefono":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!/^[\d\s\-+()]+$/.test(value)) {
          error = "Solo se permiten números";
        } else if (value.replace(/\D/g, "").length < 7) {
          error = "Teléfono demasiado corto";
        }
        break;

      case "mensaje":
        if (!value.trim()) {
          error = "El mensaje es obligatorio";
        } else if (value.length < 10) {
          error = "El mensaje debe tener al menos 10 caracteres";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar tiempo real
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el formulario");
      }

      setSubmitSuccess(true);

      // Limpiar el formulario
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        pais: "Argentina",
        mensaje: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = error.message;

      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "No se puede conectar al servidor. Asegúrate de que el backend esté corriendo en el puerto 3000";
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-hero">
        <h1>Contáctanos</h1>
        <br />
        <p>
          ¿Tenés alguna consulta, sugerencia o querés trabajar con nosotros?
          Completá el formulario y te responderemos a la brevedad.
        </p>
      </div>
      <div className="contact-form-container">
        <h2>Formulario de Contacto</h2>

        {submitSuccess && (
          <div className="success-message">
            ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo
            pronto.
          </div>
        )}

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? "error" : ""}
              />
              {errors.nombre && (
                <span className="error-text">{errors.nombre}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={errors.apellido ? "error" : ""}
              />
              {errors.apellido && (
                <span className="error-text">{errors.apellido}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pais">País *</label>
              <select
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
              >
                {paises.map((pais) => (
                  <option key={pais.nombre} value={pais.nombre}>
                    {pais.nombre} ({pais.codigo})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errors.telefono ? "error" : ""}
                placeholder="Ej: 300 123 4567"
              />
              {errors.telefono && (
                <span className="error-text">{errors.telefono}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje *</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className={errors.mensaje ? "error" : ""}
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
            />
            {errors.mensaje && (
              <span className="error-text">{errors.mensaje}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </div>

      <section className="contact-container">
        {/* Información de contacto */}
        <div className="contact-info">
          <h2>Información de Contacto</h2>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div className="contact-text">
                <h3>Teléfono</h3>
                <p>
                  <a href="tel:+541145678900">+54 11 4567-8900</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@hermanosjota.com.ar">
                    info@hermanosjota.com.ar
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="contact-text">
                <h3>Dirección</h3>
                <p>
                  Av. San Juan 2847
                  <br />
                  Barrio de San Cristóbal
                  <br />
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div className="contact-text">
                <h3>Horarios</h3>
                <p>
                  Lunes a Viernes: 10:00 - 19:00
                  <br />
                  Sábados: 10:00 - 14:00
                </p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3>Síguenos</h3>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/hermanosjota_ba/"
                aria-label="Instagram"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://wa.me/541145678900" aria-label="WhatsApp">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <h2>Nuestra Ubicación</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8969755666847!2d-58.39929!3d-34.61315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacb9f8ff113%3A0x22fd0f8c6cc4d1a7!2sAv.%20San%20Juan%202847%2C%20C1232AAE%20CABA%2C%20Argentina!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Hermanos Jota"
            />
          </div>
          <div className="map-info">
            <p>
              <strong>Av. San Juan 2847</strong>
            </p>
            <p>Barrio de San Cristóbal</p>
            <p>Buenos Aires, Argentina</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
