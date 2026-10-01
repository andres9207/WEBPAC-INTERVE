-- Migración 0046: tabla tbl_work_providers (asignación proveedor-obra)
--
-- Requiere: 0038 (tbl_works) y 0044 (tbl_providers) ya aplicados.
--
-- Respalda ADR-0012 (decisiones 2, 8, 9, 10 y 12) y el backlog PRO-BD-07.
-- Nombres fijados en DEC-031 (tabla tbl_work_providers, prefijo wkp_).
--
-- Entidad propia, N:M entre obras y proveedores. Asignar un proveedor a una
-- obra no crea un proveedor; desasignarlo no lo elimina del maestro.
--
-- Atributos de la participación (ADR-0012, decisión 10):
--   sta_id                estado de la asignación (activa o inactiva),
--                         independiente del estado del proveedor (regla 16).
--   wkp_assignment_date   fecha de asignación, la que indica el usuario.
--   wkp_observation       observaciones de esta participación.
--
-- Un proveedor no se asigna dos veces a la misma obra: UNIQUE (obra,
-- proveedor), que sirve también de índice por obra. MySQL crea el de prv_id
-- para la FK (proveedor → obras, para el detalle del proveedor y el bloqueo
-- de su eliminación).
--
-- Desasignar borra la fila (endpoint propio, DEC-031) y la bitácora funcional
-- conserva la asignación y su retiro (ADR-0012, decisión 14). Por eso no hay
-- columnas de eliminación lógica (mismo criterio que tbl_work_managers, 0039).
-- Cuando existan contratos, desasignar un proveedor con contratos en esa obra
-- quedará bloqueado en el service.
--
-- Asignar es un endpoint que crea: lleva clave de idempotencia (DEC-016).
--
-- FK ON DELETE RESTRICT en ambos lados: obras y proveedores se eliminan de
-- forma lógica, y la asignación es historial del expediente.

CREATE TABLE `tbl_work_providers` (
  `wkp_id` int NOT NULL AUTO_INCREMENT,
  `wrk_id` int NOT NULL,
  `prv_id` int NOT NULL,
  `wkp_assignment_date` date NOT NULL,
  `wkp_observation` varchar(500) DEFAULT NULL,
  `sta_id` int NOT NULL DEFAULT 1,
  `wkp_create_by` int DEFAULT NULL,
  `wkp_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wkp_update_by` int DEFAULT NULL,
  `wkp_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `wkp_idempotency_key` char(36) DEFAULT NULL,
  `wkp_idempotency_hash` char(64) DEFAULT NULL,
  PRIMARY KEY (`wkp_id`) USING BTREE,
  UNIQUE INDEX `uq_work_providers_work_provider` (`wrk_id`, `prv_id`),
  UNIQUE INDEX `uq_work_providers_idempotency_key` (`wkp_idempotency_key`)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `tbl_work_providers`
ADD CONSTRAINT `tbl_work_providers_work` FOREIGN KEY (`wrk_id`) REFERENCES `tbl_works` (`wrk_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_providers_provider` FOREIGN KEY (`prv_id`) REFERENCES `tbl_providers` (`prv_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_providers_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_work_providers_create_by` FOREIGN KEY (`wkp_create_by`) REFERENCES `tbl_users` (`use_id`),
ADD CONSTRAINT `tbl_work_providers_update_by` FOREIGN KEY (`wkp_update_by`) REFERENCES `tbl_users` (`use_id`);
