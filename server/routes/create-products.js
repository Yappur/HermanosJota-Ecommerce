const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      currency,
      stock,
      imageUrl,
      category,
      availability,
    } = req.body;

    // Validar campos requeridos
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Faltan campos obligatorios: name, description, price, category",
      });
    }

    // Crear nuevo producto
    const newProduct = new Product({
      name,
      description,
      price,
      currency: currency || "ARS",
      stock: stock || 0,
      imageUrl: imageUrl || "/placeholder.svg?height=400&width=400",
      category,
      availability: availability || "InStock",
    });

    // Guardar en la base de datos
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);

    // Manejar errores de validación de Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
});

module.exports = router;
