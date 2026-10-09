-- Migración 0085: configuración de campos del contrato por tipo de proveedor
--
-- Requiere: 0022 (tbl_provider_types), 0053 (tbl_contract_fields) y 0063
-- (tbl_provider_classifications) ya aplicados.
--
-- DEC-053 (reemplaza a DEC-037): los campos configurables del contrato
-- (etapa, observaciones, descripción del concepto y sus seis porcentajes)
-- dejan de configurarse por tipo de contrato y pasan a configurarse por tipo
-- de proveedor. El contrato los resuelve con los tipos de su proveedor
-- (tbl_provider_classifications): la unión campo por campo.
--
-- Las tablas tienen la misma forma que las del tipo de contrato (0054, 0055),
-- con pvt_id en vez de ctt_id:
--
--   tbl_provider_type_fields (ptf_)  Una fila por tipo y campo, con aplica,
--       visible, obligatorio y orden. La AUSENCIA de fila es "no aplica"
--       (por defecto restrictivo). Guardado por diferencial con bitácora
--       funcional: sin eliminación lógica.
--   tbl_provider_type_field_versions (pfv_)  Historial de versiones, solo
--       inserción: cada guardado con cambios copia aquí la configuración
--       completa con el número nuevo de pvt_config_version.
--
-- Jerarquía estricta en las dos (obligatorio ⇒ visible ⇒ aplica), con CHECK.
--
-- Sin datos: la configuración inicial de cada tipo la siembran los scripts de
-- carga (server/prisma/seed.prod.*). Un tipo sin configuración no aplica
-- ningún campo configurable.

CREATE TABLE `tbl_provider_type_fields` (
  `ptf_id` int NOT NULL AUTO_INCREMENT,
  `pvt_id` int NOT NULL,
  `cfd_id` int NOT NULL,
  `ptf_applies` tinyint(1) NOT NULL DEFAULT 0,
  `ptf_visible` tinyint(1) NOT NULL DEFAULT 0,
  `ptf_required` tinyint(1) NOT NULL DEFAULT 0,
  `ptf_order` int NOT NULL DEFAULT 0,
  `ptf_create_by` int DEFAULT NULL,
  `ptf_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ptf_update_by` int DEFAULT NULL,
  `ptf_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ptf_id`) USING BTREE,
  UNIQUE INDEX `uq_provider_type_fields_type_field` (`pvt_id`, `cfd_id`),
  INDEX `idx_provider_type_fields_field` (`cfd_id`),
  CONSTRAINT `ck_provider_type_fields_hierarchy` CHECK (
    (`ptf_visible` = 0 OR `ptf_applies` = 1) AND (`ptf_required` = 0 OR `ptf_visible` = 1)
  ),
  CONSTRAINT `ck_provider_type_fields_order` CHECK (`ptf_order` >= 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_provider_type_fields`
ADD CONSTRAINT `tbl_provider_type_fields_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_provider_type_fields_field` FOREIGN KEY (`cfd_id`) REFERENCES `tbl_contract_fields` (`cfd_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_provider_type_fields_create_by` FOREIGN KEY (`ptf_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_provider_type_fields_update_by` FOREIGN KEY (`ptf_update_by`) REFERENCES `tbl_users` (`use_id`);

CREATE TABLE `tbl_provider_type_field_versions` (
  `pfv_id` int NOT NULL AUTO_INCREMENT,
  `pvt_id` int NOT NULL,
  `pfv_version` int NOT NULL,
  `cfd_id` int NOT NULL,
  `pfv_applies` tinyint(1) NOT NULL,
  `pfv_visible` tinyint(1) NOT NULL,
  `pfv_required` tinyint(1) NOT NULL,
  `pfv_order` int NOT NULL,
  `pfv_create_by` int DEFAULT NULL,
  `pfv_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pfv_id`) USING BTREE,
  UNIQUE INDEX `uq_provider_type_field_versions` (`pvt_id`, `pfv_version`, `cfd_id`),
  INDEX `idx_provider_type_field_versions_field` (`cfd_id`),
  CONSTRAINT `ck_provider_type_field_versions_version` CHECK (`pfv_version` > 0),
  CONSTRAINT `ck_provider_type_field_versions_hierarchy` CHECK (
    (`pfv_visible` = 0 OR `pfv_applies` = 1) AND (`pfv_required` = 0 OR `pfv_visible` = 1)
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_provider_type_field_versions`
ADD CONSTRAINT `tbl_provider_type_field_versions_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_provider_type_field_versions_field` FOREIGN KEY (`cfd_id`) REFERENCES `tbl_contract_fields` (`cfd_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_provider_type_field_versions_create_by` FOREIGN KEY (`pfv_create_by`) REFERENCES `tbl_users` (`use_id`);

-- Versión vigente de la configuración del tipo. Empieza en 1 y la sube cada
-- guardado con cambios.
ALTER TABLE `tbl_provider_types`
ADD COLUMN `pvt_config_version` int NOT NULL DEFAULT 1 AFTER `pvt_name`,
ADD CONSTRAINT `ck_provider_types_config_version` CHECK (`pvt_config_version` > 0);
