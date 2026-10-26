# DEC-085 — Glosas de facturas, liberadas en un extracto posterior

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-26, a partir del documento de alcance de Intervé (punto 6: "generación de glosas, errores hallados durante el registro de facturas recibidas, que se deben poder controlar hasta su liberación en un extracto posterior"). Ningún ADR trataba las glosas.

## Contexto

- En WebPAC la glosa (`tblglosas`) es de la obra y del acta en que se levanta, con código, valor con signo y descripción.
- El usuario decidió: la glosa **lleva valor** y **no bloquea** la aprobación de la factura.

## Decisión

- **`tbl_invoice_glosses`**: de una factura y de su obra (FK compuesta `(inv_id, wrk_id)`, con `uq_invoices_id_work`). Código opcional, valor distinto de cero y con signo (`CHECK`), descripción.
- **Extractos** (DEC-084): se levanta en un extracto de la obra (opcional; el formulario propone el de la factura) y se libera en **otro posterior** de la misma obra (fecha igual o mayor, nunca el mismo; FK compuestas y `CHECK`), con observación. La fecha de liberación es la del servidor.
- **Ciclo**: abierta, se edita y se elimina (lógico); liberada, solo se consulta. Una factura anulada no admite glosas nuevas ni cambios; sus abiertas se liberan o se eliminan.
- **No bloquea** aprobar, anular ni eliminar la factura.
- **Bloqueo**: factura → extractos (`FACTURA`, `EXTRACTO`; ADR-0027). Liberar bloquea los dos extractos, porque la fecha del de origen decide.
- **Permisos**: verlas, con ver facturas (115); levantar, editar, liberar y eliminar, con el 123 "Gestionar glosas".
- **Reporte del extracto**: lista y suma las glosas levantadas y las liberadas en él. Un extracto con glosas no se elimina (409).

## Descartado

- Que la glosa bloquee la aprobación: el usuario pidió que no.
- Glosa sin valor (como el seguimiento, DEC-076): el usuario pidió que lleve valor, como en WebPAC.

## Qué implica

- Un nuevo acto que borre o cambie un extracto revisa sus glosas además de sus facturas.

## Dónde

Migración `0120_create_invoice_glosses.sql` · `server/src/modules/billing/invoices/invoiceGlosses.service.js`, `invoices.routes.js` (`list_invoice_glosses`, `create_invoice_gloss`, `update_invoice_gloss`, `release_invoice_gloss`, `delete_invoice_gloss`), `invoices.validation.js` · `billing/statements/statements.service.js` (reporte y eliminación) · Cliente: `views/billing/invoices/components/GlossesTab.jsx`, `InvoiceDetailPage.jsx`, `views/billing/statements/components/StatementReportDialog.jsx` · Tests: `invoiceGlosses.service.test.js`, `statements.service.test.js`.
