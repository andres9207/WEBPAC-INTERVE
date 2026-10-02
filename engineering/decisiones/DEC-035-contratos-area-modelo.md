# DEC-035 — Los contratos viven en `work/`: número único por obra, plazo con unidad, ciclo de vida en columna propia

**Fecha:** 2026-10-02 · **Tipo:** Obligatoria · **ADR:** [0015](../adr/0015-contratos.md), [0016](../adr/0016-conceptos-contractuales.md), [0017](../adr/0017-estados-contrato.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve PD-05 ([`PROJECT_STATE`](../PROJECT_STATE.md)) **para contratos** y las decisiones de negocio DEC-13, DEC-14 y DEC-17 del backlog. Decidido por el usuario el 2026-10-02. Es la fase A del módulo: las suspensiones, la conciliación de la fecha fin y la inmutabilidad tras la primera factura quedan para la fase B ([deuda](../debt/TECHNICAL_DEBT.md)).

## Decisión

- **Área `work/`**, módulo `contracts`, junto a obras y proveedores:
  - servidor: `server/src/modules/work/contracts/` (`contracts.service.js`, `contractConcepts.service.js` y `contractTerms.js`, las reglas sin BD)
  - API: `/api/work/contracts/<acción>`; los actos sobre conceptos, `create_amendment`, `create_liquidation` y `update_concept`
  - cliente: `client/src/views/work/contracts/` y `client/src/api/requests/contractsApi.js`
  - menú: "Contratos" dentro del grupo "Obras" (página 16)
- **Nombres fijados:**

  | Parte | Tabla | Prefijo |
  | --- | --- | --- |
  | Contrato | `tbl_contracts` | `ctr_` |
  | Conceptos (valor inicial, otrosí, otrosí de liquidación) | `tbl_contract_concepts` | `ccp_` |
  | Historial de estado | `tbl_contract_status_history` | `csh_` |

- **Número de contrato único dentro de la obra**, entre los no eliminados (backlog DEC-17, ADR-0015 decisión 9). Columna generada `ctr_number_active` + `UNIQUE (wrk_id, ctr_number_active)`: eliminar un contrato libera su número.
- **Plazo = número + unidad** (`DIA`, `MES`, `ANIO`), sin "frecuencia" aparte (backlog DEC-13, ADR-0015 decisión 4).
- **La suspensión extiende la fecha fin** (backlog DEC-14, ADR-0015 decisión 7): `ctr_suspended_days` es insumo del cálculo; queda en 0 hasta la fase B.
- **Fecha fin derivada y persistida**: `contractEndDate` (inicio + plazo + Σ prórrogas de los otrosí en la unidad del contrato + días suspendidos), en la transacción de cada evento que la cambia (editar fecha o plazo, crear un otrosí con prórroga, cambiar una prórroga). Nunca se acepta del cliente.
- **El ciclo de vida va en `ctr_state`, no en `tbl_status`.** Se aparta de ADR-0017 (decisión 13, `sta_scope` propio) porque `WORKFLOW_STANDARD` (regla 2) tiene precedencia: `sta_id` sigue siendo solo la eliminación lógica. Valores `IN_PROGRESS`, `SUSPENDED`, `IN_LIQUIDATION`, `LIQUIDATED`, con `CHECK`. Las transiciones están declaradas en `CONTRACT_TRANSITIONS` y lo que admite cada estado, en `STATE_ALLOWS` (`contractTerms.js`). Un acto que el estado no admite responde **409**.
- **Coherencia en la BD con FK compuestas** (ADR-0015 la daba por no expresable): `(wks_id, wrk_id) → tbl_work_stages` y `(wrk_id, prv_id) → tbl_work_providers`. La segunda también impide desasignar un proveedor con contratos en la obra, y la primera, quitar una etapa con contratos; los services dan el mensaje 409 antes.
- **La obra no cambia después de crear el contrato.** Etapa, proveedor, tipo, número, nombre, fechas y plazo sí, mientras el contrato está en ejecución.
- **Bloqueo:** crear bloquea obra → proveedor → tipo de contrato; editar, obra → proveedor → contrato → tipo; los actos sobre conceptos, contrato (→ concepto). `CONTRATO` y `CONCEPTO` registrados en `LOCKABLE`.
- **Permisos 68 a 74:** ver, crear (incluye el valor inicial), modificar, eliminar, crear otrosí, crear otrosí de liquidación, modificar concepto.
- **Eliminar un contrato** es lógico y hoy no tiene bloqueo (no hay facturas). Una obra con contratos no eliminados no se elimina (409).

## Descartado

- **Estado en `tbl_status` con `sta_scope`** (ADR-0017): mezcla visibilidad y ciclo de vida en una columna, contra `WORKFLOW_STANDARD`.
- **Número único global o por proveedor**: el usuario eligió por obra.
- **Validar etapa y proveedor solo en el service**: la FK compuesta lo garantiza también ante un acceso que no pase por él.

## Dónde

`database/migrations/0048`–`0052` · `server/src/modules/work/contracts/` · `server/src/common/services/transaction.service.js` (`LOCKABLE`) · `client/src/views/work/contracts/` (incluida la pestaña de la obra, `components/WorkContractsTab.jsx`)
