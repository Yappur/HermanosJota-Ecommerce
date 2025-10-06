const express = require("express");
const path = require("path");
require("dotenv").config();

const {
  corsMiddleware,
  errorHandler,
  requestLogger,
} = require("./middlewares");

const routes = require("./routes");

const app = express();


app.set("trust proxy", 1);

// Servir archivos estáticos desde la carpeta "public"
app.use("/public", express.static(path.join(__dirname, "public")));

// Logging de requests
app.use(requestLogger);

// CORS configurado
app.use(corsMiddleware);

// Establecer charset UTF-8 para las respuestas
app.use("/api", (req, res, next) => {
  res.charset = "utf-8";
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.use(
  express.json({
    limit: "50mb",
    charset: "utf-8",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
    charset: "utf-8",
  })
);


// Rutas de la API
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
    path: req.originalUrl,
    suggestion: "Try /api for API documentation for system status",
  });
});

app.use(errorHandler);


const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";

// iniciar el servidor
const startServer = async () => {
 try {
   const server = app.listen(PORT, HOST, () => {
     console.log(`Servidor iniciado en ${HOST}:${PORT}`);
   });

   const gracefulShutdown = (signal) => {
     console.log(`\nRecibido ${signal}. Cerrando servidor gracefully...`);

     server.close(async () => {
       console.log("Servidor HTTP cerrado");
     });

     setTimeout(() => {
       console.log("Forzando cierre del servidor...");
       process.exit(1);
     }, 10000);
   };

   // señales del sistema
   process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
   process.on("SIGINT", () => gracefulShutdown("SIGINT"));

   // errores no capturados
   process.on("uncaughtException", (error) => {
     console.error("Uncaught Exception:", error);
     process.exit(1);
   });

   process.on("unhandledRejection", (reason, promise) => {
     console.error("Unhandled Rejection at:", promise, "reason:", reason);
     process.exit(1);
   });
 } catch (error) {
   console.error("Error iniciando servidor:", error);
   process.exit(1);
 }
};

module.exports = app;

// Iniciar servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}
