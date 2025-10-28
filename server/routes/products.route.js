const express = require("express");
const router = express.Router();
const { crearProducto, obtenerProductos, obtenerProductoPorId } = require("../controllers/products.controller");

// Rutas Publicas
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

// Rutas protegidas. Falta middlewares de auth
router.post("/crearProducto", crearProducto);


module.exports = router;