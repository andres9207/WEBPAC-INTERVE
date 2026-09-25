# DEC-011 — Endurecimiento general del backend heredado

**Fecha:** 2026-09-24 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md)

## Contexto

La revisión del ADR-0001 contra el código dejó una lista de brechas. Se decidió cerrarlas todas salvo **MFA**, que queda fuera de alcance, y **B15**, que se cerró después con la bitácora ([DEC-008](DEC-008-eventos-seguridad.md)).

## Decisión

Además de [DEC-002](DEC-002-sesion-unica-refresh.md), [DEC-003](DEC-003-login-bloqueo-progresivo.md) y [DEC-004](DEC-004-recuperacion-contrasena.md):

- **Permisos en todas las rutas** sobre objetos ajenos (`requirePermission`), sin excepción por `useId`. Superadmin es solo el perfil al que el seed le asigna todos los permisos.
- **Nadie se asigna permisos a sí mismo**: ni a su usuario ni a su propio perfil.
- **Validación de esquema** con `express-validator` en todos los módulos (`*.validation.js`).
- **Helmet, rate limit y logger HTTP** montados en `app.js`.
- **Socket.IO** autenticado con el JWT de sesión en el handshake.
- **Endpoints eliminados**:
  - `DELETE /documents/temp/:filename` (path traversal) y `GET /documents/blob` (SSRF). Ninguno tenía uso en el cliente.
  - Autorregistro y OTP, que apuntaban a una tabla inexistente.
- **Semilla de `tbl_status`** (`0010`): en una instalación nueva el primer INSERT fallaba por la FK.
- **Errores de Prisma** con su código HTTP (409, 400, 404, 503) y sin el texto del driver.
- **Manejadores de `uncaughtException` y `unhandledRejection`**: una excepción no capturada cierra el proceso para que PM2 lo reinicie limpio.

## Descartado

- **MFA en esta etapa**: queda como alternativa "proveedor de identidad externo", pendiente de validar.

## Dónde

`docs/adr/0001-seguridad.md`, tabla de brechas B1–B18 · `SECURITY.md`
