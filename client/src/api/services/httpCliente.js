import axios from "axios";
import Cookies from "js-cookie";
import { WORK_HEADER, activeWorkHeader } from "utils/workScope";
import { IDEMPOTENCY_HEADER } from "utils/idempotency";

// ─── Instancia con baseURL desde .env ────────────────────────────────────────
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5063/api";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// ─── Renovación de sesión (refresh token) ─────────────────────────────────────
// El access token (cookie httpOnly `token`) dura 15 minutos; al vencer, el
// servidor responde 401 y se renueva con la cookie httpOnly `refresh_token`
// vía POST /auth/refresh. Instancia aparte, sin interceptores, para que un
// 401 del propio refresh no dispare otra renovación en bucle. Una sola
// renovación en vuelo a la vez: si varias peticiones reciben 401 al mismo
// tiempo, todas esperan la misma promesa.
const refreshClient = axios.create({ baseURL, withCredentials: true });
let refreshPromise = null;

export const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/auth/refresh")
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Endpoints donde un 401 no significa "access token vencido" (credenciales
// o sesión ya cerrada): no se intenta renovar.
const NO_REFRESH_URLS = ["/auth/login", "auth/login", "/auth/refresh", "auth/refresh", "/auth/logout", "auth/logout"];

// Interceptor de REQUEST: solo la obra activa del encabezado (DEC-047), en
// `X-Work-Id`. No es identidad ni permiso: el servidor verifica que el
// usuario pueda usar esa obra. Antes cada petición llevaba el encabezado
// `currenuserapp` con los datos del usuario (cookie `id`); se quitó porque la
// identidad sale solo de la cookie de sesión httpOnly (req.user).
instance.interceptors.request.use((config) => {
  const work = activeWorkHeader();
  if (work) config.headers[WORK_HEADER] = work;
  return config;
});

// Mensaje del 503 que persiste tras el reintento automático, cuando la
// petición lleva clave de idempotencia (PRO-FE-17): ofrece reintentar. Es
// seguro aunque la operación sí se hubiera guardado: la misma clave devuelve
// el resultado ya guardado en vez de crear otro.
export const RETRY_503_HINT = "Puedes volver a intentarlo: no se duplicará.";

const hasIdempotencyKey = (config) => Boolean(config?.headers?.get?.(IDEMPOTENCY_HEADER) ?? config?.headers?.[IDEMPOTENCY_HEADER]);

const withRetryHint = (error) => {
  const data = error.response?.data;
  if (data && typeof data === "object" && !String(data.message ?? "").includes(RETRY_503_HINT)) {
    data.message = [data.message, RETRY_503_HINT].filter(Boolean).join(" ");
  }
  return error;
};

// ─── Interceptor de RESPONSE ──────────────────────────────────────────────────
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    // 401 con access token vencido: se renueva la sesión una vez y se
    // reintenta la MISMA petición. Aplica también a las que llevan
    // skipAuthRedirect (verifyTokenAPI al cargar la app): al volver después
    // de 15 minutos, el access token ya venció pero la sesión sigue viva.
    if (status === 401 && config && !config._retried401 && !NO_REFRESH_URLS.includes(config.url)) {
      config._retried401 = true;
      try {
        await refreshSession();
        return instance(config);
      } catch {
        // Refresh vencido o revocado (logout, login en otro dispositivo,
        // cambio de contraseña): cae al manejo de 401 de abajo.
      }
    }

    // 401: sesión inválida/expirada — sí es un problema de autenticación,
    // se limpia el cache local y se fuerza el login.
    if (status === 401 && !config?.skipAuthRedirect) {
      Cookies.remove("id");
      // BASE_URL lleva el prefijo del despliegue: una ruta absoluta sin él
      // saca al usuario de la aplicación. Vite lo entrega sin la barra final
      // ("/interadminpro"), y concatenarlo directo daba "/interadminpro/pages/login".
      window.location.href = `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}pages/login`;
      return Promise.reject(error);
    }

    // 403: sesión válida pero sin el permiso requerido para la acción. No
    // es un problema de autenticación, así que NO se limpia la cookie ni
    // se redirige a login — se deja pasar el mensaje que ya arma
    // server/src/common/middlewares/error.middleware.js para que quien
    // llamó lo muestre (p. ej. "no tienes permiso para esta acción").
    if (status === 403) {
      console.warn("Acceso denegado:", error.response?.data?.message);
      return Promise.reject(error);
    }

    // 409: conflicto (duplicado, choque de concurrencia). El servidor ya
    // centraliza el mensaje —y el estado actualizado si lo envía— en
    // error.response.data; se propaga tal cual para que el llamador lo
    // muestre en vez de perderlo en un console.error genérico.
    if (status === 409) {
      console.warn("Conflicto:", error.response?.data?.message);
      return Promise.reject(error);
    }

    // 503: servicio temporalmente no disponible (conexión a BD perdida,
    // límite de conexiones, espera de bloqueo). Se reintenta la MISMA
    // petición una única vez, con el mismo config —mismos headers, mismo
    // body—, así la clave de idempotencia viaja igual en el reintento. Si
    // vuelve a fallar, se rinde; con clave, el mensaje ofrece reintentar
    // desde el mismo formulario, que conserva su clave (PRO-FE-17).
    if (status === 503 && config && !config._retried503) {
      config._retried503 = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return instance(config);
    }
    if (status === 503 && hasIdempotencyKey(config)) {
      return Promise.reject(withRetryHint(error));
    }

    return Promise.reject(error);
  }
);

// ─── Métodos genéricos ────────────────────────────────────────────────────────
const genericRequest = {
  get:    (url, params, config = {}) => instance.get(url,  { params: params || {}, ...config }),
  post:   (url, body,   config = {}) => instance.post(url,   body,   config),
  put:    (url, body,   config = {}) => instance.put(url,    body,   config),
  delete: (url,         config = {}) => instance.delete(url, config),
};

export default genericRequest;