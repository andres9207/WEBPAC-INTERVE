# DEC-078 — Valores de un otrosí modificables con facturas aprobadas

**Fecha:** 2026-10-23 · **Tipo:** Obligatoria · **ADR:** [0016](../adr/0016-conceptos-contractuales.md), [0024](../adr/0024-amortizacion-anticipo.md), [0025](../adr/0025-retenciones.md)

Decidido por el usuario el 2026-10-23: un otrosí guardado se puede modificar también en su costo directo y sus porcentajes, aunque el contrato ya tenga facturas aprobadas. Relaja DOM-07.

## Contexto

- DOM-07 (ADR-0016, regla 14) congelaba el costo y los porcentajes de **todos** los conceptos tras la primera factura aprobada. La corrección se hacía con otro otrosí.
- Un otrosí no admite valores negativos (`moneyRule`): con otro otrosí el valor solo sube. Un error hacia arriba en un otrosí no tenía corrección.
- Del costo y los porcentajes salen la base vigente, el anticipo pactado y el retenido pactado, que limitan lo facturado (I1, I4, I5).

## Decisión

- **Valor inicial:** sigue congelado tras la primera factura aprobada (409). Se corrige con un otrosí.
- **Otrosí y otrosí de liquidación:** su costo y sus porcentajes cambian con facturas aprobadas, en el estado que ya admite modificarlos (en ejecución; el de liquidación, en liquidación).
- **Permiso:** el mismo de modificar un concepto (74). Sin permiso reforzado.
- **Observación obligatoria** (400 sin ella), solo si cambia un valor económico y hay facturas aprobadas. Queda en la bitácora del concepto (`observation`).
- **Saldos:** bajo el bloqueo del contrato, después de escribir, se recalculan con `contractBalances` y se exigen I1 a I4 (`balanceViolations`, las de la conciliación) e I5 (lo facturado ≤ base vigente). Si alguna falla: 409 con cada invariante y su exceso, y la transacción se revierte.
- **Bitácora:** además del diferencial del concepto y del valor vigente, los límites que cambiaron, antes y después: `saldo.base_vigente`, `saldo.anticipo_pactado`, `saldo.retenido_pactado`.
- Las facturas aprobadas no se recalculan: guardan sus importes y su evidencia (DEC-062).

## Descartado

- **Permiso reforzado propio:** el usuario eligió el 74.
- **Guardar y dejar que la conciliación reporte el descuadre:** el usuario eligió rechazar.
- **Abrir también el valor inicial:** el usuario lo dejó congelado.

## Qué implica

- `economicsLocked` del detalle sigue significando "tiene facturas aprobadas"; el cliente solo bloquea los campos del valor inicial, y en un otrosí pide la observación cuando cambian.
- La conciliación de saldos (DEC-061) sigue suponiendo que el pactado no queda por debajo de lo facturado sin un defecto: el único acto que lo baja lo revalida.
- La anulación de otrosí (ADR-0016, pendiente) deberá revalidar los mismos saldos.

## Dónde

`server/src/modules/work/contracts/contractConcepts.service.js` (`updateConcept`, `assertBalancesHold`), `contracts.controller.js`, `contracts.validation.js` · `billing/invoices/balanceReconciliation.service.js` (comentario) · Cliente: `views/work/contracts/components/ConceptDialog.jsx` · Tests: `contractConcepts.service.test.js`.
