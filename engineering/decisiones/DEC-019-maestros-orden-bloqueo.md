# DEC-019 — Los maestros van al final de `LOCK_ORDER`

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0027](../adr/0027-integridad-transaccional.md)

Resuelve PD-04 ([`PROJECT_STATE`](../PROJECT_STATE.md)).

## Contexto

Todo registro que se edite o elimine se bloquea con `withLockedTransaction`, y la entidad tiene que estar en `LOCK_ORDER`. El orden solo tenía contrato → factura → póliza → concepto → documento → perfil → usuario. Faltaba el lugar de los maestros.

## Decisión

- Los maestros van **después de todas las demás entidades**, en `LOCK_ORDER` y en `LOCKABLE` de `transaction.service.js`.
- Una operación que **asigna** un maestro bloquea primero su agregado y después el maestro, en la misma `withLockedTransaction`. Con el maestro bloqueado, verifica que existe y está activo. Ejemplo: `saveUser` bloquea `PERFIL`, `USUARIO` y `TIPO_IDENTIFICACION`.
- **Eliminar** un maestro bloquea solo el maestro y después cuenta quién lo usa. Como la asignación también bloquea el maestro, las dos operaciones no se cruzan: no queda un registro apuntando a un maestro recién eliminado.
- Nombre de la entidad en español y en mayúsculas, como las existentes. Primera entrada: `TIPO_IDENTIFICACION` (`tbl_identity_documents`, `idd_id`).

## Descartado

- **Maestros antes del CORE**: una operación que toma primero el contrato y después la aseguradora violaría el orden.

## Qué implica

- Cada maestro nuevo agrega su entidad al final de `LOCK_ORDER` y su tabla a `LOCKABLE`, y completa la columna "Entidad de bloqueo" de [DEC-017](DEC-017-area-idioma-maestros.md).
- Un maestro que se asigna se bloquea también al asignarlo, no solo al eliminarlo.

## Dónde

`server/src/common/services/transaction.service.js` · `common/services/master.service.js` (`assertAssignable`, `remove`, [DEC-020](DEC-020-patron-maestro.md)) · `security/users/users.service.js` · tests en `server/test/modules/security/users/users.service.test.js` ("protocolo de bloqueo")
