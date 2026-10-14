# DEC-059 — La factura de liquidación guarda su otrosí de liquidación

**Fecha:** 2026-10-14 · **Tipo:** Obligatoria · **ADR:** [0021](../adr/0021-facturacion-contrato-mayor.md), [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-14. Implementa la asociación que ADR-0021 dejó confirmada con el área usuaria ("la factura de liquidación se asocia al otrosí de liquidación") y el criterio 1 de PRO-BE-26.

## Contexto

- Hasta aquí la asociación era implícita: la factura de liquidación solo se admitía con el contrato en liquidación, y a ese estado se llega creando el otrosí de liquidación. El detalle no guardaba qué concepto facturaba.
- Sin la columna no se puede consultar directamente qué se facturó contra un otrosí, y la reapertura de contratos (ADR-0017), cuando llegue, podría dejar ambigua la relación.

## Decisión

- **`tbl_invoice_liquidation_details` guarda `ccp_id` y `ctr_id`**, los dos obligatorios (migración `0095`).
  - FK `(ccp_id, ctr_id)` → `tbl_contract_concepts`: el concepto es del mismo contrato (mismo criterio que las pólizas). Impide borrar el otrosí mientras tenga facturas.
  - FK `(inv_id, ctr_id)` → `tbl_invoices`, apoyada en el `UNIQUE` nuevo `uq_invoices_id_contract`: el contrato del detalle es el de la factura.
  - Que el concepto sea de tipo `LIQUIDATION` lo verifica el service: no es expresable con una FK, porque `ccp_liquidation_key` es una columna generada `VIRTUAL`.
- **El servidor resuelve el otrosí, nunca el cliente.** Al registrar o editar una liquidación registrada, bajo el bloqueo del contrato, toma el único otrosí de liquidación del contrato (`ccp_liquidation_key UNIQUE`). Si no existe, responde 409. Un `ccpId` en la petición se ignora.
- El cambio de `ccp_id` queda en la bitácora con los importes del detalle.
- **Expediente de la factura:** muestra el otrosí de liquidación asociado (número, si lo tiene, y fecha de inicio).
- Las liquidaciones existentes tomaron el otrosí de liquidación de su contrato en la migración. Si alguna no lo tuviera, la migración se detiene en el `NOT NULL`.

## Descartado

- **Solo `ccp_id` con FK simple:** dejaba el "mismo contrato" solo en el service. El usuario eligió la FK compuesta.
- **Recibir el concepto del cliente:** ADR-0021 lo resuelve el servidor; el cliente podría asociar el otrosí de otro contrato.
- **Quitar la FK simple `inv_id` → factura**, ya implicada por la compuesta: se conserva para no cambiar las relaciones que usa el código.

## Qué implica

- Toda factura de liquidación nueva, también desde scripts o semillas, lleva `ccp_id` y `ctr_id`, con el otrosí de liquidación de su contrato.
- Lo que anule o borre un otrosí de liquidación (anulación de otrosí, ADR-0016; reapertura, ADR-0017) tiene que contar con sus facturas: la FK lo impide.
- Desplegar: aplicar `0095`, `npx prisma db pull` (o el `schema.prisma` versionado) y `npx prisma generate`.

## Dónde

`database/migrations/0095` · `server/prisma/schema.prisma` (`tbl_invoice_liquidation_details`, relación `InvoiceLiquidationDetailContract`) · `server/src/modules/billing/invoices/invoices.service.js` (`liquidationConceptOf`, `resolveDetail`, `amountsDto`) · `server/src/common/constants/uniqueConstraints.constants.js` · `client/src/views/billing/invoices/InvoiceDetailPage.jsx` · Tests: `invoices.service.test.js` ("liquidación: se asocia al otrosí…", "liquidación: sin otrosí…").
