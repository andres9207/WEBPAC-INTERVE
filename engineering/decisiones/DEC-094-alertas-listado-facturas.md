# DEC-094 — Alertas del listado de facturas: con glosas abiertas y con glosas

**Fecha:** 2026-10-28 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Pedido por el usuario el 2026-10-28: una opción «facturas con glosas» junto a las pestañas del listado, con su contador, que filtre.

## Contexto

- Las pestañas del listado de facturas son los estados (Todas, Por aprobar, Aprobadas, Anuladas), con su conteo.
- Como pestaña, «con glosas» ocuparía el lugar del estado: no se podrían ver, por ejemplo, las aprobadas con glosas. Contratos resolvió lo mismo con una fila de alertas aparte ([DEC-089](DEC-089-alertas-listado-contratos.md)).

## Decisión

- **Fila de alertas** bajo el encabezado del listado de facturas de cada menú (`AlertChips` de `MasterPage`, parámetro `alert`, `INVOICE_ALERTS`), con su conteo:
  - **Con glosas abiertas:** alguna glosa no liberada ni eliminada.
  - **Con glosas:** alguna glosa no eliminada, abierta o liberada.
- Se elige una a la vez y se **combina con la pestaña de estado**: el listado cumple las dos, los estados cuentan dentro de la alerta y las alertas, dentro del estado. Los demás filtros y el alcance por obra se aplican a todo. El reporte del listado (DEC-070) la respeta y la lista en su línea de filtros.
- Los predicados son los del filtro «Glosas» del panel (DEC-093, `glossWhere`): una sola definición.

## Descartado

- **Una pestaña más:** reemplazaría el estado en vez de combinarse con él.

## Dónde

`server/src/modules/billing/invoices/invoiceTerms.js` (`INVOICE_ALERTS`, `invoiceAlertWheres`), `invoices.service.js` (`invoiceListQuery`, `paginationInvoices`, `exportFilterLines`), `invoices.controller.js`, `invoices.validation.js` · Cliente: `utils/constants.js` (`INVOICE_ALERT_OPTIONS`), `views/billing/invoices/InvoicesPage.jsx` · Tests: `invoices.service.test.js` («alertas de glosas»).
