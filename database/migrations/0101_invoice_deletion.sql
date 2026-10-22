-- Migración 0101: eliminar facturas
--
-- Requiere: 0066 (tbl_invoices, UNIQUE uq_invoices_provider_number) y 0097
-- (grupo 18 "Facturas", per_id hasta 109) ya aplicados.
--
-- DEC-068 (cambia ADR-0020, reglas 12 y 15, y DOM-06): una factura registrada
-- o aprobada se puede eliminar, con permiso. La eliminación es lógica
-- (sta_id = 3, inv_delete_by, inv_delete_at), con bitácora; la anulada no se
-- elimina.
--
-- 1. Número único por proveedor entre las NO eliminadas. Mismo patrón de
--    columna generada que tbl_providers (0044): inv_number_active vale el
--    número mientras sta_id <> 3 y NULL cuando la factura está eliminada.
--    MySQL admite varios NULL en un UNIQUE, así que el número de una factura
--    eliminada queda libre. Una anulada lo sigue ocupando (DEC-042).
--    El UNIQUE nuevo empieza por prv_id: reemplaza al anterior como índice de
--    la FK tbl_invoices_provider, por eso se crea antes de quitar el viejo.
--
-- 2. Permisos 110 "Eliminar factura" (registradas) y 111 "Eliminar factura
--    aprobada" (reforzado: revierte efectos sobre saldos). Ids explícitos y
--    fijos: coinciden con server/prisma/seed.js y con
--    server/src/common/constants/permissions.constants.js
--    (PERMISSIONS.billing.invoices.delete / deleteApproved). No se otorgan a
--    nadie aquí: `yarn db:seed` los da al perfil Superadmin, y el
--    administrador los asigna (el 111, a los coordinadores) desde Permisos.

ALTER TABLE `tbl_invoices`
ADD COLUMN `inv_number_active` varchar(50) GENERATED ALWAYS AS (IF(`sta_id` <> 3, `inv_number`, NULL)) VIRTUAL;

ALTER TABLE `tbl_invoices`
ADD UNIQUE INDEX `uq_invoices_provider_number_active` (`prv_id`, `inv_number_active`);

ALTER TABLE `tbl_invoices`
DROP INDEX `uq_invoices_provider_number`;

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(110, 'Eliminar factura', 18, 11),
(111, 'Eliminar factura aprobada', 18, 12);
