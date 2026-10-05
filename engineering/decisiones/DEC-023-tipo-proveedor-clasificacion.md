# DEC-023 — El tipo de proveedor es una clasificación de la empresa

**Fecha:** 2026-09-29 · **Tipo:** Vigente · **ADR:** [0010](../adr/0010-tipos-proveedor.md)

> **Reemplazada en parte por [DEC-041](DEC-041-varios-tipos-proveedor.md)** (2026-10-05): un proveedor tiene uno o varios tipos, en `tbl_provider_classifications`, y `tbl_providers.pvt_id` ya no existe. Lo demás sigue vigente: el tipo es una clasificación, sin campos ni reglas por tipo.

Resuelve la decisión de negocio DEC-10 del backlog (`docs/backlog/BACKLOG.md`).

## Contexto

ADR-0010 dejó abierta la naturaleza del tipo de proveedor: clasificación, comportamiento (campos o reglas por tipo), jerarquía (subcontratista bajo un contratista) o tipo contractual (vive en la participación, no en la empresa). Bloqueaba MAE-BD-04, MAE-BE-05 y MAE-FE-05.

## Decisión

- **Clasificación** (ADR-0010, alternativa 4): maestro `tbl_provider_types` con nombre y estado, único entre no eliminados. Sin código.
- El tipo **no condiciona campos ni reglas**: no hay descriptores por tipo ni condicionales en servidor o cliente.
- No participa en la identidad del proveedor, que es el par (tipo de documento, número) (ADR-0010, decisión 7).
- Tipos iniciales: Simple, Subcontratista, Contrato mayor (migración `0023`).
- Entidad de bloqueo `TIPO_PROVEEDOR`, al final de `LOCK_ORDER` ([DEC-019](DEC-019-maestros-orden-bloqueo.md)). Permisos 22 a 26.

## Descartado

- **Comportamiento, jerarquía y tipo contractual**: ningún requisito los respalda hoy. Si aparece uno, se reemplaza esta ficha. Si el tipo pasa a condicionar campos, se modela con la configuración de campos de ADR-0006, no con condicionales.

## Qué implica

- La FK va en `tbl_providers` (`pvt_id`, `ON DELETE RESTRICT`, con índice) y se agrega con el módulo de proveedores (MAE-BD-11). Hasta entonces el maestro no tiene `dependents`.
- El formulario de proveedor usa `getProviderTypesSelectAPI` (solo activos, más `includeId` al editar).

## Dónde

`database/migrations/0022`–`0024` · `server/src/modules/admin/providerTypes/` · `client/src/views/admin/providerTypes/` · `client/src/api/requests/providerTypesApi.js`
