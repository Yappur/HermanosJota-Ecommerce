import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./admin-products.css";

const INITIAL_FORM = {
  nombre: "",
  descripcion: "",
  medidas: "",
  materiales: "",
  acabado: "",
  precio: "",
  stock: "",
  imagen: "",
  availability: "InStock",
};

const apiUrl = (path) => {
  const base = import.meta.env.VITE_API_BASE;
  return base ? `${base}${path}` : path;
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [panelMode, setPanelMode] = useState(null); // null | "create" | "edit"

  const isPanelOpen = panelMode !== null;
   const auth = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl("/api/productos"));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudieron cargar los productos");
      }

      setProducts(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreatePanel = () => {
    setPanelMode("create");
    setSelectedId(null);
    setFormData(INITIAL_FORM);
  };

  const openEditPanel = (product) => {
    setPanelMode("edit");
    setSelectedId(product.id);
    setFormData({
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      medidas: product.medidas || "",
      materiales: product.materiales || "",
      acabado: product.acabado || "",
      precio:
        product.precio != null && !Number.isNaN(product.precio)
          ? product.precio.toString()
          : "",
      stock:
        product.stock != null && !Number.isNaN(product.stock)
          ? product.stock.toString()
          : "",
      imagen: product.imagen || "",
      availability: product.availability || "InStock",
    });
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelectedId(null);
    setFormData(INITIAL_FORM);
    setSaving(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Eliminar el producto "${product.nombre}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(apiUrl(`/api/productos/${product.id}`), {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo eliminar el producto");
      }

      setProducts((prev) => prev.filter((item) => item.id !== product.id));
      setFeedback({
        type: "success",
        message: "Producto eliminado correctamente",
      });

      if (selectedId === product.id) {
        closePanel();
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      medidas: formData.medidas.trim(),
      materiales: formData.materiales.trim(),
      acabado: formData.acabado.trim(),
      precio: Number.parseFloat(formData.precio) || 0,
      stock: Number.parseInt(formData.stock, 10) || 0,
      imagen: formData.imagen.trim(),
      availability: formData.availability,
    };

    const isEditing = panelMode === "edit";

    try {
      const endpoint = isEditing
        ? apiUrl(`/api/productos/${selectedId}`)
        : apiUrl("/api/productos/crearProducto");
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `No se pudo ${isEditing ? "actualizar" : "crear"} el producto`
        );
      }

      const updatedProduct = data.data;

      if (isEditing) {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === selectedId ? { ...item, ...updatedProduct } : item
          )
        );
        setFeedback({
          type: "success",
          message: "Producto actualizado correctamente",
        });
      } else {
        setProducts((prev) => [updatedProduct, ...prev]);
        setFeedback({
          type: "success",
          message: "Producto creado correctamente",
        });
      }

      closePanel();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      const texto = [
        product.nombre,
        product.descripcion,
        product.materiales,
        product.medidas,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return texto.includes(query);
    });
  }, [products, searchQuery]);

  const formatPrice = (value) => {
    try {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(value || 0);
    } catch (err) {
      return value;
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-content__header">
        <h1 className="admin-content__title">Gestión de productos</h1>
        <p className="admin-content__subtitle">
          Administre el catálogo disponible en la tienda.
        </p>
      </div>

      {feedback && (
        <p
          className={
            feedback.type === "error"
              ? "admin-feedback admin-feedback--error"
              : "admin-feedback admin-feedback--success"
          }
        >
          {feedback.message}
        </p>
      )}

      <div className="admin-panel">
        <div className="admin-table-container">
          <div className="admin-table__header">
            <div>
              <h2>Catálogo</h2>
              <p className="admin-table__subtitle">
                Productos visibles en la tienda en línea.
              </p>
            </div>
            <div className="admin-table__actions">
              <input
                type="search"
                placeholder="Buscar por nombre, descripción o materiales..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={fetchProducts}
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={openCreatePanel}
              >
                Nuevo producto
              </button>
            </div>
          </div>

          {loading ? (
            <div className="admin-table__empty">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="admin-table__empty admin-table__empty--error">
              <p>{error}</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={fetchProducts}
              >
                Reintentar
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="admin-table__empty">
              <p>No se encontraron productos con los filtros actuales.</p>
            </div>
          ) : (
            <div className="admin-table__wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Disponibilidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-table__main-cell">
                          <img
                            src={
                              product.imagen ||
                              "https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&w=160&q=60"
                            }
                            alt={product.nombre}
                            loading="lazy"
                          />
                          <div>
                            <strong>{product.nombre}</strong>
                            <p>{product.materiales}</p>
                          </div>
                        </div>
                      </td>
                      <td>{formatPrice(product.precio)}</td>
                      <td>{product.stock ?? 0}</td>
                      <td>
                        <span
                          className={`badge badge--${(
                            product.availability || "InStock"
                          ).toLowerCase()}`}
                        >
                          {product.availability === "OutOfStock"
                            ? "Sin stock"
                            : product.availability === "PreOrder"
                            ? "Pre-orden"
                            : "En stock"}
                        </span>
                      </td>
                      <td className="admin-table__actions-cell">
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => openEditPanel(product)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-ghost btn-ghost--danger"
                          onClick={() => handleDelete(product)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isPanelOpen && (
          <>
            <button
              type="button"
              className="admin-overlay"
              aria-label="Cerrar panel"
              onClick={closePanel}
            ></button>
            <aside className="admin-drawer admin-drawer--open">
              <div className="admin-drawer__header">
                <div>
                  <p className="admin-drawer__eyebrow">
                    {panelMode === "edit" ? "Editar" : "Nuevo"} producto
                  </p>
                  <h2>
                    {panelMode === "edit"
                      ? "Editar producto"
                      : "Crear producto"}
                  </h2>
                </div>
                <button
                  type="button"
                  className="admin-drawer__close"
                  onClick={closePanel}
                  aria-label="Cerrar formulario"
                >
                  &times;
                </button>
              </div>

              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-form__grid">
                  <label className="admin-form__field admin-form__field--full">
                    <span>Nombre *</span>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      maxLength={120}
                    />
                  </label>

                  <label className="admin-form__field">
                    <span>Precio *</span>
                    <input
                      type="number"
                      name="precio"
                      min="0"
                      step="0.01"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-form__field">
                    <span>Stock</span>
                    <input
                      type="number"
                      name="stock"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="admin-form__field">
                    <span>Disponibilidad</span>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                    >
                      <option value="InStock">En stock</option>
                      <option value="OutOfStock">Sin stock</option>
                      <option value="PreOrder">Pre-orden</option>
                    </select>
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>Descripción *</span>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                      rows={3}
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>Medidas *</span>
                    <input
                      type="text"
                      name="medidas"
                      value={formData.medidas}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>Materiales *</span>
                    <input
                      type="text"
                      name="materiales"
                      value={formData.materiales}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>Acabado *</span>
                    <input
                      type="text"
                      name="acabado"
                      value={formData.acabado}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>URL de imagen</span>
                    <input
                      type="url"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </label>
                </div>

                <div className="admin-drawer__actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closePanel}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={saving}
                  >
                    {saving
                      ? panelMode === "edit"
                        ? "Guardando..."
                        : "Creando..."
                      : panelMode === "edit"
                      ? "Guardar cambios"
                      : "Crear producto"}
                  </button>
                </div>
              </form>
            </aside>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminProducts;
