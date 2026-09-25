# DEC-007 — Bitácora `tbl_audit_log` escrita desde el servicio, en la misma transacción

**Fecha:** 2026-09-24 · **Tipo:** Obligatoria · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md) (decisiones 6, 7, 8 y 10)

## Contexto

No quedaba registro de qué cambió, con qué valor anterior, ni quién lo cambió. Las columnas de autoría solo guardan el último cambio.

## Decisión

- **Tabla `tbl_audit_log`** (migración `0013`). Cada fila guarda entidad, id del registro, campo, valor anterior, valor nuevo, operación, usuario, IP y fecha con milisegundos.
- **Identificador de operación** (`aud_operation_id`): todas las filas de una misma operación comparten un UUID, aunque toque varios campos o varias tablas.
- **Se escribe desde la capa de servicio**, nunca con disparadores, y **dentro de la misma transacción** que el cambio: si uno se revierte, el otro también.
- `writeAudit(tx, …)` **lanza un error** si no recibe el `tx` de la transacción, o si la entidad o la operación no están en `AUDIT_ENTITIES` / `AUDIT_OPERATIONS`.
- Los únicos eventos que se escriben sin transacción usan `writeAuditEvent`, restringido a eventos sin cambio de datos (login fallido).
- **Nunca se guardan secretos**: contraseñas, hashes, códigos y tokens quedan como `[oculto]`. En un login fallido no se guarda lo que la persona tecleó como usuario.
- **Permisos** (tablas de unión): solo en la bitácora, una fila por permiso asignado o revocado.
- **Eventos de autenticación**: en la misma bitácora ([DEC-008](DEC-008-eventos-seguridad.md)).
- **Documentos**: sin bitácora. El ADR-0013 los clasifica como auditoría técnica, así que solo llevan columnas de autoría.

## Descartado

- **Disparadores de base de datos**: no conocen al usuario de la sesión ni la IP, y esconden lógica fuera del código.
- **Una tabla de bitácora por módulo**: una sola tabla permite consultar una operación completa.

## Qué implica

- Un service nuevo con información auditable declara sus campos auditados y llama a `writeAudit` dentro de su transacción. Si hace falta, agrega la entidad a `AUDIT_ENTITIES`.
- **Pendiente de infraestructura**: dejar al usuario de BD de la aplicación solo con `INSERT`/`SELECT` sobre la tabla. La sugerencia está al final de `0013_create_audit_log.sql`.
- **Pendiente funcional**: pantalla de consulta (B16) y política de retención (B15).

## Dónde

`server/src/common/services/audit.service.js` · `database/migrations/0013_create_audit_log.sql`
