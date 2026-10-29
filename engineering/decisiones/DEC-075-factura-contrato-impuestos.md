# DEC-075 — IVA, retenciones tributarias y descuento de materiales de las facturas normal y de liquidación

**Fecha:** 2026-10-23 · **Tipo:** Obligatoria · **ADR:** [0021](../adr/0021-facturacion-contrato-mayor.md), [0026](../adr/0026-calculos-facturacion.md), [0020](../adr/0020-facturacion.md) · **Decisiones:** cierra el backlog DEC-03; extiende [DEC-065](DEC-065-factura-simple-importes.md) y [DEC-071](DEC-071-factura-normal.md)

Decidido por el usuario el 2026-10-23, con la pantalla de una factura normal del sistema que se migra llena de datos. El 2026-10-27 el usuario pidió el IVA sobre la utilidad: fórmula v2 (sección "IVA sobre la utilidad").

## Contexto

La normal y la liquidación guardaban VALOR, amortización y retenido, sin IVA ni retenciones tributarias: esperaban DEC-03 (fase B). DEC-065 ya había adelantado que el IVA de la liquidación es VALOR × % IVA. Faltaban el signo de la devolución de retenido y del descuento de materiales, y la implementación.

## Decisión

- **Fórmula v1**, la del sistema que se migra, deducida de su pantalla y verificada al centavo (VALOR 2.000.000, % IVA 19, % rte fuente 10, % rte IVA 10, RTE ICA 10, ANTICIPO 10, AMORTIZACIÓN 10, RETENIDO 10, DEVOLUCIÓN RETENIDO 1.000, DCTO MATERIALES 1.000 → TOTAL 2.141.980):

  ```text
  IVA               = VALOR × % IVA                 (el % utilidad no entra)
  VALOR + IVA       = VALOR + IVA
  RTE FUENTE        = VALOR × % rte fuente
  RTE IVA           = IVA × % rte IVA
  RTE ICA           digitada como valor
  TOTAL             = VALOR + IVA − RTE FUENTE − RTE IVA − RTE ICA
                      − AMORTIZACIÓN − RETENIDO − DCTO MATERIALES   (neto a pagar)
  ```

- **El anticipo y la devolución de retenido no van en la normal ni en la liquidación.** En la pantalla vieja una misma factura los suma (el anticipo y la devolución con +, la amortización, el retenido y el descuento de materiales con −); aquí siguen siendo sus propios tipos de factura, con sus saldos e invariantes (I1 a I4). El ejemplo no distingue los signos de los importes iguales; se tomaron los de su naturaleza: lo que se le paga al proveedor suma, lo que se le descuenta resta.
- **El % utilidad se captura y se guarda congelado** (ADR-0026, decisión 7), y en la v1 no entra en ninguna cifra; en la v2, el IVA va sobre la utilidad (ver abajo). Al registrar, si el contrato solicita AIU (DEC-046; `defaultUtilityPct` de `get_contract_advance`), el formulario lo propone con la U del **último otrosí que la tenga** (mayor que 0, también el de liquidación) y, si ninguno la tiene, con la del valor inicial (pedido del usuario, 2026-10-29; antes, siempre la del valor inicial). Se puede cambiar a mano, y las facturas ya registradas conservan el suyo: un otrosí no las recalcula.
- **Lo mismo en la normal y en la liquidación**, que comparten el detalle (DEC-071).
- **Obligatorios:** VALOR y % IVA, como en la simple. Los demás, vacíos, valen 0. El neto a pagar no puede quedar negativo (400).
- **Se guarda solo lo capturado**, con las tasas congeladas y la versión de fórmula, en columnas nuevas de `tbl_invoice_liquidation_details` (migración `0110`, todas o ninguna). IVA, retenciones y TOTAL los calcula `composeContractInvoice` cada vez, con la versión guardada.
- **Valor y porcentaje** (DEC-065, "Valor y porcentaje"): cada importe tributario se escribe en pesos o en % de su base y el formulario muestra los dos. Se guarda como siempre: % utilidad, % IVA y retenciones en la fuente y de IVA como tasa; la retención de ICA y el descuento de materiales como valor. Bases: el VALOR, salvo el IVA, que en la v2 es sobre la utilidad si la hay, y la retención de IVA, que es sobre el IVA.
- **Panel Detalle** calculado por el servidor (`preview_contract_invoice`), con las líneas de la pantalla del sistema que se migra: VALOR, IVA, VALOR + IVA, RTE FUENTE, RTE IVA, RTE ICA, AMORTIZACIÓN, RETENIDO, DCTO MATERIALES y TOTAL.
- **Al aprobar**, la bitácora guarda la composición, el % utilidad y la versión de fórmula, junto a los saldos (DEC-062).
- **Las registradas antes** no tienen estos importes: se aprueban y se consultan así. Al editar una registrada, el formulario los pide.

## IVA sobre la utilidad (fórmula v2, 2026-10-27)

Régimen AIU (ADR-0026, P6), pedido por el usuario. Solo cambia el IVA:

```text
UTILIDAD          = VALOR × % utilidad
IVA               = UTILIDAD × % IVA        si UTILIDAD > 0
                  = VALOR × % IVA           si no (contrato sin AIU), como en la v1
```

- Las retenciones conservan su base: RTE FUENTE y RTE ICA sobre el VALOR; RTE IVA sobre el IVA que resulte.
- Toda factura nueva se guarda con la v2. Las registradas con la v1 conservan sus cifras; al editarlas y guardar sus importes pasan a la v2. Las aprobadas no se recalculan.
- No hubo migración: `ild_formula_version` ya admite cualquier versión ≥ 1.

## Descartado

- **Anticipo y devolución dentro de la normal:** duplicaría los tipos de factura que ya los controlan con sus saldos.
- **Descuento de materiales sobre la base:** en la pantalla solo resta del neto.

## Qué implica

- Una fórmula nueva es una versión nueva en `contractInvoiceTerms.js` (hoy la v2), y las anteriores no cambian.
- El costo de obra ejecutado del tablero (ADR-0002) puede tomar VALOR + IVA de estas facturas.
- Faltan C1–C8 y los documentos de las facturas.

## Dónde

`database/migrations/0110_invoice_contract_taxes.sql`, `server/prisma/schema.prisma`, `server/src/modules/billing/invoices/contractInvoiceTerms.js` (fórmula, validación, valor y porcentaje, DTO), `invoices.service.js` (`resolveDetail`, `previewContractInvoice`, `amountsDto`, `approvalSnapshot`), `invoices.{controller,routes,validation}.js` (`preview_contract_invoice`), `client/src/views/billing/invoices/components/ContractTaxesSection.jsx`, `InvoiceFormPage.jsx`, `InvoiceDetailPage.jsx`. Tests: `contractInvoiceTerms.test.js`, `invoices.service.test.js` ("IVA y retenciones de la normal y la liquidación (DEC-075)").
