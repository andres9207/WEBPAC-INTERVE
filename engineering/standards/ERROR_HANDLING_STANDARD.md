# Estándar de manejo de errores

## Servidor

1. **El service lanza, el controller delega, el middleware responde.** El service lanza `new Error(msg)` con `.statusCode`; el controller hace `next(err)`; `common/middlewares/error.middleware.js` arma la respuesta. Ningún controller responde un error por su cuenta.
2. **`.statusCode` significa "mensaje curado".** Un error con `.statusCode` (o `.status`) se devuelve con su mensaje tal cual, así que el mensaje se escribe para el usuario final, en español. Un error sin código cae a 500 y en producción se reemplaza por un mensaje genérico.
3. **Nunca `return { error }`** como resultado exitoso de un service.
4. **Errores de la BD:** no se capturan para traducirlos a mano. `error.middleware.js` y `common/utils/dbErrors.utils.js` ya traducen:

   | Origen | Respuesta |
   | --- | --- |
   | Prisma `P2002` / MySQL `ER_DUP_ENTRY` (único duplicado) | 409 |
   | Prisma `P2003` / FK inexistente | 400 |
   | Prisma `P2025` (registro no existe) | 404 |
   | Interbloqueo (`1213`, `P2034`) | 409 (reintento previo si la operación es idempotente) |
   | Espera de bloqueo agotada (`1205`) | 503 |
   | Sin conexión o sin conexiones (`P1001`, `P2024`, `ECONNREFUSED`) | 503 |

5. **Datos para actuar:** un error con estado explícito puede llevar `err.data`, y el middleware lo devuelve como `data`. Solo para que el cliente ofrezca una acción, no para detalles internos. Caso de uso: el 409 de un proveedor con documento repetido trae el existente en `data.existing` ([DEC-032](../decisiones/DEC-032-identidad-proveedor.md)).
6. **Stack:** solo fuera de producción.
7. **Logs:** nunca el `req.body` de una ruta que reciba contraseñas, tokens o códigos, ni en la rama de error.
7. **Códigos esperados por regla de negocio:** 400 regla incumplida, 403 sin permiso o autoconcesión, 404 inexistente o ya eliminado, 422 clave de idempotencia reutilizada. El código de un duplicado detectado por el service **REQUIERE DECISIÓN** (PD-02 en [`PROJECT_STATE`](../PROJECT_STATE.md)).

## Cliente

Dos capas que no se mezclan (detalle en [`client/CLAUDE.md`](../../client/CLAUDE.md)):

| Capa | Atrapa | Cómo |
| --- | --- | --- |
| Pantalla | Errores de la API (400, 403, 404, 409, 422…) | `try/catch` en la pantalla + `showError(err.response?.data?.message \|\| 'respaldo')` |
| `routes/ErrorBoundary.jsx` | Fallos de render y el 404 de rutas | `errorElement` en `MainRoutes.jsx` y `AuthenticationRoutes.jsx` |

El interceptor de `httpCliente.js` maneja 401 (renueva la sesión una vez), 403 (no cierra sesión), 409 (propaga el body) y 503 (reintenta una vez). **No** muestra toasts: eso lo hace cada pantalla, para no duplicar mensajes.
