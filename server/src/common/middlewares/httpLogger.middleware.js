import morgan from "morgan";
import logger from "../configs/winston.config.js";

const httpLogger = morgan(
  (tokens, req, res) => {
    const logFormat = `${tokens.method(req, res)} ${tokens.url(
      req,
      res
    )} ${tokens.status(req, res)} - ${tokens["response-time"](req, res)} ms`;

    if (res.statusCode >= 500) {
      // No incluir req.body: rutas como auth llevan contraseñas/tokens en
      // texto plano, y este logger escribe tanto a consola como a archivo.
      logger.error(logFormat, {
        errorMessage: res.locals.errorMessage || "Internal Server Error",
      });
    } else if (res.statusCode >= 400) {
      logger.warn(logFormat);
    } else {
      logger.info(logFormat);
    }

    return null; // Evita logs duplicados
  },
  { stream: { write: (message) => logger.info(message.trim()) } }
);

export default httpLogger;
