# Invariantes del sistema

| ID | Invariante | Estado | Mecanismo | Fuente |
| --- | --- | --- | --- | --- |
| SYS-01 | Prisma es el único acceso a la BD. Nada en `server/src` importa mysql2 ni usa `executeQuery`/`getConnection` | APLICADA | Test de arquitectura en `test/common/services/transaction.service.test.js` | DEC-001 |
| SYS-02 | Toda transacción se abre con `withTransaction` o `withLockedTransaction`; nunca `prisma.$transaction` directo | APLICADA | Mismo test de arquitectura | DEC-012 |
| SYS-03 | Toda transacción corre en `REPEATABLE READ` con espera de bloqueo de 3 s | APLICADA | `transaction.service.js`, con test | DEC-012 |
| SYS-04 | En una operación sobre un registro existente, el bloqueo es la primera sentencia: nada de lo que decide se lee antes | APLICADA por construcción en la utilidad; CONVENCIÓN en cuanto a no leer fuera de ella | `withLockedTransaction` bloquea antes de entregar el `tx` | ADR-0027 |
| SYS-05 | Los bloqueos se toman en el orden de `LOCK_ORDER` y por id ascendente | APLICADA | `buildLockPlan` rechaza entidades fuera de `LOCK_ORDER` o sin `LOCKABLE` | ADR-0027 |
| SYS-06 | Solo se reintenta un interbloqueo en operaciones marcadas idempotentes, como máximo 2 veces | APLICADA | `withTransaction(fn, { idempotent })` | DEC-015 |
| SYS-07 | Ningún listado devuelve más de 100 filas, y ningún parámetro del cliente quita el tope | APLICADA | `paginate` / `MAX_ROWS`, con test | DEC-013 |
| SYS-08 | La bitácora se escribe en la misma transacción que la operación | APLICADA | `writeAudit` lanza si recibe el cliente global en vez del `tx` | DEC-007 |
| SYS-09 | La bitácora solo acepta entidades y operaciones declaradas | APLICADA | `AUDIT_ENTITIES`, `AUDIT_OPERATIONS` validados en `writeAudit` | DEC-007 |
| SYS-10 | Una creación con la misma `Idempotency-Key` y el mismo contenido no crea dos registros | APLICADA | `UNIQUE` en `<pre>_idempotency_key` + `runIdempotent` | DEC-016 |
| SYS-11 | Ningún efecto externo (correo, socket, archivo, HTTP) ocurre dentro de una transacción | CONVENCIÓN | Revisión | ADR-0027, regla 4 |
| SYS-12 | La BD y el servidor trabajan en UTC | APLICADA | `prismaClient.js` fija `timezone=+00:00` | DEC-009 |
| SYS-13 | Una respuesta de error en producción nunca incluye el stack ni el mensaje de una excepción no clasificada | APLICADA | `error.middleware.js`, con test | `anti-patterns/SECURITY.md` |
