-- Migración 0109: menús de facturas dinámicos, uno por tipo de proveedor
--
-- Requiere: 0091 (páginas 21 a 23 y permisos 105 a 107), 0094 (FK de la
-- factura al contrato y a la asignación), 0099 (tbl_work_provider_types,
-- tbl_contracts.pvt_id y ctr_invoice_view) y 0107 (per_id hasta 114) ya
-- aplicados.
--
-- DEC-074 (reemplaza lo de DEC-054, DEC-056 y DEC-066 sobre los menús de
-- facturas). Pedido del usuario (2026-10-23).
--
-- 1. tbl_provider_types: el menú fijo (pvt_invoice_view: MAJOR,
--    SUBCONTRACTOR, SIMPLE o ninguno) se reemplaza por dos columnas:
--    - pvt_invoice_mode: forma de facturar. SIMPLE (sin contrato, imputada a
--      la obra) o CONTRACT (anticipo, normal, liquidación y devolución de
--      retenido contra un contrato); NULL, el tipo no factura.
--    - pvt_invoice_menu: el tipo aparece como entrada propia en el menú
--      "Facturas". Exige forma de facturar (CHECK). Desmarcarla solo oculta
--      el menú: sus facturas siguen en los expedientes.
--    Datos: MAJOR y SUBCONTRACTOR → CONTRACT; SIMPLE → SIMPLE; con menú los
--    que tenían uno.
--
-- 2. tbl_invoices.pvt_id reemplaza a inv_view: la factura guarda el tipo de
--    proveedor de su menú.
--    - De contrato: el tipo bajo el que se firmó su contrato. La FK a
--      tbl_contracts pasa a (ctr_id, wrk_id, prv_id, pvt_id): no puede
--      contradecirlo, y un contrato con facturas no cambia de tipo.
--    - Simple: un tipo de forma SIMPLE de la asignación del proveedor a la
--      obra. Datos: el menor; el primer SELECT lista las asignaciones con más
--      de uno, para revisarlas.
--    - FK (wrk_id, prv_id, pvt_id) → tbl_work_provider_types: el tipo es uno
--      de los de la asignación. Quitarlo de la obra con facturas lo impide.
--    - FK pvt_id → tbl_provider_types, con su índice: el listado de un menú
--      filtra por él.
--
-- 3. tbl_contracts.ctr_invoice_view se retira: el menú de un contrato es su
--    tipo de proveedor, y admite facturas si la forma de ese tipo es
--    CONTRACT. La forma no cambia mientras el tipo tenga contratos o
--    facturas (lo verifica el service). El segundo SELECT lista los
--    contratos que no tenían menú y ahora sí admiten facturas.
--
-- 4. Un solo permiso de ver: 115 "Ver facturas" (grupo 18) reemplaza a 105,
--    106 y 107, que se retiran sin reutilizar el número. Nadie gana ni pierde
--    acceso: el perfil que tenía alguno recibe el 115, y la excepción de
--    usuario se calcula para que vea facturas si y solo si antes veía alguna
--    vista (DEC-067: (perfil ∪ concedidos) − negados).
--
-- 5. Las páginas 21 a 23 se retiran: el sidebar arma las entradas del grupo
--    18 con los tipos de la casilla (app.service.js). Quien tenía alguna de
--    ellas conserva el grupo 18.
--
-- Después: `npx prisma db pull` (o el schema.prisma versionado) y `yarn db:seed`.

-- 1. Tipos de proveedor ─────────────────────────────────────────────────────

ALTER TABLE `tbl_provider_types`
ADD COLUMN `pvt_invoice_mode` varchar(20) DEFAULT NULL AFTER `pvt_name`,
ADD COLUMN `pvt_invoice_menu` tinyint(1) NOT NULL DEFAULT 0 AFTER `pvt_invoice_mode`;

UPDATE `tbl_provider_types`
SET `pvt_invoice_mode` = CASE `pvt_invoice_view` WHEN 'SIMPLE' THEN 'SIMPLE' WHEN 'MAJOR' THEN 'CONTRACT' WHEN 'SUBCONTRACTOR' THEN 'CONTRACT' END,
    `pvt_invoice_menu` = (`pvt_invoice_view` IS NOT NULL);

ALTER TABLE `tbl_provider_types`
DROP CHECK `ck_provider_types_invoice_view`;

