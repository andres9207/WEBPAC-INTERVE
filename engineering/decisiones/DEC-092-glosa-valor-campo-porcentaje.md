# DEC-092 — Glosa: importe del campo a la vista, y valor y % con signo

**Fecha:** 2026-10-28 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

> **Desde la migración 0129** (2026-10-29, DEC-085), una glosa tiene uno o varios campos: el importe a la vista, el valor y el % son **de cada campo**, en su propia línea del diálogo. `preview_invoice_gloss` sigue siendo por campo.

Pedido por el usuario el 2026-10-28. Amplía [DEC-085](DEC-085-glosas.md) (campo de la glosa) con lo de [DEC-065](DEC-065-factura-simple-importes.md), «Valor y porcentaje».

## Contexto

- Al levantar una glosa se elige el campo de la factura (DEC-085), pero no se veía cuánto valía ese campo: había que ir al Detalle para saber en cuánto se equivocó.
- El valor de la glosa era un texto con punto decimal, no el campo de importe con valor y % que usan las facturas.

## Decisión

- **Importe del campo:** `getInvoice` entrega en `glossFields` el importe de cada campo en la factura (`amount`): la línea de su panel Detalle; el VALOR del anticipo y de la devolución; y en la normal o liquidación registrada sin impuestos, su VALOR, amortización y retenido guardados. «Otro», o un campo sin importe, no lo tiene (null). El diálogo lo muestra en las opciones y debajo del campo elegido.
- **Valor y %:** el valor se escribe en pesos o como % del importe del campo, con signo (negativo, nota crédito), y el otro lado lo da el servidor (`preview_invoice_gloss`, con el permiso de ver facturas; `glossPair`). Se guarda **solo el valor**, como hasta ahora: sin migración. Sin importe del campo no hay %.
- **Componentes:** `MoneyField`, `PercentField` y `AmountPercentField` admiten `signed` (un «-» al inicio; el % sin el tope de tres enteros). Sin `signed`, nada cambia.

## Dónde

`server/src/modules/billing/invoices/glossFields.js` (`glossFieldsFor` con importes, `glossPair`), `invoiceGlosses.service.js` (`previewGloss`), `invoices.service.js` (`getInvoice`), `invoices.validation.js`, `invoices.controller.js`, `invoices.routes.js` · Cliente: `views/billing/invoices/components/InvoiceGlossesTab.jsx`, `api/requests/invoicesApi.js`, `ui-component/extended/MoneyField.jsx`, `PercentField.jsx`, `AmountPercentField.jsx`, `utils/formatNumber.js` (`parseMoneyInput`) · Tests: `glossFields.test.js`, `invoiceGlosses.service.test.js`.
