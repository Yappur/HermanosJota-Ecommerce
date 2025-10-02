const express = require("express");
const router = express.Router();
const {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
} = require("../controllers/productosController");

// GET /api/productos - Obtener todos los productos
router.get("/", obtenerTodosLosProductos);

// GET /api/productos/:id - Obtener un producto por ID
router.get("/:id", obtenerProductoPorId);

module.exports = router;
