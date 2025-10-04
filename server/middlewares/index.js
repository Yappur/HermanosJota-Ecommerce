// Middlewares de utilidad
const { corsMiddleware, developmentCors } = require('./cors');
const errorHandler = require('./errorHandler');
const { requestLogger, errorLogger, authLogger, commerceLogger, uploadLogger, getLogStats, writeLog } = require('./logging');

module.exports = {
  // Seguridad y configuración
  corsMiddleware,
  developmentCors,
  errorHandler,
  
  // Logging middlewares
  requestLogger,
  errorLogger,
  authLogger,
  commerceLogger,
  uploadLogger,
  getLogStats,
  writeLog,
};
