# DEC-002 — Sesión única, access 15 min + refresh 7 días rotado

**Fecha:** 2026-09-24 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md) (B5, B13, B14)

## Contexto

La sesión era un JWT de larga duración en una cookie legible desde JavaScript. No había logout en el servidor, ni forma de revocar una sesión, ni control de sesiones simultáneas.

## Decisión

- **Dos cookies httpOnly**: `token` (access JWT, **15 minutos**) y `refresh_token` (opaco, **7 días**). En la BD solo se guarda el SHA-256 del refresh, en `tbl_sessions`.
- **Una sola sesión por usuario** (`UNIQUE(use_id)`): iniciar sesión en otro lugar cierra la anterior y desconecta sus sockets.
- **Refresh rotado en cada uso**, con 30 s de gracia para peticiones paralelas. Si alguien presenta un refresh ya rotado fuera de esa ventana, se trata como robo: la sesión se revoca y queda `SESION_REVOCADA` en la bitácora.
- El cliente (`httpCliente.js`) renueva la sesión sola ante un 401 y reintenta la petición una vez.
- La duración del refresh se configura con **`JWT_REFRESH_EXPIRES_IN`** (formato `7d`, `12h`…). Es la variable que ya venía en la plantilla; no se creó otra, porque otras personas trabajan sobre ella.

## Descartado

- **Varias sesiones por usuario**: el negocio no lo necesita, y la sesión única hace efectivo el cierre de sesión forzado.
- **Una variable nueva `JWT_REFRESH_EXPIRES_DAYS`**: duplicaba `JWT_REFRESH_EXPIRES_IN`.

## Qué implica

- En producción, `.env` debe tener `JWT_EXPIRES_IN=15m` y `JWT_REFRESH_EXPIRES_IN=7d`.
- Cerrar la sesión de un usuario siempre pasa por `revokeSession` (`session.service.js`), que además cierra sus sockets.

## Dónde

`server/src/common/services/session.service.js` · `database/migrations/0007_create_sessions.sql` · `client/src/api/services/httpCliente.js`
