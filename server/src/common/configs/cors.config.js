// Única fuente de verdad para los orígenes permitidos: la usan tanto el CORS
// de Express (app.js) como el de Socket.IO (socket.js), que antes tenían
// listas distintas y podían desalinearse.
//
// Comparación por hostname exacto (nunca prefijo/startsWith): ambos usos se
// montan con `credentials: true`, así que un match por prefijo permitiría a
// un origen atacante como "https://pavastecnologia.com.evil.com" o
// "http://localhost.evil.com" pasar el chequeo y hacer peticiones
// autenticadas con las cookies de sesión. Ver SECURITY.md.
export const allowedHosts = ["localhost", "127.0.0.1", "pavastecnologia.com", "www.pavastecnologia.com"];

export const isOriginAllowed = (origin) => {
  if (!origin) return true;

  try {
    return allowedHosts.includes(new URL(origin).hostname);
  } catch {
    return false;
  }
};
