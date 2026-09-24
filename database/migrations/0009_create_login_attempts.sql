-- Migración 0009: tabla tbl_login_attempts (bloqueo por intentos fallidos
-- de login, por cuenta)
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Respalda ADR-0001 ("Intentos de login: contador + bloqueo temporal
-- progresivo"). El rate limit por IP (rateLimit.middleware.js) ya existía,
-- pero se esquiva rotando IPs; este contador es por cuenta.
--
-- Va en una tabla aparte y no como columnas de tbl_users a propósito:
-- tbl_users.use_update_at tiene ON UPDATE CURRENT_TIMESTAMP, así que cada
-- intento fallido habría "modificado" al usuario y ensuciado su auditoría
-- técnica (*_update_at).
--
-- La fila se borra con un login exitoso o al restaurar la contraseña.

CREATE TABLE `tbl_login_attempts` (
  `use_id` int NOT NULL,
  `lat_failed_count` int NOT NULL DEFAULT 0,
  `lat_locked_until` timestamp NULL DEFAULT NULL,
  `lat_last_failed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`use_id`) USING BTREE
);

ALTER TABLE `tbl_login_attempts`
ADD CONSTRAINT `tbl_login_attempts_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`);
