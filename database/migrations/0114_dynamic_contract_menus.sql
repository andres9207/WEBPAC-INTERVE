-- Migración 0114: menús de contratos dinámicos, uno por tipo de proveedor
--
-- Requiere: 0109 (pvt_invoice_mode) y 0099 (tbl_contracts.pvt_id) ya
-- aplicados.
--
-- DEC-077. Pedido del usuario (2026-10-23): el menú "Contratos" funciona como
-- el de facturas (DEC-074).
--
-- 1. tbl_provider_types.pvt_contract_menu: casilla "Va al menú de
--    contratos", propia (independiente de la de facturas). Solo un tipo que
--    factura con contrato admite contratos, así que la casilla exige
--    pvt_invoice_mode = 'CONTRACT' (CHECK). Desmarcarla solo oculta la
--    entrada: los contratos siguen en "Todos" y en los expedientes.
--    Datos: la reciben los tipos de forma CONTRACT que ya van al menú de
--    facturas, para que el menú aparezca igual que el de facturas.
--
-- 2. Índice por pvt_id en tbl_contracts: el listado de un menú filtra por él
--    (el índice compuesto existente empieza por wrk_id).
--
-- Las páginas no cambian: la página 16 sigue siendo "Contratos"
-- (work/contracts). El sidebar la vuelve desplegable, con "Todos" y una
-- entrada por tipo con la casilla, cuando hay alguno (app.service.js).
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado).

ALTER TABLE `tbl_provider_types`
ADD COLUMN `pvt_contract_menu` tinyint(1) NOT NULL DEFAULT 0 AFTER `pvt_invoice_menu`;

UPDATE `tbl_provider_types`
SET `pvt_contract_menu` = 1
WHERE `pvt_invoice_mode` = 'CONTRACT' AND `pvt_invoice_menu` = 1;

ALTER TABLE `tbl_provider_types`
ADD CONSTRAINT `ck_provider_types_contract_menu` CHECK (`pvt_contract_menu` = 0 OR `pvt_invoice_mode` = 'CONTRACT');

ALTER TABLE `tbl_contracts`
ADD KEY `idx_contracts_provider_type` (`pvt_id`);
