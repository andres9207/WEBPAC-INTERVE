-- Migración 0056: la etapa del contrato pasa a ser opcional
--
-- Requiere: 0049 (tbl_contracts) ya aplicado.
--
-- La etapa entra al catálogo de campos configurables (DEC-037): un tipo de
-- contrato puede declararla no aplicable u opcional, así que la columna
-- admite NULL. Si es obligatoria para el tipo, lo exige el service con la
-- configuración resuelta (ADR-0006, decisión 6).
--
-- La FK compuesta (wks_id, wrk_id) → tbl_work_stages se mantiene: con etapa,
-- sigue garantizando que es de la obra del contrato; sin etapa (NULL), MySQL
-- no la evalúa.

ALTER TABLE `tbl_contracts`
MODIFY COLUMN `wks_id` int NULL DEFAULT NULL;
