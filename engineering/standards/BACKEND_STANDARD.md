# Estándar del backend

Express 4 en ESM, Prisma 7. Mapa de carpetas y comandos en [`server/CLAUDE.md`](../../server/CLAUDE.md). El estándar obligatorio de endpoints y services es [`ENDPOINT_STANDARD.md`](ENDPOINT_STANDARD.md): este archivo no lo repite.

## Capas

| Capa | Hace | No hace |
| --- | --- | --- |
| `*.routes.js` | Conecta verbo y URL con el pipeline completo | Lógica |
| `*.validation.js` | Reglas de `express-validator` para cada campo de entrada | Consultas a la BD |
| `*.controller.js` | Lee `req`, toma sujeto y autor de `req.user`, arma `auditContext(req)`, llama al service, responde; errores con `next(err)` | Reglas de negocio, acceso a datos, respuestas de error propias |
| `*.service.js` | Reglas de negocio, transacciones, acceso a datos, auditoría | Leer `req`; emitir sockets o enviar correos dentro de la transacción |
| `common/` | Todo lo que comparten dos o más módulos | Lógica de un solo módulo |

## Dónde va cada cosa

| Necesito… | Uso |
| --- | --- |
| Acceso a datos | `prisma` de `common/configs/prismaClient.js`; dentro de una transacción, **solo** el `tx` |
| Transacción | `withTransaction` / `withLockedTransaction` de `common/services/transaction.service.js` |
| Listado | `paginate` de `common/utils/pagination.utils.js` + `<X>_SORT_FIELDS` |
| Idempotencia | `runIdempotent` de `common/services/idempotency.service.js` |
| Bitácora | `writeAudit(tx, …)` de `common/services/audit.service.js` |
| Permiso efectivo | `hasEffectivePermission` / `getEffectivePermissionIds`, nunca leer `tbl_user_permissions` solo |
| Nombre del autor | `USER_NAME_SELECT` + `userFullName` de `common/utils/user.utils.js` |
| Reglas de validación comunes | `common/utils/validation.utils.js` |
| Clasificar un error de BD | `common/utils/dbErrors.utils.js` |
| Socket dirigido | `getIO().to(\`user:${useId}\`)` después del commit |
| Tarea programada | `server/src/cron/index.js` (lista `cronJobs`) |

## Estilo

- JavaScript ESM sin linter configurado. Se replica el estilo del módulo de referencia: `async`/`await`, errores con `new Error(msg)` + `.statusCode`, objetos de configuración en `UPPER_SNAKE_CASE` (`PROFILE_SORT_FIELDS`).
- Comentarios que explican el **porqué** de una decisión no obvia, con referencia al ADR o DEC. No se comenta lo que el código ya dice.
- Carpetas vestigiales (`src/images`, `src/socket`, `src/utils`, `src/webhooks`, `common/templates`) no reciben código nuevo.
