-- Migración 0082: página "Administración > Tipos de póliza" y permisos de
-- tipos de póliza y de pólizas
--
-- Requiere: 0077 ya aplicado (pag_id hasta 19, per_id hasta 92).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.admin.policyTypes y PERMISSIONS.work.policies). pag_url igual
-- a la ruta del cliente.
--
-- Configurar la base de cálculo (98) va aparte de modificar el tipo (95):
-- cambia los importes asegurados de todas las pólizas futuras de ese tipo
-- (ADR-0019, "Autorización"). Las pólizas no tienen página propia: se
-- gestionan en el expediente del contrato, así que cuelgan de "Contratos"
-- (16). Modificar una póliza emite una versión nueva; anular reemplaza a
-- eliminar (ADR-0018, "Autorización").
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión al perfil Superadmin, y los de ver (93 y
-- 99) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(20, 'Tipos de póliza', 5, 'admin/policyTypes', 'shield-check', 9, 'Tipos de póliza', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(93, 'Ver tipos de póliza', 20, 5),
(94, 'Crear tipo de póliza', 20, 1),
(95, 'Modificar tipo de póliza', 20, 2),
(96, 'Eliminar tipo de póliza', 20, 3),
(97, 'Cambiar estado tipo de póliza', 20, 4),
(98, 'Configurar base de cálculo de tipo de póliza', 20, 6),
(99, 'Ver pólizas', 16, 12),
(100, 'Registrar póliza', 16, 13),
(101, 'Modificar póliza', 16, 14),
(102, 'Anular póliza', 16, 15);
