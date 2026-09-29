-- Migración 0019: tipo de identificación en tbl_users
--
-- Requiere: 0017_create_identity_documents.sql ya aplicado.
--
-- Respalda ADR-0008 (decisión 8, brecha B5): un número de documento sin tipo
-- es un dato ambiguo. La identificación del usuario sigue siendo opcional,
-- pero número y tipo van juntos: o están los dos o no está ninguno. Lo
-- garantiza el CHECK; el service lo valida antes para responder un mensaje
-- claro.
--
-- FK con RESTRICT (el valor por defecto): un tipo en uso no se borra
-- físicamente. La eliminación lógica del tipo la bloquea el service
-- (deleteIdentityDocument cuenta los usuarios que lo usan).
--
-- Datos existentes: la verificación previa en la BD de desarrollo
-- (2026-09-29) no encontró usuarios con use_identification. Si otra BD tiene
-- usuarios con número y sin tipo, el CHECK falla: antes de aplicarla,
-- asignarles el tipo o vaciar el número (vacío cuenta como sin número):
--
--   SELECT use_id, use_identification FROM tbl_users
--   WHERE use_identification IS NOT NULL AND use_identification <> '';

ALTER TABLE `tbl_users`
ADD COLUMN `idd_id` int DEFAULT NULL AFTER `use_identification`,
ADD INDEX `tbl_users_identity_documents` (`idd_id`),
ADD CONSTRAINT `tbl_users_identity_documents` FOREIGN KEY (`idd_id`) REFERENCES `tbl_identity_documents` (`idd_id`),
ADD CONSTRAINT `ck_users_identification_type` CHECK (
  (`idd_id` IS NULL) = (`use_identification` IS NULL OR `use_identification` = '')
);
