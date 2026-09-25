// Errores conocidos de Prisma (todos los services usan Prisma desde la
// migración, ver SECURITY.md). Antes caían en el `default` del bloque de
// MySQL de abajo, porque también traen `.code`, y todos respondían 500
// "Error desconocido de base de datos" — p. ej. un duplicado (P2002) no
// daba 409, que es lo que el cliente espera para mostrar el conflicto.
// Referencia: https://www.prisma.io/docs/orm/reference/error-reference
const PRISMA_ERRORS = {
  P2002: [409, "Intento de duplicar un valor único en la base de datos."],
  P2003: [400, "Violación de integridad referencial en la base de datos."],
  P2025: [404, "El registro solicitado no existe."],
  P2000: [400, "Uno de los valores supera la longitud permitida."],
  P2011: [400, "Uno o más campos obligatorios están vacíos."],
  P2006: [400, "Uno de los valores no tiene el tipo esperado."],
  P1001: [503, "No se pudo conectar con la base de datos. Contacta a sistemas."],
  P1002: [503, "La base de datos no respondió a tiempo. Contacta a sistemas."],
  P1008: [503, "La operación en la base de datos superó el tiempo límite. Contacta a sistemas."],
  P1017: [503, "La base de datos cerró la conexión. Contacta a sistemas."],
  P2024: [503, "No hay conexiones disponibles con la base de datos. Contacta a sistemas."],
  P2034: [409, "Conflicto de concurrencia en la base de datos. Intenta de nuevo."],
};

// Concurrencia (ADR-0027, decisión 8). Con los bloqueos de
// transaction.service.js, una espera agotada (1205) o un interbloqueo (1213)
// son situaciones esperables, no fallos de sistema. Por el adapter llegan
// envueltos en un error de Prisma (1205 como P2010 en una consulta cruda; el
// 1213 ya se traduce a P2034), y directo del driver con su código ER_*.
const LOCK_WAIT_TIMEOUT = [503, "Otra operación está usando este registro. Intenta de nuevo en unos segundos."];
const DEADLOCK = PRISMA_ERRORS.P2034;

const driverErrorCode = (err) => err.meta?.driverAdapterError?.cause?.code;

const concurrencyError = (err) => {
  if (err.code === "ER_LOCK_WAIT_TIMEOUT" || driverErrorCode(err) === 1205) return LOCK_WAIT_TIMEOUT;
  if (err.code === "ER_LOCK_DEADLOCK" || driverErrorCode(err) === 1213) return DEADLOCK;
  return null;
};

const isMySqlCode = (code) =>
  typeof code === "string" && (code.startsWith("ER_") || code === "PROTOCOL_CONNECTION_LOST");

