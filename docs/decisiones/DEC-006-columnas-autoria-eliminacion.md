# DEC-006 — Seis columnas de autoría con FK y eliminación lógica con evidencia

**Fecha:** 2026-09-24 · **Tipo:** Obligatoria · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md) (decisiones 2, 3 y 4)

## Contexto

`*_create_by` y `*_update_by` eran enteros sin FK: podían apuntar a un usuario que no existe. Además, quién eliminó un registro quedaba en `*_update_by`, y la siguiente edición lo sobrescribía.

## Decisión

- **Seis columnas** en toda tabla de negocio: `<pre>_create_by/_at`, `<pre>_update_by/_at` y `<pre>_delete_by/_at`.
- Los tres `*_by` tienen **FK a `tbl_users.use_id`** y admiten `NULL`, porque el primer usuario no tiene creador. La migración `0011` pasó a `NULL` los autores inexistentes antes de crear las FK.
- **La eliminación es lógica** con `sta_id = 3`, que sigue siendo lo único que decide si un registro se ve. Al eliminar se llenan `*_delete_by` (el autor de la sesión) y `*_delete_at`.
- **No se elimina lo ya eliminado**: responde 404, para no pisar la evidencia original.
- **Reactivar** limpia las columnas de eliminación; la historia queda en la bitácora.
- **Alcance hoy**: `tbl_users`, `tbl_profiles` y `tbl_documents`. Los registros eliminados antes de la migración `0012` quedan con `NULL`, porque copiar otro valor sería inventar la evidencia.

## Descartado

- **Tablas de unión de permisos con columnas de autoría**: se auditan solo en la bitácora ([DEC-007](DEC-007-bitacora-funcional.md)).
- **Borrado físico de registros de negocio.**

## Qué implica

- Toda tabla nueva del dominio de negocio lleva las seis columnas y sus FK desde su creación. Ver "Estándar de auditoría para tablas nuevas" en `database/migrations/README.md`.
- En Prisma, las relaciones de autoría llevan nombre explícito (`created_by_user`, `updated_by_user`, `deleted_by_user`). Si se corre `db pull`, hay que volver a nombrarlas.

## Dónde

`database/migrations/0011_fk_audit_columns.sql`, `0012_add_delete_columns.sql` · `deleteUser`, `deleteProfile`, `deleteModuleDoc`
