-- Migración 0070: tabla tbl_work_contacts (contactos de la obra)
--
-- Requiere: 0038 (tbl_works) y 0025 (tbl_address_types) ya aplicados.
--
-- Respalda ADR-0011 (regla 16), ADR-0009 (decisiones 3 a 7) y el backlog
-- PRO-BD-04. Prefijo wkc_, junto a los de las demás partes de la obra
-- (wkm_ responsables, wks_ etapas, wkp_ asignaciones; DEC-026).
--
-- Misma estructura que tbl_provider_contacts (0045), en tabla propia
-- (ADR-0009, decisión 3: sin tabla polimórfica). Las reglas comunes viven en
-- un solo lugar del servidor: admin/addressTypes/addressTypes.contacts.js.
--
--   adt_id          Tipo de dirección (ADR-0009). Obligatorio. Un mismo tipo
--                   puede repetirse dentro de la obra.
--   wkc_name        Persona de contacto.
--   wkc_position    Cargo.
--   wkc_address, wkc_phone, wkc_mobile, wkc_fax, wkc_email, wkc_observation
--   wkc_main        Contacto principal (1) o no (0).
--
-- A lo sumo un principal por obra (ADR-0009, decisión 7), garantizado aquí:
-- la columna generada wkc_main_work vale el wrk_id del principal y NULL en
-- los demás, con UNIQUE sobre ella (varios NULL no chocan).
--
-- Al menos un medio de contacto (dirección, teléfono, celular o correo) lo
-- exige el CHECK; el service lo valida antes para responder un mensaje claro.
--
-- Parte de la obra: se guardan con ella, por diferencial, y quitar uno borra
-- la fila. Auditoría técnica (ADR-0011, "Auditoría"): columnas de autoría,
-- sin eliminación lógica ni estado propio.
--
-- FK a la obra ON DELETE CASCADE (ADR-0011, regla 18); al tipo de dirección
-- ON DELETE RESTRICT (ADR-0009, "Modelo"). MySQL crea el índice de cada FK.

CREATE TABLE `tbl_work_contacts` (
  `wkc_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `adt_id` int NOT NULL,
  `wkc_name` varchar(150) DEFAULT NULL,
  `wkc_position` varchar(100) DEFAULT NULL,
  `wkc_address` varchar(255) DEFAULT NULL,
  `wkc_phone` varchar(20) DEFAULT NULL,
  `wkc_mobile` varchar(20) DEFAULT NULL,
  `wkc_fax` varchar(20) DEFAULT NULL,
  `wkc_email` varchar(255) DEFAULT NULL,
  `wkc_observation` varchar(500) DEFAULT NULL,
  `wkc_main` tinyint(1) NOT NULL DEFAULT 0,
  `wkc_create_by` int DEFAULT NULL,
  `wkc_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wkc_update_by` int DEFAULT NULL,
  `wkc_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `wkc_main_work` int GENERATED ALWAYS AS (IF(`wkc_main` = 1, `wrk_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`wkc_id`) USING BTREE,
  UNIQUE INDEX `uq_work_contacts_main` (`wkc_main_work`),
  CONSTRAINT `ck_work_contacts_main` CHECK (`wkc_main` IN (0, 1)),
  CONSTRAINT `ck_work_contacts_channel` CHECK (
    COALESCE(`wkc_address`, '') <> ''
    OR COALESCE(`wkc_phone`, '') <> ''
    OR COALESCE(`wkc_mobile`, '') <> ''
    OR COALESCE(`wkc_email`, '') <> ''
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_work_contacts`
ADD CONSTRAINT `tbl_work_contacts_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_work_contacts_address_type` FOREIGN KEY (`adt_id`) REFERENCES `tbl_address_types` (`adt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_contacts_create_by` FOREIGN KEY (`wkc_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_work_contacts_update_by` FOREIGN KEY (`wkc_update_by`) REFERENCES `tbl_users` (`use_id`);
