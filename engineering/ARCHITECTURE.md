# Arquitectura actual

Estado verificado en el código al 2026-09-29. El detalle operativo de cada proyecto está en [`server/CLAUDE.md`](../server/CLAUDE.md) y [`client/CLAUDE.md`](../client/CLAUDE.md); aquí va la vista de conjunto.

## Piezas

```text
                 navegador
                     │  cookies httpOnly (token 15 min + refresh_token 7 días)
                     ▼
┌──────────────── client/ ────────────────┐
│ React 19 + Vite · MUI 7 (template Berry) │
│ react-router 7 · axios (httpCliente)     │
│ socket.io-client                         │
└──────────────┬──────────────────────────┘
               │ /api/*  y  Socket.IO
               ▼
┌──────────────── server/ ────────────────┐
│ Express 4 (ESM) · Socket.IO              │
│ modules/  → routes · validation ·        │
│             controller · service         │
│ common/   → middlewares, servicios       │
│             transversales, utilidades    │
│ Prisma 7 (adapter mariadb) — único       │
│ acceso a datos                           │
└──────────────┬──────────────────────────┘
               ▼
        MySQL (UTC) — database/bdtemplate.sql + migrations/
```

Integraciones externas **CONFIRMADAS**: correo (Nodemailer, `common/services/mailerService.js`) y almacenamiento de archivos del cliente en Firebase Storage. No hay Redis, colas ni integración con Microsoft Graph: ese módulo existió y se eliminó (ver [`anti-patterns/SECURITY.md`](anti-patterns/SECURITY.md), "Migración a Prisma"). No es multi-tenant.

## Camino de una petición

```text
app.js: helmet → httpLogger → CORS (allowlist) → body parsers → cookie-parser → compression
        → cleanRequestData → express-fileupload → estáticos de la SPA → rate limit → /api
router: verifyToken → requirePermission(perId) → schema → validate → controller
controller: arma el contexto desde req.user y llama al service; errores con next(err)
service: regla de negocio; escribe en withTransaction / withLockedTransaction,
         audita con writeAudit(tx) en la misma transacción
error.middleware: traduce el error a HTTP (400/403/404/409/422/503/500)
```

El orden exacto de `app.js` está en `server/CLAUDE.md`. El pipeline del router es obligatorio: [`ENDPOINT_STANDARD.md`](standards/ENDPOINT_STANDARD.md).

## Servicios transversales (`server/src/common/`)

| Pieza | Qué garantiza | Decisión |
| --- | --- | --- |
| `middlewares/authjwt.middleware.js` | Sesión viva en `tbl_sessions`, usuario activo | [DEC-002](decisiones/DEC-002-sesion-unica-refresh.md) |
| `middlewares/requirePermission.middleware.js` + `services/effectivePermissions.service.js` | Permiso efectivo = perfil ∪ excepciones del usuario, resuelto en cada petición | ADR-0014 |
| `services/transaction.service.js` | `REPEATABLE READ`, bloqueo primero y en orden fijo, espera de 3 s | [DEC-012](decisiones/DEC-012-transacciones-bloqueos.md) |
| `services/idempotency.service.js` | Creación idempotente por `Idempotency-Key` | [DEC-016](decisiones/DEC-016-idempotencia-por-clave.md) |
| `services/audit.service.js` | Bitácora `tbl_audit_log` dentro de la transacción | [DEC-007](decisiones/DEC-007-bitacora-funcional.md) |
| `utils/pagination.utils.js` | Todo listado paginado, tope de 100 | [DEC-013](decisiones/DEC-013-paginacion.md) |
| `middlewares/error.middleware.js` + `utils/dbErrors.utils.js` | Mensajes seguros; códigos de Prisma y MySQL a HTTP | [`ERROR_HANDLING_STANDARD`](standards/ERROR_HANDLING_STANDARD.md) |
| `constants/permissions.constants.js` | Catálogo único de `per_id`; el cliente lo lee con `get_catalog` | ADR-0014 |

## Módulos existentes

| Servidor (`server/src/modules/`) | Cliente (`client/src/views/`) | Nivel |
| --- | --- | --- |
| `auth/` (login, refresh, logout, recuperación) | `pages/authentication/` | — |
| `security/users` | `security/users/` | CRUD complejo |
| `security/profiles` | `security/profiles/` | CRUD complejo |
| `security/permissions` | `security/profiles/components/PermissionsDrawer.jsx` | CRUD complejo (asignaciones) |
| `app/documents` | `ui-component/DocumentManagement.jsx` (hoy deshabilitado en `UserDialog`) | CRUD complejo |
| `app/notifications` | sección de notificaciones del header | CRUD simple, de autoservicio |
| `app/general` (menú, sesión, combos) | layout | — |

No existe ningún módulo de negocio (obras, proveedores, maestros, contratos, pólizas, facturación). Están diseñados en [`adr/`](adr/README.md) y planificados en `docs/backlog/`.

## Datos

- 15 tablas: 11 de `bdtemplate.sql` y 4 creadas por migraciones (`tbl_user_pages`, `tbl_sessions`, `tbl_login_attempts`, `tbl_audit_log`). Todas son de seguridad, documentos, notificaciones o auditoría.
- `schema.prisma` se genera por introspección (`prisma db pull`), no con `prisma migrate`.
- Convenciones: prefijo de tres letras por tabla, seis columnas de autoría, eliminación lógica con `sta_id = 3`, UTC. Ver [`DATABASE_STANDARD`](standards/DATABASE_STANDARD.md).

## Tiempo real

Socket.IO con handshake autenticado por el mismo JWT. Cada conexión entra a `user:<useId>` y `session:<sid>`; los eventos dirigidos van a esas salas. Algunos controllers emiten eventos globales de refresco (`refresh-profiles`). Los sockets se emiten **después** del commit, nunca dentro de la transacción.

## Menú y rutas del cliente

El sidebar se arma en runtime desde `tbl_pages` / `tbl_page_permissions` (`GET /app/get_menu`). Las rutas protegidas se declaran en `client/src/routes/MainRoutes.jsx`. `client/src/menu-items/*.js` solo alimenta las migas de pan.

## Procesos automáticos

`server/src/cron/index.js` tiene la infraestructura de `node-cron` y `server.js` la arranca con `startCronJobs()` (no corre en `development`; en el resto, en UTC). La lista de jobs está **vacía**, así que hoy no corre ningún proceso programado.
