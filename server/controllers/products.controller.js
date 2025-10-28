const Producto = require("../models/productModel");

const crearProducto = async (req = request, res = response) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      medidas,
      materiales,
      acabado,
      stock,
      imagen,
      disponible,
    } = req.body;

    const productoExiste = await Producto.findOne({ nombre });
    if (productoExiste) {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto ya existe",
      });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      medidas,
      materiales,
      acabado,
      stock,
      imagen,
      disponible,
    });

    await nuevoProducto.save();
    res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: nuevoProducto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
}

module.exports = {
  crearProducto,
};