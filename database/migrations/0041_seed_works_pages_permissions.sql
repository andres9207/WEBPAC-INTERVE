-- Migración 0041: menú "Obras" y permisos del módulo de obras
--
-- Requiere: 0037 ya aplicado (pag_id hasta 12, per_id hasta 51).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js (PERMISSIONS.work.works).
-- pag_url igual a la ruta del cliente.
--
-- Acciones de ADR-0011 ("Autorización"). EXPORTAR no se siembra: no hay
-- exportación, y el ADR dice que el permiso se define solo si se implementa.
-- Asignar y retirar responsables son permisos aparte de modificar: deciden
-- quién responde por la obra.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga las
-- páginas y los permisos de gestión (53 a 59) al perfil Superadmin, y el de
-- ver (52) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(13, 'Obras', 0, NULL, 'building', 4, 'Obras', 1),
(14, 'Obras', 13, 'work/works', 'building', 1, 'Obras', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(52, 'Ver obras', 14, 8),
(53, 'Crear obra', 14, 1),
(54, 'Modificar obra', 14, 2),
(55, 'Eliminar obra', 14, 3),
(56, 'Cambiar estado obra', 14, 4),
(57, 'Asignar responsable de obra', 14, 5),
(58, 'Retirar responsable de obra', 14, 6),
(59, 'Gestionar etapas de obra', 14, 7);
