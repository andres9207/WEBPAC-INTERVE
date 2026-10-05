-- Migración 0065: índice (contrato, obra, proveedor) en tbl_contracts
--
-- Requiere: 0049 (tbl_contracts) ya aplicado. Solo agrega un índice; no
-- toca datos.
--
-- Lo necesita la factura (0066, DEC-042): una factura de contrato tiene la
-- obra y el proveedor de su contrato (ADR-0020, regla 4). El ADR lo daba por
-- no expresable, pero lo es con una FK compuesta (ctr_id, wrk_id, prv_id) de
-- la factura hacia el contrato, que exige un índice con esas columnas en ese
-- orden en la tabla referida. ctr_id ya es la clave primaria, así que el
-- trío es único de por sí: el UNIQUE no restringe nada nuevo, solo hace
-- posible la FK (mismo caso que 0048).
--
-- Efecto buscado: mientras un contrato tenga facturas, su proveedor no puede
-- cambiar (la FK lo rechaza). El service da el mensaje 409 antes.

ALTER TABLE `tbl_contracts`
ADD UNIQUE INDEX `uq_contracts_id_work_provider` (`ctr_id`, `wrk_id`, `prv_id`);
