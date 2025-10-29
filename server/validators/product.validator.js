const ALLOWED_DISPONIBLE = ["Disponible", "No Disponible", "Pre-Orden"];
const ALLOWED_ACABADOS = ["Madera Natural", "Pintado", "Laqueado", "Barnizado"];
const ALLOWED_MATERIALES = ["Madera", "Metal", "Vidrio", "Plástico", "Tela"];

function validateProduct(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!body.nombre) errors.push("Falta el nombre");
    if (!body.descripcion) errors.push("Falta la descripción");
    if (body.precio === undefined) errors.push("Falta el precio");
    if (!body.materiales) errors.push("Faltan los materiales");
  }

  if (body.nombre !== undefined && !String(body.nombre).trim()) {
    errors.push("El nombre no puede estar vacío");
  }

  if (body.descripcion !== undefined && !String(body.descripcion).trim()) {
    errors.push("La descripción no puede estar vacía");
  }

  if (body.precio !== undefined) {
    if (
      typeof body.precio !== "number" ||
      Number.isNaN(body.precio) ||
      body.precio < 0
    ) {
      errors.push("El precio debe ser un número ≥ 0");
    }
  }

  if (body.stock !== undefined) {
    if (!Number.isInteger(body.stock) || body.stock < 0) {
      errors.push("El stock debe ser un entero ≥ 0");
    }
  }

  if (
    body.disponible !== undefined &&
    !ALLOWED_DISPONIBLE.includes(body.disponible)
  ) {
    errors.push(
      `Estado de disponibilidad inválido. Permitidos: ${ALLOWED_DISPONIBLE.join(
        ", "
      )}`
    );
  }

  if (body.acabado !== undefined && !ALLOWED_ACABADOS.includes(body.acabado)) {
    errors.push(`Acabado inválido. Permitidos: ${ALLOWED_ACABADOS.join(", ")}`);
  }

  if (body.materiales !== undefined) {
    if (!Array.isArray(body.materiales)) {
      errors.push("Materiales debe ser un array");
    } else {
      const invalidMateriales = body.materiales.filter(
        (material) => !ALLOWED_MATERIALES.includes(material)
      );
      if (invalidMateriales.length > 0) {
        errors.push(
          `Materiales inválidos: ${invalidMateriales.join(
            ", "
          )}. Permitidos: ${ALLOWED_MATERIALES.join(", ")}`
        );
      }
    }
  }

  if (body.medidas !== undefined) {
    if (
      typeof body.medidas !== "object" ||
      !body.medidas.alto ||
      !body.medidas.ancho ||
      !body.medidas.profundidad
    ) {
      errors.push("Medidas debe incluir alto, ancho y profundidad");
    }
  }

  if (body.imagen !== undefined && !String(body.imagen).trim()) {
    errors.push("La URL de la imagen no puede estar vacía");
  }

  return errors;
}

module.exports = { validateProduct };
