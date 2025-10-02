const express = require('express');
const path = require('path');
require('dotenv').config();

const {
  corsMiddleware,
  errorHandler,
  requestLogger,
} = require('./middlewares');

// Importar rutas principales
const routes = require('./routes');

const app = express();

console.log('🚀 Iniciando E-commerce API...');

// ================================
// CONFIGURACIÓN DE MIDDLEWARES BÁSICOS
// ================================

// Trust proxy para Heroku, AWS, etc.
app.set('trust proxy', 1);

// Logging de requests
app.use(requestLogger);

// CORS configurado
app.use(corsMiddleware);

// Establecer charset UTF-8 para todas las respuestas
app.use((req, res, next) => {
  res.charset = 'utf-8';
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Parsing de JSON y URL encoded
app.use(
  express.json({
    limit: '50mb',
    charset: 'utf-8',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
    charset: 'utf-8',
  })
);

// ================================
// CONFIGURACIÓN DE RUTAS PRINCIPALES
// ================================

// Rutas de la API
app.use('/api', routes);

// Ruta 404 general
app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found',
    path: req.originalUrl,
    suggestion: 'Try /api for API documentation for system status',
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// ================================
// CONFIGURACIÓN DEL SERVIDOR
// ================================

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Iniciar servidor
    const server = app.listen(PORT, HOST, () => {
      console.log('🎉 Servidor iniciado exitosamente!');
      console.log(`🌐 URL: http://${HOST}:${PORT}`);
      console.log(`📋 API: http://${HOST}:${PORT}/api`);
      console.log(`❤️  Health: http://${HOST}:${PORT}/health`);
      console.log(`🏪 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('');
      console.log('🚀 E-commerce API is running!');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Recibido ${signal}. Cerrando servidor gracefully...`);

      server.close(async () => {
        console.log('📄 Servidor HTTP cerrado');
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.log('⚠️  Forzando cierre del servidor...');
        process.exit(1);
      }, 10000);
    };

    // Manejar señales del sistema
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejar errores no capturados
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

// ================================
// EXPORTAR APP Y INICIAR SERVIDOR
// ================================

module.exports = app;

// Iniciar servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}
