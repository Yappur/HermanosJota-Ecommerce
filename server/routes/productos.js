/**
 * ENDPOINTS /api/productos
 *
 * NOTA IMPORTANTE:
 * Este archivo implementa endpoints (/api/productos) usando datos en memoria.
 *
 * Coexiste con /api/products que está preparado para usar Mongoose/MongoDB.
 *
 * Cuando la base de datos esté lista podemos migrar esta lógica a usar el modelo Product de Mongoose o crear un servicio que unifique ambas implementaciones
 *
 * Por ahora, usa: server/data/products.js (datos estáticos)
 * Futuro: server/models/product.js (modelo Mongoose)
 */

const express = require('express');
const router = express.Router();
const products = require('../data/products'); // TODO: Migrar a modelo Mongoose cuando esté listo

const findProductById = (id) => {
  return products.find((product) => product.id === id);
};

// GET /api/productos - Obtener todos los productos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length,
  });
});

// GET /api/productos/:id - Obtener un producto por ID
// Frontend usa este endpoint con React Router: /productos/:id
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
