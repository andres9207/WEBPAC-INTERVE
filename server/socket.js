import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { setIO } from "./src/common/configs/socket.manager.js";
import { isOriginAllowed } from "./src/common/configs/cors.config.js";
import { prisma } from "./src/common/configs/prismaClient.js";

let io;

/**
 * Extrae una cookie puntual del header crudo `Cookie` del handshake (no hay
 * cookie-parser disponible fuera de Express).
 */
const getCookieValue = (cookieHeader, name) => {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
};

/**
 * Autentica el handshake: antes se confiaba ciegamente en
 * `handshake.auth.userId`, así que cualquier cliente podía unirse a la sala
 * de notificaciones de cualquier otro usuario. Ahora se exige el mismo JWT
 * que usa la API (cookie `token`, o `auth.token` para clientes no navegador),
 * se valida igual que `authjwt.middleware.js` (firma + usuario activo en BD),
 * y la sala a unir sale del token, nunca de lo que el cliente diga.
 */
const authenticateHandshake = async (socket, next) => {
  const token =
    getCookieValue(socket.handshake.headers.cookie, "token") ||
    socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Autorización inválida"));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(new Error("Autorización inválida"));
  }

  try {
    const user = await prisma.tbl_users.findFirst({
      where: { use_id: decoded.useId, use_email: decoded.email, sta_id: 1 },
      select: { use_id: true },
    });

    if (!user) {
      return next(new Error("Autorización inválida"));
    }
  } catch (error) {
    console.log(error);
    return next(new Error("Error en el servidor"));
  }

  socket.data.userId = decoded.useId;
  next();
};

const init = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => callback(null, isOriginAllowed(origin)),
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  setIO(io);

  io.use(authenticateHandshake);

  io.on("connection", (socket) => {
    socket.join(`user:${socket.data.userId}`);
    console.log(`Socket conectado: ${socket.id} | Usuario: ${socket.data.userId}`);

    socket.on("disconnect", (reason) => {
      console.log(`Cliente desconectado, ID: ${socket.id}, Razón: ${reason}`);
    });
  });

  return io;
};

export { init };
