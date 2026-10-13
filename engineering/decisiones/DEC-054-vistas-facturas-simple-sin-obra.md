# DEC-054 — Facturas en tres vistas con su permiso; la factura simple es del proveedor, sin obra

**Fecha:** 2026-10-13 · **Tipo:** Obligatoria · **ADR:** [0020](../adr/0020-facturacion.md), [0022](../adr/0022-facturacion-subcontratista.md), [0023](../adr/0023-facturacion-simple.md), [0014](../adr/0014-autorizacion-permisos.md)

Decidido por el usuario el 2026-10-13. Reemplaza lo que [DEC-042](DEC-042-facturas-area-ciclo-vida.md) decía de la factura simple (etapa obligatoria, proveedor asignado a la obra, bloqueo obra → proveedor) y su permiso de ver (83). Extiende el alcance por obra de [DEC-047](DEC-047-alcance-por-obra.md) a la simple. Resuelve la decisión 3 de ADR-0023 (no hay facturas simples con obra) y la hipótesis H7 de ADR-0022 ("mayor" es una clase del contrato).

## Contexto

- Las facturas simples no tienen obra: son gastos del proveedor sin contrato. La fase A les exigía obra, etapa y un proveedor asignado.
- El usuario quiere consultar las facturas en tres menús separados: simples, de contrato mayor y de subcontratistas, cada uno con su acceso.
- Deducir "contrato mayor" o "subcontratista" de los tipos del proveedor no sirve: un proveedor puede tener varios ([DEC-041](DEC-041-varios-tipos-proveedor.md)), sus nombres son libres, y si cambian, sus facturas cambiarían de menú.

## Decisión

- **La factura simple es del proveedor:** sin obra, etapa ni contrato. Un `CHECK` (`ck_invoices_type_links`, migración `0089`) exige `wrk_id` y `ctr_id` nulos en la simple y presentes en las de contrato.
  - Se retiran `tbl_invoices.wks_id` (ninguna factura guarda etapa) y la FK `(wrk_id, prv_id)` → `tbl_work_providers`: en las de contrato ya la garantiza la FK al contrato.
  - El proveedor debe existir y estar activo (salvo el que ya tenía) y estar asignado a una obra del alcance.
  - Bloqueo: proveedor → factura. Si una registrada cambia de proveedor, se bloquean los dos.
  - Las simples de prueba que había se borraron en `0089`.
- **Alcance de la simple** (DEC-047): se ve en las obras a las que su proveedor está asignado, como el proveedor en su listado (`invoiceScopeWhere`). Si el proveedor está en varias, aparece en todas; sin ninguna, solo con "Ver todo".
- **Clase de facturación del contrato:** `tbl_contracts.ctr_billing_class`, `MAJOR` (contrato mayor) o `SUBCONTRACTOR`, con `CHECK` (migración `0090`).
  - Se elige al crear el contrato y queda en la bitácora.
  - Con facturas no cambia (409), igual que el proveedor. Se verifica bajo el bloqueo del contrato, que registrar una factura también toma.
  - Los contratos que ya existían quedaron como `MAJOR`.
- **Tres vistas, cada una con su permiso de ver** (`invoiceViews.js`):

  | Vista | Facturas | Permiso | Página |
  | --- | --- | --- | --- |
  | `SIMPLE` | La simple | 105 | 21 · `billing/invoices/simple` |
  | `MAJOR` | Las de un contrato de clase contrato mayor | 106 | 22 · `billing/invoices/major` |
  | `SUBCONTRACTOR` | Las de un contrato de clase subcontratista | 107 | 23 · `billing/invoices/subcontractors` |

  - La vista no se guarda en la factura: sale del tipo y de la clase del contrato (`viewOf`).
  - El grupo de menú 18 pasa a llamarse "Facturas"; la página 19 (todas juntas) se retira (migración `0091`).
  - El permiso 83 se retira sin reutilizar su número. Quien lo tenía (perfil o usuario) recibe los tres, y quien tenía la página 19, las tres páginas.
  - Las acciones (84 a 89 y 103) son comunes a las tres vistas y pasan al grupo 18. Operar sobre una factura exige además ver su vista.
