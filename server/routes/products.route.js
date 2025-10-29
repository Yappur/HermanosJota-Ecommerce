const express = require("express");
const router = express.Router();
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/products.controller");

// Rutas Publicas
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

// Rutas protegidas. Falta middlewares de auth
router.post("/crearProducto", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
