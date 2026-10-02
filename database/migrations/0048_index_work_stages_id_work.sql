-- Migración 0048: índice (etapa, obra) en tbl_work_stages
--
-- Requiere: 0040 (tbl_work_stages) ya aplicado. Solo agrega un índice; no
-- toca datos.
--
-- Lo necesita el contrato (0049, DEC-035): su etapa debe pertenecer a su obra
-- (ADR-0015, decisión 2 y regla 2). El ADR la daba por no expresable en el
-- esquema, pero sí lo es con una FK compuesta (wks_id, wrk_id) del contrato
-- hacia la etapa, y una FK compuesta exige un índice en la tabla referida con
-- esas columnas en ese orden. wks_id ya es la clave primaria, así que el par
-- es único de por sí: el UNIQUE no restringe nada nuevo, solo hace posible la
-- FK.

ALTER TABLE `tbl_work_stages`
ADD UNIQUE INDEX `uq_work_stages_id_work` (`wks_id`, `wrk_id`);
