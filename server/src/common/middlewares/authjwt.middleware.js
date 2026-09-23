import { prisma } from "../configs/prismaClient.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Leer token de cookie o del header Authorization
    let token = req.cookies.token;
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

      const user = await prisma.tbl_users.findFirst({
        where: { use_id: decoded.useId, use_email: decoded.email, sta_id: 1 },
        select: { use_id: true },
      });

      if (user) {
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ message: "Autorización inválida" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
