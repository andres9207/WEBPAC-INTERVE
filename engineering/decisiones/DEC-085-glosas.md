# DEC-085 — Glosas de facturas, liberadas con la factura que las corrige

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

> **Ampliada por [DEC-092](DEC-092-glosa-valor-campo-porcentaje.md) (2026-10-28):** el diálogo muestra el importe del campo en la factura y el valor se escribe en pesos o en % de ese importe.
>
> **Revisada el 2026-10-28** (migración 0127), con los ejemplos de Lucero Bernal en la reunión del 2026-10-27 (`docs/reuniones/`): la glosa **se libera con la factura que la corrige**, no con un extracto escrito, y al levantarla se dice **si suma al total** del extracto. Ver "Liberación con una factura".

Decidido por el usuario el 2026-10-26, a partir del documento de alcance de Intervé (punto 6: "generación de glosas, errores hallados durante el registro de facturas recibidas, que se deben poder controlar hasta su liberación en un extracto posterior"). Ningún ADR trataba las glosas. **Revisada el 2026-10-27** por pedido del usuario: la glosa registra lo pagado por encima de lo que la factura admite y suma al total pagado del extracto; el extracto de la glosa es texto, como el de la factura (migración 0125).

## Contexto

- En WebPAC la glosa (`tblglosas`) es de la obra y del acta en que se levanta, con código, valor con signo y descripción.
- El usuario decidió: la glosa **lleva valor** y **no bloquea** la aprobación de la factura.

## Decisión

- **`tbl_invoice_glosses`**: de una factura y de su obra (FK compuesta `(inv_id, wrk_id)`, con `uq_invoices_id_work`). Código opcional, valor distinto de cero y con signo (`CHECK`), descripción.
- **Campo de la factura** (2026-10-27, migración 0126): toda glosa dice sobre qué campo es, obligatorio (`igl_field`). Los que admite son los del panel Detalle de su tipo de factura, sin sumas ni totales (SUBTOTAL, VALOR + IVA), más "Otro": normal y liquidación, VALOR, IVA, RTE FUENTE, RTE IVA, RTE ICA, AMORTIZACIÓN, RETENIDO y DCTO MATERIALES; simple, VALOR, RTE FUENTE, DCTO AI, IVA, RTE IVA, RTE ICA, FLETE y DCTO PRONTO PAGO; anticipo, ANTICIPO; devolución de retenido, VALOR. El catálogo vive en `glossFields.js`; la BD cierra el dominio con un `CHECK` y un test los cruza. El service valida el campo contra el tipo de la factura bloqueada (400). Las glosas anteriores quedaron como "Otro".
- **Nota crédito**: una glosa negativa es una nota crédito, lo que el proveedor devuelve. Se deriva del signo, sin columna: resta del total pagado como cualquier valor negativo. La pestaña Glosas y el reporte la muestran así.
- **Extracto en que se levanta** (DEC-084): texto de hasta 20 caracteres, como el de la factura (`igl_statement`, migración 0125; opcional, el formulario propone el de la factura), agrupado con las facturas de la misma obra y texto.
- **Liberación con una factura** (migración 0127): se elige la factura donde se libera la glosa (`igl_release_inv_id`), de **cualquier tipo**, **del mismo proveedor** y de la misma obra (FK compuesta `(igl_release_inv_id, wrk_id)`; el proveedor, en el service), de cualquiera de sus contratos, otra que la de la glosa (`CHECK`) y no anulada. **Su extracto no se valida** (2026-10-28, pedido del usuario): sirve una factura de cualquier extracto, también del mismo en que se levantó la glosa, o sin extracto. El extracto de la liberación es el de esa factura, leído de ella (no se copia): la glosa aparece en ese extracto junto a la factura, y si la factura no tiene extracto, en ninguno hasta que se le escriba. En el diálogo hay un solo campo, "Factura donde se libera"; el selector (`select_gloss_release_invoices`, con gestionar glosas) muestra cada factura con su tipo, su contrato y su extracto, y busca por número y extracto. Con observación; la fecha es la del servidor. Bloquea las dos facturas, en orden de id. Las glosas liberadas con un extracto escrito se reabrieron (datos de prueba, decidido por el usuario).
- **Una factura que libera glosas** no se anula ni se elimina (409), y una factura enlazada a glosas liberadas no cambia de proveedor (409).
- **Suma al total** (`igl_affects_total`, por defecto sí): al levantarla se dice si lo pagado difiere de lo registrado (el IVA de 80 cuando el sistema calcula 76: suma) o si es un pendiente que llegará en otra factura (se pagaron 10 de 100 y llega después la factura de 90: no suma).
- **Total pagado del extracto**: total de sus facturas (sin las anuladas) + glosas levantadas en él que suman al total. **Las liberadas no restan**: las libera una factura del extracto, que ya cuenta en su total. Así se registra el valor real pagado cuando el documento del proveedor supera lo que el sistema admite (I1, I3, I5): la factura se registra por el máximo y la diferencia, como glosa abierta en su pestaña Glosas. El formulario de la factura lo sugiere en el error del VALOR. El listado de extractos muestra el total de las facturas, lo que suman las glosas y el total pagado; el reporte, en pantalla y en Excel o PDF, también.
- **Ciclo**: abierta, se edita y se elimina (lógico); liberada, solo se consulta. Una factura anulada no admite glosas nuevas ni cambios; sus abiertas se liberan o se eliminan.
- **No bloquea** aprobar, anular ni eliminar la factura.
- **Bloqueo**: la factura (`FACTURA`, ADR-0027). Desde la 0125 la glosa no referencia extractos registrados, así que no los bloquea.
- **Permisos**: verlas, con ver facturas (115); levantar, editar, liberar y eliminar, con el 123 "Gestionar glosas".
- **Reporte del extracto**: lista y suma las glosas levantadas en él y las que liberó una factura suya, con su campo, si es glosa o nota crédito, si suma al total, dónde, cuándo y quién la levantó, y con qué factura, en qué extracto, cuándo y quién la liberó (2026-10-28); las resume por campo (levantadas, liberadas y lo que suma al total), y da el total pagado. Las glosas no impiden eliminar un extracto registrado: conservan su texto, como las facturas.

