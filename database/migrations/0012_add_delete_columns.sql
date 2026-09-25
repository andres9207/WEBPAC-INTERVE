-- Migración 0012: columnas de eliminación (*_delete_by, *_delete_at) en las
-- tablas con eliminación lógica
--
-- Requiere: bdtemplate.sql y 0011_fk_audit_columns.sql ya aplicados.
--
-- Respalda ADR-0013 (decisión 4). La eliminación es lógica (sta_id = 3) y,
-- hasta ahora, quién eliminó y cuándo quedaba en *_update_by / *_update_at:
-- indistinguible de una edición, y perdido con cualquier edición posterior.
-- sta_id = 3 SIGUE determinando la visibilidad; estas columnas solo
-- conservan la evidencia del evento. Las pueblan deleteUser, deleteProfile y
-- deleteModuleDoc; se limpian (NULL) si el registro se reactiva.
--
-- Alcance: tbl_users, tbl_profiles y tbl_documents, las únicas tablas con
-- eliminación lógica hoy. Es estándar obligatorio para toda tabla nueva del
-- dominio de negocio (ver database/migrations/README.md, "Estándar de
-- auditoría para tablas nuevas").
--
-- Registros ya eliminados antes de esta migración: quedan con NULL. No hay
-- forma de saber quién ni cuándo los eliminó (*_update_by/_at pudieron
-- cambiar después), y copiar esos valores sería inventar evidencia.

ALTER TABLE `tbl_users`
ADD COLUMN `use_delete_by` int DEFAULT NULL AFTER `use_update_at`,
ADD COLUMN `use_delete_at` timestamp NULL DEFAULT NULL AFTER `use_delete_by`,
ADD CONSTRAINT `tbl_users_delete_by` FOREIGN KEY (`use_delete_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_profiles`
ADD COLUMN `pro_delete_by` int DEFAULT NULL AFTER `pro_update_at`,
ADD COLUMN `pro_delete_at` timestamp NULL DEFAULT NULL AFTER `pro_delete_by`,
ADD CONSTRAINT `tbl_profiles_delete_by` FOREIGN KEY (`pro_delete_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_documents`
ADD COLUMN `doc_delete_by` int DEFAULT NULL AFTER `doc_update_at`,
ADD COLUMN `doc_delete_at` timestamp NULL DEFAULT NULL AFTER `doc_delete_by`,
ADD CONSTRAINT `tbl_documents_delete_by` FOREIGN KEY (`doc_delete_by`) REFERENCES `tbl_users` (`use_id`);
