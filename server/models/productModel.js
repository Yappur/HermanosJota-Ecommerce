const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder 100 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      maxlength: [500, "La descripción no puede exceder 500 caracteres"],
    },
    medidas: {
      type: String,
      required: [true, "Las medidas son obligatorias"],
      trim: true,
    },
    materiales: {
      type: String,
      required: [true, "Los materiales son obligatorios"],
      trim: true,
    },
    acabado: {
      type: String,
      required: [true, "El acabado es obligatorio"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    imagen: {
      type: String,
      default: "/placeholder.svg?height=400&width=400",
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producto", productSchema);
