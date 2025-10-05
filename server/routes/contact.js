const express = require("express");
const router = express.Router();

// POST /api/contact - Recibir formulario de contacto
router.post("/", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  const { nombre, apellido, email, telefono, pais, mensaje } = req.body;

  if (!nombre || !apellido || !email || !telefono || !mensaje) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos obligatorios",
    });
  }

  res.status(200).json({
    success: true,
    message:
      "Formulario recibido correctamente. Nos pondremos en contacto pronto.",
    data: {
      nombre,
      apellido,
      email,
    },
  });
});

module.exports = router;
