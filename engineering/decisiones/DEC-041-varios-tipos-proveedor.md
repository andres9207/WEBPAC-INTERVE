# DEC-041 — Un proveedor tiene uno o varios tipos de proveedor

**Fecha:** 2026-10-05 · **Tipo:** Vigente · **ADR:** [0010](../adr/0010-tipos-proveedor.md), [0012](../adr/0012-proveedores.md)

Reemplaza a [DEC-023](DEC-023-tipo-proveedor-clasificacion.md) solo en la cantidad de tipos: el tipo sigue siendo una clasificación de la empresa, sin campos ni reglas por tipo. Cierra el pendiente de ADR-0012: *"si un proveedor puede tener varios tipos de proveedor"*.

## Contexto

`tbl_providers.pvt_id` admitía un solo tipo, y los formularios usaban un selector simple. El negocio confirmó que una empresa puede ser, a la vez, por ejemplo, subcontratista y proveedor simple.

## Decisión

- **Tabla de unión `tbl_provider_classifications`** (prefijo `pcl_`, migración `0063`): proveedor ↔ tipo, con `UNIQUE (prv_id, pvt_id)`. La migración copió el tipo de cada proveedor existente. La `0064` retiró `tbl_providers.pvt_id`.
- **Al menos un tipo** por proveedor. Lo exigen el validador (`pvtIds`, lista de 1 a 20 ids) y el service. El esquema no puede expresarlo.
- **Parte del proveedor:** la lista se guarda con él, en la misma transacción, por diferencial contra la BD (altas y bajas). Sin columnas de autoría ([migraciones, regla 5](../../database/migrations/README.md)).
- **Bloqueo:** todos los tipos elegidos (`TIPO_PROVEEDOR` con una lista), en el orden fijo de `LOCK_ORDER`.
- **Tipo inactivo:** se conserva si el proveedor ya lo tenía; no se agrega uno nuevo.
- **Bitácora funcional** del proveedor: campo `pvt_ids`, con la lista ordenada (`1` → `1,2`).
- **Maestro de tipos:** eliminar un tipo cuenta los proveedores no eliminados que lo usan, a través de la tabla de unión. Para eso el patrón de maestro admite `where` en un dependiente: una tabla de unión sin `sta_id` se filtra por su padre.
- **API:** el proveedor recibe `pvtIds` y devuelve `pvtIds` y `providerTypes` (nombres, ordenados). Los listados devuelven `providerTypes`.
- **Cliente:** `SearchSelect` admite `multiple` (chips; `value` y `onChange` con la lista), sin crear un componente nuevo. Formulario del proveedor y "Crear proveedor nuevo" desde la obra con selector múltiple. Ficha con chips. Listados con los tipos separados por comas.

## Descartado

- **Conservar `tbl_providers.pvt_id` como tipo principal:** nadie pidió un tipo principal; dejaría dos fuentes del mismo dato.
- **Columna con la lista (JSON o texto):** sin FK al maestro, no bloquea la eliminación de un tipo en uso ni se puede consultar por tipo.
- **Filtro del listado por tipo:** no se pidió por ahora.
- **Orden del listado por tipo:** con varios tipos no tiene un criterio claro. Se quitó.

## Qué implica

- Un formulario que capture el tipo de proveedor usa `SelectSocket` o `SearchSelect` con `multiple`, y envía `pvtIds`.
- Una consulta que filtre por tipo pasa por `tbl_provider_classifications`.
- Desplegar: aplicar `0063` y `0064`, en ese orden, antes del servidor nuevo.

## Dónde

`database/migrations/0063_create_provider_classifications.sql`, `0064_drop_providers_provider_type.sql` · `server/src/modules/work/providers/providers.service.js` (`typeIdsOf`, `assertProviderTypes`, `applyProviderTypes`) · `providers.validation.js` · `server/src/modules/admin/providerTypes/providerTypes.service.js` · `server/src/common/services/master.service.js` (`dependents[].where`) · `client/src/ui-component/extended/SearchSelect.jsx` · `client/src/views/work/providers/` · Tests: `providers.service.test.js`, `providerTypes.service.test.js`, `master.service.test.js`.
