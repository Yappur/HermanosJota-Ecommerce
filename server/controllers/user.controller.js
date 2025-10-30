const Usuario = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Controlador para registrar un nuevo usuario
const crearUsuario = async (req = request, res = response) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        mensaje: "El email ya está registrado",
      });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: "admin",
    });

    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      mensaje: "Administrador creado exitosamente",
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear administrador",
      error: error.message,
    });
  }
};

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email }).select("+password");
    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }
    const passwordValido = await usuario.compararPassword(password);
    if (!passwordValido) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el login",
      error: error.message,
    });
  }
};

const obtenerUsuarios = async (req = request, res = response) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json({ cantidad: usuarios.length, usuarios });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

const obtenerUsuarioPorId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  crearUsuario,
  login,
  obtenerUsuarios,
  obtenerUsuarioPorId,
};
