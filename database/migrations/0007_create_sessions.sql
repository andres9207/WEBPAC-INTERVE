-- Migración 0007: tabla tbl_sessions (sesión única por usuario + refresh token)
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Respalda ADR-0001 (B14): el access token (JWT) pasa a durar 15 minutos y se
-- renueva con un refresh token opaco de 7 días, que viaja en una cookie
-- httpOnly y aquí se guarda SOLO como hash SHA-256 (nunca en claro).
--
-- Política de sesión única: UNIQUE(use_id) garantiza a nivel de BD que un
-- usuario tiene como mucho una sesión viva. Un login nuevo reemplaza la fila
-- (nuevo ses_key), así que los access tokens de la sesión anterior dejan de
-- validar en la siguiente petición: verifyToken exige que el `sid` del JWT
-- coincida con ses_key.
--
-- ses_prev_refresh_hash + ses_rotated_at permiten dos cosas al rotar el
-- refresh token: una ventana de gracia corta para dos pestañas que renuevan a
-- la vez, y detectar la reutilización de un refresh token ya rotado fuera de
-- esa ventana (señal de robo) para revocar la sesión.
--
-- No asume datos existentes: la tabla nace vacía y todos los usuarios deben
-- volver a iniciar sesión una vez desplegado el cambio.

CREATE TABLE `tbl_sessions` (
  `ses_id` int NOT NULL AUTO_INCREMENT,
  `use_id` int NOT NULL,
  `ses_key` char(36) NOT NULL,
  `ses_refresh_hash` char(64) NOT NULL,
  `ses_prev_refresh_hash` char(64) DEFAULT NULL,
  `ses_rotated_at` timestamp NULL DEFAULT NULL,
  `ses_expires_at` timestamp NOT NULL,
  `ses_ip` varchar(45) DEFAULT NULL,
  `ses_user_agent` varchar(255) DEFAULT NULL,
  `ses_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ses_id`) USING BTREE
);

ALTER TABLE `tbl_sessions`
ADD CONSTRAINT `tbl_sessions_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_sessions`
ADD UNIQUE INDEX `uq_sessions_use_id` (`use_id`) USING BTREE,
ADD UNIQUE INDEX `uq_sessions_ses_key` (`ses_key`) USING BTREE,
ADD UNIQUE INDEX `uq_sessions_refresh_hash` (`ses_refresh_hash`) USING BTREE,
ADD INDEX `ix_sessions_prev_refresh_hash` (`ses_prev_refresh_hash`) USING BTREE;
