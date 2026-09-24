-- Migración 0013: tabla tbl_audit_log (bitácora de auditoría funcional)
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Respalda ADR-0013 (decisiones 7, 8 y 10) y ADR-0001 (B15, eventos de
-- autenticación). Una fila por campo modificado, o una fila sin campo para
-- los eventos que no modifican un valor (login, logout, bloqueo...).
--
-- Reglas (ver server/src/common/services/audit.service.js):
--   - Se escribe SOLO desde la capa de servicio, dentro de la misma
--     transacción que la operación auditada. Nunca con disparadores: el
--     servicio conoce el usuario de la sesión y el contexto de negocio; un
--     disparador no (todas las conexiones usan el mismo usuario de BD).
--   - Solo escritura: ningún código hace UPDATE ni DELETE sobre esta tabla.
--     Para garantizarlo también a nivel de BD, el usuario de BD de la
--     aplicación debería tener solo INSERT y SELECT sobre ella (ver el
--     GRANT sugerido al final).
--   - Nunca registra contraseñas, hashes, tokens ni secretos, ni siquiera
--     como valor anterior: se guarda el marcador "[oculto]".
--
-- Columnas:
--   aud_operation_id  UUID que agrupa todas las filas de una misma
--                     operación (un "Guardar" que cambia varios campos, o
--                     una eliminación que además revoca permisos).
--   aud_entity        Entidad de negocio (USUARIO, PERFIL, ...).
--   aud_record_id     Id del registro afectado. NULL en eventos sin
--                     registro (login fallido de un usuario inexistente).
--   aud_field         Campo modificado. NULL en eventos sin campo.
--   aud_old_value /
--   aud_new_value     Valores como texto; NULL es un valor válido.
--   aud_operation     CREAR, EDITAR, ELIMINAR, REACTIVAR, ASIGNAR, REVOCAR,
--                     LOGIN, LOGIN_FALLIDO, ... Texto y no ENUM a
--                     propósito: el catálogo vive en el código
--                     (AUDIT_OPERATIONS) y crecerá con los módulos de
--                     negocio sin exigir una migración por cada operación.
--   use_id            Autor: siempre el usuario de la sesión (req.user),
--                     nunca uno enviado por el cliente. NULL solo en
--                     eventos anónimos.
--   aud_ip            IP de origen (relevante en eventos de autenticación).
--   aud_create_at     Fecha con milisegundos, para ordenar eventos del
--                     mismo segundo.

CREATE TABLE `tbl_audit_log` (
  `aud_id` bigint NOT NULL AUTO_INCREMENT,
  `aud_operation_id` char(36) NOT NULL,
  `aud_entity` varchar(50) NOT NULL,
  `aud_record_id` int DEFAULT NULL,
  `aud_field` varchar(100) DEFAULT NULL,
  `aud_old_value` text,
  `aud_new_value` text,
  `aud_operation` varchar(30) NOT NULL,
  `use_id` int DEFAULT NULL,
  `aud_ip` varchar(45) DEFAULT NULL,
  `aud_create_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`aud_id`) USING BTREE
);

ALTER TABLE `tbl_audit_log`
ADD CONSTRAINT `tbl_audit_log_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_audit_log`
ADD INDEX `ix_audit_log_entity_record` (`aud_entity`, `aud_record_id`) USING BTREE,
ADD INDEX `ix_audit_log_operation_id` (`aud_operation_id`) USING BTREE,
ADD INDEX `ix_audit_log_use_id` (`use_id`) USING BTREE,
ADD INDEX `ix_audit_log_create_at` (`aud_create_at`) USING BTREE;

-- Sugerido (infraestructura, no se ejecuta aquí): si la aplicación se conecta
-- con un usuario de BD propio, restringirlo a INSERT/SELECT sobre la
-- bitácora para que ni siquiera un bug o una inyección puedan alterarla:
--
--   REVOKE UPDATE, DELETE ON `<bd>`.`tbl_audit_log` FROM '<usuario_app>'@'<host>';
--
-- (Requiere que los privilegios del usuario estén otorgados por tabla, no con
-- un GRANT ALL sobre toda la base.)
