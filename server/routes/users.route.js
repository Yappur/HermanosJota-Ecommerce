const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  login,
  obtenerUsuarios,
} = require("../controllers/user.controller");
const { verificarToken, verificarAdmin } = require("../middlewares");

// Ruta Publica
router.post("/login", login);

// Rutas protegidas - Solo administradores
router.post("/CrearUsuario", verificarToken, verificarAdmin, crearUsuario);
router.get("/obtenerUsuarios", verificarToken, verificarAdmin, obtenerUsuarios);

module.exports = router;