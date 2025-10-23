const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const { validateProduct } = require("../validators/product.validator");


const findProductById = (id) => {
  return products.find((product) => product.id === id);
};

// GET /api/products - Obtener todos los productos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length,
  });
});

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = findProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Producto no encontrado',
      id: req.params.id,
    });
  }

  res.json({
    success: true,
    data: product,
  });
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
