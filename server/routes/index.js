const express = require("express");
const router = express.Router();

const contact = require("./contact");
const usuarios = require("./users.route");
const productos = require("./products.route");

// Configurar rutas principales

router.use("/contact", contact);
router.use("/usuarios", usuarios);
router.use("/productos", productos);

// Ruta de health check
router.get("/health", (req, res) => {
  const mongoose = require("mongoose");

  res.json({
    status: "OK",
    message: "E-commerce API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      connected: mongoose.connection.readyState === 1,
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
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
      products: "/api/products (TODO: Mongoose)",
      productos: "/api/productos (ACTIVO: datos en memoria)",
      contact: "/api/contact",
    },
  });
});

module.exports = router;
