const express = require("express");
const path = require("path");
require("dotenv").config();

const { corsMiddleware, handlePreflight } = require("./middlewares/cors");
const connectDB = require("./database/database");

const routes = require("./routes");

const app = express();

app.set("trust proxy", 1);

const isVercel = process.env.VERCEL === "1";
const isDevelopment = process.env.NODE_ENV === "development";

// MIDDLEWARE
const { requestLogger, errorLogger } = require("./middlewares/logging");

app.use(requestLogger);

app.use((req, res, next) => {
  corsMiddleware(req, res, (err) => {
    if (err) {
      console.error("CORS Error:", {
        origin: req.headers.origin,
        error: err.message,
        environment: process.env.NODE_ENV,
        isVercel,
      });
      return res.status(403).json({
        error: "CORS Error",
        message: isDevelopment ? err.message : "Not allowed by CORS",
      });
    }
    next();
  });
});

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
  const mongoose = require("mongoose");
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    isVercel: process.env.VERCEL === "1",
    database: {
      status:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      name: process.env.MONGODB_DATABASE,
    },
    region: process.env.VERCEL_REGION || "local",
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

app.use(errorLogger);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorResponse = {
    error: err.name || "Internal Server Error",
    message: isDevelopment ? err.message : "Something went wrong",
    timestamp: new Date().toISOString(),
    requestId: req.id,
    path: req.path,
  };

  if (isDevelopment || isVercel) {
    errorResponse.stack = err.stack;
    errorResponse.origin = req.headers.origin;
  }

  res.status(status).json(errorResponse);
});

// Connect to Database
connectDB();

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT} in ${
        process.env.NODE_ENV || "development"
      } mode`
    );
  });
}

module.exports = app;
