# DEC-080 — El número de comprobante se modifica en una factura aprobada

**Fecha:** 2026-10-23 · **Tipo:** Vigente · **ADR:** [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-23. Amplía la regla del ADR-0020 ("Modificable después de aprobar").

## Contexto

- El ADR-0020 deja modificar en una factura aprobada solo el extracto y la descripción, porque no participan en ningún cálculo. El resto se corrige anulando y registrando de nuevo.
- El número de comprobante tampoco participa en ningún cálculo ni en ninguna restricción de la BD (`inv_voucher_number`, sin `UNIQUE`), y suele conocerse después de aprobar.

## Decisión

- En una factura aprobada se modifican el extracto, la descripción **y el número de comprobante** (`NOTE_COLUMNS`). Lo demás sigue respondiendo 409.
- El cambio queda en la bitácora funcional como los otros dos (`inv_voucher_number` ya estaba en `INVOICE_AUDITED`).
- Una anulada sigue sin admitir cambios.

## Qué implica

- La razón de la regla del ADR-0020 no cambia: después de aprobar solo se edita lo que no entra en ningún cálculo. Un campo nuevo que cumpla eso puede sumarse a `NOTE_COLUMNS` con su ficha.

## Dónde

`server/src/modules/billing/invoices/invoiceTerms.js` (`NOTE_COLUMNS`), `invoices.service.js` (mensaje del 409) · Cliente: `views/billing/invoices/InvoiceFormPage.jsx`, `InvoiceDetailPage.jsx`, `components/ApproveInvoiceDialog.jsx` · Tests: `invoiceTerms.test.js`, `invoices.service.test.js`.
