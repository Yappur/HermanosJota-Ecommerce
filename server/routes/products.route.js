const express = require("express");
const router = express.Router();
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/products.controller");
const { verificarToken, verificarAdmin } = require("../middlewares");

// Rutas Publicas
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

// Rutas protegidas - Solo administradores
router.post("/crearProducto", verificarToken, verificarAdmin, crearProducto);
router.put("/:id", verificarToken, verificarAdmin, actualizarProducto);
router.delete("/:id", verificarToken, verificarAdmin, eliminarProducto);

module.exports = router;
