-- Migración 0003: permisos de "ver" (lectura/listados) para los módulos que
-- solo tenían verifyToken en sus rutas de lectura
--
-- Requiere: bdtemplate.sql, 0001 y 0002 ya aplicados.
-- Autocontenida a nivel de catálogo (tbl_permissions no depende de perfiles/
-- usuarios), pero a diferencia de 0001/0002, estos permisos SÍ necesitan
-- otorgarse de entrada a todo perfil/usuario existente para no romper
-- funcionalidad ya en uso (viewAll/onlyRead eran null hasta ahora — ver nota
-- abajo). Esa asignación masiva no va en este archivo porque depende de qué
-- perfiles/usuarios ya existan; la hace server/prisma/seed.js (`yarn db:seed`).
--
-- Ids explícitos y fijos a propósito: coinciden 1:1 con
-- client/src/contexts/permissions/permissionsConfig.js y con
-- server/src/common/constants/permissions.constants.js. No renumerar.
--
-- Nota: hasta ahora, ver listados de perfiles/usuarios/documentos/plantillas
-- y consultar asignaciones de permisos ajenas no requería ningún permiso
-- (solo `verifyToken`) — un usuario autenticado, sin importar su perfil,
-- podía ver esos listados. Esta migración introduce el permiso, pero por sí
-- sola no cambia el comportamiento de ninguna cuenta existente: hace falta
-- además `server/prisma/seed.js`, que otorga estos ids a todos los perfiles
-- Y a todos los usuarios ya creados (tbl_profile_permissions es solo una
-- plantilla que se copia a tbl_user_permissions al CREAR un usuario nuevo,
-- no retroactivamente — ver server/CLAUDE.md).

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(11, 'Ver perfiles', 3, 5),
(12, 'Ver usuarios', 4, 5),
(13, 'Ver permisos', NULL, 1),
(14, 'Ver documentos', NULL, 1),
(15, 'Ver plantillas', NULL, 1),
(16, 'Ver integración Microsoft Graph', NULL, 1);
