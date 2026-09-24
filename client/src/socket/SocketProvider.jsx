import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { urlSocket, pathSocket } from "utils/constants";
import { refreshSession } from "api/services/httpCliente";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, userId }) => {
  const socket = useMemo(() => {
    if (!userId) return null;

    return io(urlSocket, {
      transports: ["polling", "websocket"],
      upgrade: true,
      withCredentials: true,
      path: pathSocket,
      reconnection: true,
      reconnectionAttempts: 15,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      timeout: 30000,
      forceNew: true,
      multiplex: false,
    });
  }, [userId]);

  useEffect(() => {
    if (!socket) return;

    // El handshake usa el mismo access token (cookie httpOnly) que la API,
    // que dura 15 minutos: al reconectar con el token vencido, el servidor
    // rechaza el handshake y socket.io NO reintenta solo (socket.active =
    // false). Se renueva la sesión y se reconecta, con un tope de intentos
    // para no quedar en bucle si la sesión fue revocada de verdad.
    let authRetries = 0;
    const MAX_AUTH_RETRIES = 2;

    const onConnect = () => {
      authRetries = 0;
      console.log(`Socket conectado: ${socket.id} | Usuario: ${userId}`);
    };

    const onDisconnect = (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    };

    const onError = async (err) => {
      console.error("Socket connect_error:", err.message || err);
      if (socket.active || authRetries >= MAX_AUTH_RETRIES) return;
      authRetries += 1;
      try {
        await refreshSession();
        socket.connect();
      } catch {
        // Sesión revocada o vencida: el siguiente 401 de la API lleva al login.
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.disconnect();
    };
  }, [socket, userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
