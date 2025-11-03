const cors = require("cors");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://hermanosjota-ecommerce.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ];

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS permitido para: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`❌ CORS bloqueado para: ${origin}`);
      callback(new Error(`Origin ${origin} no permitido por CORS`));
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
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400,
};

module.exports = {
  corsMiddleware: cors(corsOptions),
};
