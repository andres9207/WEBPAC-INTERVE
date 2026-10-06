-- Migración 0076: permiso "Ver todas las obras"
--
-- Requiere: 0041 ya aplicado (página 14 "Obras"); id 91 libre (0074 llegó
-- hasta 90).
--
-- Id explícito y fijo: coincide con server/prisma/seed.js y con
-- server/src/common/constants/permissions.constants.js
-- (PERMISSIONS.work.works.viewAll).
--
-- DEC-047 (alcance por obra): sin este permiso, un usuario solo ve y opera
-- obras, proveedores, contratos y facturas de la obra que elige en el
-- encabezado, y solo puede elegir obras de las que es responsable (principal
-- o de apoyo, activo). Con él, elige cualquier obra o "Ver todo", sin
-- restricción. Sin obras y sin este permiso, no ve nada de esos módulos.
--
-- Asignación a perfiles: server/prisma/seed.js (`yarn db:seed`) lo otorga al
-- perfil Superadmin. ANTES de desplegar, asignar responsables a las obras u
-- otorgar este permiso a quien deba ver todo: sin eso, esos usuarios dejan
-- de ver datos.

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(91, 'Ver todas las obras', 14, 9);