ALTER TABLE `tbl_provider_types`
DROP COLUMN `pvt_invoice_view`,
ADD CONSTRAINT `ck_provider_types_invoice_mode` CHECK (`pvt_invoice_mode` IS NULL OR `pvt_invoice_mode` IN ('SIMPLE', 'CONTRACT')),
ADD CONSTRAINT `ck_provider_types_invoice_menu` CHECK (`pvt_invoice_menu` = 0 OR `pvt_invoice_mode` IS NOT NULL);

-- 2. Tipo de proveedor de la factura ────────────────────────────────────────

ALTER TABLE `tbl_invoices`
ADD COLUMN `pvt_id` int DEFAULT NULL AFTER `prv_id`;

UPDATE `tbl_invoices` `i`
JOIN `tbl_contracts` `c` ON `c`.`ctr_id` = `i`.`ctr_id`
SET `i`.`pvt_id` = `c`.`pvt_id`;

UPDATE `tbl_invoices` `i`
SET `i`.`pvt_id` = (
  SELECT MIN(`w`.`pvt_id`)
  FROM `tbl_work_provider_types` `w`
  JOIN `tbl_provider_types` `t` ON `t`.`pvt_id` = `w`.`pvt_id`
  WHERE `w`.`wrk_id` = `i`.`wrk_id` AND `w`.`prv_id` = `i`.`prv_id` AND `t`.`pvt_invoice_mode` = 'SIMPLE'
)
WHERE `i`.`ctr_id` IS NULL;

ALTER TABLE `tbl_invoices`
DROP CHECK `ck_invoices_view`;

ALTER TABLE `tbl_invoices`
DROP FOREIGN KEY `tbl_invoices_contract`;

ALTER TABLE `tbl_contracts`
ADD UNIQUE KEY `uq_contracts_id_work_provider_type` (`ctr_id`, `wrk_id`, `prv_id`, `pvt_id`);

