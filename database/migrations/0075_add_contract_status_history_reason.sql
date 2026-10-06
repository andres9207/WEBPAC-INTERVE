-- Migración 0075: motivo en el historial de estado del contrato (rea_id)
--
-- Requiere: 0051 (tbl_contract_status_history), 0060 (tbl_reasons) y 0061
-- (tbl_contract_suspensions) ya aplicados.
--
-- Respalda ADR-0017 (decisión 10: el historial guarda el motivo) y el
-- backlog PRO-FE-08 (la vista de historial muestra estado anterior, nuevo,
-- origen, motivo, usuario y fecha). Lo anunciaba 0051: "el motivo desde
-- tbl_reasons llega con las suspensiones". Mismo diseño que
-- tbl_invoice_status_history.rea_id (0067).
--
--   rea_id   Motivo del catálogo de la transición manual que lo exige (hoy,
--            suspender: ámbito SUSPENSION). NULL en las demás. Lo escribe el
--            service en la misma transacción que la transición.
--
-- Datos existentes: las filas de suspensión ya escritas toman el motivo de
-- su suspensión. Suspender escribe la suspensión y la fila de historial en
-- la misma transacción, y un contrato tiene a lo sumo una suspensión
-- abierta (I9), así que se emparejan por contrato y por la creación más
-- cercana en el tiempo (la misma transacción: diferencia de segundos).

ALTER TABLE `tbl_contract_status_history`
ADD COLUMN `rea_id` int DEFAULT NULL AFTER `csh_origin`,
ADD INDEX `idx_contract_status_history_reason` (`rea_id`),
ADD CONSTRAINT `tbl_contract_status_history_reason` FOREIGN KEY (`rea_id`) REFERENCES `tbl_reasons` (`rea_id`) ON DELETE RESTRICT;

UPDATE `tbl_contract_status_history` AS h
JOIN `tbl_contract_suspensions` AS s
  ON s.`ctr_id` = h.`ctr_id`
  AND ABS(TIMESTAMPDIFF(SECOND, s.`csp_create_at`, h.`csh_create_at`)) <= 5
SET h.`rea_id` = s.`rea_id`
WHERE h.`csh_to_state` = 'SUSPENDED' AND h.`rea_id` IS NULL;
