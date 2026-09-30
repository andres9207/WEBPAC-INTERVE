-- Migración 0040: tabla tbl_work_stages (etapas de obra)
--
-- Requiere: 0038 (tbl_works) ya aplicado.
--
-- Respalda ADR-0011 (decisiones 9 y 10, reglas 12 a 15) y el backlog
-- PRO-BD-03. Nombres fijados en DEC-026 (tabla tbl_work_stages, prefijo
-- wks_).
--
-- Columnas del dominio:
--   wks_name   Nombre, único dentro de la obra.
--   wks_order  Orden explícito dentro de la obra (entero positivo). No sale
--              de la clave primaria ni de la fecha de creación.
--   sta_id     Estado propio de la etapa, independiente del de la obra.
--
-- Quitar una etapa borra la fila (diferencial, ADR-0011 decisión 3). Cuando
-- existan contratos, su FK a la etapa (RESTRICT) impedirá borrar una etapa en
-- uso.
--
-- FK a la obra ON DELETE CASCADE. El UNIQUE (obra, nombre) sirve también de
-- índice por obra para la consulta de etapas.

CREATE TABLE `tbl_work_stages` (
  `wks_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `wks_name` varchar(100) NOT NULL,
  `wks_order` int NOT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `wks_create_by` int DEFAULT NULL,
  `wks_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wks_update_by` int DEFAULT NULL,
  `wks_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wks_id`) USING BTREE,
  UNIQUE INDEX `uq_work_stages_work_name` (`wrk_id`, `wks_name`),
  CONSTRAINT `ck_work_stages_order` CHECK (`wks_order` > 0)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_work_stages`
ADD CONSTRAINT `tbl_work_stages_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_work_stages_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_stages_create_by` FOREIGN KEY (`wks_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_work_stages_update_by` FOREIGN KEY (`wks_update_by`) REFERENCES `tbl_users` (`use_id`);
