# DEC-058 — La factura simple se imputa a una etapa de la obra, con su proveedor asignado a ella

**Fecha:** 2026-10-14 · **Tipo:** Obligatoria · **ADR:** [0023](../adr/0023-facturacion-simple.md), [0020](../adr/0020-facturacion.md)

Decidido por el usuario el 2026-10-14. Reemplaza lo que [DEC-054](DEC-054-vistas-facturas-simple-sin-obra.md) decía de la factura simple (del proveedor, sin obra ni etapa, vista en las obras de su proveedor). Las tres vistas, sus permisos y la vista guardada en la factura ([DEC-056](DEC-056-menu-facturas-tipo-proveedor.md)) no cambian. Vuelve, en lo esencial, a la regla de [DEC-042](DEC-042-facturas-area-ciclo-vida.md) y resuelve otra vez la decisión 3 de ADR-0023: la simple tiene obra.

## Contexto

- DEC-054 dejó la factura simple sin obra ni etapa: un gasto del proveedor.
- El usuario indicó que la factura simple sí se asocia a la obra, sin contrato. Confirmó que la obra es obligatoria, que la etapa también y que el proveedor debe estar asignado a la obra.

## Decisión

- **La simple tiene obra y etapa, las dos obligatorias, y no tiene contrato.** El `CHECK` `ck_invoices_type_links` (migración `0094`) exige etapa y no contrato en la simple, y contrato y no etapa en las de contrato, cuya etapa es la del contrato (no se copia).
  - `tbl_invoices.wrk_id` vuelve a ser obligatorio, y vuelve `wks_id`.
  - FK `(wks_id, wrk_id)` → `tbl_work_stages`: la etapa es de la obra.
  - FK `(wrk_id, prv_id)` → `tbl_work_providers`: el proveedor está asignado a la obra. Las de contrato ya la cumplen, por la FK del contrato.
  - Las simples existentes, sin obra, eran de prueba y se borraron en `0094`.
- **Validaciones, bajo bloqueo:** la obra existe y está activa (al crear); la etapa es de la obra y está activa; el proveedor y su asignación a la obra están activos. Al editar, la etapa y el proveedor que ya tenía se aceptan aunque estén inactivos. La obra no cambia después de registrar.
- **Bloqueo:** obra → proveedor → factura. Si una simple registrada cambia de proveedor, se bloquean los dos.
- **Alcance por obra** (DEC-047): la simple se ve en su obra, como las de contrato (`invoiceScopeWhere` = `scopeWhere`). Registrar una simple en una obra fuera del alcance responde 404.
- **Otros módulos:**
  - Desasignar un proveedor con facturas simples en la obra responde 409.
  - Quitar una etapa con facturas simples responde 409; se puede desactivar.
  - Tablero: "Facturas por obra" y "Obras en seguimiento" cuentan también las simples, de las vistas que ve el usuario.
- **Selectores del formulario:** `select_invoice_works` (obras activas del alcance; con `prvId`, solo las del proveedor) y `get_invoice_form_options` (etapas y proveedores asignados de la obra, la misma consulta del formulario de contrato). Los dos exigen ver las simples (105). Se retira `select_invoice_providers`.
- **Cliente:** el formulario de la simple pide obra, luego etapa y proveedor de esa obra. Se registra desde su menú, desde la pestaña Facturas de la obra (`?wrkId=`) y desde la del proveedor (`?prvId=`, solo sus obras). Con una obra fija en el selector del encabezado, la obra es esa y no se elige (solo lectura; si está inactiva, se avisa y no se registra), como en el formulario de contrato; con "Ver todo", se elige. El listado de simples muestra la columna de obra y etapa y admite el filtro de obra con "Ver todo".

## Descartado

- **Obra opcional:** el usuario pidió que toda simple tenga obra.
- **Solo la obra, sin etapa:** el usuario pidió la etapa obligatoria.
- **Cualquier proveedor del alcance:** el usuario pidió que el proveedor esté asignado a la obra, como en los contratos.
- **Hacer fallar la migración si hay simples sin obra:** eran de prueba; el usuario eligió borrarlas.

## Qué implica

- Una factura simple nueva, también desde scripts o semillas, lleva obra, etapa de esa obra y un proveedor asignado a ella.
- Toda factura tiene obra: el alcance por obra se aplica igual a todas, con `invoiceScopeWhere`.
- Lo que quite una etapa o una asignación de proveedor cuenta también las facturas simples.
- Desplegar: aplicar `0094`, `npx prisma db pull` (o el `schema.prisma` versionado) y `npx prisma generate`.

## Dónde

`database/migrations/0094` · `server/prisma/schema.prisma` · `server/src/modules/billing/invoices/` (service, controller, validación y rutas) · `work/works/works.service.js` (`assertStagesRemovable`) · `work/providers/providers.service.js` (`unassignProviderFromWork`) · `app/dashboard/dashboard.service.js` · `client/src/views/billing/invoices/` (`InvoiceFormPage.jsx`, `InvoicesPage.jsx`, `InvoiceDetailPage.jsx`) · `client/src/api/requests/invoicesApi.js` · `WorkDetailPage.jsx` · `ProviderDetailPage.jsx` · `InvoicesByWorkCard.jsx` · Tests: `invoices.service.test.js` ("registrar", "editar una simple", "selectores del formulario", "alcance por obra"), `works.service.test.js`, `providers.service.test.js` y `dashboard.service.test.js`.
