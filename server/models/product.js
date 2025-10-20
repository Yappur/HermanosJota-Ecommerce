const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      maxlength: [500, "La descripción no puede exceder 500 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    currency: {
      type: String,
      default: "ARS",
      enum: ["ARS", "USD", "EUR"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    imageUrl: {
      type: String,
      default: "/placeholder.svg?height=400&width=400",
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
    },
    availability: {
      type: String,
      default: "InStock",
      enum: ["InStock", "OutOfStock", "PreOrder"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
