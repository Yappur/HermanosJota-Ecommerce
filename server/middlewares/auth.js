const jwt = require("jsonwebtoken");
const Usuario = require("../models/userModel");

/**
 * Middleware para verificar el token JWT
 * Valida que el usuario esté autenticado
 */
const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Acceso denegado. No se proporcionó un token válido",
      });
    }

    // Extraer el token (quitando "Bearer ")
    const token = authHeader.substring(7);

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findById(decoded.id).select("-password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Token inválido. Usuario no encontrado",
      });
    }

    // Agregar el usuario al objeto request para usarlo en las rutas
    req.usuario = usuario;
    req.userId = decoded.id;
    req.userRol = decoded.rol;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        mensaje: "Token inválido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "Token expirado",
      });
    }

    res.status(500).json({
      mensaje: "Error al verificar el token",
      error: error.message,
    });
  }
};

/**
 * Middleware para verificar que el usuario sea administrador
 * Debe usarse después del middleware verificarToken
 */
const verificarAdmin = (req, res, next) => {
  if (req.userRol !== "admin") {
    return res.status(403).json({
      mensaje: "Acceso denegado. Se requieren privilegios de administrador",
    });
  }
  next();
};

module.exports = {
  verificarToken,
  verificarAdmin,
};
