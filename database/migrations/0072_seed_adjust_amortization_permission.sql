-- Migración 0072: permiso "Ajustar amortización"
--
-- Requiere: 0069 ya aplicado (página 19 "Facturas", per_id hasta 88).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.billing.invoices.adjustAmortization).
--
-- ADR-0024 ("Autorización") y DEC-044 (resuelve la parte de amortización de
-- la decisión de negocio DEC-19 del backlog): registrar una factura de
-- liquidación con una amortización distinta del valor por defecto exige este
-- permiso, además del de crear o modificar la factura. Aceptar el valor por
-- defecto no lo exige. Amortizar de menos traslada el anticipo a facturas
-- futuras; de más, lo descuenta antes de lo pactado.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin, como los demás permisos de gestión.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(89, 'Ajustar amortización de anticipo', 19, 6);