-- Falla si quedó una factura sin tipo: una simple cuya asignación no tiene
-- un tipo de forma SIMPLE. Corregir la asignación y volver a aplicar.
ALTER TABLE `tbl_invoices`
DROP INDEX `idx_invoices_view`,
DROP COLUMN `inv_view`,
MODIFY COLUMN `pvt_id` int NOT NULL,
ADD KEY `tbl_invoices_work_provider_type` (`wrk_id`, `prv_id`, `pvt_id`),
ADD KEY `idx_invoices_provider_type` (`pvt_id`),
ADD CONSTRAINT `tbl_invoices_provider_type` FOREIGN KEY (`pvt_id`) REFERENCES `tbl_provider_types` (`pvt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_contract` FOREIGN KEY (`ctr_id`, `wrk_id`, `prv_id`, `pvt_id`) REFERENCES `tbl_contracts` (`ctr_id`, `wrk_id`, `prv_id`, `pvt_id`) ON DELETE RESTRICT,
ADD CONSTRAINT `tbl_invoices_work_provider_type` FOREIGN KEY (`wrk_id`, `prv_id`, `pvt_id`) REFERENCES `tbl_work_provider_types` (`wrk_id`, `prv_id`, `pvt_id`) ON DELETE RESTRICT;

-- 3. Menú del contrato ──────────────────────────────────────────────────────

-- Informativo, antes de retirar la columna: contratos sin menú cuyo tipo
-- ahora factura con contrato (pasan a admitir facturas).
SELECT `c`.`ctr_id`, `c`.`ctr_number`, `c`.`wrk_id`, `c`.`pvt_id`
FROM `tbl_contracts` `c`
JOIN `tbl_provider_types` `t` ON `t`.`pvt_id` = `c`.`pvt_id`
WHERE `c`.`ctr_invoice_view` IS NULL AND `t`.`pvt_invoice_mode` = 'CONTRACT';

ALTER TABLE `tbl_contracts`
DROP CHECK `ck_contracts_invoice_view`;

ALTER TABLE `tbl_contracts`
DROP INDEX `idx_contracts_invoice_view`,
DROP COLUMN `ctr_invoice_view`;

-- 4. Permiso único de ver ───────────────────────────────────────────────────

INSERT INTO `tbl_permissions` (`per_id`, `per_name`, `pag_id`, `per_order`) VALUES
(115, 'Ver facturas', 18, 0);

INSERT INTO `tbl_profile_permissions` (`per_id`, `pro_id`)
SELECT DISTINCT 115, `pp`.`pro_id`
FROM `tbl_profile_permissions` `pp`
WHERE `pp`.`per_id` IN (105, 106, 107);

-- Excepción de usuario solo donde el perfil no da el resultado de antes:
-- concedida si veía alguna vista y su perfil no da el 115; negada si no veía
-- ninguna y su perfil sí lo da.
INSERT INTO `tbl_user_permissions` (`per_id`, `use_id`, `usp_granted`)
SELECT 115, `s`.`use_id`, `s`.`sees`
FROM (
  SELECT
    `u`.`use_id`,
    EXISTS (
      SELECT 1 FROM `tbl_profile_permissions` `pp`
      WHERE `pp`.`pro_id` = `u`.`pro_id` AND `pp`.`per_id` IN (105, 106, 107)
    ) AS `by_profile`,
    EXISTS (
      SELECT 1 FROM `tbl_permissions` `p`
      WHERE `p`.`per_id` IN (105, 106, 107)
        AND (
          EXISTS (SELECT 1 FROM `tbl_profile_permissions` `pp` WHERE `pp`.`pro_id` = `u`.`pro_id` AND `pp`.`per_id` = `p`.`per_id`)
          OR EXISTS (SELECT 1 FROM `tbl_user_permissions` `up` WHERE `up`.`use_id` = `u`.`use_id` AND `up`.`per_id` = `p`.`per_id` AND `up`.`usp_granted` = 1)
        )
        AND NOT EXISTS (SELECT 1 FROM `tbl_user_permissions` `up` WHERE `up`.`use_id` = `u`.`use_id` AND `up`.`per_id` = `p`.`per_id` AND `up`.`usp_granted` = 0)
    ) AS `sees`
  FROM `tbl_users` `u`
) `s`
WHERE `s`.`by_profile` <> `s`.`sees`;

DELETE FROM `tbl_profile_permissions` WHERE `per_id` IN (105, 106, 107);
DELETE FROM `tbl_user_permissions` WHERE `per_id` IN (105, 106, 107);
DELETE FROM `tbl_permissions` WHERE `per_id` IN (105, 106, 107);

-- 5. Páginas del grupo Facturas ─────────────────────────────────────────────

INSERT INTO `tbl_page_permissions` (`pro_id`, `pag_id`)
SELECT DISTINCT `pp`.`pro_id`, 18
FROM `tbl_page_permissions` `pp`
WHERE `pp`.`pag_id` IN (21, 22, 23)
  AND NOT EXISTS (SELECT 1 FROM `tbl_page_permissions` `g` WHERE `g`.`pro_id` = `pp`.`pro_id` AND `g`.`pag_id` = 18);

INSERT INTO `tbl_user_pages` (`use_id`, `pag_id`)
SELECT DISTINCT `up`.`use_id`, 18
FROM `tbl_user_pages` `up`
WHERE `up`.`pag_id` IN (21, 22, 23)
  AND NOT EXISTS (SELECT 1 FROM `tbl_user_pages` `g` WHERE `g`.`use_id` = `up`.`use_id` AND `g`.`pag_id` = 18);

DELETE FROM `tbl_page_permissions` WHERE `pag_id` IN (21, 22, 23);
DELETE FROM `tbl_user_pages` WHERE `pag_id` IN (21, 22, 23);
DELETE FROM `tbl_pages` WHERE `pag_id` IN (21, 22, 23);

-- Revisar: asignaciones con facturas simples y más de un tipo de forma
-- SIMPLE (sus facturas quedaron con el menor).
SELECT `w`.`wrk_id`, `w`.`prv_id`, COUNT(*) AS `simple_types`
FROM `tbl_work_provider_types` `w`
JOIN `tbl_provider_types` `t` ON `t`.`pvt_id` = `w`.`pvt_id`
WHERE `t`.`pvt_invoice_mode` = 'SIMPLE'
  AND EXISTS (SELECT 1 FROM `tbl_invoices` `i` WHERE `i`.`wrk_id` = `w`.`wrk_id` AND `i`.`prv_id` = `w`.`prv_id` AND `i`.`ctr_id` IS NULL)
GROUP BY `w`.`wrk_id`, `w`.`prv_id`
HAVING COUNT(*) > 1;
