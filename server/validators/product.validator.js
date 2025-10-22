const ALLOWED_CURRENCIES = ["ARS", "USD", "EUR"];
const ALLOWED_AVAILABILITY = ["InStock", "OutOfStock", "PreOrder"];
const ALLOWED_CATEGORIES = ["Muebles", "Sillas", "Mesas", "Decoración", "Iluminación"]; // <-- TODO: ajustá a tus categorías reales

function validateProduct(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!body.name) errors.push("Falta el nombre");
    if (!body.description) errors.push("Falta la descripción");
    if (body.price === undefined) errors.push("Falta el precio");
    if (!body.category) errors.push("Falta la categoría");
  }

  if (body.name !== undefined && !String(body.name).trim()) {
    errors.push("El nombre no puede estar vacío");
  }

  if (body.description !== undefined && !String(body.description).trim()) {
    errors.push("La descripción no puede estar vacía");
  }

  if (body.price !== undefined) {
    if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
      errors.push("El precio debe ser un número ≥ 0");
    }
  }

  if (body.stock !== undefined) {
    if (!Number.isInteger(body.stock) || body.stock < 0) {
      errors.push("El stock debe ser un entero ≥ 0");
    }
  }

  if (body.currency !== undefined && !ALLOWED_CURRENCIES.includes(body.currency)) {
    errors.push(`currency inválida. Permitidas: ${ALLOWED_CURRENCIES.join(", ")}`);
  }

  if (body.availability !== undefined && !ALLOWED_AVAILABILITY.includes(body.availability)) {
    errors.push(`availability inválida. Permitidas: ${ALLOWED_AVAILABILITY.join(", ")}`);
  }

  if (body.category !== undefined && ALLOWED_CATEGORIES && !ALLOWED_CATEGORIES.includes(body.category)) {
    errors.push(`category inválida. Permitidas: ${ALLOWED_CATEGORIES.join(", ")}`);
  }

  if (body.imageUrl !== undefined && !String(body.imageUrl).trim()) {
    errors.push("imageUrl no puede estar vacía");
  }

  return errors;
}

module.exports = { validateProduct };
