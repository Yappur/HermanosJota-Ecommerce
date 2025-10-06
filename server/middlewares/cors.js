const cors = require("cors");

// Configuración SIMPLIFICADA para producción
const corsOptions = {
  origin: function (origin, callback) {
    // En producción, permite los orígenes específicos de Vercel
    if (process.env.NODE_ENV === "production") {
      const allowedOrigins = [
        "https://hermanosjota-api.vercel.app",
        "https://hermanosjota.vercel.app", // si tienes frontend
        "http://localhost:3000", // para desarrollo local
        "http://localhost:3001",
      ];

      // Permitir requests sin origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS bloqueado para origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // En desarrollo, permitir todo
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

// Middleware CORS de emergencia
const fallbackCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

// Middleware principal con fallback
const corsMiddleware = (req, res, next) => {
  // Usa el CORS configurado, pero si falla usa el fallback
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      console.warn("CORS error, using fallback:", err.message);
      fallbackCors(req, res, next);
    } else {
      next();
    }
  });
};

module.exports = {
  corsMiddleware,
  developmentCors: fallbackCors, // mismo para desarrollo por ahora
};
