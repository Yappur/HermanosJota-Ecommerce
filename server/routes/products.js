const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const { validateProduct } = require("../validators/product.validator");


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



  router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ success: false, message: "Nada para actualizar" });
    }


    const errors = validateProduct(req.body, true);
    if (errors.length) {
      return res.status(400).json({ success: false, message: "Error de validación", errors });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    return res.json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: updated,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Error de validación en Mongoose",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    return res.status(500).json({ success: false, message: "Error al actualizar el producto", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    return res.json({
      success: true,
      message: "Producto eliminado exitosamente",
      data: deleted,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
});

module.exports = router;
