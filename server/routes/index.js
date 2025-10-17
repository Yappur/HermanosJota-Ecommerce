const express = require("express");
const router = express.Router();

// Importar todas las rutas
const products = require("./products");
const contact = require("./contact");

// Configurar rutas principales
router.use("/products", products);
router.use("/contact", contact);

// Ruta de health check
router.get("/health", (req, res) => {
  const mongoose = require("mongoose");

  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      connected: mongoose.connection.readyState === 1,
      status:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    },
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
      products: "/api/products",
      contact: "/api/contact",
    },
  });
});

module.exports = router;
