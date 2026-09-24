-- Migración 0010: seed del catálogo tbl_status
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Los estados 1 (activo), 2 (inactivo) y 3 (eliminado lógico) están
-- codificados en el backend (verifyToken/login exigen sta_id = 1, los
-- borrados lógicos fijan sta_id = 3) y en client/src/utils/constants.js,
-- pero ninguna migración los sembraba: en una instalación nueva, el primer
-- INSERT en tbl_users/tbl_profiles fallaba por la FK hacia tbl_status.
--
-- Ids fijos, no se renumeran. INSERT IGNORE: si la fila ya existe (BD de
-- desarrollo con datos), no se toca, para no pisar nombres/colores
-- personalizados. server/prisma/seed.js (yarn db:seed) hace lo mismo con
-- upsert.
--
-- sta_color es un color de Chip de MUI (ver client/src/ui-component/
-- extended/StatusChip.jsx).

INSERT IGNORE INTO `tbl_status` (`sta_id`, `sta_name`, `sta_scope`, `sta_color`, `sta_order`) VALUES
(1, 'Activo', 'GENERAL', 'success', 1),
(2, 'Inactivo', 'GENERAL', 'warning', 2),
(3, 'Eliminado', 'GENERAL', 'error', 3);
