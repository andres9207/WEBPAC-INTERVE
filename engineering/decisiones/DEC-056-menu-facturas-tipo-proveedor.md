# DEC-056 — El menú de facturas es del tipo de proveedor, y cada factura guarda el suyo

**Fecha:** 2026-10-13 · **Tipo:** Obligatoria · **ADR:** [0022](../adr/0022-facturacion-subcontratista.md), [0020](../adr/0020-facturacion.md), [0010](../adr/0010-tipos-proveedor.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-13. Reemplaza lo que [DEC-054](DEC-054-vistas-facturas-simple-sin-obra.md) decía del menú de facturas del **tipo de contrato** (`ctt_invoice_view`, su bloqueo con facturas y el de cambiar el tipo de un contrato con facturas). Las tres vistas, sus permisos, sus páginas y la factura simple sin obra siguen como dice DEC-054. Cierra la tarea PRO-BE-40 del backlog.

> **Reemplazada en parte por [DEC-066](DEC-066-tipo-proveedor-por-obra-y-contrato.md)** (2026-10-19): un proveedor puede tener tipos de menús distintos; el tipo se define en cada obra y en cada contrato, que guarda su menú (`ctr_invoice_view`), y la factura de contrato toma el de su contrato. Se retiraron `assertNotMixed`, el menú calculado del proveedor y la decisión de mover las facturas o dejarlas como histórico. Siguen vigentes el menú en el tipo de proveedor y la vista guardada en la factura.

## Contexto

- Desde [DEC-053](DEC-053-campos-contrato-por-tipo-proveedor.md), la configuración del contrato sale del tipo de proveedor. El usuario pidió que el menú de facturas (contrato mayor o subcontratistas) también salga de ahí.
- DEC-054 lo había descartado por dos razones: un proveedor puede tener varios tipos ([DEC-041](DEC-041-varios-tipos-proveedor.md)) y los tipos cambian. El usuario resolvió las dos:
  - Un proveedor **no puede** tener tipos de menús distintos.
  - Si el menú de un proveedor cambia y ya tiene facturas de contrato, se le avisa y **elige**: moverlas todas al menú nuevo o dejarlas como histórico en el que se registraron.
- "Dejarlas como histórico" exige que la factura recuerde su menú: ya no puede calcularse en cada consulta.

## Decisión

- **Menú del tipo de proveedor:** `tbl_provider_types.pvt_invoice_view`, `MAJOR`, `SUBCONTRACTOR` o `NULL` (sin menú), con `CHECK` (migración `0092`). Se edita en el maestro de tipos de proveedor. Semillas: Subcontratista → subcontratistas, Contrato mayor → contrato mayor, Simple → sin menú.
- **Menú de un proveedor:** el único menú entre los de sus tipos; los tipos sin menú no cuentan (`resolveProviderView`, `providerViewOf`).
  - Dos menús distintos: 409, al crear o editar el proveedor y al cambiar el menú de un tipo que lo deja así (`assertNotMixed`).
  - Sin ninguno: sus contratos no admiten facturas nuevas (409 al registrar). El expediente del contrato lo avisa y sigue mostrando las que tiene.
- **La factura guarda su vista:** `tbl_invoices.inv_view` (`SIMPLE`, `MAJOR` o `SUBCONTRACTOR`), `NOT NULL`, con `CHECK` de dominio y de coherencia (`SIMPLE` si y solo si la factura es simple) e índice.
  - Se fija al registrar y entra en la bitácora de creación. Editar la factura no la cambia.
  - Listados, detalle, filtros, alcance y tablero leen `inv_view` (`viewsWhere`); nada la deduce del contrato.
  - Esto adopta la alternativa C de ADR-0022, que DEC-054 había descartado: aquí la vista guardada no es una copia, es el hecho histórico de en qué menú se registró.
- **Registrar una factura de contrato** bloquea proveedor → contrato → tipos del proveedor (al final, como los maestros). Lee el menú bajo bloqueo, exige que el usuario lo vea (404 si no) y lo guarda. Si el proveedor del contrato o sus tipos cambiaron entre la lectura previa y el bloqueo, responde 409 para reintentar.
- **Cambio de menú con facturas** (`applyProviderViewChanges`): al editar los tipos de un proveedor o el menú de un tipo, si cambia el menú de algún proveedor y este tiene facturas de contrato fuera del menú nuevo:
  - Sin decisión: 409 con `data.code = INVOICE_VIEW_CHANGE`, cuántas facturas, de qué proveedores, de qué menú a cuál y si se pueden mover (`canMove`). No se guarda nada.
  - `invoiceMove: "MOVE"`: todas pasan al menú nuevo en la misma transacción, con una entrada de bitácora por factura (`inv_view`) en la operación del cambio. Si el proveedor queda sin menú, no se pueden mover (409).
  - `invoiceMove: "KEEP"`: no se tocan; las nuevas van al menú nuevo.
  - Editar un proveedor bloquea también los tipos que tenía, no solo los nuevos, para no cruzarse con el cambio del menú de uno de ellos.
- **Tipo de contrato:** se retira `ctt_invoice_view` con su `CHECK` y su regla. Un contrato con facturas **sí** puede cambiar de tipo; el proveedor sigue sin poder cambiar (409).
- **Patrón de maestro:** `defineMaster` acepta `updateOptions` (decisiones que acompañan una edición sin ser columnas, validadas contra su lista) y se las pasa a `beforeUpdate` con el `ctx`.
- **Cliente:**
  - El maestro de tipos de proveedor muestra, filtra y edita el menú ("Sin menú" es una opción). El de tipos de contrato ya no lo tiene.
  - `useInvoiceViewChange` envuelve el guardado del proveedor y del tipo de proveedor: ante el 409 muestra las facturas afectadas y ofrece **Mover todas**, **Dejarlas como histórico** o **Cancelar**, y reintenta con la decisión.
  - El expediente del contrato muestra "Menú de facturas (del proveedor)" y la ficha del proveedor, su menú.

## Descartado

- **Seguir con el tipo de contrato** (DEC-054): el usuario pidió que todo lo del contrato salga del tipo de proveedor.
- **Varios menús por proveedor, eligiendo el tipo en cada contrato:** agrega un campo al contrato y una decisión por contrato; el usuario prefirió prohibir la mezcla.
- **Prioridad fija entre menús:** regla implícita, difícil de explicar.
- **Calcular la vista en cada consulta:** impide dejar facturas como histórico.
- **Historial de menús del proveedor con vigencia por fecha:** más complejo y frágil (facturas editadas, mover parcial).
- **Bloquear sin preguntar el cambio de menú con facturas:** el usuario pidió poder decidir.

## Qué implica

- Toda factura nueva se inserta con `inv_view`: el `CHECK` de la BD rechaza una sin ella.
- Un endpoint nuevo de facturas filtra con `viewsWhere` (sobre `inv_view`) y `invoiceScopeWhere`, nunca derivando la vista del contrato.
- Todo lo que cambie los tipos de un proveedor o el menú de un tipo pasa por `applyProviderViewChanges` y acepta `invoiceMove`.
- Un tipo de proveedor nuevo, también desde scripts, define su menú si sus proveedores van a facturar contratos.
- Desplegar: aplicar `0092` (después de `0089` a `0091`), `schema.prisma` versionado y `yarn db:seed`. El `SELECT` final de la migración debe salir vacío; si no, corregir esos proveedores.

## Dónde

`database/migrations/0092_invoice_view_from_provider_type.sql` · `server/src/modules/billing/invoices/invoiceViews.js` (resolución, `viewsWhere`, `applyProviderViewChanges`) · `invoices.service.js` (registro, lecturas) · `admin/providerTypes/providerTypes.service.js` · `admin/contractTypes/contractTypes.service.js` · `work/providers/providers.service.js`, `.validation.js`, `.controller.js` · `work/contracts/contracts.service.js` · `app/dashboard/dashboard.service.js` · `common/services/master.service.js`, `common/utils/masterRouter.utils.js`, `masterValidation.utils.js` · `server/prisma/schema.prisma`, `seed.js` · `client/src/hooks/useInvoiceViewChange.jsx`, `utils/constants.js`, `ProviderTypePage.jsx`, `ContractTypePage.jsx`, `ProviderFormPage.jsx`, `ProviderDetailPage.jsx`, `ContractDetailPage.jsx`, `ContractInvoicesTab.jsx`, `ContractDataForm.jsx` · Tests: `invoiceViews.test.js`, `invoices.service.test.js` ("vistas de facturas"), `providers.service.test.js` ("menú de facturas del proveedor"), `providerTypes.service.test.js` ("menú de facturas del tipo"), `contractTypes.service.test.js`, `contracts.service.test.js`, `dashboard.service.test.js` y `masterRouter.utils.test.js` ("updateOptions").
