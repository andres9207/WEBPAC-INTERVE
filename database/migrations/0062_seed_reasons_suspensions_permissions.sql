-- Migración 0062: página "Administración > Motivos" y permisos de motivos y
-- de suspensión de contratos
--
-- Requiere: 0057 ya aplicado (pag_id hasta 16, per_id hasta 75).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.reasons y PERMISSIONS.work.contracts). pag_url igual a
-- la ruta del cliente.
--
-- Suspender y levantar son permisos aparte (ADR-0017, "Autorización"): cada
-- transición manual es una acción distinta. Levantar no tiene endpoint
-- propio: lo hace el otrosí que reanuda el contrato (DEC-039), que exige
-- este permiso además del de crear otrosí.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión al perfil Superadmin, y el de ver motivos
-- (78) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(17, 'Motivos', 5, 'admin/reasons', 'message-report', 8, 'Motivos', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(76, 'Suspender contrato', 16, 7),
(77, 'Levantar suspensión de contrato', 16, 9),
(78, 'Ver motivos', 17, 5),
(79, 'Crear motivo', 17, 1),
(80, 'Modificar motivo', 17, 2),
(81, 'Eliminar motivo', 17, 3),
(82, 'Cambiar estado motivo', 17, 4);
