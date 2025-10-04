const errorHandler = (err, req, res, next) => {
  // Log del error (puedes usar un logger como Winston o simplemente console.error)
  console.error(err);

  // Respuesta al cliente
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
