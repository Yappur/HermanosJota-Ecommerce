/**
 * ENDPOINTS /api/products
 *
 * NOTA: Este archivo está preparado para usar Mongoose/MongoDB en el futuro.
 * Por ahora usa datos en memoria igual que /api/productos.
 * Mantener sincronizado con productos.js hasta que la DB esté lista.
 */

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/productModel");
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

// PUT /api/products/:id - Actualizar un producto por ID
// router.put('/:id', async (req, res) => {
//   const { error } = validateProduct(req.body);
//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: 'Datos de producto inválidos',
//       details: error.details,
//     });
//   }

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: 'Producto no encontrado',
//         id: req.params.id,
//       });
//     }
//     res.json({
//       success: true,
//       data: updatedProduct,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error al actualizar el producto',
//     });
//   }
// });

// // DELETE /api/products/:id - Eliminar un producto por ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: 'Producto no encontrado',
//         id: req.params.id,
//       });
//     }
//     res.json({
//       success: true,
//       message: 'Producto eliminado correctamente',
//       data: deletedProduct,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error al eliminar el producto',
//     });
//   }
// });

module.exports = router;
