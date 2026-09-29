# Anti-patrones del frontend

Evidencia en [`SECURITY.md`](SECURITY.md) salvo que se indique otra fuente.

| No hacer | Por qué | Evidencia |
| --- | --- | --- |
| Tratar el ocultar un botón como control de acceso | Cualquiera llama al endpoint directo | ADR-0014 |
| Enviar el autor o la identidad de la sesión (`useBy`, `userId`, encabezados como `currenuserapp`) | Hace parecer que el cliente decide quién actúa | "El cliente deja de enviar la identidad del usuario" |
| `hasPermission(permissionsCatalog.x?.y)` sin comprobar que el id existe | Con el catálogo cargando es `hasPermission(undefined)`, que es `true` | "Mantenibilidad: fuente única de verdad para el catálogo de permisos" |
| Duplicar en el cliente constantes que son del servidor (ids de permisos) | Se desincronizan | Mismo apartado |
| `catch` con solo `console.error` | El usuario no se entera de que algo falló | "Manejo de errores: qué se le puede mostrar al cliente" |
| `console.error(err)` de una petición con credenciales | El error de axios incluye el body en claro | "Logs y manejo de errores" (`AuthLogin.jsx`) |
| `axios` directo en un componente | Se salta el interceptor: renovación de sesión, 403, 409, 503 | `client/CLAUDE.md` |
| Generar una `Idempotency-Key` por intento de guardado | El doble clic crea dos registros | DEC-016 |
| Reutilizar la clave de otro formulario | El servidor responde 422 | `utils/idempotency.js` |
| Calcular montos, saldos o fechas derivadas en el cliente | La fuente de verdad es el backend | ADR-0026 |
| Agregar casos por código HTTP en `ErrorBoundary.jsx` | Nunca recibe errores de la API: no hay `loader` ni `action` | `client/CLAUDE.md` |
| Registrar una página solo en `menu-items/` esperando que aparezca en el sidebar | El sidebar sale de `tbl_pages` | `ARCHITECTURE.md` |
