-- Migración 0096: permiso "Recibir conciliación de saldos de facturación"
--
-- Requiere: 0091 ya aplicado (grupo 18 "Facturas", per_id hasta 107) y 0077
-- (permiso 92).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices.receiveBalanceReconciliation).
--
-- DEC-061 (FND-BE-36; ADR-0024 B9, ADR-0025 B8): la conciliación programada
-- de saldos de anticipo y retenido notifica cada incumplimiento de I1 a I4 a
-- los usuarios activos con este permiso (por perfil o individual). No
-- protege ningún endpoint.
--
-- Se otorga a quien ya recibe la conciliación de fechas fin (permiso 92):
-- son los mismos responsables de control. `yarn db:seed` lo da además al
-- perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(108, 'Recibir conciliación de saldos de facturación', 18, 9);

INSERT INTO `tbl_profile_permissions` (`per_id`, `pro_id`)
SELECT 108, `pro_id` FROM `tbl_profile_permissions` WHERE `per_id` = 92;

INSERT INTO `tbl_user_permissions` (`per_id`, `use_id`)
SELECT 108, `use_id` FROM `tbl_user_permissions` WHERE `per_id` = 92;
