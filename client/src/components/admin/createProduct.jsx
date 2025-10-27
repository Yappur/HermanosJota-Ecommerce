"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado del formulario controlado
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    medidas: "",
    materiales: "",
    acabado: "",
    precio: "",
    stock: "",
    imagen: "",
    availability: "InStock",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          medidas: formData.medidas,
          materiales: formData.materiales,
          acabado: formData.acabado,
          precio: Number.parseFloat(formData.precio),
          stock: Number.parseInt(formData.stock) || 0,
          imagen: formData.imagen || undefined,
          availability: formData.availability,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el producto");
      }

      // Redirección exitosa al catálogo
      navigate("/productos");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-container">
      <div className="create-product-card">
        <h1 className="create-product-title">Crear Nuevo Producto</h1>
        <p className="create-product-subtitle">
          Complete el formulario para agregar un nuevo producto al catálogo
        </p>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre del Producto <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Ej: Aparador Uspallata"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">
              Descripción <span className="required">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              maxLength={500}
              rows={4}
              placeholder="Describe las características del producto..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="medidas">
              Medidas <span className="required">*</span>
            </label>
            <input
              type="text"
              id="medidas"
              name="medidas"
              value={formData.medidas}
              onChange={handleChange}
              required
              placeholder="Ej: 180 × 45 × 75 cm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="materiales">
              Materiales <span className="required">*</span>
            </label>
            <input
              type="text"
              id="materiales"
              name="materiales"
              value={formData.materiales}
              onChange={handleChange}
              required
              placeholder="Ej: Nogal macizo FSC®, herrajes de latón"
            />
          </div>

          <div className="form-group">
            <label htmlFor="acabado">
              Acabado <span className="required">*</span>
            </label>
            <input
              type="text"
              id="acabado"
              name="acabado"
              value={formData.acabado}
              onChange={handleChange}
              required
              placeholder="Ej: Aceite natural ecológico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">
              Precio <span className="required">*</span>
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="250000"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Disponibilidad</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="InStock">En Stock</option>
                <option value="OutOfStock">Sin Stock</option>
                <option value="PreOrder">Pre-orden</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de Imagen</label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://img.freepik.com/psd-gratis/sofa-gris-moderno-mediados-siglo-marco-madera_632498-25556.jpg?semt=ais_hybrid&w=740&q=80"
            />
            <small className="form-help">
              Opcional. Si no se proporciona, se usará una imagen por defecto.
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/productos")}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
