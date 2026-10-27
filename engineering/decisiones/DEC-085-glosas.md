# DEC-085 — Glosas de facturas, liberadas en un extracto posterior

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-26, a partir del documento de alcance de Intervé (punto 6: "generación de glosas, errores hallados durante el registro de facturas recibidas, que se deben poder controlar hasta su liberación en un extracto posterior"). Ningún ADR trataba las glosas. **Revisada el 2026-10-27** por pedido del usuario: la glosa registra lo pagado por encima de lo que la factura admite y suma al total pagado del extracto; el extracto de la glosa es texto, como el de la factura (migración 0125).

## Contexto

- En WebPAC la glosa (`tblglosas`) es de la obra y del acta en que se levanta, con código, valor con signo y descripción.
- El usuario decidió: la glosa **lleva valor** y **no bloquea** la aprobación de la factura.

## Decisión

- **`tbl_invoice_glosses`**: de una factura y de su obra (FK compuesta `(inv_id, wrk_id)`, con `uq_invoices_id_work`). Código opcional, valor distinto de cero y con signo (`CHECK`), descripción.
- **Campo de la factura** (2026-10-27, migración 0126): toda glosa dice sobre qué campo es, obligatorio (`igl_field`). Los que admite son los del panel Detalle de su tipo de factura, sin sumas ni totales (SUBTOTAL, VALOR + IVA), más "Otro": normal y liquidación, VALOR, IVA, RTE FUENTE, RTE IVA, RTE ICA, AMORTIZACIÓN, RETENIDO y DCTO MATERIALES; simple, VALOR, RTE FUENTE, DCTO AI, IVA, RTE IVA, RTE ICA, FLETE y DCTO PRONTO PAGO; anticipo, ANTICIPO; devolución de retenido, VALOR. El catálogo vive en `glossFields.js`; la BD cierra el dominio con un `CHECK` y un test los cruza. El service valida el campo contra el tipo de la factura bloqueada (400). Las glosas anteriores quedaron como "Otro".
- **Nota crédito**: una glosa negativa es una nota crédito, lo que el proveedor devuelve. Se deriva del signo, sin columna: resta del total pagado como cualquier valor negativo. La pestaña Glosas y el reporte la muestran así.
- **Extractos** (DEC-084): se levanta en un extracto (opcional; el formulario propone el de la factura) y se libera en **otro**, con observación. Los dos se escriben como texto de hasta 20 caracteres, como el extracto de la factura (`igl_statement`, `igl_release_statement`, migración 0125), y se agrupan con las facturas de la misma obra y texto. El de liberación no puede ser el de origen, sin distinguir mayúsculas ni tildes (`CHECK` y service). La fecha de liberación es la del servidor. Sin extractos registrados ya no hay fecha que compare: "posterior" queda a cargo de quien libera.
- **Total pagado del extracto**: total de sus facturas (sin las anuladas) + glosas levantadas en él − glosas liberadas en él. Así se registra el valor real pagado cuando el documento del proveedor supera lo que el sistema admite (I1, I3, I5): la factura se registra por el máximo y la diferencia, como glosa abierta en su pestaña Glosas. El formulario de la factura lo sugiere en el error del VALOR. El listado de extractos muestra el total de las facturas, el neto de las glosas y el total pagado; el reporte, en pantalla y en Excel o PDF, también.
- **Ciclo**: abierta, se edita y se elimina (lógico); liberada, solo se consulta. Una factura anulada no admite glosas nuevas ni cambios; sus abiertas se liberan o se eliminan.
- **No bloquea** aprobar, anular ni eliminar la factura.
- **Bloqueo**: la factura (`FACTURA`, ADR-0027). Desde la 0125 la glosa no referencia extractos registrados, así que no los bloquea.
- **Permisos**: verlas, con ver facturas (115); levantar, editar, liberar y eliminar, con el 123 "Gestionar glosas".
- **Reporte del extracto**: lista y suma las glosas levantadas y las liberadas en él, con su campo y si es glosa o nota crédito; las resume por campo (levantadas, liberadas y neto), y da el total pagado. Las glosas no impiden eliminar un extracto registrado: conservan su texto, como las facturas.

## Descartado

- Que la glosa bloquee la aprobación: el usuario pidió que no.
- Glosa sin valor (como el seguimiento, DEC-076): el usuario pidió que lleve valor, como en WebPAC.
- Registrar la factura por el máximo y crear la glosa de la diferencia en un solo paso desde el formulario (2026-10-27): el usuario prefirió la glosa manual en la pestaña Glosas.
- Que solo las levantadas sumen al total pagado: las liberadas restan, para que el extracto en que se libera compense lo pagado de más antes.

## Qué implica

- Un nuevo acto que borre o cambie un extracto revisa sus glosas además de sus facturas.

## Dónde

Migraciones `0120_create_invoice_glosses.sql`, `0125_invoice_gloss_statement_text.sql` y `0126_invoice_gloss_field.sql` · `server/src/modules/billing/invoices/glossFields.js` (campos por tipo) · `server/src/modules/billing/invoices/invoiceGlosses.service.js`, `invoices.routes.js` (`list_invoice_glosses`, `create_invoice_gloss`, `update_invoice_gloss`, `release_invoice_gloss`, `delete_invoice_gloss`), `invoices.validation.js` · `billing/statements/statements.service.js` (reporte, listado y total pagado) · Cliente: `views/billing/invoices/components/InvoiceGlossesTab.jsx`, `AdvanceAmountsSection.jsx` (sugerencia en el error del VALOR), `InvoiceDetailPage.jsx`, `views/billing/statements/StatementsPage.jsx`, `components/StatementReportDialog.jsx` · Tests: `invoiceGlosses.service.test.js`, `statements.service.test.js`.
