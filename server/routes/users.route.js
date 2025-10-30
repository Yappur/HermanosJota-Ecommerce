const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  login,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/user.controller");
const { verificarToken, verificarAdmin } = require("../middlewares");

// Ruta Publica
router.post("/login", login);

// Rutas protegidas - Solo administradores
router.post("/CrearUsuario", verificarToken, verificarAdmin, crearUsuario);
router.get("/obtenerUsuarios", verificarToken, verificarAdmin, obtenerUsuarios);
router.get(
  "/obtenerUsuario/:id",
  verificarToken,
  verificarAdmin,
  obtenerUsuarioPorId
);

router.put("/:id", verificarToken, verificarAdmin, actualizarUsuario);
router.delete("/:id", verificarToken, verificarAdmin, eliminarUsuario);

module.exports = router;