## Descartado

- Que la glosa bloquee la aprobación: el usuario pidió que no.
- Glosa sin valor (como el seguimiento, DEC-076): el usuario pidió que lleve valor, como en WebPAC.
- Registrar la factura por el máximo y crear la glosa de la diferencia en un solo paso desde el formulario (2026-10-27): el usuario prefirió la glosa manual en la pestaña Glosas.
- Que la liberada reste del total del extracto en que se libera (2026-10-27 a 2026-10-28): con la liberación por factura, esa factura ya trae la corrección y se contaría dos veces.
- Liberar escribiendo el extracto (2026-10-27 a 2026-10-28): el usuario pidió ligar la liberación a la factura, para ver en el extracto la factura con la que se liberó.
- Exigir que la factura que libera tenga extracto y que sea otro que el de la glosa, eligiendo primero el extracto (2026-10-28): al usuario le confundía; solo importa la factura.
- Que toda glosa sume al total: en el ejemplo de Lucero de un pago de menos (10 de 100, y la factura de 90 en el extracto siguiente) el constructor pagó lo facturado, y la glosa es un pendiente.

## Pendiente

- **Nota crédito como factura**: hoy toda factura es mayor que cero, así que una NC-… o un "anticipo mayor valor pagado" (fila 13 del Reembolsable 191) todavía no se registran para liberar con ellos. Aprobado en general por el usuario el 2026-10-28; falta la propuesta (tipo de factura, signo, efecto en I5, amortización y retenido).
- **Valor Total del extracto**: aprobado el 2026-10-28 mostrar el Valor Total (valor + IVA − amortización, contra el que se concilia el extracto del constructor) junto al Valor Pagado (el total de hoy), y que las glosas lo ajusten.
- Código de la glosa propuesto como `<extracto>-<n>` (18-1) y una lista de las glosas abiertas de la obra.

## Qué implica

- Un nuevo acto que borre o cambie un extracto revisa sus glosas además de sus facturas.
- Un nuevo acto que anule, elimine o cambie el proveedor de una factura revisa las glosas que libera.

## Dónde

Migraciones `0120_create_invoice_glosses.sql`, `0125_invoice_gloss_statement_text.sql`, `0126_invoice_gloss_field.sql` y `0127_invoice_gloss_release_invoice.sql` · `server/src/modules/billing/invoices/glossFields.js` (campos por tipo) · `server/src/modules/billing/invoices/invoiceGlosses.service.js`, `invoices.routes.js` (`list_invoice_glosses`, `create_invoice_gloss`, `update_invoice_gloss`, `release_invoice_gloss`, `select_gloss_release_invoices`, `delete_invoice_gloss`), `invoices.service.js` (`assertReleasesNoGlosses`, `assertNoReleasedGlossLinks`), `invoices.validation.js` · `billing/statements/statements.service.js` (reporte, listado y total pagado) · Cliente: `views/billing/invoices/components/InvoiceGlossesTab.jsx`, `AdvanceAmountsSection.jsx` (sugerencia en el error del VALOR), `InvoiceDetailPage.jsx`, `views/billing/statements/StatementsPage.jsx`, `components/StatementReportDialog.jsx` · Tests: `invoiceGlosses.service.test.js`, `statements.service.test.js`.
