-- Migración 0047: menú "Proveedores" y permisos del módulo de proveedores
--
-- Requiere: 0041 ya aplicado (pag_id hasta 14, per_id hasta 59).
--
-- Ids explícitos y fijos: coinciden con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.providers). pag_url igual a la ruta del cliente.
--
-- Proveedores cuelga del grupo "Obras" (pag_id 13): vive en el área work/
-- (DEC-031).
--
-- Acciones de ADR-0012 ("Autorización"):
--   - Asignar y desasignar proveedor de obra van aparte de modificar: editar
--     cambia el maestro y afecta a todas las obras; asignar cambia una obra.
--   - Cambiar la identificación (tipo y número de documento) tiene permiso
--     propio: reasigna a qué empresa corresponde todo su historial (ADR-0012,
--     regla 5 y "Seguridad").
--   - EXPORTAR no se siembra: no hay exportación, y el ADR dice que el
--     permiso se define solo si se implementa.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) otorga la
-- página y los permisos de gestión (61 a 67) al perfil Superadmin, y el de
-- ver (60) a todos los perfiles.

INSERT INTO `tbl_pages` (`pag_id`, `pag_description`, `pag_parent`, `pag_url`, `pag_icon`, `pag_order`, `pag_name`, `pag_type`) VALUES
(15, 'Proveedores', 13, 'work/providers', 'truck', 2, 'Proveedores', 2);

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(60, 'Ver proveedores', 15, 8),
(61, 'Crear proveedor', 15, 1),
(62, 'Modificar proveedor', 15, 2),
(63, 'Eliminar proveedor', 15, 3),
(64, 'Cambiar estado proveedor', 15, 4),
(65, 'Cambiar identificación de proveedor', 15, 5),
(66, 'Asignar proveedor a obra', 15, 6),
(67, 'Desasignar proveedor de obra', 15, 7);
