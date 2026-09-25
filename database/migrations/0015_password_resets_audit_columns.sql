-- Migración 0015: tbl_password_resets alineada con la convención de columnas
-- de autoría (create_by / create_at / update_by / update_at)
--
-- Requiere: 0008_password_resets_hash.sql y 0011_fk_audit_columns.sql ya
-- aplicados.
--
-- Respalda ADR-0013 (B12). par_created_at era la única columna de fecha del
-- esquema con el sufijo "_created_at"; el resto usa "<pre>_create_at". Se
-- renombra conservando los datos y se agregan las otras tres columnas.
--
-- Semántica:
--   - par_create_at: cuándo se generó el código VIGENTE. forgot_password lo
--     reescribe en cada solicitud (upsert sobre UNIQUE(use_id)), porque un
--     código nuevo reemplaza al anterior y su vigencia cuenta desde ahí.
--   - par_update_at: último cambio de la fila (p. ej. un intento consumido),
--     lo mantiene MySQL con ON UPDATE.
--   - par_create_by / par_update_by: quedan en NULL. Pedir un código y
--     probarlo son acciones SIN sesión: quien las hace no está autenticado y
--     registrar al dueño de la cuenta sería inventar un autor (cualquiera
--     puede pedir un código para cualquier correo). Mismo criterio que el
--     actor anónimo de la bitácora (ADR-0013). Existen para que la tabla siga
--     el estándar y tengan FK si algún flujo autenticado llega a escribirla.
--
-- Sin columnas de eliminación: el registro es transitorio y se borra
-- físicamente al restaurar la contraseña.

ALTER TABLE `tbl_password_resets`
RENAME COLUMN `par_created_at` TO `par_create_at`;

ALTER TABLE `tbl_password_resets`
ADD COLUMN `par_create_by` int DEFAULT NULL AFTER `par_attempts`,
ADD COLUMN `par_update_by` int DEFAULT NULL AFTER `par_create_at`,
ADD COLUMN `par_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `par_update_by`,
ADD CONSTRAINT `tbl_password_resets_create_by` FOREIGN KEY (`par_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_password_resets_update_by` FOREIGN KEY (`par_update_by`) REFERENCES `tbl_users` (`use_id`);
