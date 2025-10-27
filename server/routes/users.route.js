const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  login,
  obtenerUsuarios,
} = require("../controllers/user.controller");

// Ruta Publica
router.post("/login", login);

// Rutas protegidas. Falta middlewares de auth
router.post("/CrearUsuario", crearUsuario);
router.get("/obtenerUsuarios", obtenerUsuarios);

module.exports = router;