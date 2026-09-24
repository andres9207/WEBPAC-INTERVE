import jwt from "jsonwebtoken";
import { ACCESS_COOKIE_NAME, isSessionActive } from "../services/session.service.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Leer token de cookie o del header Authorization
    let token = req.cookies?.[ACCESS_COOKIE_NAME];
    if (!token || token === "undefined" || token === "null") {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7).trim();
      }
    }

    if (!token || token === "undefined" || token === "null" || token === "") {
      return res.status(401).json({ message: "Autorización inválida" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "El token ha expirado" });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Token inválido" });
        } else {
          return res.status(401).json({ message: "Error de autorización" });
        }
      }

      try {
        // Además de firma y vencimiento: la sesión (sid) debe seguir viva en
        // tbl_sessions y el usuario activo. Así un logout, un login en otro
        // dispositivo (sesión única) o una desactivación cortan el acceso en
        // la siguiente petición, sin esperar a que el JWT venza.
        const active = await isSessionActive({
          sid: decoded.sid,
          useId: decoded.useId,
          email: decoded.email,
        });

        if (!active) {
          return res.status(401).json({ message: "Autorización inválida" });
        }

        req.user = decoded;
        next();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
