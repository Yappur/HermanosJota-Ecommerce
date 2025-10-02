"use client";

import { useState } from "react";
import "./contact.css";

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

  // Validación en tiempo real
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
        } else if (!/^[\d\s\-+$$$$]+$/.test(value)) {
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

    // Validar el campo mientras el usuario escribe
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Datos del formulario:", formData);
    console.log("Objeto completo:", JSON.stringify(formData, null, 2));

    setIsSubmitting(true);

    try {
      // Hacer petición fetch al backend
      const response = await fetch("http://localhost:5000/api/contact", {
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

      console.log("Respuesta del servidor:", data);

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

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
