# DEC-091 — Filtro «Pago» del listado de facturas: con o sin comprobante de egreso

**Fecha:** 2026-10-28 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Pedido por el usuario el 2026-10-28: el control de pagos de los extractos es ver qué está pagado y qué no, con el comprobante de egreso de cada factura (DEC-080, DEC-084).

## Contexto

- El comprobante de egreso (`inv_voucher_number`) es la marca de pago de una factura: se escribe también después de aprobar (DEC-080).
- Las aprobadas sin comprobante solo se veían extracto por extracto (pantalla Extractos y su reporte, DEC-084). El filtro «Comprobante» del listado busca por número (contiene) y no deja pedir las que no lo tienen.

## Decisión

- Filtro **«Pago»** en el listado de facturas de cada menú, en el panel Filtros: **con** o **sin comprobante de egreso** (`voucher`: `WITH` o `WITHOUT`, `VOUCHER_FILTERS`). Vacío (`NULL` o `''`) es sin comprobante.
- Se combina con la pestaña de estado: «Aprobada» + «Sin comprobante» es lo pendiente de pago. No se limita a las aprobadas: una registrada tampoco tiene comprobante.
- Como los demás filtros (DEC-048): cuenta en los conteos de las pestañas, se suma al alcance por obra y va al reporte del listado (DEC-070), que lo lista en su línea de filtros.
- Sin columnas ni migración: el pago sigue siendo el número de comprobante. Registrar el pago del acta (fecha, valor girado) sigue fuera del alcance (DEC-084).

## Dónde

`server/src/modules/billing/invoices/invoiceTerms.js` (`VOUCHER_FILTERS`, `voucherWhere`), `invoices.service.js` (`invoiceListQuery`, `exportFilterLines`), `invoices.controller.js`, `invoices.validation.js` · Cliente: `utils/constants.js` (`INVOICE_VOUCHER_FILTER_OPTIONS`), `views/billing/invoices/InvoicesPage.jsx` · Tests: `invoices.service.test.js` («filtro Pago»).
