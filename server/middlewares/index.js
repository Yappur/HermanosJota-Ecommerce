// Middlewares de utilidad
const { corsMiddleware, developmentCors } = require('./cors');
const errorHandler = require('./errorHandler');
const { requestLogger, errorLogger, authLogger, commerceLogger, uploadLogger, getLogStats, writeLog } = require('./logging');
const { verificarToken, verificarAdmin } = require('./auth');

module.exports = {
  // Seguridad y configuración
  corsMiddleware,
  developmentCors,
  errorHandler,

  // Autenticación
  verificarToken,
  verificarAdmin,

  // Logging middlewares
  requestLogger,
  errorLogger,
  authLogger,
  commerceLogger,
  uploadLogger,
  getLogStats,
  writeLog,
};
