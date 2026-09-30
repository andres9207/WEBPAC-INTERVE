-- Migración 0035: índice (estado, nombre) en los maestros
--
-- Requiere: 0017, 0022, 0025, 0028, 0030 y 0033 ya aplicados.
--
-- Respalda el backlog MAE-BD-12 y DEC-025. Un índice compuesto
-- (sta_id, <nombre o descripción>) por maestro sirve a las dos consultas
-- que se repiten:
--   - selector (DEC-018):  WHERE sta_id = 1 ORDER BY <nombre> LIMIT 100
--     → filtro y orden salen del índice, sin filesort.
--   - listado (DEC-013):   WHERE sta_id <> 3 ... ORDER BY <nombre>
--     → rango sobre sta_id.
-- La búsqueda general (DEC-024) usa LIKE '%texto%' y no puede usar un índice
-- B-tree: es un recorrido a propósito, porque son catálogos de decenas de
-- filas (ver DEC-025).
--
-- El índice de solo sta_id que MySQL creó para la FK de estado queda
-- redundante: el compuesto empieza por sta_id y la FK pasa a usarlo. MySQL
-- quita solo ese índice implícito al crear el compuesto, así que aquí no hay
-- DROP INDEX (fallaría con 1091). Si en algún ambiente queda un índice
-- simple `tbl_<maestro>_status` (por ejemplo, porque se creó explícito), es
-- redundante e inofensivo; se puede quitar a mano con DROP INDEX.
--
-- Maestros nuevos (tipos de contrato, tipos de póliza): el índice va en su
-- migración de creación, sin el índice simple (CRUD_STANDARD, paso 1).

ALTER TABLE `tbl_identity_documents` ADD INDEX `idx_identity_documents_status_name` (`sta_id`, `idd_name`);

ALTER TABLE `tbl_provider_types` ADD INDEX `idx_provider_types_status_name` (`sta_id`, `pvt_name`);

ALTER TABLE `tbl_address_types` ADD INDEX `idx_address_types_status_name` (`sta_id`, `adt_name`);

ALTER TABLE `tbl_insurers` ADD INDEX `idx_insurers_status_description` (`sta_id`, `ins_description`);

ALTER TABLE `tbl_supervision_types` ADD INDEX `idx_supervision_types_status_name` (`sta_id`, `spt_name`);

ALTER TABLE `tbl_construction_companies` ADD INDEX `idx_construction_companies_status_description` (`sta_id`, `cnc_description`);
