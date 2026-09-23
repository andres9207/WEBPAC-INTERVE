import rateLimit from "express-rate-limit";

// Middleware de limitación de solicitudes avanzado
export const defaultRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 50, // 100 solicitudes por IP en el intervalo de tiempo
  message: {
    status: 429,
    error: "Demasiadas solicitudes. Inténtalo de nuevo más tarde.",
  },
  headers: true, // Agrega cabeceras estándar para control del límite
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  skipSuccessfulRequests: false,

  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },

  trustProxy: true, // Permite reconocer correctamente la IP del cliente si se usa un proxy inverso
});

/**
 * Umbral más estricto para las rutas de autenticación (login, registro,
 * recuperación de contraseña, etc.), objetivo típico de fuerza bruta /
 * credential stuffing.
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // 10 intentos por IP en el intervalo
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // solo cuenta intentos fallidos/erróneos
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: "Demasiados intentos. Por favor, inténtalo más tarde.",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
  trustProxy: true,
});

export default defaultRateLimit;
