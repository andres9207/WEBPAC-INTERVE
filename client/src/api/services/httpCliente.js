import axios from "axios";
import Cookies from "js-cookie";

// ─── Instancia con baseURL desde .env ────────────────────────────────────────
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// ─── Interceptor de REQUEST ───────────────────────────────────────────────────
instance.interceptors.request.use(
  (config) => {
    const currenUserApp = Cookies.get("id");

    if (currenUserApp) {
      config.headers.currenuserapp = currenUserApp;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Interceptor de RESPONSE ──────────────────────────────────────────────────
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    // 401: sesión inválida/expirada — sí es un problema de autenticación,
    // se limpia el cache local y se fuerza el login.
    if (status === 401 && !config?.skipAuthRedirect) {
      Cookies.remove("id");
      window.location.href = "/pages/login";
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
    // body—, para que una futura clave de idempotencia que envíe el
    // llamador viaje igual en el reintento; si vuelve a fallar, se rinde.
    if (status === 503 && config && !config._retried503) {
      config._retried503 = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return instance(config);
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