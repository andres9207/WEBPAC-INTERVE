// Única fuente de verdad para los orígenes permitidos: la usan tanto el CORS
// de Express (app.js) como el de Socket.IO (socket.js), que antes tenían
// listas distintas y podían desalinearse.
export const allowedOrigins = [
  "http://localhost",
  "http://127.0.0.1",
  "https://pavastecnologia.com",
  "https://www.pavastecnologia.com",
];

export const isOriginAllowed = (origin) =>
  !origin || allowedOrigins.some((allowed) => origin.startsWith(allowed));
