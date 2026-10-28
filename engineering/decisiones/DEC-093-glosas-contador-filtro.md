# DEC-093 — Glosas: contador en el detalle y filtro en el listado de facturas

**Fecha:** 2026-10-28 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Pedido por el usuario el 2026-10-28. Amplía [DEC-085](DEC-085-glosas.md) (glosas) y [DEC-076](DEC-076-seguimiento-facturas.md) (seguimiento).

## Contexto

- El contador de la pestaña Glosas del detalle de la factura, y el de Seguimiento, salían de la lista de cada pestaña: hasta abrirla no se veía cuántas había.
- El listado de facturas no permitía saber qué facturas tienen glosas.

## Decisión

- **Contadores:** `getInvoice` trae `openGlossesCount` (glosas abiertas: no liberadas ni eliminadas) y `followUpsCount` (seguimientos no eliminados). Las pestañas los muestran desde que se abre la factura, solo si son mayores que cero; al cargar la pestaña, toman su propia lista.
- **Filtro «Glosas»** en el listado de facturas de cada menú (`gloss`, `GLOSS_FILTERS`): **con glosas abiertas**, **con glosas** (alguna, abierta o liberada) o **sin glosas**. Las eliminadas no cuentan (`liveGlossesWhere`). Como los demás filtros (DEC-048): cuenta en las pestañas de estado, se suma al alcance por obra y va al reporte del listado (DEC-070).

## Dónde

`server/src/modules/billing/invoices/invoiceTerms.js` (`GLOSS_FILTERS`, `glossWhere`, `liveGlossesWhere`), `invoices.service.js` (`invoiceListQuery`, `exportFilterLines`, `getInvoice`), `invoices.controller.js`, `invoices.validation.js` · Cliente: `utils/constants.js` (`INVOICE_GLOSS_FILTER_OPTIONS`), `views/billing/invoices/InvoicesPage.jsx`, `InvoiceDetailPage.jsx` · Tests: `invoices.service.test.js` («filtro Glosas»).
