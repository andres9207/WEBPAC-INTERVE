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
9. **Integridad en la BD**, no solo en el código: FK para toda relación real, `UNIQUE` para toda unicidad del dominio, `CHECK` para rangos e implicaciones (ADR-0027, invariantes I6–I15). Si una relación no tiene FK real, no se inventa en `schema.prisma`: se resuelve con una segunda consulta y un `Map`. Los índices siguen el criterio de abajo.
10. **Relaciones N:M** con tabla puente, nunca con CSV en una columna.
11. **Dinero** con tipo exacto (`DECIMAL`), nunca `FLOAT` o `DOUBLE`. La precisión **REQUIERE DECISIÓN** (backlog `DEC-06`).
12. **Catálogos de semilla** (páginas, permisos, estados): migración SQL para una instalación nueva **y** `upsert` idempotente en `server/prisma/seed.js` para reparar una BD existente. Los `per_id` y `pag_id` no se renumeran ni se reutilizan.
13. **Una sola colación: `utf8mb4` / `utf8mb4_0900_ai_ci`**, la de la base (migración `0059`). Una tabla nueva la declara explícitamente (`) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`, como `0044`), y sus columnas no declaran otra. Comparar texto con colaciones distintas hace fallar el JOIN o le impide usar el índice. La consulta de verificación, que no debe devolver filas, está en el encabezado de `0059_unify_collation.sql`.

## Criterio de indexación

Vale para toda tabla nueva y para todo cambio de índices. El inventario de lo que hay, con la consulta que usa cada índice, está en [`database/INDEXES.md`](../../database/INDEXES.md) (FND-BD-15).

1. **Un índice existe por una consulta del código**, verificada con `EXPLAIN` en la BD de desarrollo. No se agregan índices "por si acaso". La excepción son los que exige una restricción: clave primaria, `UNIQUE` y FK.
2. **Toda FK tiene índice.** InnoDB lo exige y, si la migración no lo declara, lo crea con el nombre de la FK. Ese índice implícito se acepta para columnas que ninguna consulta usa: las de autoría (`*_create_by`, `*_update_by`, `*_delete_by`) y la de estado (`sta_id`) cuando ningún compuesto la cubre, porque los listados la filtran con un rango (`sta_id <> 3`) que casi no la aprovecha. Cuando una consulta filtra por la FK, la migración declara el índice que esa consulta necesita, con nombre propio: lo habitual es un compuesto que empieza por la FK.
3. **Hijos de un agregado:** índice que empiece por la FK al padre. Si el hijo ya tiene un `UNIQUE (padre, …)`, ese índice lo sirve y no se agrega otro (`uq_contract_concepts_number`, `uq_work_stages_work_name`).
4. **Historiales** (estado, versiones, bitácora): `(padre, fecha)`, para leer el historial de un registro ya ordenado sin `filesort` (`idx_contract_status_history_contract`).
5. **Maestros y selectores:** `idx_<tabla>_status_<campo>` sobre `(sta_id, <nombre>)`, que además sostiene la FK de estado. No llevan índice simple de `sta_id` ([DEC-025](../decisiones/DEC-025-indices-maestros.md)).
6. **Unicidad entre no eliminados:** `UNIQUE` sobre una columna generada `<campo>_active`, `NULL` cuando el registro está eliminado. Todo `UNIQUE` nuevo se declara también en `uniqueConstraints.constants.js` (`database/migrations/README.md`, punto 10).
7. **No se indexan para búsqueda** las columnas de la búsqueda general (`LIKE '%texto%'`, [DEC-024](../decisiones/DEC-024-busqueda-listados.md)): un B-tree no la resuelve.
8. **Columnas de baja cardinalidad solas** (estado del ciclo de vida, banderas) solo llevan índice si una consulta frecuente filtra por ellas con igualdad (`idx_contracts_state`, pestaña por estado). Si además se ordena, se evalúa el compuesto con la columna de orden.
9. **El orden de un listado paginado** puede resolverse aparte (`filesort`) mientras el tope de página ([DEC-013](../decisiones/DEC-013-paginacion.md)) y el volumen por filtro sean chicos. Se revisa cuando una tabla pase de decenas de miles de filas.
10. **Nombres:** `idx_<tabla>_<propósito>` para índices y `uq_<tabla>_<propósito>` para `UNIQUE`. Los existentes con `ix_` o sin prefijo no se renombran.
11. **Retirar un índice** exige datos de uso de producción (`sys.schema_unused_indexes` después de un ciclo de uso representativo, al menos un cierre de mes) y comprobar que no sostiene una FK ni una unicidad. Los datos de desarrollo no sirven para esto. El retiro va en una migración, con la justificación en su encabezado.

## Tablas exentas

Catálogos versionados con el código (`tbl_status`, `tbl_pages`, `tbl_permissions`) y registros transitorios (sesiones, códigos de recuperación, que llevan solo las cuatro columnas de creación y actualización). Detalle en `database/migrations/README.md`, punto 6.

## Aplicar una migración

1. Aplicarla en la BD de desarrollo.
2. `npx prisma db pull` y renombrar las relaciones de autoría.
3. Si la migración va **antes** del código que la usa, anotarlo en [`debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md), sección "Despliegue".
