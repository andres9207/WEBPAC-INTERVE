-- Migración 0079: índice (concepto, contrato) en tbl_contract_concepts
--
-- Requiere: 0050 (tbl_contract_concepts) ya aplicado. Solo agrega un índice;
-- no toca datos.
--
-- Lo necesita la póliza (0081, DEC-050): ampara un concepto de SU contrato
-- (ADR-0018, regla 1). El ADR lo daba por no expresable, pero lo es con una
-- FK compuesta (ccp_id, ctr_id) de la póliza hacia el concepto, que exige un
-- índice con esas columnas en ese orden en la tabla referida. ccp_id ya es
-- la clave primaria, así que el par es único de por sí: el UNIQUE no
-- restringe nada nuevo, solo hace posible la FK (mismo caso que 0048 y 0065).

ALTER TABLE `tbl_contract_concepts`
ADD UNIQUE INDEX `uq_contract_concepts_id_contract` (`ccp_id`, `ctr_id`);
