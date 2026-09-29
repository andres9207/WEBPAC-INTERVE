# DEC-008 — Qué eventos de seguridad se registran y cuáles no

**Fecha:** 2026-09-24 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md) (B15), [0013](../adr/0013-auditoria-trazabilidad.md)

## Contexto

No había ninguna auditoría de eventos de seguridad. Se pidió el subconjunto de mayor valor y menor volumen.

## Decisión

Se registran en `tbl_audit_log` ([DEC-007](DEC-007-bitacora-funcional.md)):

| Evento | Operación | Autor |
| --- | --- | --- |
| Inicio de sesión (indica si cerró otra sesión) | `LOGIN` | El usuario |
| Login fallido, con motivo | `LOGIN_FALLIDO` | Anónimo |
| Bloqueo por intentos | `CUENTA_BLOQUEADA`, en la misma operación que el fallo que lo causó | Anónimo |
| Logout | `LOGOUT` | El dueño de la sesión |
| Robo de refresh token detectado | `SESION_REVOCADA` | Anónimo |
| Sesión cerrada a la fuerza (inactivar, eliminar o cambiarle la contraseña a un usuario; restaurar la contraseña) | `SESION_REVOCADA`, con motivo | Administrador, o el propio usuario |
| Cambio de la propia contraseña | `CONTRASENA_CAMBIADA` | El usuario |
| Solicitud de recuperación (solo si la cuenta existe) | `RECUPERACION_SOLICITADA` | Anónimo |
| Código de recuperación incorrecto o agotado | `CODIGO_RECUPERACION_FALLIDO` | Anónimo |
| Contraseña restaurada | `CONTRASENA_RESTAURADA` | El propio usuario |
| Permiso asignado o revocado a un perfil o usuario | `ASIGNAR` / `REVOCAR`, una fila por permiso | Administrador |

## No se registra, a propósito

- **La renovación del token cada 15 minutos y las sesiones que vencen solas**: son rutina y llenarían la bitácora.
- **Los 403 por falta de permiso**: pueden ser muchos. Se puede agregar si se quiere detectar a alguien probando endpoints sin permiso.
- **Una sesión revocada cuando no había sesión abierta**: no aporta información.

## Dónde

`server/src/modules/auth/auth.service.js` · `server/src/common/services/session.service.js` · `server/src/modules/security/permissions/permissions.service.js` · `server/src/modules/security/users/users.controller.js`
