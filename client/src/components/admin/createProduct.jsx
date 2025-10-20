"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createProduct.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado del formulario controlado
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "ARS",
    stock: "",
    imageUrl: "",
    category: "",
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
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          currency: formData.currency,
          stock: Number.parseInt(formData.stock) || 0,
          imageUrl: formData.imageUrl || undefined,
          category: formData.category,
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
          Complete los siguientes campos para agregar un nuevo producto al
          catálogo
        </p>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">
              Nombre del Producto <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Ej: Silla de Comedor Moderna"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Descripción <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength={500}
              rows={4}
              placeholder="Describe las características del producto..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Precio <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Moneda</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="ARS">ARS - Peso Argentino</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
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
            <label htmlFor="category">
              Categoría <span className="required">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Ej: Sillas, Mesas, Sofás"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL de Imagen</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://www.mueblespace.com.ar/images/sliders/grandes/93-1.jpg"
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
