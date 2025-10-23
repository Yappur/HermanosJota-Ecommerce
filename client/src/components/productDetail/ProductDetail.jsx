import { useMemo } from "react";
import { useState } from "react";

const ProductDetail = ({ product, onAddToCart, onNavigate, apiBase, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);

  useMemo(() => setForm(product), [product]);

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency || "ARS",
    }).format(price);
  };

  const handleWhatsAppConsult = () => {
    const phoneNumber = "+541145678900";

    const message = `Hola! Me interesa consultar sobre:\n\n*${
      product.name
    }*\n\nPrecio: ${formatPrice(
      product.price,
      product.currency
    )}\n\n¿Podrían brindarme más información?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalized = (name === "price" || name === "stock") ? value.replace(",", ".") : value;
    setForm((prev) => ({ ...prev, [name]: normalized }));
  };

  const saveDetails = async () => {
    if (!form.name?.trim()) return alert("El nombre es requerido");
    if (!form.description?.trim()) return alert("La descripción es requerida");
    if (form.price === "" || Number.isNaN(Number(form.price)) || Number(form.price) < 0)
      return alert("El precio debe ser un número ≥ 0");
    if (form.stock === "" || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)
      return alert("El stock debe ser un entero ≥ 0");
    if (!form.category?.trim()) return alert("La categoría es requerida");

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        currency: form.currency || "ARS",
        stock: Number(form.stock),
        imageUrl: product.image,
        category: form.category.trim(),
        availability: form.availability || "InStock",
      };

      const res = await fetch(`${apiBase}/api/productos/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.errors?.join(" · ") || data?.message || `Error HTTP ${res.status}`);

      onUpdated?.(data.data);
      setEditing(false);
    } catch (e) {
      alert(e.message || "Error al guardar detalles");
    } finally {
      setSaving(false);
    }
  };

   return !editing ? (
    <section className="details">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h1 id="title" className="title" itemProp="name">{product.name}</h1>
        <button className="btn btn-sm" onClick={() => setEditing(true)}>Editar</button>
      </div>

      <p id="desc" className="desc" itemProp="description">{product.description}</p>

      <div className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="priceCurrency" content={product.currency || "ARS"} />
        <span className="price-label">Precio</span>
        <span id="priceValue" className="price-value" itemProp="price">
          {formatPrice(product.price, product.currency)}
        </span>
        <link id="availability" itemProp="availability" href={`https://schema.org/${product.availability || "InStock"}`} />
      </div>

      <div className="cta-row">
        <button className="btn btn-outline" onClick={() => onNavigate && onNavigate("products")}>
          Ver más productos
        </button>
        <button className="btn btn-whatsapp" onClick={handleWhatsAppConsult} aria-label="Consultar por WhatsApp">
          Consultar
        </button>
        <button id="btnAddToCart" className="btn btn-primary" onClick={onAddToCart}>
          Añadir al Carrito
        </button>
      </div>
    </section>
  ) : (
    <section className="details">
      <h2>Editar detalles</h2>

      <label>Nombre
        <input name="name" value={form.name || ""} onChange={handleChange} />
      </label>

      <label>Descripción
        <textarea name="description" rows={4} value={form.description || ""} onChange={handleChange} />
      </label>

      <label>Precio
        <input name="price" inputMode="decimal" value={form.price ?? ""} onChange={handleChange} />
      </label>

      <label>Moneda
        <select name="currency" value={form.currency || "ARS"} onChange={handleChange}>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </label>

      <label>Stock
        <input name="stock" inputMode="numeric" value={form.stock ?? ""} onChange={handleChange} />
      </label>

      <label>Categoría
        <input name="category" value={form.category || ""} onChange={handleChange} />
      </label>

      <label>Disponibilidad
        <select name="availability" value={form.availability || "InStock"} onChange={handleChange}>
          <option value="InStock">En stock</option>
          <option value="OutOfStock">Sin stock</option>
          <option value="PreOrder">Pre-venta</option>
        </select>
      </label>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn btn-primary" onClick={saveDetails} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        <button className="btn btn-ghost" onClick={() => { setForm(product); setEditing(false); }}>
          Cancelar
        </button>

        <button
          className="btn btn-danger"
          onClick={async () => {
            if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

            try {
              const res = await fetch(`${apiBase}/api/productos/${product.id}`, {
                method: "DELETE",
              });
              const data = await res.json().catch(() => ({}));

              if (!res.ok) throw new Error(data?.message || `Error HTTP ${res.status}`);

              alert("Producto eliminado correctamente");

              onNavigate?.("products");
            } catch (e) {
              alert(e.message || "Error al eliminar producto");
            }
          }}
        >
          Eliminar producto
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
