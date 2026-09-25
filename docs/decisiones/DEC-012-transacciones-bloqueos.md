# DEC-012 — Transacciones con utilidad única, `REPEATABLE READ` y protocolo de bloqueo

**Fecha:** 2026-09-25 · **Tipo:** Obligatoria · **ADR:** [0027](../adr/0027-integridad-transaccional.md) (**Aceptado**, estándar no negociable)

## Contexto

No había ningún `SELECT … FOR UPDATE` ni nivel de aislamiento declarado. Había carreras reales:
- se podía eliminar un perfil mientras otra petición se lo asignaba a un usuario;
- dos cambios de contraseña simultáneos se podían pisar;
- la bitácora podía registrar un "valor anterior" viejo.

Una espera de bloqueo agotada respondía el error 500 genérico.

## Decisión

- **Toda transacción** se abre con `withTransaction` o `withLockedTransaction` (`common/services/transaction.service.js`). Prohibido `prisma.$transaction` directo.
- **`REPEATABLE READ` declarado** en cada transacción, no heredado del servidor MySQL.
- **Protocolo de bloqueo**, aplicado por la utilidad y no por cada servicio:
  1. `SELECT … FOR UPDATE` como **primera sentencia**, antes de cualquier lectura.
  2. **Orden fijo entre entidades**: contrato → factura → póliza → concepto → documento → perfil → usuario.
  3. **Id ascendente** dentro de cada entidad. Por ejemplo, con dos contratos se bloquea primero el menor.

  El servicio declara qué bloquear: `withLockedTransaction({ CONTRATO: [7, 3] }, fn)`. La utilidad ordena, bloquea y después entrega el `tx`.
- **Espera de bloqueo de 3 s**, por debajo del límite de 5 s de Prisma. Una espera agotada responde **503** y un interbloqueo **409**.
- **Nada lento ni externo** con el bloqueo tomado: bcrypt, correos, sockets y subidas van antes o después del commit.
- Si la operación falla, Prisma revierte y **propaga el error original** aunque el rollback falle.

## Descartado

- **Bloqueo optimista con versión**: exige reintentos que hoy no existen ni en el cliente ni en el servidor.
- **`SERIALIZABLE`**: multiplica los interbloqueos.
- **Fijar la espera de bloqueo en la URL de conexión**: el adapter vuelve a codificar la URL y rompe la sentencia.

## Qué implica

- Tabla nueva que sea raíz de un agregado: se registra en `LOCKABLE` de la utilidad. Su posición en el orden ya está fijada.
- En los tests, el mock de Prisma incluye `...transactionRawMocks()` (`test/helpers/transaction.mock.js`).
- **Pendiente**: idempotencia y reintento automático ante interbloqueo (B3, B5); `UNIQUE` en el nombre de perfil (B4).

## Dónde

`server/src/common/services/transaction.service.js` · `server/src/common/middlewares/error.middleware.js` · `server/ENDPOINT_STANDARD.md`, "Transacciones y concurrencia"
