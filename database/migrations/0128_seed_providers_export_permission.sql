-- Migración 0128: permiso "Exportar proveedores"
--
-- Requiere: 0121 (per_id hasta 124) ya aplicado.
--
-- ADR-0012 (exportación de proveedores, pendiente) y DEC-070: el listado de
-- proveedores sale en Excel o PDF con sus filtros y su alcance por obra, como
-- el de obras (124). Id explícito y fijo: coincide con server/prisma/seed.js y
-- con server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.providers.export).
--
-- No se otorga a nadie aquí: `yarn db:seed` lo da al perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(125, 'Exportar proveedores', 15, 9);
