# Estándar de API

Contrato HTTP entre cliente y servidor. El pipeline de cada ruta (autenticación, permiso, validación) es [`ENDPOINT_STANDARD`](ENDPOINT_STANDARD.md); aquí va la forma de las peticiones y respuestas.

## URLs y verbos

Todas bajo `/api`, montadas en `server/src/modules/main.routes.js` como `/api/<área>/<módulo>`. Las acciones van en la URL, con el patrón que ya usa el proyecto:

| Acción | Verbo | URL | Ejemplo |
| --- | --- | --- | --- |
| Listado paginado | `POST` | `/pagination_<modulo>` | `POST /api/security/profiles/pagination_profiles` |
| Crear o editar | `POST` | `/save_<modulo>` (crear si el id es 0 o no viene) | `POST /api/security/profiles/save_profile` |
| Eliminar (lógico) | `PUT` | `/delete_<modulo>` | `PUT /api/security/profiles/delete_profile` |
| Consulta puntual | `GET` | `/get_<algo>` | `GET /api/security/profiles/get_modules` |
| Transición de estado | `POST` | `/<acción>_<modulo>` | *(objetivo)* `POST /api/…/approve_invoice` |

Los listados usan `POST` porque llevan filtros en el body. Una ruta `/api/*` que no existe responde 404 en JSON, nunca el HTML de la SPA.

## Peticiones

- Ids en camelCase con el prefijo de la tabla: `proId`, `useId`, `staId`.
- **Nunca** se envía el autor ni la identidad de la sesión (`useBy`, `updatedBy`, `userId`…): el servidor los toma de la cookie ([DEC-005](../decisiones/DEC-005-identidad-desde-sesion.md)). Solo viaja el id del registro objetivo.
- Listados: `{ first, rows }` o `{ page, limit }`, más `sortField`, `sortOrder` (`1` asc, `-1` desc) y los filtros.

## Encabezados y cookies

| Nombre | Dirección | Uso |
| --- | --- | --- |
| Cookie `token` | servidor → navegador | Access token JWT, 15 min, `httpOnly`, `sameSite: Strict`, `secure` en producción |
| Cookie `refresh_token` | servidor → navegador | Refresh opaco, 7 días, rotado en `POST /api/auth/refresh` |
| Cookie `id` | servidor → navegador | Caché del perfil para pintar la UI. **No** es fuente de verdad y no se envía al servidor |
| `Idempotency-Key` | cliente → servidor | UUID obligatorio al **crear** (y en transiciones). Generado al abrir el formulario |
| `Authorization: Bearer` | cliente → servidor | Alternativa para clientes que no son navegador |

## Respuestas exitosas

| Acción | Forma |
| --- | --- |
| Listado | `{ results: [...], total, page, limit, totalPages }` |
| Crear | `{ message, <x>Id }` |
| Editar / eliminar | `{ message }` |
| Consulta | El objeto o arreglo pedido, en camelCase |

Los `results` son DTOs en camelCase, nunca filas crudas de Prisma. Si muestran autoría, incluyen `updatedByName` ([DEC-014](../decisiones/DEC-014-autor-por-nombre.md)). Nunca incluyen secretos, hashes ni tokens.

## Errores

Siempre `{ success: false, message }`. El detalle de qué produce cada código está en [`ERROR_HANDLING_STANDARD`](ERROR_HANDLING_STANDARD.md).

| Código | Significado en este proyecto |
| --- | --- |
| 400 | Datos inválidos (`validate` agrega `errors: [{ field, message }]`) o regla de negocio incumplida |
| 401 | Sin sesión o sesión vencida (el cliente intenta renovarla una vez) |
| 403 | Autenticado pero sin permiso, o autoconcesión |
| 404 | Registro inexistente o ya eliminado |
| 409 | Duplicado detectado por la BD, interbloqueo, o conflicto de concurrencia |
| 422 | `Idempotency-Key` reutilizada con otro contenido u otro autor |
| 429 | Límite de peticiones |
| 503 | BD no disponible o espera de bloqueo agotada (el cliente reintenta una vez) |
| 500 | Error no clasificado; en producción con mensaje genérico |

## Tiempo real

Eventos de Socket.IO dirigidos a `user:<useId>` cuando el dato es de un usuario; eventos globales de refresco (`refresh-<modulo>`) solo cuando no llevan datos. Se emiten después del commit.
