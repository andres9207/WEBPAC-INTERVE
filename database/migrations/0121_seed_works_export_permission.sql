-- Migración 0121: permiso "Exportar obras"
--
-- Requiere: 0120 (per_id hasta 123) ya aplicado.
--
-- ADR-0011 ("EXPORTAR OBRAS") y DEC-070: el listado de obras sale en Excel o
-- PDF con sus filtros, como los de contratos (112) y facturas (113). Id
-- explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.works.export).
--
-- No se otorga a nadie aquí: `yarn db:seed` lo da al perfil Superadmin.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(124, 'Exportar obras', 14, 10);
