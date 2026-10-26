# DEC-084 — Extractos de la obra: el acta de WebPAC como registro

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-26 ("como acta del WebPAC"), a partir del documento de alcance de Intervé (punto 7, "Control de Extractos").

## Contexto

- El extracto era un texto libre del encabezado de la factura (`inv_statement`): dos facturas del mismo extracto podían escribirlo distinto, y no había forma de totalizar un extracto.
- En WebPAC el extracto es el acta (`tblcontrolactas`): un registro por obra con número, fecha, número de comunicado y descripción. Sus columnas de valor, anticipo y amortización son del fondo rotatorio y de la fiducia, fuera del alcance.

## Decisión

- **`tbl_statements`**: extracto de la obra, con número único en la obra entre no eliminados (columna generada + `UNIQUE`), fecha, comunicado y descripción; autoría, eliminación lógica e idempotencia. Sin valor, anticipo ni amortización.
- **La factura apunta a su extracto** (`tbl_invoices.stm_id`) con FK compuesta `(stm_id, wrk_id)`: el extracto es de la obra de la factura. Sigue siendo editable tras aprobar (DEC-080, `NOTE_COLUMNS`). Un extracto inactivo no se asigna de nuevo; el que ya tenía la factura se conserva.
- **Datos**: cada texto distinto de una obra pasó a ser un extracto, con la fecha de su primera factura (migración 0119), y `inv_statement` se eliminó.
- **Bloqueo**: entidad `EXTRACTO` en `LOCK_ORDER`, después de `FACTURA` (ADR-0027). Asignar un extracto lo bloquea en la transacción de la factura; eliminarlo lo bloquea y responde 409 si alguna factura lo usa.
- **Pantalla "Extractos"** (página 21, grupo Inicio) con permisos 118 a 122 (ver, crear, modificar y cambiar estado, eliminar, exportar). Quien tenía la página de Facturas recibió la de Extractos. El selector del formulario de factura solo exige sesión y está limitado a la obra del alcance (DEC-018).
- **Reporte del extracto**: sus facturas, los totales por menú (tipo de proveedor: mayores, subcontratistas, órdenes de servicio, simples) y en total, y el **chequeo de comprobantes de egreso**: las aprobadas sin número de comprobante. Las anuladas se listan y no suman (DEC-052). En pantalla y en Excel o PDF (DEC-070).

## Descartado

- Dejar el extracto como texto y agrupar por él: el usuario eligió el modelo del acta.
- Llevar al extracto el valor pagado, el anticipo y la amortización del acta de WebPAC: son del fondo rotatorio y de la fiducia, excluidos del alcance. "Total pagado por acta" queda con ellos.

## Qué implica

- Una consulta o un reporte que muestre el extracto de una factura lo lee por la relación (`tbl_statements.stm_number`), nunca de un texto.
- Una tabla nueva que referencie al extracto (las glosas) lo bloquea después de la factura.

## Dónde

Migración `0119_create_statements.sql` · `server/src/modules/billing/statements/` (service, rutas, validación, controller) · `billing/invoices/invoices.service.js` (`assertStatement`, `statementLock`, `statementInvoices`), `invoiceTerms.js` (`NOTE_COLUMNS`) · `common/services/transaction.service.js` (`EXTRACTO`) · Cliente: `views/billing/statements/`, `api/requests/statementsApi.js`, el selector de `InvoiceFormPage.jsx` · Tests: `statements.service.test.js`, `invoices.service.test.js`.
