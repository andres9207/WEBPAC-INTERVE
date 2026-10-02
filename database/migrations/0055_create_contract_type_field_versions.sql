-- Migración 0055: tabla tbl_contract_type_field_versions (historial de versiones de la configuración)
--
-- Requiere: 0054 (tbl_contract_type_fields) ya aplicado.
--
-- Respalda ADR-0006 (decisión 10) y el backlog MAE-BD-08. Decidido en
-- DEC-037 (tabla tbl_contract_type_field_versions, prefijo cfv_).
--
-- Cada guardado de la configuración que cambia algo incrementa
-- tbl_contract_types.ctt_config_version y copia aquí la configuración
-- completa con ese número, en la misma transacción. tbl_contracts guarda la
-- versión con que se capturó (ctr_config_version): con (ctt_id, versión) se
-- reconstruye el formulario tal como se presentó.
--
-- Solo inserción: ningún código actualiza ni borra estas filas. Una versión
-- sin filas significa que en esa versión ningún campo aplicaba.
--
-- Además, CHECK de versión positiva en tbl_contract_types (MAE-BD-08).

CREATE TABLE `tbl_contract_type_field_versions` (
  `cfv_id` int NOT NULL AUTO_INCREMENT,
  `ctt_id` int NOT NULL,
  `cfv_version` int NOT NULL,
  `cfd_id` int NOT NULL,
  `cfv_applies` tinyint(1) NOT NULL,
  `cfv_visible` tinyint(1) NOT NULL,
  `cfv_required` tinyint(1) NOT NULL,
  `cfv_order` int NOT NULL,
  `cfv_create_by` int DEFAULT NULL,
  `cfv_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cfv_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_type_field_versions` (`ctt_id`, `cfv_version`, `cfd_id`),
  INDEX `idx_contract_type_field_versions_field` (`cfd_id`),
  CONSTRAINT `ck_contract_type_field_versions_version` CHECK (`cfv_version` > 0),
  CONSTRAINT `ck_contract_type_field_versions_hierarchy` CHECK (
    (`cfv_visible` = 0 OR `cfv_applies` = 1) AND (`cfv_required` = 0 OR `cfv_visible` = 1)
  )
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_type_field_versions`
ADD CONSTRAINT `tbl_contract_type_field_versions_contract_type` FOREIGN KEY (`ctt_id`) REFERENCES `tbl_contract_types` (`ctt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_type_field_versions_field` FOREIGN KEY (`cfd_id`) REFERENCES `tbl_contract_fields` (`cfd_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_type_field_versions_create_by` FOREIGN KEY (`cfv_create_by`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_contract_types`
ADD CONSTRAINT `ck_contract_types_config_version` CHECK (`ctt_config_version` > 0);
