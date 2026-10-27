# DEC-086 — El tipo de contrato es de la obra, no del contrato

**Fecha:** 2026-10-27 · **Tipo:** Obligatoria · **ADR:** [0006](../adr/0006-tipos-contrato.md), [0015](../adr/0015-contratos.md)

Decidido por el usuario el 2026-10-27: "el tipo de contrato está asociado a la obra, no al contrato".

## Contexto

- El tipo de contrato estaba en dos sitios: en la obra (`tbl_works.ctt_id`, ADR-0011) y en cada contrato (`tbl_contracts.ctt_id`, migración 0049), elegido en el formulario del contrato.
- Desde DEC-053 y DEC-056, la configuración de campos y el menú de facturas son del tipo de proveedor; el tipo de contrato del contrato ya solo era una etiqueta: columna, filtro, reportes y tablero.

## Decisión

- **Se quita `tbl_contracts.ctt_id`** con su FK y su índice (migración 0123). Lo que tuviera cada contrato se pierde: no se copia.
- El contrato **muestra el tipo de su obra**: listado, expediente, reportes y pestaña Pólizas del tablero de la obra lo leen por `tbl_works`.
- El **filtro "Tipo de contrato"** del listado de contratos se conserva y filtra por el tipo de la obra (`tbl_works.ctt_id`); el orden por esa columna, también.
- El formulario del contrato ya no lo pide, y el servidor no lo recibe al guardar ni bloquea `TIPO_CONTRATO` al crear o editar un contrato (corrige el orden de bloqueo de DEC-035).
- El maestro de tipos de contrato bloquea su eliminación solo por obras (ADR-0006, regla 13).

## Descartado

- Conservar la columna copiada de la obra: duplica el dato y obliga a mantenerlo si la obra cambia de tipo.
- Quitar la columna y el filtro del listado: el usuario pidió tomarlos de la obra.

## Qué implica

- Quien necesite el tipo de contrato de un contrato lo lee de su obra (`tbl_contracts → tbl_works → tbl_contract_types`).

## Dónde

Migración `0123_drop_contract_contract_type.sql` · `server/src/modules/work/contracts/contracts.service.js`, `contracts.controller.js`, `contracts.validation.js` · `app/dashboard/workDashboard.service.js` · `admin/contractTypes/contractTypes.service.js` · seeds (`seed.demo.js`, `seed.prod.js`, `seed.prod.sql.js`, `seed.volume.js`) · Cliente: `views/work/contracts/components/ContractDataForm.jsx`, `contractForm.js`, `useContractForm.js` · Tests: `contracts.service.test.js`, `workDashboard.service.test.js`.
