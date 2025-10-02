const fs = require('fs');
const path = require('path');

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Función para formatear fecha
const formatDate = (date = new Date()) => {
  return date.toISOString();
};

// Función para escribir logs
const writeLog = (filename, data) => {
  const logPath = path.join(logsDir, filename);
  const logEntry = `${formatDate()} - ${JSON.stringify(data)}\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) console.error('Error writing log:', err);
  });
};

// Middleware de logging de requests
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Capturar información del request
  const requestData = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    commerce: req.commerceId || null,
    user: req.user?.id || null,
    timestamp: new Date().toISOString(),
  };

  // Interceptar la respuesta
  const originalSend = res.send;

  res.send = function (data) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log de respuesta
    const responseData = {
      ...requestData,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length') || 0,
    };

    // Escribir diferentes tipos de logs según el status
    if (res.statusCode >= 400) {
      writeLog('errors.log', {
        ...responseData,
        error: res.statusCode >= 500 ? 'server_error' : 'client_error',
      });
    } else {
      writeLog('access.log', responseData);
    }

    originalSend.call(this, data);
  };

  next();
};

// Logger para errores específicos
const errorLogger = (error, req, res, next) => {
  const errorData = {
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      commerce: req.commerceId || null,
      user: req.user?.id || null,
      body: req.method !== 'GET' ? req.body : undefined,
    },
    timestamp: new Date().toISOString(),
  };

  writeLog('errors.log', errorData);

  // También loggear en consola en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData);
  }

  next(error);
};

// Logger para autenticación
const authLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // Log intentos de autenticación
    if (req.originalUrl.includes('/auth/')) {
      const authData = {
        type: 'auth_attempt',
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        email: req.body?.email || null,
        success: res.statusCode === 200,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
      };

      writeLog('auth.log', authData);
    }

    originalSend.call(this, data);
  };

  next();
};

// Logger para operaciones de comercio
const commerceLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // Log operaciones importantes de comercio
    if (
      ['POST', 'PUT', 'DELETE'].includes(req.method) &&
      req.originalUrl.includes('/commerce')
    ) {
      const commerceData = {
        type: 'commerce_operation',
        operation: req.method,
        url: req.originalUrl,
        commerce: req.commerceId || null,
        user: req.user?.id || null,
        ip: req.ip,
        success: res.statusCode >= 200 && res.statusCode < 300,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
      };

      writeLog('commerce.log', commerceData);
    }

    originalSend.call(this, data);
  };

  next();
};

// Logger para uploads
const uploadLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // Log uploads de archivos
    if (req.files || req.file) {
      const files = req.files
        ? Array.isArray(req.files)
          ? req.files
          : Object.values(req.files).flat()
        : [req.file];

      const uploadData = {
        type: 'file_upload',
        files: files.map((file) => ({
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          destination: file.destination,
        })),
        commerce: req.commerceId || null,
        user: req.user?.id || null,
        ip: req.ip,
        success: res.statusCode >= 200 && res.statusCode < 300,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
      };

      writeLog('uploads.log', uploadData);
    }

    originalSend.call(this, data);
  };

  next();
};

// Función para obtener estadísticas de logs
const getLogStats = () => {
  const logFiles = [
    'access.log',
    'errors.log',
    'auth.log',
    'commerce.log',
    'uploads.log',
    'ar.log',
  ];
  const stats = {};

  logFiles.forEach((file) => {
    const filePath = path.join(logsDir, file);
    try {
      const stat = fs.statSync(filePath);
      stats[file] = {
        size: stat.size,
        modified: stat.mtime,
        exists: true,
      };
    } catch (error) {
      stats[file] = {
        exists: false,
      };
    }
  });

  return stats;
};

module.exports = {
  requestLogger,
  errorLogger,
  authLogger,
  commerceLogger,
  uploadLogger,
  getLogStats,
  writeLog,
};
