# DEC-015 — Reintento acotado del interbloqueo, solo en operaciones idempotentes

**Fecha:** 2026-09-25 · **Tipo:** Obligatoria · **ADR:** [0027](../adr/0027-integridad-transaccional.md) (decisión 8, B5) · **Complementa:** [DEC-012](DEC-012-transacciones-bloqueos.md)

## Contexto

Con los bloqueos de DEC-012, los interbloqueos y las esperas de bloqueo pasan a ser situaciones esperables. El ADR pide reintentar el interbloqueo un número acotado de veces, **solo en operaciones idempotentes**, responder 409 si persiste y 503 ante una espera agotada.

Al probar con un interbloqueo **real** contra MySQL apareció un hallazgo: el error no traía la forma supuesta. Llega como `P2010` con `cause.kind: "TransactionWriteConflict"` y `cause.originalCode: "1213"`, sin `cause.code`. La primera versión no lo reconocía, así que un interbloqueo real habría respondido 500.

## Decisión

- **Reintento opt-in**: `withTransaction(fn, { idempotent: true })` o `withLockedTransaction(locks, fn, { idempotent: true })`.
  - Solo con esa opción, un interbloqueo se reintenta **hasta 2 veces**, con una espera corta y aleatoria.
  - Cada reintento repite la transacción completa, bloqueos incluidos, y queda en `logs/api.log` como `warn`.
- **Qué es idempotente**: una operación que **fija un estado final**, de modo que repetirla completa deja el mismo resultado. Hoy:
  - editar usuario (`saveUser` con `useId > 0`);
  - editar perfil;
  - `updateProfilePermissions` y `updateUserPermissions`;
  - `updateAccount`.
- **No se reintentan**: crear, eliminar, los contadores de login, el consumo de códigos de recuperación y las sesiones. Sin clave de idempotencia (ADR-0027, B3), repetirlos puede duplicar o sumar dos veces.
- **Espera de bloqueo agotada (1205)**: nunca se reintenta, ni siendo idempotente. Ya esperó 3 s, y reintentar solo alarga la retención de la conexión. Responde **503**.
- **Interbloqueo que persiste**, o en una operación no idempotente: responde **409**.
- **Una sola clasificación de errores** en `common/utils/dbErrors.utils.js` (`isDeadlock`, `isLockWaitTimeout`), usada por la utilidad (reintento) y por `error.middleware.js` (código HTTP), para que no puedan discrepar.

## Descartado

- **Reintentar todo interbloqueo**: InnoDB revierte la transacción completa, así que técnicamente se podría. Pero el ADR lo restringe a operaciones idempotentes, y un reintento automático de una creación sin clave es indistinguible de un doble clic.
- **Reintentar la espera agotada**: convierte 3 s en 9 s con la conexión retenida.
- **Reconocer los errores por la forma documentada, sin probarla**: fue exactamente lo que falló.

## Verificado

Contra la BD de desarrollo, con un interbloqueo real y sin modificar datos:
- **Operación idempotente**: se reintentó y terminó bien en el segundo intento.
- **No idempotente**: un intento y **409**.
- **Espera agotada**: 3,1 s y **503**.

Los fixtures de los tests (`test/helpers/dbErrors.fixtures.js`) son las formas capturadas en esa prueba.

## Qué implica

- Al escribir un service nuevo, decide explícitamente si la operación es idempotente. Ante la duda, **no** lo declares.

## Dónde

`server/src/common/services/transaction.service.js` · `server/src/common/utils/dbErrors.utils.js` · `server/src/common/middlewares/error.middleware.js`
