const cors = require("cors");

const parseEnvOrigins = () => {
  const raw = process.env.CORS_ORIGIN || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((o) => o.replace(/\/$/, "")); 
};

const corsOptions = {
  origin: function (origin, callback) {
    const envOrigins = parseEnvOrigins();
    const allowedOrigins = [
      "https://hermanosjota-ecommerce.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      ...envOrigins,
    ];

    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log(`✅ CORS permitido para: ${normalizedOrigin}`);
      callback(null, true);
    } else {
      console.warn(`❌ CORS bloqueado para: ${normalizedOrigin}`);
      callback(new Error(`Origin ${normalizedOrigin} no permitido por CORS`));
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

const developmentCors = cors({ origin: true, credentials: true });

module.exports = {
  corsMiddleware: cors(corsOptions),
  developmentCors,
};
