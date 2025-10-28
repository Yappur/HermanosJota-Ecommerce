const express = require("express");
const router = express.Router();
const { crearProducto } = require("../controllers/products.controller");

// Rutas protegidas. Falta middlewares de auth
router.post("/crearProducto", crearProducto);

module.exports = router;