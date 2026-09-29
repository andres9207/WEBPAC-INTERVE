# Patrón: operación transaccional

**Cuándo:** toda escritura. Con una sola entidad es lo cotidiano (niveles 1–2); con varias entidades es la base de los niveles 3–4.

**Utilidad:** `server/src/common/services/transaction.service.js`. Reglas: [`ENDPOINT_STANDARD`](../standards/ENDPOINT_STANDARD.md), "Transacciones y concurrencia", y [DEC-012](../decisiones/DEC-012-transacciones-bloqueos.md).

## Elegir la función

| Caso | Función | Referencia real |
| --- | --- | --- |
| Crear, sin padre que proteger | `withTransaction(fn)` | `saveProfile` al crear |
| Editar o eliminar un registro | `withLockedTransaction({ ENTIDAD: id }, fn)` | `deleteProfile` |
| Editar y reintentable ante interbloqueo | `withLockedTransaction({ ENTIDAD: id }, fn, { idempotent: true })` | `saveProfile` al editar |
| Varias entidades | `withLockedTransaction({ A: idA, B: idB }, fn)` — la utilidad ordena | `saveUser`: `{ PERFIL, USUARIO }` |
| Crear colgando de un padre | `withLockedTransaction({ PADRE: idPadre }, fn)` | *(objetivo)* factura de un contrato |

## Forma

```text
withLockedTransaction({ CONTRATO: c, FACTURA: f }, async (tx, locked) => {
  1. (la utilidad ya ejecutó SET isolation, lock_wait_timeout y los SELECT … FOR UPDATE en orden)
  2. leer lo que decide, con tx
  3. validar reglas e invariantes; si fallan, lanzar → rollback
  4. escribir, con tx
  5. writeAudit(tx, …) e historial, con tx
  6. devolver el resultado
})
7. después del commit: sockets, correo, archivos
```

## Errores frecuentes

- Leer con `prisma` (el cliente global) dentro de la función: esa lectura va por otra conexión y no ve ni respeta el bloqueo.
- Leer antes de llamar a la utilidad "para validar primero": con `REPEATABLE READ`, esa lectura deja una foto vieja.
- Encadenar dos transacciones para bloquear en dos pasos: se pierde el orden y aparecen interbloqueos.
- Marcar `{ idempotent: true }` una operación que crea, suma o encola: el reintento la duplica.
- Hacer `bcrypt`, enviar correo o emitir un socket dentro: retiene el bloqueo y, si falla, deja un efecto externo de algo que se revirtió.

## Tests

`...transactionRawMocks()` de `test/helpers/transaction.mock.js` en el mock de Prisma. `test/common/services/transaction.service.test.js` es la referencia de qué se verifica: orden del plan de bloqueo, aislamiento declarado y bloqueo antes de entregar el `tx`.
