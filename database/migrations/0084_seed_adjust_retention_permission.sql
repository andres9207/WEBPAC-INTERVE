-- Migración 0084: permiso "Ajustar retenido"
--
-- Requiere: 0082 ya aplicado (per_id hasta 102).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices.adjustRetention).
--
-- ADR-0025 (decisión 6) y DEC-051 (resuelve la parte del retenido de la
-- decisión de negocio DEC-19 del backlog): registrar una factura de
-- liquidación con un retenido distinto del valor por defecto exige este
-- permiso, además del de crear o modificar la factura, y una observación.
-- Aceptar el valor por defecto no lo exige. Retener de menos deja la
-- garantía incompleta; de más, retiene antes de lo pactado.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin, como los demás permisos de gestión.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(103, 'Ajustar retenido', 19, 8);
