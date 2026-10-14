# DEC-062 — Instantánea de la aprobación de una factura y consulta de su evidencia

**Fecha:** 2026-10-14 · **Tipo:** Vigente · **ADR:** [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md) ("Secuencia tipo"), [0026](../adr/0026-calculos-facturacion.md)

Decidido por el usuario el 2026-10-14 (PRO-BE-39): la instantánea completa al aprobar y una consulta por endpoint con un permiso propio.

## Contexto

- Al aprobar, la bitácora guardaba solo el saldo que movía la factura (por ejemplo, el anticipo facturado), no los saldos del contrato ni sus importes.
- La bitácora no tenía ninguna forma de consulta (ADR-0013).

## Decisión

- **Instantánea al aprobar**, en la misma transacción y en la misma operación de bitácora que el cambio de estado:
  - `snapshot.invoice.<importe>`: los importes de la factura (valor; en la liquidación, también amortización y retenido). Solo el valor nuevo.
  - `snapshot.<advance|retention>.<saldo>`: **todos** los saldos del contrato, antes y después. Anticipo: base, pactado, facturado, amortizado, por facturar, por amortizar y porcentaje efectivo. Retenido: base, pactado, retenido, devuelto, por retener, saldo y porcentaje efectivo.
  - "Después" se lee con `contractBalances` dentro de la misma transacción, con la factura ya aprobada. Una factura simple no tiene saldos: no lleva instantánea.
  - Es **evidencia**: ningún cálculo lee la bitácora; los saldos se recalculan siempre desde las facturas aprobadas.
- **Consulta** `GET /api/billing/invoices/get_invoice_evidence?invId=`, con el permiso **109** "Ver evidencia de facturas" (migración `0097`), y además la vista de la factura (DEC-054) y su obra (DEC-047): 404 fuera. Devuelve:
  - `operations`: cada operación de la bitácora sobre la factura, en orden, con autor, fecha y todas sus filas, también las de otras entidades que la misma operación tocó;
  - `approval`: la última aprobación, con su instantánea reconstruida (`amounts`, `balances.{advance,retention}.<saldo>.{before,after}`), o `snapshot: null` si se aprobó antes de esta decisión.
- La migración otorga el 109 a quien ya aprueba facturas (permiso 86); `yarn db:seed`, al Superadmin.

## Descartado

- **Una sola fila con un JSON:** rompe el formato de la bitácora (una fila por campo) y la consulta por campo.
- **Un comando del servidor en lugar del endpoint:** la evidencia la piden auditores, no solo soporte.

## Qué implica

- Cuando lleguen el IVA, las retenciones tributarias (fase B) y la versión de fórmula (PRO-BE-36), se agregan a la misma instantánea (`approvalSnapshot`).
- Falta mostrarla en el cliente (el detalle de la factura).
- Desplegar: aplicar `0097` y, donde se use, `yarn db:seed`.

## Dónde

`server/src/modules/billing/invoices/invoices.service.js` (`approvalSnapshot`, `SNAPSHOT_BALANCES`, `approveInvoice`) · `invoiceEvidence.service.js` · `invoices.routes.js` · `invoices.controller.js` · `permissions.constants.js` (`billing.invoices.viewEvidence`) · `server/prisma/seed.js` · migración `0097` · Tests: `invoices.service.test.js` ("instantánea de composición y saldos") e `invoiceEvidence.service.test.js`.
