const cors = require('cors');

// Configuración básica de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Lista de dominios permitidos
    const allowedOrigins = [...process.env.CORS_ORIGIN.split(',')];

    // En desarrollo, permitir cualquier localhost
    if (process.env.NODE_ENV === 'development') {
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
    }

    // Verificar subdominios dinámicos (para multi-tenant)
    const isSubdomain =
      /^https?:\/\/[\w-]+\.([\w-]+\.)*(localhost|127\.0\.0\.1|yourdomain\.com)(:\d+)?$/.test(
        origin
      );

    if (allowedOrigins.includes(origin) || isSubdomain) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: process.env.CORS_CREDENTIALS === 'true', // Permitir cookies (configurable)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Commerce-Id',
    'X-User-Agent',
    'X-API-Key',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count', 'X-Current-Page'],
  maxAge: 86400, // 24 horas
};

// CORS específico para AR (puede requerir configuración especial)
const arCorsOptions = {
  ...corsOptions,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    ...corsOptions.allowedHeaders,
    'X-AR-Session',
    'X-Device-Type',
  ],
};

// Middleware CORS personalizado para desarrollo
const developmentCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, X-Commerce-Id'
  );

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = {
  corsMiddleware: cors(corsOptions),
  arCorsMiddleware: cors(arCorsOptions),
  developmentCors,
};
