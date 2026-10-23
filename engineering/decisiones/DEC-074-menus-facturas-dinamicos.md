# DEC-074 — Menús de facturas dinámicos: uno por tipo de proveedor, con un solo permiso de ver

**Fecha:** 2026-10-23 · **Tipo:** Obligatoria · **ADR:** [0022](../adr/0022-facturacion-subcontratista.md), [0020](../adr/0020-facturacion.md), [0010](../adr/0010-tipos-proveedor.md), [0014](../adr/0014-autorizacion-permisos.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-23. Reemplaza lo que [DEC-054](DEC-054-vistas-facturas-simple-sin-obra.md), [DEC-056](DEC-056-menu-facturas-tipo-proveedor.md) y [DEC-066](DEC-066-tipo-proveedor-por-obra-y-contrato.md) decían de los **menús de facturas**: las tres vistas fijas (`SIMPLE`, `MAJOR`, `SUBCONTRACTOR`), sus permisos 105 a 107, sus páginas 21 a 23, el menú del tipo de proveedor (`pvt_invoice_view`), la vista guardada en la factura (`inv_view`) y el menú guardado en el contrato (`ctr_invoice_view`). De DEC-066 siguen vigentes los tipos por obra (`tbl_work_provider_types`) y el tipo del contrato (`tbl_contracts.pvt_id`).

## Contexto

- El menú de facturas del tipo de proveedor era una lista cerrada en el código. Agregar un menú (por ejemplo, "Orden de servicio") exigía una migración, un permiso, una página y código nuevo.
- El usuario pidió que el menú "Facturas" sea dinámico: cada tipo de proveedor decide con una casilla si aparece en él, y la ruta y el listado salen del tipo.
- Las pantallas del sistema que se migra muestran solo **dos formas de facturar**: la simple (sin contrato) y la de contrato. Contrato mayor y Subcontratista son la misma pantalla con otro título.

## Decisión

- **Tipo de proveedor** (migración `0109`):
  - `pvt_invoice_mode`: forma de facturar. `SIMPLE` (la factura simple: sin contrato, en una etapa de la obra) o `CONTRACT` (anticipo, normal, liquidación y devolución de retenido contra un contrato firmado bajo el tipo). `NULL`: el tipo no factura. `CHECK` de dominio.
  - `pvt_invoice_menu`: casilla "Va al menú de facturas". Exige forma (`CHECK`, y 400 en el service con mensaje).
  - Datos: `MAJOR` y `SUBCONTRACTOR` pasan a `CONTRACT`, `SIMPLE` a `SIMPLE`; los que tenían menú quedan con la casilla. Se retira `pvt_invoice_view`.
  - **La forma no cambia** mientras el tipo tenga contratos o facturas, también eliminados o anulados (409, `beforeUpdate` del maestro, con el tipo bloqueado). Para otra forma se crea otro tipo.
- **Menú lateral:** dentro del grupo "Facturas" (página 18), una entrada por tipo **activo** con la casilla, por nombre. Las arma `app.service.js` (`listInvoiceMenus`); no son páginas. Sin el permiso de ver facturas o sin ninguna entrada, el grupo no se muestra. Las páginas 21 a 23 se retiran; quien tenía alguna conserva la 18.
- **Desmarcar la casilla** solo oculta la entrada. Las facturas siguen existiendo, en los expedientes del contrato, el proveedor y la obra, y en su dirección.
- **Rutas:** una sola familia, con el tipo como parámetro: `/billing/invoices/:pvtId` (listado), `/new`, `/:invId` y `/:invId/edit`. El nombre y la forma del menú se leen con `get_invoice_menu` (también de un menú oculto); la pantalla se arma con la forma.
- **La factura guarda el tipo de su menú** (`tbl_invoices.pvt_id`, reemplaza a `inv_view`):
  - De contrato: el tipo bajo el que se firmó su contrato. La FK a `tbl_contracts` pasa a `(ctr_id, wrk_id, prv_id, pvt_id)`: no puede contradecirlo.
  - Simple: un tipo de forma `SIMPLE` de la asignación del proveedor a la obra, el del menú desde el que se registra. Sin menú (expediente del proveedor o de la obra), el único que tenga; con varios, 400 para registrarla desde un menú.
  - FK `(wrk_id, prv_id, pvt_id)` → `tbl_work_provider_types` y `pvt_id` → `tbl_provider_types`.
  - El listado de un menú filtra por `pvt_id`; las pestañas, los filtros y los conteos, dentro de él.
- **Contrato:** se retira `ctr_invoice_view`. Se firma bajo un tipo de forma `CONTRACT` (400 si no) y admite facturas si su tipo factura con contrato; como la forma no cambia con contratos, equivale a haberla guardado.
- **Un solo permiso de ver:** 115 "Ver facturas" (grupo 18) reemplaza a 105, 106 y 107, sin reutilizar sus números. Toda ruta de facturas lo exige, también las acciones. Migración: el perfil que tenía alguno recibe el 115; la excepción de usuario se calcula para que vea facturas si y solo si antes veía alguna vista (DEC-067).
- **Bloqueo:** registrar una simple bloquea obra → proveedor → su tipo (o, sin menú, los tipos simples de la asignación): su forma no cambia en medio. Quitar un tipo de una asignación con facturas de su menú responde 409 (la FK es la garantía).
- **Patrón de maestro:** `defineMaster` admite campos `boolean` (una casilla: true o false, sin valor false) y `assertValues`, una regla entre campos al crear y al editar.
- **Tablero:** pendientes de aprobar por menú (`pendingByMenu`: tipo, nombre y cantidad); el resto de las cifras de facturas, de todos los menús. "Ver todas" en las últimas facturas solo aparece con un único menú: no hay un listado de todas juntas.
- **Expedientes:** la pestaña Facturas de la obra y del proveedor muestra el menú de cada factura y registra una simple en un menú de forma simple (con varios, se elige en cuál, `select_invoice_menus`). La del contrato registra en el menú de su tipo, aunque esté oculto.
- **Sidebar:** se vuelve a pedir cuando cambia un tipo de proveedor (evento `refresh-provider-types`), y las migas de pan de Facturas siguen sus entradas.

## Descartado

- **Un permiso por tipo, creado al marcar la casilla:** el usuario eligió un solo permiso para todos los menús; el catálogo de permisos sigue fijo en el código.
- **Una pantalla por tipo:** las del sistema que se migra son dos; un tipo nuevo elige una de las dos formas.
- **Prohibir desmarcar la casilla con facturas:** el usuario eligió que solo se oculte el menú.
- **Seguir guardando el menú en el contrato (`ctr_invoice_view`):** con la forma inmutable mientras haya contratos, sería una copia del tipo.
- **Orden manual de las entradas:** por nombre; un orden propio queda para cuando se pida.

## Qué implica

- Ningún código escribe un menú de facturas fijo: los menús son los tipos de proveedor (`invoiceMenus.js`).
- Toda factura nueva lleva `pvt_id`; una de contrato, el de su contrato; una simple, uno de los tipos simples de su asignación.
- Un endpoint nuevo de facturas exige `billing.invoices.view` y filtra por `pvt_id` si es de un menú, más `invoiceScopeWhere`.
- Un tipo de proveedor nuevo, también desde scripts, define su forma de facturar si sus proveedores van a facturar, y la casilla si debe verse en el menú.
- Desplegar: aplicar `0109`, `schema.prisma` versionado y `yarn db:seed`. El último `SELECT` lista las asignaciones con facturas simples y más de un tipo simple, para revisarlas; el anterior, los contratos sin menú que ahora admiten facturas.

## Dónde

`database/migrations/0109_dynamic_invoice_menus.sql` · `server/src/modules/billing/invoices/invoiceMenus.js`, `invoices.service.js`, `.controller.js`, `.routes.js`, `.validation.js`, `invoiceEvidence.service.js` · `admin/providerTypes/providerTypes.service.js` · `common/services/master.service.js`, `common/utils/masterValidation.utils.js` · `app/general/app.service.js` · `app/dashboard/dashboard.service.js`, `workDashboard.service.js` · `work/contracts/contracts.service.js`, `contracts.controller.js`, `contractReports.service.js` · `work/providers/providers.service.js` · `common/constants/permissions.constants.js`, `uniqueConstraints.constants.js` · `server/prisma/schema.prisma`, `seed.js`, `seed.volume.js`, `invariants.check.js` · Cliente: `routes/MainRoutes.jsx`, `layout/MainLayout/MenuList/index.jsx` (se vuelve a pedir con `refresh-provider-types` y fija las migas de pan), `menu-items/billing.js` (`setBillingMenus`), `hooks/useInvoiceMenus.js`, `utils/constants.js` (`INVOICE_MODES`, `invoicePath(pvtId, …)`), `views/billing/invoices/` (`InvoicesPage`, `InvoiceFormPage`, `InvoiceDetailPage`, `InvoicesTab`, `ContractInvoicesTab`, `NewSimpleInvoiceButton`), `views/admin/providerTypes/ProviderTypePage.jsx`, los expedientes de contrato, proveedor y obra y el tablero · Tests: `invoiceMenus.test.js`, `invoices.service.test.js`, `providerTypes.service.test.js`, `providers.service.test.js`, `contracts.service.test.js`, `contractReports.service.test.js`, `contractSummaryReport.test.js`, `dashboard.service.test.js`, `workDashboard.service.test.js`, `app.service.test.js`.
