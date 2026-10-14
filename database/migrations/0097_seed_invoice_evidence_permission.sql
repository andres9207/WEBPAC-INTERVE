-- Migración 0097: permiso "Ver evidencia de facturas"
--
-- Requiere: 0096 ya aplicado (grupo 18 "Facturas", per_id hasta 108).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices.viewEvidence).
--
-- PRO-BE-39 (ADR-0013, ADR-0027): protege GET /api/billing/invoices/
-- get_invoice_evidence, que reconstruye desde la bitácora las operaciones de
-- una factura y la instantánea de composición y saldos de su aprobación.
-- Exige además ver la vista de la factura (DEC-054) y su obra (DEC-047).
--
-- Se otorga a quien ya aprueba facturas (permiso 86), por perfil o individual:
-- es quien responde por las cifras aprobadas. `yarn db:seed` lo da además al
-- perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(109, 'Ver evidencia de facturas', 18, 10);

INSERT INTO `tbl_profile_permissions` (`per_id`, `pro_id`)
SELECT 109, `pro_id` FROM `tbl_profile_permissions` WHERE `per_id` = 86;

INSERT INTO `tbl_user_permissions` (`per_id`, `use_id`)
SELECT 109, `use_id` FROM `tbl_user_permissions` WHERE `per_id` = 86;
