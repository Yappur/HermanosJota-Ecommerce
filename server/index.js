const express = require("express");
const path = require("path");
require("dotenv").config();

// Importa solo el middleware esencial
const { corsMiddleware } = require("./middlewares/cors"); // ajusta la ruta

const routes = require("./routes");

const app = express();

// TRUST PROXY para Vercel
app.set("trust proxy", 1);

// MIDDLEWARE SIMPLIFICADO - elimina temporalmente los complejos
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS simplificado
app.use(corsMiddleware);

// Body parsers básicos
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Ruta de health check básica (antes de las rutas principales)
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Rutas de la API
app.use("/api", routes);

// Manejo de errores simplificado
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found", path: req.originalUrl });
});

const PORT = process.env.PORT || 3000;

// Inicio del servidor SIMPLIFICADO
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

module.exports = app;
