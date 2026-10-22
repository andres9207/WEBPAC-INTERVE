-- Migración 0106: obra y clave de unicidad en las notificaciones
--
-- Requiere: tbl_notifications (bdtemplate.sql) y tbl_works (0038) ya creadas.
--
-- DEC-072:
-- - wrk_id: obra de la notificación. La campana del encabezado muestra solo
--   las de la obra elegida (más las que no son de ninguna obra); con "Ver
--   todo", todas. NULL = no es de una obra (p. ej. las conciliaciones).
-- - not_key: clave de un aviso que se da una sola vez por usuario. El aviso
--   de vencimiento la arma con el contrato o la póliza y su fecha fin, así
--   que no se repite cada día y vuelve a avisar solo si la fecha cambia. La
--   unicidad la garantiza la BD (uq_notifications_user_key), también si dos
--   procesos corren a la vez. NULL = notificación sin clave (las de siempre):
--   MySQL admite varias filas con NULL en un índice UNIQUE.
--
-- Datos: las notificaciones existentes quedan con wrk_id y not_key en NULL.
-- Las de contratos guardan la obra en not_data, pero no se rellenan: solo
-- dejarían de verse en la campana con otra obra elegida.

ALTER TABLE `tbl_notifications`
ADD COLUMN `wrk_id` int DEFAULT NULL COMMENT 'Obra de la notificación; NULL = de ninguna obra (DEC-072)' AFTER `use_id`,
ADD COLUMN `not_key` varchar(100) DEFAULT NULL COMMENT 'Clave de un aviso que se da una sola vez por usuario (DEC-072)' AFTER `not_action`,
ADD UNIQUE KEY `uq_notifications_user_key` (`use_id`, `not_key`),
ADD KEY `idx_notifications_user_work` (`use_id`, `wrk_id`),
ADD CONSTRAINT `tbl_notifications_works` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`);
