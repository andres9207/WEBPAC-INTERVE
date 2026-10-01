-- Migración 0045: tabla tbl_provider_contacts (contactos del proveedor)
--
-- Requiere: 0044 (tbl_providers) y 0025 (tbl_address_types) ya aplicados.
--
-- Respalda ADR-0012 (decisión 11), ADR-0009 (decisiones 3 a 7) y el backlog
-- PRO-BD-06. Nombres fijados en DEC-031 (tabla tbl_provider_contacts, prefijo
-- prc_).
--
-- Tabla propia y múltiple, separada de la de contactos de obra (ADR-0009,
-- decisión 3: sin tabla polimórfica). No hay contacto embebido que migrar: la
-- tabla de proveedores se crea limpia (0044).
--
-- Columnas del dominio (estructura de ADR-0009, más nombre y cargo de la
-- persona de contacto, opcionales):
--   adt_id          Tipo de dirección (ADR-0009). Obligatorio. Un mismo tipo
--                   puede repetirse: un proveedor puede tener dos bodegas.
--   prc_name        Persona de contacto.
--   prc_position    Cargo.
--   prc_address, prc_phone, prc_mobile, prc_fax, prc_email, prc_observation
--   prc_main        Contacto principal (1) o no (0).
--
-- "Principal" es una marca del contacto, no un tipo (ADR-0009, decisión 6), y
-- hay a lo sumo uno por proveedor (decisión 7), garantizado aquí: la columna
-- generada prc_main_provider vale el prv_id del contacto principal y NULL en
-- los demás, con UNIQUE sobre ella (varios NULL no chocan).
--
-- Al menos un medio de contacto (dirección, teléfono, celular o correo) lo
-- exige el CHECK; el service lo valida antes para responder un mensaje claro.
--
-- Los contactos son una parte del proveedor: se guardan con él, por
-- diferencial (como los responsables de obra), y quitar uno borra la fila.
-- Auditoría técnica (ADR-0012, "Auditoría"): columnas de autoría, sin
-- eliminación lógica ni estado propio.
--
-- FK al proveedor ON DELETE CASCADE (el contacto no existe sin él); al tipo
-- de dirección ON DELETE RESTRICT (ADR-0009, "Modelo"). MySQL crea el índice
-- de cada FK.

CREATE TABLE `tbl_provider_contacts` (
  `prc_id` int NOT NULL AUTO_INCREMENT,
  `prv_id` int NOT NULL,
  `adt_id` int NOT NULL,
  `prc_name` varchar(150) DEFAULT NULL,
  `prc_position` varchar(100) DEFAULT NULL,
  `prc_address` varchar(255) DEFAULT NULL,
  `prc_phone` varchar(20) DEFAULT NULL,
  `prc_mobile` varchar(20) DEFAULT NULL,
  `prc_fax` varchar(20) DEFAULT NULL,
  `prc_email` varchar(255) DEFAULT NULL,
  `prc_observation` varchar(500) DEFAULT NULL,
  `prc_main` tinyint(1) NOT NULL DEFAULT 0,
  `prc_create_by` int DEFAULT NULL,
  `prc_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `prc_update_by` int DEFAULT NULL,
  `prc_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prc_main_provider` int GENERATED ALWAYS AS (IF(`prc_main` = 1, `prv_id`, NULL)) VIRTUAL,
  PRIMARY KEY (`prc_id`) USING BTREE,
  UNIQUE INDEX `uq_provider_contacts_main` (`prc_main_provider`),
  CONSTRAINT `ck_provider_contacts_main` CHECK (`prc_main` IN (0, 1)),
  CONSTRAINT `ck_provider_contacts_channel` CHECK (
    COALESCE(`prc_address`, '') <> ''
    OR COALESCE(`prc_phone`, '') <> ''
    OR COALESCE(`prc_mobile`, '') <> ''
    OR COALESCE(`prc_email`, '') <> ''
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_provider_contacts`
ADD CONSTRAINT `tbl_provider_contacts_provider` FOREIGN KEY (`prv_id`) REFERENCES `tbl_providers` (`prv_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_provider_contacts_address_type` FOREIGN KEY (`adt_id`) REFERENCES `tbl_address_types` (`adt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_provider_contacts_create_by` FOREIGN KEY (`prc_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_provider_contacts_update_by` FOREIGN KEY (`prc_update_by`) REFERENCES `tbl_users` (`use_id`);
