const ProductGallery = ({ image, alt, productName, apiBase, productId, onUpdated }) => {
    const handleEditImage = async () => {
      const url = prompt("Nueva URL de imagen:", image || "");
      if (!url || !productId) return;

      try {
        const res = await fetch(`${apiBase}/api/productos/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: url.trim() }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || `Error HTTP ${res.status}`);

        onUpdated?.(data.data);
      } catch (e) {
        alert(e.message || "Error al actualizar la imagen");
      }
  };

  return (
    <section className="gallery">
      <div className="gallery-container">
        <img
          id="heroImg"
          className="hero-img"
          src={image}
          alt={alt || productName}
          itemProp="image"
        />
        <button
          type="button"
          onClick={handleEditImage}
          title="Editar imagen"
          className="edit-img-btn"
        ></button>
      </div>
    </section>
  );
};

export default ProductGallery;