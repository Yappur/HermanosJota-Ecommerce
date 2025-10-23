const express = require("express");
const router = express.Router();

/**
 * IMPORTANTE: Actualmente hay DOS implementaciones de productos:
 *
 * 1. /api/products - Preparado para Mongoose/MongoDB (en desarrollo)
 * 2. /api/productos - Implementación con datos en memoria (ACTIVO)
 *
 * El frontend usa /api/productos para las páginas dinámicas con React Router.
 * Cuando la DB esté lista, ambos endpoints pueden unificarse.
 */

// Importar todas las rutas
const products = require("./products");
const productos = require("./productos");
const contact = require("./contact");

// Configurar rutas principales
router.use("/products", products);     // TODO: Migrar a Mongoose cuando esté listo
router.use("/productos", productos);   // ACTIVO: Usa datos en memoria (server/data/products.js)
router.use("/contact", contact);

// Ruta de health check
router.get("/health", (req, res) => {
  // TODO: Descomentar cuando Mongoose esté configurado
  // const mongoose = require("mongoose");

  res.json({
    status: "OK",
    message: "E-commerce API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    // database: {
    //   connected: mongoose.connection.readyState === 1,
    //   status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    // },
  });
});

// Ruta de información de la API
router.get("/", (req, res) => {
  res.json({
    message: "E-commerce API",
    version: "1.0.0",
    features: ["Product management"],
    endpoints: {
      health: "/api/health",
      products: "/api/products (TODO: Mongoose)",
      productos: "/api/productos (ACTIVO: datos en memoria)",
      contact: "/api/contact",
    },
  });
});

module.exports = router;
