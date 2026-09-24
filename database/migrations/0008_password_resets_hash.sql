-- Migración 0008: código de recuperación con hash, un solo código vigente
-- por usuario y contador de intentos
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Respalda ADR-0001 (B8):
--   - par_code_temp (el código de 6 dígitos EN CLARO) se reemplaza por
--     par_code_hash: HMAC-SHA256 del código, ver
--     server/src/common/utils/resetCode.utils.js.
--   - par_token se elimina: era un JWT firmado en forgot_password que ya no
--     se usa para nada desde que la restauración identifica la solicitud por
--     correo + código (el token nunca debe salir hacia el cliente).
--   - par_attempts cuenta los intentos fallidos de ese código; al llegar al
--     máximo el código se invalida aunque no haya vencido.
--   - UNIQUE(use_id): un solo código vigente por usuario, garantizado por la
--     BD. forgot_password hace upsert, de forma atómica.
--
-- Borra las solicitudes pendientes: sus códigos están en claro y no se
-- pueden convertir al nuevo formato. Quien estuviera a mitad de una
-- recuperación solo tiene que pedir un código nuevo.

DELETE FROM `tbl_password_resets`;

ALTER TABLE `tbl_password_resets`
DROP COLUMN `par_token`,
DROP COLUMN `par_code_temp`,
ADD COLUMN `par_code_hash` char(64) NOT NULL AFTER `par_use_email`,
ADD COLUMN `par_attempts` int NOT NULL DEFAULT 0 AFTER `par_code_hash`;

ALTER TABLE `tbl_password_resets`
ADD UNIQUE INDEX `uq_password_resets_use_id` (`use_id`) USING BTREE;
