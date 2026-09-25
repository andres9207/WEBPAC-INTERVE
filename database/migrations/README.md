# Migraciones de base de datos

`bdtemplate.sql` (carpeta padre) es el **schema base congelado**: `CREATE TABLE`/`ALTER TABLE` únicamente, sin datos. No se le vuelven a agregar cambios de esquema ni datos — cada cambio nuevo a la base de datos (columna, tabla, dato semilla, etc.) va en un archivo nuevo acá, numerado en orden.

## Cómo provisionar una base de datos desde cero

```
mysql < database/bdtemplate.sql
mysql < database/migrations/0001_seed_pages_permissions.sql
mysql < database/migrations/0002_....sql
...
```

En orden numérico, sin saltarse ninguno.

## Convención para archivos nuevos

- Nombre: `NNNN_descripcion_corta.sql`, número siguiente al más alto ya existente, sin reusar ni reordenar (`0002`, `0003`, ...).
- Un archivo = un cambio lógico (una tabla nueva, una columna nueva, un seed de catálogo, etc.) — no mezclar cambios sin relación en el mismo archivo.
- Encabezado obligatorio en cada archivo: qué hace, de qué migración anterior depende (si aplica), y si asume algo sobre datos ya existentes (perfiles, usuarios, etc.) — ver `0001_seed_pages_permissions.sql` como referencia.
- Si el cambio también aplica sobre la BD de desarrollo actual (no solo sobre una instalación nueva), aplicarlo ahí a mano (`mysql < database/migrations/000N_....sql` contra la BD real) además de dejarlo versionado acá — este archivo no se autoaplica solo.
- Si el cambio es puro dato de catálogo/semilla (no estructura), preferir además un script de Prisma idempotente en `server/prisma/seed.js` (usando `upsert`) para poder re-sembrar una BD que ya tiene datos sin duplicar — ver cómo conviven `0001_seed_pages_permissions.sql` (estructura mínima, para una instalación nueva) y `server/prisma/seed.js` (`yarn db:seed`, repara una BD existente y además asigna permisos al perfil Superadmin).

## Estándar de auditoría para tablas nuevas

Obligatorio para toda tabla nueva del **dominio de negocio** (obras, contratos, pólizas, proveedores, maestros, etc.). Ver [ADR-0013](../../docs/adr/0013-auditoria-trazabilidad.md).

1. **Seis columnas de auditoría técnica**, con el prefijo de la tabla:

   ```sql
   `<pre>_create_by` int DEFAULT NULL,
   `<pre>_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `<pre>_update_by` int DEFAULT NULL,
   `<pre>_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `<pre>_delete_by` int DEFAULT NULL,
   `<pre>_delete_at` timestamp NULL DEFAULT NULL,
   ```

2. **FK a `tbl_users.use_id`** en `<pre>_create_by`, `<pre>_update_by` y `<pre>_delete_by`, con nombre `tbl_<tabla>_create_by` / `_update_by` / `_delete_by`. Ver `0011_fk_audit_columns.sql` y `0012_add_delete_columns.sql` como referencia.
3. **Eliminación lógica** con `sta_id` (FK a `tbl_status`; `3` = eliminado). El service que elimina pobla `<pre>_delete_by` (autor de la sesión) y `<pre>_delete_at`, y los limpia si el registro se reactiva. No hay borrado físico de registros de negocio.
4. **Bitácora**: si la tabla guarda información de auditoría funcional (valores económicos, plazos, estados, vigencias, relaciones proveedor-obra, configuración de tipos de contrato; ver la tabla de alcance del ADR-0013, decisión 9), sus services escriben en `tbl_audit_log` con `writeAudit` (`server/src/common/services/audit.service.js`) dentro de la misma transacción (lanza si recibe `prisma` en vez del `tx`). Se agrega la entidad a `AUDIT_ENTITIES` y, si hace falta, la operación a `AUDIT_OPERATIONS`: `writeAudit` rechaza valores que no estén ahí.
5. **Tablas de unión** que expresan una decisión (asignar X a Y): sin columnas de autoría; cada asignación o revocación va a la bitácora (`ASIGNAR` / `REVOCAR`).
6. **Exentas**: tablas de catálogo estable versionadas con el código (`tbl_status`, `tbl_pages`, `tbl_permissions`). Los registros transitorios (sesiones, códigos de recuperación) no llevan columnas de eliminación porque se borran físicamente. Sí llevan las cuatro de creación y actualización (`<pre>_create_by/_at`, `<pre>_update_by/_at`), y los `*_by` quedan en `NULL` cuando la acción es sin sesión. Ver `0015_password_resets_audit_columns.sql`.
7. **Prefijo único por tabla**: cada tabla usa un prefijo de tres letras propio, y todas sus columnas lo llevan (`<pre>_create_at`, nunca `<pre>_created_at`). Antes de crear una tabla, verifica que el prefijo no esté en uso. Por ejemplo, `pro_` ya es de `tbl_profiles`, así que proveedores usa `prv_`.
8. **Raíz de agregado → protocolo de bloqueo** (ADR-0027, obligatorio): si la tabla es la raíz de un agregado (contrato, factura, póliza, concepto, o cualquier registro que se edite o elimine), regístrala en `LOCKABLE` de `server/src/common/services/transaction.service.js`, en su posición de `LOCK_ORDER`. Sus services la bloquean con `withLockedTransaction` antes de leerla. Ver "Transacciones y concurrencia" en `server/ENDPOINT_STANDARD.md`.

## Relación con Prisma

`server/prisma/schema.prisma` se genera por introspección (`prisma db pull`) contra la base de datos real, **no** por `prisma migrate`. Cualquier cambio de estructura hecho acá (una columna/tabla nueva) requiere correr `npx prisma db pull` de nuevo en `server/` después de aplicar la migración, para que el cliente de Prisma se entere del cambio.

Las FK de autoría crean varias relaciones entre el mismo par de modelos (p. ej. `tbl_profiles` → `tbl_users` por `pro_id`… y por `pro_create_by`, `pro_update_by`, `pro_delete_by`). Prisma exige nombrarlas, y `db pull` genera nombres ilegibles (`tbl_users_tbl_users_use_create_byTotbl_users`). Renómbralas a mano después del `db pull`, siguiendo el patrón ya usado: campo `created_by_user` / `updated_by_user` / `deleted_by_user` en la tabla, inversa `<tabla>_created` / `_updated` / `_deleted` en `tbl_users`, nombre de relación `<Modelo>CreatedBy` / `UpdatedBy` / `DeletedBy`.
