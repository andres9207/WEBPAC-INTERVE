# DEC-010 — Prefijo único por tabla y sufijos `_create_at` / `_update_at`

**Fecha:** 2026-09-24 · **Tipo:** Obligatoria · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md) (B11, B12)

## Contexto

El análisis encontró dos inconsistencias de nombres:
- `tbl_providers.pro_update_at` usaba `pro_`, que es el prefijo de `tbl_profiles`.
- `tbl_password_resets.par_created_at` usaba `_created_at` en lugar de `_create_at`.

## Decisión

- **Cada tabla tiene un prefijo propio de tres letras**, y todas sus columnas lo llevan. Antes de crear una tabla se verifica que el prefijo no esté en uso. Proveedores usará **`prv_`**.
- **Sufijos fijos**: `<pre>_create_by`, `<pre>_create_at`, `<pre>_update_by`, `<pre>_update_at`, `<pre>_delete_by`, `<pre>_delete_at`. Nunca `_created_at`.
- `par_created_at` se renombró a `par_create_at` (migración `0015`).
- `tbl_providers` no existe en este repositorio, así que no hubo nada que renombrar. La regla aplica cuando se cree.

## Dónde

`database/migrations/README.md`, "Estándar de auditoría para tablas nuevas", puntos 6 y 7 · `database/migrations/0015_password_resets_audit_columns.sql`
