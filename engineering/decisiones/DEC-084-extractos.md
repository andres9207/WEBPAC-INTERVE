# DEC-084 — Extractos de la obra: el acta de WebPAC como registro

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-26 ("como acta del WebPAC"), a partir del documento de alcance de Intervé (punto 7, "Control de Extractos"). **Revisada el 2026-10-27** por pedido del usuario: en la factura el extracto es un campo abierto, no un selector, y se agrupa después (migración 0124). El mismo día, la pantalla Extractos pasó a ser **de solo lectura**: agrupa las facturas por su texto, sin crear extractos ("por el momento solo necesito visualizar").

## Contexto

- El extracto era un texto libre del encabezado de la factura (`inv_statement`): dos facturas del mismo extracto podían escribirlo distinto, y no había forma de totalizar un extracto.
- En WebPAC el extracto es el acta (`tblcontrolactas`): un registro por obra con número, fecha, número de comunicado y descripción. Sus columnas de valor, anticipo y amortización son del fondo rotatorio y de la fiducia, fuera del alcance.

## Decisión

- **`tbl_statements`**: extracto de la obra, con número único en la obra entre no eliminados (columna generada + `UNIQUE`), fecha, comunicado y descripción; autoría, eliminación lógica e idempotencia. Sin valor, anticipo ni amortización.
- **La factura escribe su extracto como texto libre** (`tbl_invoices.inv_statement`, hasta 20 caracteres como `stm_number`; desde la migración 0124). No se valida contra los extractos ni se bloquea ninguno al guardar. Sigue siendo editable tras aprobar (DEC-080, `NOTE_COLUMNS`).
- **El extracto agrupa por su número**: sus facturas son las no eliminadas de su obra cuyo texto es su número, con la intercalación de la columna (sin distinguir mayúsculas ni tildes), escritas antes o después de crear el extracto. El listado cuenta así sus facturas, y el detalle de la factura muestra la fecha del extracto si ya existe.
- **Datos**: la 0119 convirtió cada texto distinto de una obra en un extracto; la 0124 devolvió a cada factura el número de su extracto como texto y quitó `stm_id` con su FK.
- **Bloqueo**: entidad `EXTRACTO` en `LOCK_ORDER`, después de `FACTURA` (ADR-0027). Eliminar un extracto lo bloquea; ni las facturas ni las glosas lo impiden: conservan su texto (las glosas, desde la 0125, DEC-085). Cambiar el número de un extracto cambia qué facturas y glosas agrupa.
- **Pantalla "Extractos"** (página 21, grupo Inicio), de solo lectura: un renglón por obra y texto escrito en las facturas (`pagination_statement_groups`), con cuántas facturas lo usan, las aprobadas, las aprobadas sin comprobante, la primera y la última fecha, el total sin las anuladas, el neto de sus glosas y el total pagado (DEC-085). Con una obra elegida, los de esa obra; con "Ver todo", todos. Ver con el permiso 118 y exportar el reporte con el 122. Los permisos 119 a 121 (crear, modificar y cambiar estado, eliminar) y las rutas del extracto registrado siguen en el servidor, sin pantalla. Quien tenía la página de Facturas recibió la de Extractos. El selector de extractos solo exige sesión y está limitado a la obra del alcance (DEC-018); las glosas ya no lo usan.
- **Filtros del listado** (2026-10-29, pedido del usuario; botón Filtros, DEC-048): rango de número (desde y hasta, comparado como se ordena: natural, "9" antes que "10", sin mayúsculas ni tildes), rango de fechas (extractos con alguna factura en el rango, que se muestran completos), comprobante (con aprobadas sin comprobante de egreso, o ninguna), glosas (con glosas levantadas en él, o sin ninguna) y, con "Ver todo", la obra. Se filtran en el servidor sobre los grupos, antes de ordenar y paginar, con una agrupación por filtro (`statementFilters.js`, `statementsWithGlosses`).
- **Reporte del extracto** (`get_statement_group_report`, `export_statement_group`, por obra y texto): sus facturas con **todos sus importes**, una columna por importe que alguna factura del extracto tenga (valor, anticipo, devolución de retenido, utilidad, Dcto AI, IVA, retenciones en la fuente, de IVA y de ICA, amortización, retenido, descuento de materiales, flete, pronto pago y total; `statementAmounts.js`) y una fila final con la **suma de cada columna** (sin las anuladas), para cotejar el extracto que envía el constructor (pedido del usuario, 2026-10-27); los totales por menú (tipo de proveedor: mayores, subcontratistas, órdenes de servicio, simples) y en total, y el **chequeo de comprobantes de egreso**: las aprobadas sin número de comprobante. Las anuladas se listan y no suman (DEC-052). En pantalla y en Excel o PDF (DEC-070).

## Descartado

- Un selector de extractos en la factura (2026-10-26 a 2026-10-27): obligaba a crear el extracto antes de facturar. El usuario pidió un campo abierto.
- Solo texto, sin extractos registrados: se perdían la fecha y el comunicado del acta y la regla de las glosas ("liberar en un extracto posterior", DEC-085).
- Llevar al extracto el valor pagado, el anticipo y la amortización del acta de WebPAC: son del fondo rotatorio y de la fiducia, excluidos del alcance. "Total pagado por acta" queda con ellos.

## Pendiente

- Un extracto con glosas y sin facturas no aparece en la pantalla, que agrupa por las facturas. Desde la migración 0127 una glosa se libera con una factura con extracto (DEC-085), así que el extracto de una liberación siempre tiene facturas; solo queda el caso de un extracto escrito en una glosa que ninguna factura usa.

## Qué implica

- Una consulta o un reporte que muestre el extracto de una factura lee `inv_statement`. Las facturas de un extracto se buscan por obra y texto (`statementInvoices`), nunca por id.
- Una tabla nueva que referencie al extracto registrado lo bloquea después de la factura. Las glosas lo escriben como texto (DEC-085).

## Dónde

Migraciones `0119_create_statements.sql` y `0124_invoice_statement_text.sql` · `server/src/modules/billing/statements/` (service, rutas, validación, controller; `invoiceCounts`) · `billing/invoices/invoices.service.js` (`statementInvoices`), `invoiceTerms.js` (`NOTE_COLUMNS`) · `common/services/transaction.service.js` (`EXTRACTO`) · Cliente: `views/billing/statements/`, `api/requests/statementsApi.js`, el campo Extracto de `InvoiceFormPage.jsx` · Tests: `statements.service.test.js`, `invoices.service.test.js`.
