/**
 * ENDPOINTS /api/products
 *
 * NOTA: Este archivo está preparado para usar Mongoose/MongoDB en el futuro.
 * Por ahora usa datos en memoria igual que /api/productos.
 * Mantener sincronizado con productos.js hasta que la DB esté lista.
 */

const express = require('express');
const router = express.Router();
const products = require('../data/products');

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

module.exports = router;
