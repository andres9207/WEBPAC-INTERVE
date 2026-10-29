# DEC-101 — Listado de facturas: alertas «Pendientes de pago» y «Pagadas»

**Fecha:** 2026-10-29 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Pedido por el usuario el 2026-10-29: dos contadores en las facturas, pendientes de pago y pagadas. Aplican cuando la factura ya tiene su extracto; con el extracto y el número de comprobante, la factura está pagada.

## Decisión

- Dos alertas más en la fila del listado de facturas ([DEC-094](DEC-094-alertas-listado-facturas.md)), antes de las de glosas, con su conteo:
  - **Pendientes de pago:** con extracto y sin número de comprobante de egreso.
  - **Pagadas:** con extracto y con número de comprobante.
- Vacío (o `NULL`) cuenta como sin extracto y sin comprobante, como en el filtro «Pago» ([DEC-091](DEC-091-filtro-pago-facturas.md)).
- **Las anuladas no cuentan** en ninguna de las dos: no se pagan.
- Como las demás alertas: una a la vez, combinable con la pestaña de estado, y el reporte del listado la respeta.
- «Pagada» es solo lo que dicen esos dos campos; no se guarda un estado de pago ni cambia el ciclo de vida de la factura.

## Dónde

`server/src/modules/billing/invoices/invoiceTerms.js` (`INVOICE_ALERTS`, `paymentWhere`, `invoiceAlertWheres`) · Cliente: `utils/constants.js` (`INVOICE_ALERT_OPTIONS`) · Tests: `invoices.service.test.js` («alertas de pago»).
