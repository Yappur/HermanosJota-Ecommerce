const express = require('express');
const router = express.Router();

// Importar todas las rutas
const products = require('./products');

// Configurar rutas principales
router.use('/products', products);

// Ruta de health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'E-commerce API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Ruta de información de la API
router.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API',
    version: '1.0.0',
    features: ['Product management'],
    endpoints: {
      // categories: '/api/categories',
      products: '/api/products',
      health: '/api/health',
    },
  });
});

module.exports = router;
