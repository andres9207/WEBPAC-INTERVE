# Estándar de base de datos

MySQL, accedida solo por Prisma ([DEC-001](../decisiones/DEC-001-prisma-acceso-unico.md)). El estándar detallado de migraciones y columnas vive en [`database/migrations/README.md`](../../database/migrations/README.md); este archivo resume y enlaza.

## Reglas

1. **`bdtemplate.sql` está congelado.** Todo cambio va en una migración nueva `database/migrations/NNNN_descripcion.sql`, numerada, con encabezado, un cambio lógico por archivo.
2. **Esquema por introspección.** Después de aplicar una migración, `npx prisma db pull` en `server/`. No se usa `prisma migrate`.
3. **Prefijo único de tres letras por tabla**, verificado como libre antes de crearla. Todas las columnas lo llevan ([DEC-010](../decisiones/DEC-010-nombres-columnas.md)).
4. **Seis columnas de autoría** en toda tabla de negocio, con FK a `tbl_users.use_id`: `<pre>_create_by/_at`, `<pre>_update_by/_at`, `<pre>_delete_by/_at`. Sufijo `_at`, nunca `_created_at` ([DEC-006](../decisiones/DEC-006-columnas-autoria-eliminacion.md)).
5. **Eliminación lógica** con `sta_id = 3` (FK a `tbl_status`: 1 activo, 2 inactivo, 3 eliminado). Sin borrado físico de registros de negocio.
6. **Idempotencia**: `<pre>_idempotency_key char(36)` con `UNIQUE` y `<pre>_idempotency_hash char(64)` en toda tabla que reciba creaciones desde un endpoint, y en las tablas de historial de estado ([DEC-016](../decisiones/DEC-016-idempotencia-por-clave.md)).
7. **Raíz de agregado → `LOCKABLE`** en `transaction.service.js`, en su posición de `LOCK_ORDER` (ADR-0027).
8. **UTC.** La conexión de Prisma fija la sesión en `+00:00` ([DEC-009](../decisiones/DEC-009-zona-horaria.md)). No usar `SYSTEM`.
9. **Integridad en la BD**, no solo en el código: FK para toda relación real, `UNIQUE` para toda unicidad del dominio, `CHECK` para rangos e implicaciones (ADR-0027, invariantes I6–I15). Si una relación no tiene FK real, no se inventa en `schema.prisma`: se resuelve con una segunda consulta y un `Map`. Toda columna con FK tiene índice (MySQL lo crea si no existe; se declara con nombre explícito). Un índice se agrega por una consulta que lo usa, verificada con `EXPLAIN` ([DEC-025](../decisiones/DEC-025-indices-maestros.md)).
10. **Relaciones N:M** con tabla puente, nunca con CSV en una columna.
11. **Dinero** con tipo exacto (`DECIMAL`), nunca `FLOAT` o `DOUBLE`. La precisión **REQUIERE DECISIÓN** (backlog `DEC-06`).
12. **Catálogos de semilla** (páginas, permisos, estados): migración SQL para una instalación nueva **y** `upsert` idempotente en `server/prisma/seed.js` para reparar una BD existente. Los `per_id` y `pag_id` no se renumeran ni se reutilizan.

## Tablas exentas

Catálogos versionados con el código (`tbl_status`, `tbl_pages`, `tbl_permissions`) y registros transitorios (sesiones, códigos de recuperación, que llevan solo las cuatro columnas de creación y actualización). Detalle en `database/migrations/README.md`, punto 6.

## Aplicar una migración

1. Aplicarla en la BD de desarrollo.
2. `npx prisma db pull` y renombrar las relaciones de autoría.
3. Si la migración va **antes** del código que la usa, anotarlo en [`debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md), sección "Despliegue".
