-- Migración 0102: la etapa de la factura simple solo es obligatoria si la obra tiene etapas
--
-- Requiere: 0094 (tbl_invoices.wks_id y ck_invoices_type_links) ya aplicado.
--
-- DEC-069 (cambia DEC-058): una obra sin etapas activas admite facturas
-- simples sin etapa; si la obra tiene etapas activas, la etapa sigue siendo
-- obligatoria. Lo segundo depende de las etapas de la obra al registrar, así
-- que lo verifica el service bajo el bloqueo de la obra; el esquema solo deja
-- de exigir la etapa en la simple.
--
-- ck_invoices_type_links: SIMPLE sin contrato (con o sin etapa); las demás con
-- contrato y sin etapa (su etapa es la del contrato). La FK (wks_id, wrk_id)
-- → tbl_work_stages no cambia: una etapa nula no la evalúa.

ALTER TABLE `tbl_invoices`
DROP CHECK `ck_invoices_type_links`;

ALTER TABLE `tbl_invoices`
ADD CONSTRAINT `ck_invoices_type_links` CHECK (
  (`inv_type` = 'SIMPLE' AND `ctr_id` IS NULL)
  OR (`inv_type` <> 'SIMPLE' AND `ctr_id` IS NOT NULL AND `wks_id` IS NULL)
);
