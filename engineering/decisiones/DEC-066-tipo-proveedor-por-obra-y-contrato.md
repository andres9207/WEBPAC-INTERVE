# DEC-066 — El tipo de proveedor se define en cada obra y en cada contrato

**Fecha:** 2026-10-19 · **Tipo:** Obligatoria · **ADR:** [0010](../adr/0010-tipos-proveedor.md), [0012](../adr/0012-proveedores.md), [0022](../adr/0022-facturacion-subcontratista.md), [0006](../adr/0006-tipos-contrato.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-19. Reemplaza lo que [DEC-056](DEC-056-menu-facturas-tipo-proveedor.md) decía del **menú del proveedor**: la prohibición de mezclar menús, el menú calculado con los tipos del proveedor y la decisión de mover las facturas o dejarlas como histórico. De DEC-056 siguen vigentes el menú en el tipo de proveedor (`pvt_invoice_view`) y la vista guardada en la factura (`inv_view`). Cambia [DEC-053](DEC-053-campos-contrato-por-tipo-proveedor.md) (los campos ya no son la unión de los tipos del proveedor) y [DEC-058](DEC-058-factura-simple-obra-etapa.md) (la simple exige además un tipo de facturas simples en la obra).

## Contexto

- Un proveedor puede ser contrato mayor, subcontratista y simple a la vez, y trabajar distinto en cada obra: en la obra 1 como contrato mayor y subcontratista, en la obra 2 solo como contrato mayor.
- Con DEC-056 eso era imposible: el tipo vivía solo en el maestro del proveedor, un proveedor no podía mezclar menús ("quedaría con tipos de menús de facturas distintos") y cambiar sus tipos movía facturas ya registradas.
- El usuario pidió que modificar el proveedor no altere las obras que ya tiene.

## Decisión

- **Tres niveles:**
  - **Maestro del proveedor** (`tbl_provider_classifications`): lo que el proveedor puede ser. Admite tipos de menús distintos. Sus tipos solo se proponen al asignarlo a una obra; agregarlos o quitarlos no toca obras, contratos ni facturas.
  - **Asignación a la obra** (`tbl_work_provider_types`, migración `0099`): los tipos con que trabaja en esa obra. Cualquiera de los del catálogo, aunque el proveedor no lo tenga en su maestro. Al menos uno. Tabla de unión sin autoría; su cambio va a la bitácora de la asignación (`tipos=` en `proveedor_obra`), en la obra y en el proveedor.
  - **Contrato** (`tbl_contracts.pvt_id`): se firma bajo uno de los tipos de su asignación, garantizado con FK compuesta `(wrk_id, prv_id, pvt_id)`.
- **Menú de facturas del tipo:** `pvt_invoice_view` admite `MAJOR`, `SUBCONTRACTOR`, `SIMPLE` o ninguno. `SIMPLE` es la marca del tipo que habilita la factura simple (la semilla "Simple" la tiene).
- **Contrato:**
  - Solo se firma bajo un tipo con menú de contrato (`MAJOR` o `SUBCONTRACTOR`) y activo (400 si no), salvo que conserve el que ya tenía.
  - Guarda su menú al crearse (`ctr_invoice_view`, con `CHECK`). Cambiar el menú del tipo en el maestro no lo mueve.
  - Sus campos configurables son los del tipo bajo el que se firma (`resolveContractTypeFields`), para el formulario, el guardado y los otrosí. El AIU por defecto, también.
  - Con facturas no cambia de tipo de proveedor (409), igual que no cambia de proveedor.
  - Los contratos anteriores cuyo proveedor no tenía menú de contrato quedan con su tipo y `ctr_invoice_view` nulo: siguen sin admitir facturas (409).
- **Factura de contrato:** su vista es `ctr_invoice_view`. Ya no bloquea los tipos del proveedor. Saldos, selector de contratos y registro filtran por el menú del contrato.
- **Factura simple:** además de lo de DEC-058, la asignación del proveedor a la obra debe tener un tipo de menú `SIMPLE` (400). El formulario solo ofrece esos proveedores, y desde el proveedor, esas obras.
- **Quitar un tipo de una asignación:** 409 si algún contrato de la obra (también eliminado) se firmó bajo él, o si era el último de menú simples y el proveedor tiene facturas simples en la obra.
- **Se retira:** la prohibición de mezclar menús (`assertNotMixed`), el menú calculado del proveedor (`providerViewOf`, `resolveProviderView`, `providerViewWhere`), el cambio de menú con decisión (`applyProviderViewChanges`, `INVOICE_VIEW_CHANGE`, `invoiceMove`) y el diálogo del cliente (`useInvoiceViewChange`). La unión de tipos de DEC-053 (`mergeTypeRows`) también.
- **Bloqueo:** asignar y editar la asignación bloquean obra → proveedor → tipos pedidos. Crear y editar un contrato bloquean además su tipo de proveedor.

## Descartado

- **Seguir con DEC-056** (un menú por proveedor): no permite que el mismo proveedor sea contrato mayor y subcontratista.
- **Solo el contrato define el tipo, sin la asignación:** no deja registrar con qué tipos trabaja el proveedor en cada obra, que es como el usuario lo describe.
- **La asignación limitada a los tipos del maestro:** el usuario eligió que en la obra se pueda usar cualquiera; el maestro solo propone.
- **Volver al menú por tipo de contrato** (DEC-054): contradice que todo lo del contrato salga del tipo de proveedor.
- **Elegir el menú en cada factura:** las facturas de un mismo contrato podrían quedar en menús distintos.
- **Una casilla aparte "admite factura simple":** el menú `SIMPLE` del tipo ya es esa marca y completa los tres menús.
- **Bloquear quitar un tipo del maestro si una obra lo usa:** el usuario pidió que el maestro no afecte a las obras.

## Qué implica

- Toda asignación nueva lleva sus tipos (`pvtIds`); crear un proveedor desde una obra, sin ellos, toma los de su maestro.
- Todo contrato nuevo lleva `pvtId`, y todo código que resuelva los campos de un contrato usa su `pvt_id`, nunca los tipos del proveedor.
- La vista de una factura de contrato sale de `ctr_invoice_view`; nada la deduce del proveedor ni de sus tipos.
- Un endpoint que liste proveedores para la factura simple filtra por un tipo de menú `SIMPLE` en la asignación.
- Desplegar: aplicar `0099`, `schema.prisma` versionado y `yarn db:seed` (la semilla "Simple" pasa a menú `SIMPLE`). El último `SELECT` de la migración debe salir vacío; el anterior lista los contratos sin menú, como informe.

## Dónde

`database/migrations/0099_provider_types_per_work_and_contract.sql` · `server/src/modules/billing/invoices/invoiceViews.js`, `invoices.service.js` · `work/providers/providers.service.js`, `.validation.js`, `.controller.js` · `work/contracts/contracts.service.js`, `contractConcepts.service.js`, `.validation.js`, `.controller.js` · `admin/providerTypes/providerTypes.service.js`, `providerTypeFields.service.js`, `contractFields.js` · `server/prisma/schema.prisma`, `seed.js`, `seed.demo.js`, `seed.volume.js` · `common/constants/uniqueConstraints.constants.js` · Cliente: `WorkProviderDialog.jsx`, `WorkProvidersTab.jsx`, `useContractForm.js`, `ContractDetailPage.jsx`, `ProviderFormPage.jsx`, `ProviderDetailPage.jsx`, `ProviderTypePage.jsx`, `utils/constants.js` · Tests: `providers.service.test.js` ("tipos del proveedor en la obra"), `contracts.service.test.js` ("tipo de proveedor del contrato"), `invoices.service.test.js`, `invoiceViews.test.js`, `providerTypes.service.test.js`, `providerTypeFields.service.test.js`, `contractFields.test.js`.
