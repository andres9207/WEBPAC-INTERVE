-- Migración 0069: menú "Facturación > Facturas" y permisos de facturas
--
-- Requiere: 0062 ya aplicado (pag_id hasta 17, per_id hasta 82).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices). pag_url igual a la ruta del cliente.
--
-- Facturación es un grupo propio del menú: vive en el área billing/
-- (DEC-042). Va después de Obras; Administración y Seguridad bajan un
-- puesto.
--
-- Acciones de ADR-0020 ("Autorización"):
--   - Aprobar va separado de crear: segregación de funciones.
--   - Anular una factura aprobada va separado de anular una registrada:
--     revierte efectos sobre saldos y condiciones de liquidación.
--   - Si los permisos se diferencian por tipo de factura sigue pendiente
--     (backlog DEC-19).
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (84 a 88) al perfil Superadmin, y el de
-- ver (83) a todos los perfiles.

UPDATE `tbl_pages` SET `pag_order` = 4 WHERE `pag_id` = 5;
UPDATE `tbl_pages` SET `pag_order` = 5 WHERE `pag_id` = 2;

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(18, 'Facturación', 0, NULL, 'receipt', 3, 'Facturación', 1),
(19, 'Facturas', 18, 'billing/invoices', 'invoice', 1, 'Facturas', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(83, 'Ver facturas', 19, 7),
(84, 'Crear factura', 19, 1),
(85, 'Modificar factura', 19, 2),
(86, 'Aprobar factura', 19, 3),
(87, 'Anular factura', 19, 4),
(88, 'Anular factura aprobada', 19, 5);
