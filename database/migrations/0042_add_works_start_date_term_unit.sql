-- Migración 0042: fecha de inicio y unidad del plazo en tbl_works
--
-- Requiere: 0038 (tbl_works) ya aplicado.
--
-- Rediseño de obras (DEC-030). El plazo de la obra pasa a ser número + unidad
-- y se ancla a una fecha de inicio, de la que el servidor deriva la fecha
-- final (inicio + plazo inicial). La fecha final no se guarda: se calcula al
-- leer, como el valor vigente.
--
--   wrk_start_date  Fecha de inicio de la obra. Obligatoria.
--   wrk_term_unit   Unidad del plazo: DIA, MES o ANIO (mismo dominio que el
--                   plazo del contrato, ADR-0015 decisión 3). Vale para el
--                   plazo inicial y el ampliado: los dos se comparan.
--
-- Datos existentes: las obras creadas antes de esta migración no tienen fecha
-- de inicio. Se completa con la fecha de creación de la obra y la unidad MES,
-- para poder declarar las columnas NOT NULL. Revisar esas obras después de
-- aplicarla: la fecha y la unidad reales se corrigen editando la obra.

ALTER TABLE `tbl_works`
ADD COLUMN `wrk_start_date` date DEFAULT NULL AFTER `spt_id`,
ADD COLUMN `wrk_term_unit` varchar(4) NOT NULL DEFAULT 'MES' AFTER `wrk_initial_term`;

UPDATE `tbl_works` SET `wrk_start_date` = DATE(`wrk_create_at`) WHERE `wrk_start_date` IS NULL;
UPDATE `tbl_works` SET `wrk_start_date` = CURRENT_DATE WHERE `wrk_start_date` IS NULL;

ALTER TABLE `tbl_works`
MODIFY COLUMN `wrk_start_date` date NOT NULL,
ADD CONSTRAINT `ck_works_term_unit` CHECK (`wrk_term_unit` IN ('DIA', 'MES', 'ANIO'));
