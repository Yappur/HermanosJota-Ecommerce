const express = require("express");
const path = require("path");
require("dotenv").config();

const { corsMiddleware, handlePreflight } = require("./middlewares/cors");
const connectDB = require("./database/database");

const routes = require("./routes");

const app = express();

app.set("trust proxy", 1);

// MIDDLEWARE
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${req.method} ${req.url} - Origin: ${
      req.headers.origin || "none"
    }`
  );
  next();
});

// CORS
app.use(corsMiddleware);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Hermanos Jota API",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "connected",
  });
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.use((req, res) => {
  console.warn(`404 - Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    availableRoutes: ["/api/health", "/api/products", "/api/orders"],
  });
});

app.use((err, req, res, next) => {
  console.error("Error global");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: isDevelopment ? err.message : "Something went wrong",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

module.exports = app;
