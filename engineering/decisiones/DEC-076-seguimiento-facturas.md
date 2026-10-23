# DEC-076 — Seguimiento manual de facturas

**Fecha:** 2026-10-23 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md)

## Contexto

El usuario pidió poder anotar qué se está trabajando sobre una factura concreta: abrir un seguimiento con una fecha y una descripción, y cerrarlo con una observación. No es un estado de la factura ni cambia sus importes o saldos: es un registro de trabajo.

## Decisión

- **Tabla propia** `tbl_invoice_follow_ups` (migración `0112`, prefijo `ifu_`), hija de la factura. Cada fila tiene la fecha de apertura, la descripción y, al cerrar, la fecha, la observación y quién cerró.
- **Varios por factura, como máximo uno abierto.** Lo verifica el service bajo el bloqueo de la factura y lo garantiza la BD: `UNIQUE uq_invoice_follow_ups_open` sobre la columna generada `ifu_open_invoice`, como la suspensión abierta (I9).
- **Fechas:**
  - La de apertura la escribe el usuario y no puede ser futura.
  - La de cierre es la del servidor, el día en que se cierra. No se acepta del cliente.
- **Mientras está abierto se edita y se elimina.** Eliminar es lógico (`sta_id` 3, con autor y fecha). Cerrado, solo se consulta (409).
- **Factura anulada:** no admite seguimientos nuevos ni ediciones. El que quedó abierto se puede cerrar o eliminar. La factura eliminada no muestra los suyos (404).
- **Permisos:**
  - Verlo exige ver facturas (115).
  - Abrir, editar, cerrar y eliminar exigen además **116, "Gestionar seguimiento de facturas"** (migración `0113`).
  - Todo, en el alcance por obra (DEC-047, 404 fuera).
- **Bitácora:** cada acto, en la entidad `SEGUIMIENTO_FACTURA`, en la misma transacción. Abrir es idempotente por clave (ADR-0027).
- **Pantalla:**
  - Pestaña **Seguimiento** en el detalle de la factura, con la lista y los actos.
  - El listado de facturas marca con un icono las que tienen un seguimiento abierto (`hasOpenFollowUp`).
- **Tableros** (2026-10-23, pedido del usuario). `openFollowUpsSummary` da los seguimientos abiertos del alcance: el total y hasta 100 filas, del más antiguo al más reciente, cada uno con su factura y los días que lleva abierto. Los días los calcula el servidor (FRONTEND_STANDARD, regla 9). Se ven con el permiso de ver facturas.
  - General ([DEC-052](DEC-052-tablero.md)): tarjeta "Seguimientos abiertos".
  - De la obra ([DEC-063](DEC-063-tablero-obra.md)): un aviso en "Por atender en la obra", que suma a su cifra.
  - El clic abre el detalle con cada factura (`DrillDownDialog`). Cada fila abre la factura encima del tablero, y al cambiar un seguimiento el tablero se recarga.

## Descartado

- **Un solo seguimiento por factura:** no deja registrar trabajo posterior.
- **Varios abiertos a la vez:** el usuario eligió uno abierto.
- **Fecha de cierre escrita por el usuario:** el usuario eligió la del servidor.
- **Usar el permiso de modificar factura:** el seguimiento no cambia la factura, así que tiene permiso propio.
- **Un estado nuevo de la factura:** el seguimiento no es parte de su ciclo de vida ni bloquea ningún acto.

## Qué implica

- Un seguimiento no cambia la factura ni sus saldos: no se toma el bloqueo del contrato, solo el de la factura.
- Quien agregue otro registro de trabajo a una entidad puede seguir este mismo patrón: tabla hija, uno abierto por `UNIQUE` sobre columna generada, cierre con fecha del servidor.

## Dónde

- BD y esquema: `database/migrations/0112_create_invoice_follow_ups.sql`, `0113_seed_invoice_follow_ups_permission.sql` y `server/prisma/schema.prisma`.
- Servidor:
  - `server/src/modules/billing/invoices/invoiceFollowUps.service.js`.
  - `invoices.{controller,routes,validation}.js`: `list_invoice_follow_ups`, `open_`, `update_`, `close_` y `delete_invoice_follow_up`.
  - `invoices.service.js`: `hasOpenFollowUp` del listado.
- Tableros: `server/src/modules/app/dashboard/dashboard.service.js` y `workDashboard.service.js` (`invoices.followUps`).
- Cliente:
  - `client/src/views/billing/invoices/components/InvoiceFollowUpsTab.jsx`, `InvoiceDetailPage.jsx` e `InvoicesPage.jsx`.
  - En `client/src/views/dashboard/Default/`: `GeneralDashboard.jsx`, `work/WorkSummaryTab.jsx` y `work/DrillDownDialog.jsx` (`followUpsDrill`).
- Tests: `invoiceFollowUps.service.test.js`, `invoices.controller.test.js` ("seguimiento (DEC-076)"), `dashboard.service.test.js` y `workDashboard.service.test.js` ("seguimientos abiertos").
