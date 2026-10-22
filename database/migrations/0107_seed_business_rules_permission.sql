-- Migración 0107: permiso "Configurar reglas de negocio"
--
-- Requiere: 0103 ya aplicado (per_id hasta 113) y la página 5
-- (Administración, 0001).
--
-- DEC-072: consultar y cambiar los días de aviso de vencimiento (menú del
-- perfil, "Regla de negocio") exige este permiso. No tiene página propia en
-- el sidebar: cuelga de Administración para poder asignarlo desde Permisos.
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.businessRules.configure).
--
-- No se otorga a nadie aquí: `yarn db:seed` lo da al perfil Superadmin y el
-- administrador lo asigna desde Permisos (ventana Administración).

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(114, 'Configurar reglas de negocio', 5, 1);