- **En el servidor:**
  - El listado de una vista exige su permiso (`view` en la petición). Sin vista (las pestañas de los expedientes), cualquiera de los tres, y el service muestra solo las vistas que el usuario ve.
  - Detalle, editar, aprobar y anular responden **404** a una factura de una vista que el usuario no ve, como fuera del alcance (`assertInvoiceVisible`).
  - Registrar una simple sin ver las simples responde 403. Registrar contra un contrato cuya clase no se ve responde 404, y la clase se lee bajo el bloqueo del contrato.
  - `requirePermission` acepta una lista: exige cualquiera de los permisos.
- **Otros módulos:**
  - Desasignar un proveedor de una obra ya no consulta facturas: las de contrato van con su contrato, que ya lo impide.
  - Quitar una etapa tampoco consulta facturas.
  - Eliminar un proveedor con facturas responde 409, porque las simples no exigen asignación.
- **Tablero:** las facturas, solo las de las vistas que el usuario ve. Las pendientes, en total y por vista. "Facturas por obra" y las obras en seguimiento cuentan solo las de contrato, porque la simple no tiene obra.
- **Cliente:**
  - Una ruta por vista con su listado (`InvoicesPage view=…`); el detalle y el formulario reciben la vista por el contexto del Outlet. Una factura abierta desde otra vista se lleva a la suya (`invoicePath`).
  - El formulario de la simple pide solo el proveedor, buscado en el servidor (`select_invoice_providers`).
  - La simple se registra desde su menú o desde la pestaña Facturas del proveedor. La pestaña de la obra muestra solo las de contrato.
  - El formulario de contrato pide la clase de facturación.

## Descartado

- **Deducir la clase de los tipos del proveedor** (ADR-0022, decisión 2): con varios tipos es ambigua, y si los tipos cambian, las facturas cambian de menú.
- **Guardar la vista en la factura** (ADR-0022, alternativa C): sería una copia que puede contradecir al contrato.
- **Obra opcional en la simple:** el usuario confirmó que la simple nunca tiene obra.
- **Un solo permiso de ver para las tres vistas:** el usuario pidió poder dar acceso por vista.
- **Conservar la vista "todas juntas":** el usuario la reemplazó por las tres.

## Qué implica

- Un endpoint nuevo de facturas recibe las vistas del usuario (`grantedViews` sobre los permisos efectivos, en el controller) y filtra con `viewsWhere` y `invoiceScopeWhere`, nunca con `wrk_id` solo.
- Un contrato nuevo, también desde scripts (`seed.demo.js`), lleva `billingClass`.
- Desplegar: aplicar `0089`, `0090` y `0091` en orden, `npx prisma db pull` (o el `schema.prisma` versionado) y `yarn db:seed`.

## Dónde

`database/migrations/0089`–`0091` · `server/src/modules/billing/invoices/` (`invoiceViews.js`, `invoices.service.js`, controller, validación y rutas) · `contracts.service.js`, `contractTerms.js` y su validación · `providers.service.js` · `works.service.js` · `dashboard.service.js` · `requirePermission.middleware.js` · `server/prisma/seed.js` y `seed.demo.js` · `client/src/views/billing/invoices/`, `client/src/hooks/useInvoiceViews.js`, `client/src/routes/MainRoutes.jsx`, `ContractFormPage.jsx`, `ProviderDetailPage.jsx`, `WorkDetailPage.jsx`, `views/dashboard/Default/` · Tests: `invoices.service.test.js` ("vistas de facturas", "editar una simple", "alcance por obra"), `invoiceViews.test.js`, `requirePermission.middleware.test.js`, `contracts.service.test.js`, `providers.service.test.js`, `works.service.test.js` y `dashboard.service.test.js`.
