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
      return callback(null, true);
    }

    if (normalizedOrigin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    if (
      process.env.NODE_ENV === "development" &&
      normalizedOrigin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }
    console.warn(` CORS bloqueado para: ${normalizedOrigin}`);
    const error = new Error(`Origin ${normalizedOrigin} no permitido por CORS`);
    error.status = 403;
    callback(error);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
  ],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const developmentCors = cors({ origin: true, credentials: true });

module.exports = {
  corsMiddleware: cors(corsOptions),
  developmentCors,
};
