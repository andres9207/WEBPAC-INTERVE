-- Migración 0054: tabla tbl_contract_type_fields (configuración de campos por tipo de contrato)
--
-- Requiere: 0036 (tbl_contract_types) y 0053 (tbl_contract_fields) ya aplicados.
--
-- Respalda ADR-0006 (decisiones 2, 4 y 9) y el backlog MAE-BD-09. Nombres
-- fijados en DEC-037 (tabla tbl_contract_type_fields, prefijo ctf_).
--
-- Una fila por tipo y campo, con tres atributos independientes y el orden:
--   ctf_applies   ¿El campo tiene sentido para este tipo? Si no, no se
--                 muestra ni se acepta valor.
--   ctf_visible   ¿Se muestra? Un campo puede aplicar sin mostrarse: toma el
--                 valor por defecto del sistema.
--   ctf_required  ¿Debe tener valor para guardar?
--   ctf_order     Orden dentro de su grupo en el formulario.
--
-- Jerarquía estricta, en la BD (ck_contract_type_fields_hierarchy):
-- obligatorio ⇒ visible ⇒ aplica. "No aplica" anula visible y obligatorio, y
-- un campo oculto no puede ser obligatorio (nadie podría llenarlo).
--
-- La AUSENCIA de fila significa "no aplica" (ADR-0006, por defecto
-- restrictivo). El guardado es por diferencial (altas, cambios y bajas) en
-- una transacción, con bitácora funcional: sin eliminación lógica. La
-- historia queda en tbl_contract_type_field_versions (0055) y en la bitácora.
--
-- UNIQUE (ctt_id, cfd_id): un campo se configura una sola vez por tipo; sirve
-- además de índice de la FK al tipo. Índice por campo: "qué tipos usan este
-- campo" (ADR-0006, "Integridad de datos").

CREATE TABLE `tbl_contract_type_fields` (
  `ctf_id` int NOT NULL AUTO_INCREMENT,
  `ctt_id` int NOT NULL,
  `cfd_id` int NOT NULL,
  `ctf_applies` tinyint(1) NOT NULL DEFAULT 0,
  `ctf_visible` tinyint(1) NOT NULL DEFAULT 0,
  `ctf_required` tinyint(1) NOT NULL DEFAULT 0,
  `ctf_order` int NOT NULL DEFAULT 0,
  `ctf_create_by` int DEFAULT NULL,
  `ctf_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ctf_update_by` int DEFAULT NULL,
  `ctf_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ctf_id`) USING BTREE,
  UNIQUE INDEX `uq_contract_type_fields_type_field` (`ctt_id`, `cfd_id`),
  INDEX `idx_contract_type_fields_field` (`cfd_id`),
  CONSTRAINT `ck_contract_type_fields_hierarchy` CHECK (
    (`ctf_visible` = 0 OR `ctf_applies` = 1) AND (`ctf_required` = 0 OR `ctf_visible` = 1)
  ),
  CONSTRAINT `ck_contract_type_fields_order` CHECK (`ctf_order` >= 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_contract_type_fields`
ADD CONSTRAINT `tbl_contract_type_fields_contract_type` FOREIGN KEY (`ctt_id`) REFERENCES `tbl_contract_types` (`ctt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_type_fields_field` FOREIGN KEY (`cfd_id`) REFERENCES `tbl_contract_fields` (`cfd_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_contract_type_fields_create_by` FOREIGN KEY (`ctf_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_contract_type_fields_update_by` FOREIGN KEY (`ctf_update_by`) REFERENCES `tbl_users` (`use_id`);
