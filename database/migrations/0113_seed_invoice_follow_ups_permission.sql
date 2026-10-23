-- Migración 0113: permiso "Gestionar seguimiento de facturas"
--
-- Requiere: 0112 y 0069 (página 18, Facturas) ya aplicados; per_id hasta 115.
--
-- DEC-076: abrir, editar, cerrar y eliminar el seguimiento de una factura
-- exige este permiso, además del de ver facturas (115). Verlo, solo el de ver.
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices.manageFollowUps).
--
-- No se otorga a nadie aquí: `yarn db:seed` lo da al perfil Superadmin y el
-- administrador lo asigna desde Permisos (ventana Facturas).

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(116, 'Gestionar seguimiento de facturas', 18, 14);
