-- Migración 0058: clave simbólica de tbl_status (sta_key)
--
-- Requiere: 0010_seed_status.sql ya aplicado.
--
-- Respalda ADR-0017 (decisión 14) y el backlog FND-BD-04, en lo que sigue
-- vigente tras DEC-035. Regla en DEC-038.
--
-- sta_key identifica el estado sin depender del número: ACTIVE, INACTIVE,
-- DELETED. El código usa las constantes de
-- server/src/common/constants/status.constants.js, que llevan clave e id; al
-- arrancar, el servidor comprueba que cada clave tenga en la BD el id que el
-- código espera, y si no, no arranca. Así los ids no pueden diferir entre
-- entornos sin que se note.
--
-- sta_scope NO se amplía: el ciclo de vida del contrato va en ctr_state
-- (DEC-035, WORKFLOW_STANDARD regla 2), y sta_id queda solo para visibilidad
-- y eliminación lógica. Las facturas seguirán la misma regla.
--
-- La semilla es idempotente: ON DUPLICATE KEY UPDATE solo fija la clave, sin
-- pisar nombres ni colores personalizados (igual que 0010). Se puede volver
-- a ejecutar; el ALTER de arriba no, como toda migración de estructura.

ALTER TABLE `tbl_status`
ADD COLUMN `sta_key` varchar(30) NULL AFTER `sta_name`;

INSERT INTO `tbl_status` (`sta_id`, `sta_name`, `sta_key`, `sta_scope`, `sta_color`, `sta_order`) VALUES
(1, 'Activo', 'ACTIVE', 'GENERAL', 'success', 1),
(2, 'Inactivo', 'INACTIVE', 'GENERAL', 'warning', 2),
(3, 'Eliminado', 'DELETED', 'GENERAL', 'error', 3)
ON DUPLICATE KEY UPDATE `sta_key` = VALUES(`sta_key`);

ALTER TABLE `tbl_status`
MODIFY COLUMN `sta_key` varchar(30) NOT NULL,
ADD UNIQUE INDEX `uq_status_key` (`sta_key`);
