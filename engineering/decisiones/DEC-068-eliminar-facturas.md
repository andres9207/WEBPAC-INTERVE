# DEC-068 — Las facturas registradas y aprobadas se pueden eliminar, con permiso

**Fecha:** 2026-10-22 · **Tipo:** Vigente · **ADR:** [0020](../adr/0020-facturacion.md), [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-22. Cambia las reglas 12 y 15 del ADR-0020 ("las facturas no se eliminan") y la invariante DOM-06.

## Contexto

Una factura mal registrada solo se podía anular. La anulada sigue en los listados, ocupa su número y queda como historial. El negocio pidió poder eliminar facturas y que la eliminación de una aprobada quede en manos de los coordinadores.

## Decisión

- **Eliminación lógica**, como el resto del sistema (DEC-006): `sta_id = 3`, `inv_delete_by` e `inv_delete_at`, con bitácora `ELIMINAR` en la misma transacción. Exige una observación, que queda en la bitácora. No escribe historial de estado: el estado no cambia.
- **Qué se elimina:** la registrada, con el permiso 110 "Eliminar factura" (la ruta), y la aprobada, además con el 111 "Eliminar factura aprobada", que el service verifica con el estado bajo bloqueo (mismo criterio que anular una aprobada). La **anulada no se elimina** (409): ya no cuenta y es historial. Lo declara `STATE_ALLOWS` de facturas (`delete`, `deleteApproved`).
- **Una aprobada revierte sus efectos con las reglas de anularla:** un anticipo ya amortizado no se elimina (I2) y una liquidación cuyo retenido ya se devolvió tampoco (I3). La bitácora guarda el cambio de saldo.
- **Contrato liquidado:** ninguna de sus facturas se elimina (409, acción `deleteInvoice` del contrato; ADR-0017, liquidado solo se consulta).
- **La eliminada desaparece:** de los listados, el tablero, los saldos (`contractBalances`), la conciliación y el número único. Leerla, editarla, aprobarla, anularla o volver a eliminarla responde 404.
- **El número queda libre:** el `UNIQUE` pasa a `(prv_id, inv_number_active)`, columna generada que vale el número mientras la factura no está eliminada (migración `0101`, mismo patrón que proveedores). La anulada lo sigue ocupando.
- **Bloqueos estructurales:** eliminar un contrato, una obra o un proveedor, desasignar un proveedor, quitar una etapa o cambiar el proveedor de un contrato siguen contando las facturas eliminadas, como ya cuentan los contratos eliminados: la fila sigue apuntando por FK. DOM-07 (conceptos congelados tras la primera aprobada) también las cuenta: el congelamiento no se deshace.
- **Permisos:** `yarn db:seed` los da al Superadmin; el administrador asigna el 111 al perfil de los coordinadores desde Permisos. La migración no se los da a nadie.

## Descartado

- **Seguir solo con anular:** era la regla, y el negocio pidió eliminar.
- **Eliminar también las anuladas:** se decidió que la anulada queda como historial.
- **Eliminación física:** borraría la evidencia de la bitácora y la rompería contra las FK de detalle e historial.
- **Mantener el número ocupado tras eliminar:** el negocio quiere poder registrar de nuevo la factura con su número.

## Qué implica

- Toda lectura nueva de facturas filtra `sta_id <> 3`, también las sumas de saldos.
- La evidencia de una factura eliminada (DEC-062) no se consulta por endpoint; sigue en la bitácora.

## Dónde

`database/migrations/0101_invoice_deletion.sql`, `server/src/modules/billing/invoices/invoices.service.js` (`deleteInvoice`, `contractBalances`, `assertUniqueNumber`, `findLockedInvoice`), `invoiceTerms.js` (`STATE_ALLOWS`), `work/contracts/contractTerms.js` (`deleteInvoice`), `invoices.routes.js` (`POST /delete_invoice`), `permissions.constants.js` (110, 111), `client/src/views/billing/invoices/InvoiceDetailPage.jsx`. Tests: `test/modules/billing/invoices/invoices.service.test.js` ("eliminar (DEC-068)").
