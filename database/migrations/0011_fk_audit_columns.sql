-- Migración 0011: integridad de las columnas de autoría (*_create_by,
-- *_update_by) → FK a tbl_users.use_id
--
-- Requiere: bdtemplate.sql ya aplicado.
--
-- Respalda ADR-0013 (decisión 2): hasta ahora *_create_by / *_update_by eran
-- `int NULL` sin FK, así que nada impedía que apuntaran a un usuario
-- inexistente. Un autor que no es un usuario del sistema no es auditoría.
--
-- Paso 1 — depuración: todo valor que no corresponda a un tbl_users.use_id
-- existente (incluido 0) pasa a NULL. No se puede reconstruir el autor real,
-- y NULL ("autor desconocido") es honesto; inventar uno no lo sería. En la
-- BD de desarrollo, al escribir esta migración, no había ningún valor
-- inválido (verificado con consultas de solo lectura), pero otras
-- instalaciones pueden tenerlos.
--
-- Paso 2 — FK. Admiten NULL a propósito: el primer usuario (Superadmin
-- sembrado) no tiene quién lo haya creado. ON DELETE RESTRICT (default): los
-- usuarios nunca se borran físicamente, solo lógicamente (sta_id = 3).

-- ── Paso 1: depuración ──────────────────────────────────────────────────────
-- tbl_users se referencia a sí misma: el LEFT JOIN usa un alias propio para
-- que MySQL permita actualizar la tabla que también se consulta.

UPDATE `tbl_users` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`use_create_by`
SET x.`use_create_by` = NULL
WHERE x.`use_create_by` IS NOT NULL AND u.`use_id` IS NULL;

UPDATE `tbl_users` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`use_update_by`
SET x.`use_update_by` = NULL
WHERE x.`use_update_by` IS NOT NULL AND u.`use_id` IS NULL;

UPDATE `tbl_profiles` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`pro_create_by`
SET x.`pro_create_by` = NULL
WHERE x.`pro_create_by` IS NOT NULL AND u.`use_id` IS NULL;

UPDATE `tbl_profiles` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`pro_update_by`
SET x.`pro_update_by` = NULL
WHERE x.`pro_update_by` IS NOT NULL AND u.`use_id` IS NULL;

UPDATE `tbl_documents` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`doc_create_by`
SET x.`doc_create_by` = NULL
WHERE x.`doc_create_by` IS NOT NULL AND u.`use_id` IS NULL;

UPDATE `tbl_documents` x
LEFT JOIN `tbl_users` u ON u.`use_id` = x.`doc_update_by`
SET x.`doc_update_by` = NULL
WHERE x.`doc_update_by` IS NOT NULL AND u.`use_id` IS NULL;

-- ── Paso 2: claves foráneas ─────────────────────────────────────────────────

ALTER TABLE `tbl_users`
ADD CONSTRAINT `tbl_users_create_by` FOREIGN KEY (`use_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_users_update_by` FOREIGN KEY (`use_update_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_profiles`
ADD CONSTRAINT `tbl_profiles_create_by` FOREIGN KEY (`pro_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_profiles_update_by` FOREIGN KEY (`pro_update_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_documents`
ADD CONSTRAINT `tbl_documents_create_by` FOREIGN KEY (`doc_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_documents_update_by` FOREIGN KEY (`doc_update_by`) REFERENCES `tbl_users` (`use_id`);
