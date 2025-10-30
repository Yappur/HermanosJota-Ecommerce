const Producto = require("../models/productModel");
const { validateProduct } = require("../validators/product.validator");

// Sanitizador para estructurar y limpiar los datos del producto, para evitar repetición de código
const extraerDatosProducto = (body) => {
  const camposPermitidos = [
    "nombre",
    "descripcion",
    "precio",
    "medidas",
    "materiales",
    "acabado",
    "stock",
    "imagen",
    "disponible",
    "destacado",
  ];

  return camposPermitidos.reduce((datos, campo) => {
    const valor = body[campo];

    // Filtra: undefined, null, y strings vacíos
    if (
      valor !== undefined &&
      valor !== null &&
      !(typeof valor === "string" && valor.trim() === "")
    ) {
      datos[campo] = valor;
    }
    return datos;
  }, {});
};

// Post. Crear Producto
const crearProducto = async (req = request, res = response) => {
  // Validar los datos
  const errores = validateProduct(req.body, false);
  if (errores.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Datos de producto inválidos",
      errors: errores,
    });
  }
  try {
    const datosProducto = extraerDatosProducto(req.body);

    if (datosProducto.nombre) {
      const productoExiste = await Producto.findOne({
        nombre: datosProducto.nombre,
      });
      if (productoExiste) {
        return res.status(400).json({
          success: false,
          message: "El nombre del producto ya existe",
        });
      }
    }

    const nuevoProducto = new Producto(datosProducto);

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

// Get. Obtener todos los productos
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

// Get. Obtener producto por ID
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

// Put. Actualizar producto por ID
const actualizarProducto = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const errores = validateProduct(req.body, true);
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Datos de producto inválidos",
        errors: errores,
      });
    }

    const datosProducto = extraerDatosProducto(req.body);

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Validar nombre único solo si se está actualizando
    if (datosProducto.nombre && datosProducto.nombre !== producto.nombre) {
      const productoExiste = await Producto.findOne({
        nombre: datosProducto.nombre,
      });
      if (productoExiste) {
        return res.status(400).json({
          success: false,
          message: "El nombre del producto ya existe",
        });
      }
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      datosProducto,
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
// Delete. Eliminar producto por ID
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
