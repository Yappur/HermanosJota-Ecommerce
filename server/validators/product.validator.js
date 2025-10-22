
export function validateProduct(body, isUpdate = false) {
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

  if (body.imageUrl !== undefined && !String(body.imageUrl).trim()) {
    errors.push("La URL de la imagen no puede estar vacía");
  }

  return errors;
}


