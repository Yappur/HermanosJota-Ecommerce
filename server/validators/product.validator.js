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

  // Acepta tanto string como boolean para disponible
  if (body.disponible !== undefined) {
    if (typeof body.disponible === "boolean") {
    } else if (
      typeof body.disponible === "string" &&
      !ALLOWED_DISPONIBLE.includes(body.disponible)
    ) {
      errors.push(
        `Estado de disponibilidad inválido. Permitidos: ${ALLOWED_DISPONIBLE.join(
          ", "
        )} o valores booleanos (true/false)`
      );
    }
  }

  // Acepta tanto string como que esté en el array permitido
  if (body.acabado !== undefined) {
    if (typeof body.acabado === "string" && body.acabado.trim()) {
    } else if (!body.acabado) {
      errors.push("El acabado no puede estar vacío");
    }
  }

  // Acepta tanto array como string para materiales
  if (body.materiales !== undefined) {
    if (typeof body.materiales === "string" && body.materiales.trim()) {
    } else if (Array.isArray(body.materiales)) {
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
    } else {
      errors.push("Materiales debe ser un string o un array");
    }
  }

  if (body.medidas !== undefined) {
    if (typeof body.medidas === "string" && body.medidas.trim()) {
    } else if (typeof body.medidas === "object" && body.medidas !== null) {
      if (
        !body.medidas.alto ||
        !body.medidas.ancho ||
        !body.medidas.profundidad
      ) {
        errors.push("Medidas debe incluir alto, ancho y profundidad");
      }
    } else {
      errors.push(
        "Medidas debe ser un string o un objeto con alto, ancho y profundidad"
      );
    }
  }

  if (body.imagen !== undefined && !String(body.imagen).trim()) {
    errors.push("La URL de la imagen no puede estar vacía");
  }

  return errors;
}

module.exports = { validateProduct };