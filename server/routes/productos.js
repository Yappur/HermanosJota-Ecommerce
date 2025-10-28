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

const findIndexById = (id) => {
  return products.findIndex((product) => product.id === id);
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

// POST /api/productos - Crear un nuevo producto
router.post('/', (req, res) => {
  const {
    nombre,
    descripcion,
    medidas,
    materiales,
    acabado,
    precio,
    stock = 0,
    imagen,
    availability = 'InStock',
  } = req.body;

  if (!nombre || !descripcion || !medidas || !materiales || !acabado) {
    return res.status(400).json({
      success: false,
      message:
        'Los campos nombre, descripcion, medidas, materiales y acabado son obligatorios',
    });
  }

  const slugify = (texto) =>
    texto
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const generatedId = slugify(nombre);
  const id = generatedId || `producto-${Date.now()}`;

  if (findProductById(id)) {
    return res.status(409).json({
      success: false,
      message: 'Ya existe un producto con ese id generado',
      id,
    });
  }

  const nuevoProducto = {
    id,
    nombre,
    descripcion,
    medidas,
    materiales,
    acabado,
    imagen:
      imagen ||
      'https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/placeholder-producto.webp',
    precio: Number.parseFloat(precio) || 0,
    stock: Number.parseInt(stock, 10) || 0,
    availability,
  };

  products.unshift(nuevoProducto);

  res.status(201).json({
    success: true,
    data: nuevoProducto,
  });
});

// PUT /api/products/:id - Actualizar un producto por ID
router.put('/:id', (req, res) => {
  const index = findIndexById(req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Producto no encontrado",
      id: req.params.id,
    });
  }

  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    data: products[index],
  });
});

// DELETE /api/products/:id - Eliminar un producto por ID
router.delete('/:id', (req, res) => {
  const index = findIndexById(req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Producto no encontrado",
      id: req.params.id,
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.json({
    success: true,
    data: deletedProduct[0],
  });
});

module.exports = router;
