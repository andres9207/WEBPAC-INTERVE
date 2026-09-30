-- Migración 0039: tabla tbl_work_managers (responsables de obra)
--
-- Requiere: 0038 (tbl_works) ya aplicado.
--
-- Respalda ADR-0011 (decisiones 4, 7 y 8, reglas 8, 9 y 11) y el backlog
-- PRO-BD-02. Nombres fijados en DEC-026 (tabla tbl_work_managers, prefijo
-- wkm_).
--
-- Tabla intermedia obra-usuario: los responsables son usuarios del sistema,
-- sin un registro de persona paralelo. La obra solo elige usuarios existentes
-- (DEC-029). Atributos propios de la asignación:
--   wkm_role  MAIN (principal) o SUPPORT (apoyo). Dominio cerrado con CHECK.
--   sta_id    estado de la asignación (activo o inactivo).
--
-- Retirar un responsable borra la fila (el guardado de la obra calcula el
-- diferencial, ADR-0011 decisión 3); el usuario no se toca y la bitácora
-- conserva la asignación. Por eso no hay columnas de eliminación lógica.
--
-- "Al menos un responsable" no se puede expresar en el esquema: lo valida el
-- service dentro de la transacción (ADR-0011, decisión 8).
--
-- FK a la obra ON DELETE CASCADE (la parte no existe sin su obra, decisión
-- 13); al usuario ON DELETE RESTRICT. El UNIQUE (obra, usuario) sirve también
-- de índice por obra; MySQL crea el de use_id para la FK.

CREATE TABLE `tbl_work_managers` (
  `wkm_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `use_id` int NOT NULL,
  `wkm_role` varchar(10) NOT NULL DEFAULT 'SUPPORT',
  `sta_id` int NOT NULL DEFAULT 1,
  `wkm_create_by` int DEFAULT NULL,
  `wkm_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wkm_update_by` int DEFAULT NULL,
  `wkm_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wkm_id`) USING BTREE,
  UNIQUE INDEX `uq_work_managers_work_user` (`wrk_id`, `use_id`),
  CONSTRAINT `ck_work_managers_role` CHECK (`wkm_role` IN ('MAIN', 'SUPPORT'))
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_work_managers`
ADD CONSTRAINT `tbl_work_managers_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE CASCADE,
ADD CONSTRAINT `tbl_work_managers_user` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_managers_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_managers_create_by` FOREIGN KEY (`wkm_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_work_managers_update_by` FOREIGN KEY (`wkm_update_by`) REFERENCES `tbl_users` (`use_id`);
