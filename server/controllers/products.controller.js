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
};

const obtenerProductos = async (req = request, res = response) => {
  try {
    const productos = await Producto.find();
    res.json({
      success: true,
      total: productos.length,
      data: productos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const obtenerProductoPorId = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      data: producto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};

const actualizarProducto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
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

    // Verificar si el producto existe
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Verificar si el nuevo nombre ya existe (si se está actualizando el nombre)
    if (nombre && nombre !== producto.nombre) {
      const productoExiste = await Producto.findOne({ nombre });
      if (productoExiste) {
        return res.status(400).json({
          success: false,
          message: "El nombre del producto ya existe",
        });
      }
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        precio,
        medidas,
        materiales,
        acabado,
        stock,
        imagen,
        disponible,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: productoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

const eliminarProducto = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    await Producto.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Producto eliminado exitosamente",
      data: producto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
