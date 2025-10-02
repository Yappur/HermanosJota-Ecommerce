const productos = require("../data/productos");

// GET /api/productos - Obtener todos los productos
const obtenerTodosLosProductos = (req, res) => {
  res.json(productos);
};

// GET /api/productos/:id - Obtener un producto por ID
const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  
  // Buscar el producto en el array
  const producto = productos.find((p) => p.id === id);
  
  // Si no se encuentra, devolver error 404
  if (!producto) {
    return res.status(404).json({ 
      error: "Producto no encontrado",
      mensaje: `No existe un producto con el ID: ${id}` 
    });
  }
  
  // Si se encuentra, devolver el producto
  res.json(producto);
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
};
