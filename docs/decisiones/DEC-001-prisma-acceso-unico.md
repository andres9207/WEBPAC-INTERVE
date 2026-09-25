# DEC-001 — Prisma es el único acceso a la base de datos

**Fecha:** 2026-09-24 (pool de mysql2 retirado el 2026-09-25) · **Tipo:** Obligatoria · **ADR:** [0001](../adr/0001-seguridad.md), [0027](../adr/0027-integridad-transaccional.md) (B1)

## Contexto

El backend heredado armaba SQL a mano con `mysql2`, y en varios sitios interpolaba valores del cliente en la consulta: había inyección SQL real. Después de migrar los services a Prisma quedó `db.config.js` con `executeQuery`. Esa función tomaba una conexión nueva del pool si se omitía el parámetro, así que una escritura que debía ir dentro de una transacción podía confirmarse por su cuenta.

## Decisión

- **Prisma 7** con el adapter `@prisma/adapter-mariadb` (`server/src/common/configs/prismaClient.js`) es la única vía a la base de datos.
- Se eliminó `db.config.js` completo: `pool`, `getConnection`, `releaseConnection` y `executeQuery`. `testConnection` usa Prisma.
- `schema.prisma` se mantiene por introspección (`prisma db pull`). Los cambios de estructura van en `database/migrations/NNNN_*.sql`.

## Descartado

- **Mantener mysql2 para las consultas "complejas"**: Prisma cubre todos los casos actuales, incluidos filtros dinámicos y `IN (...)`, siempre parametrizados. Cuando haga falta SQL, se usa `$queryRaw` con plantilla, que también parametriza.

## Qué implica

- Prohibido importar `mysql2` o crear otro pool. `test/common/services/transaction.service.test.js` recorre `src/` y falla si alguien lo hace.
- `DB_HOST`/`DB_USER`/`DB_NAME`/`DB_PASSWORD` ya no se usan. Toda conexión sale de `DATABASE_URL`.

## Dónde

`server/src/common/configs/prismaClient.js` · `server/prisma/schema.prisma` · `SECURITY.md`, "`executeQuery` y el pool de mysql2 eliminados"