const errorMiddleware = (err, req, res, next) => {
  // Registrar el error para depuración
  console.error(`[ERROR]: ${err.stack || err.message}`);

  // **0. Concurrencia** (antes que Prisma: el 1205 llega como un P2010
  // genérico y caería en el 500).
  const concurrency = concurrencyError(err);
  if (concurrency) {
    const [status, message] = concurrency;
    return res.status(status).json({ success: false, message });
  }

  // **0.1 Errores de Prisma**
  if (typeof err.code === "string" && PRISMA_ERRORS[err.code]) {
    const [status, message] = PRISMA_ERRORS[err.code];
    return res.status(status).json({ success: false, message });
  }

  if (err.name === "PrismaClientInitializationError") {
    return res.status(503).json({
      success: false,
      message: "No se pudo conectar con la base de datos. Contacta a sistemas.",
    });
  }

  if (typeof err.code === "string" && /^P\d{4}$/.test(err.code)) {
    return res.status(500).json({
      success: false,
      message: "Error desconocido de base de datos. Contacta a sistemas.",
    });
  }

  // **1. Manejo específico de errores de MySQL** (código ER_* del driver de
  // MariaDB). Solo códigos de MySQL: otros `.code` (p. ej. de
  // express-fileupload o de Node) siguen al manejo general de abajo.
  if (isMySqlCode(err.code)) {
    switch (err.code) {
      case "ER_WRONG_VALUE_COUNT_ON_ROW":
        return res.status(400).json({
          success: false,
          message:
            "El número de parámetros proporcionados no coincide con los esperados en la consulta. Contacta a sistemas.",
        });

      case "ER_BAD_NULL_ERROR":
        return res.status(400).json({
          success: false,
          message:
            "Uno o más parámetros obligatorios están vacíos. Contacta a sistemas.",
        });

      case "ER_NO_REFERENCED_ROW":
      case "ER_NO_REFERENCED_ROW_2":
        return res.status(400).json({
          success: false,
          message:
            "Violación de integridad referencial en la base de datos. Contacta a sistemas.",
        });

      case "ER_DUP_ENTRY":
        return res.status(409).json({
          success: false,
          message:
            "Intento de duplicar un valor único en la base de datos. Contacta a sistemas.",
        });

      case "ER_PARSE_ERROR":
        return res.status(400).json({
          success: false,
          message: "Error de sintaxis en la consulta SQL. Contacta a sistemas.",
        });

      case "ER_ACCESS_DENIED_ERROR":
        return res.status(403).json({
          success: false,
          message: "Acceso denegado a la base de datos. Contacta a sistemas.",
        });

      case "PROTOCOL_CONNECTION_LOST":
        return res.status(503).json({
          success: false,
          message:
            "Conexión con la base de datos perdida. Contacta a sistemas.",
        });

      case "ER_CON_COUNT_ERROR":
        return res.status(503).json({
          success: false,
          message:
            "Demasiadas conexiones abiertas con la base de datos. Contacta a sistemas.",
        });

      default:
        // Si el error de MySQL no está controlado específicamente
        return res.status(500).json({
          success: false,
          message: `Error desconocido de base de datos. Contacta a sistemas.`,
        });
    }
  }

  // **2. Manejo de errores genéricos de Node.js**
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message:
        "El cuerpo de la solicitud contiene un error de sintaxis. Contacta a sistemas.",
    });
  }

  if (err.message && err.message.includes("Bind parameters")) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan parámetros o contienen valores incorrectos para completar la consulta. Contacta a sistemas.",
    });
  }

  if (err.message && err.message.includes("ECONNREFUSED")) {
    return res.status(503).json({
      success: false,
      message: "Conexión rechazada al servidor. Contacta a sistemas.",
    });
  }

  if (err.message && err.message.includes("EADDRINUSE")) {
    return res.status(500).json({
      success: false,
      message: "El puerto del servidor ya está en uso. Contacta a sistemas.",
    });
  }

  if (err.message && err.message.includes("ENOTFOUND")) {
    return res.status(500).json({
      success: false,
      message: "No se pudo resolver un nombre de dominio. Contacta a sistemas.",
    });
  }

  // **3. Errores generales no previstos**
  // ENDPOINT_STANDARD.md documenta .statusCode y .status como equivalentes
  // ("el service lanza new Error(msg) con .statusCode (o .status)"), pero
  // hasta ahora solo se leía .status — cualquier error de negocio lanzado
  // con .statusCode (la mayoría de los services, empezando por
  // auth.service.js) devolvía 500 en vez de su código real. Ver SECURITY.md.
  const hasExplicitStatus = err.statusCode != null || err.status != null;
  const statusCode = err.statusCode || err.status || 500;

  // Un error con .statusCode/.status fue lanzado a propósito por nuestro
  // código (service) con un mensaje ya curado para quien lo va a leer — es
  // seguro devolverlo tal cual. Uno SIN esas propiedades es una excepción no
  // clasificada (bug, error de un paquete de terceros, etc.) cuyo .message
  // puede traer detalle interno (rutas de archivo, fragmentos de query,
  // texto de un driver) — nunca se expone tal cual en producción, solo un
  // mensaje genérico. En desarrollo se muestra igual, para no perder la
  // señal mientras se depura (mismo criterio que el stack, más abajo).
  const message =
    hasExplicitStatus || process.env.NODE_ENV !== "production"
      ? err.message || "Ha ocurrido un error inesperado. Contacta a sistemas."
      : "Ha ocurrido un error inesperado. Contacta a sistemas.";

  res.status(statusCode).json({
    success: false,
    message,
    // Mostrar detalles adicionales en desarrollo
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorMiddleware;
