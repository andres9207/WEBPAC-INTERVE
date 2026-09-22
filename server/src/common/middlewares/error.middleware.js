const errorMiddleware = (err, req, res, next) => {
  // Registrar el error para depuración
  console.error(`[ERROR]: ${err.stack || err.message}`);

  // **1. Manejo específico de errores de MySQL**
  if (err.code) {
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
