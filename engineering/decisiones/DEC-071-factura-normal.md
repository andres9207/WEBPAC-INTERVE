# DEC-071 — Factura normal: el avance se factura contra el contrato

**Fecha:** 2026-10-22 · **Tipo:** Vigente · **ADR:** [0021](../adr/0021-facturacion-contrato-mayor.md), [0024](../adr/0024-amortizacion-anticipo.md), [0025](../adr/0025-retenciones.md)

Decidido por el usuario el 2026-10-22. Resuelve **DEC-01** del backlog con la alternativa c de ADR-0021 (facturar el avance durante la ejecución) y **DEC-08** en su límite de valor (I5).

## Contexto

El sistema que se migra factura el avance contra los contratos (unas 69.900 facturas, con amortización y retenido). Aquí, durante la ejecución, la única factura de contrato era la de anticipo: no había cómo facturar el avance, ni se amortizaba anticipo ni se acumulaba retenido hasta la liquidación (DEC-055, retirada).

## Decisión

- **Tipo nuevo `NORMAL` ("Normal")**, de contrato: toma la obra y el proveedor del contrato, como las demás. Se admite, al registrar y al aprobar, **solo con el contrato en ejecución** (acción `invoiceNormal` de los estados del contrato), en los dos menús (contrato mayor y subcontratistas). Varias por contrato, cuando se quiera.
- **Por el contrato completo**, no por concepto, y con **valor libre** (no por cantidades ni por porcentaje de avance). Sin acta ni visto bueno de interventoría.
- **Campos de valor, como la liquidación (fase A):** VALOR (antes de IVA, con AIU), amortización del anticipo y retenido contractual. Amortización y retenido toman por defecto VALOR × % efectivo del contrato; apartarse exige los permisos 89 y 103 con observación (DEC-044, DEC-051). Verifica I2 e I4 al registrar y al aprobar; al anular o eliminar una aprobada, I3 como la liquidación. Sin IVA ni retenciones tributarias: esperan DEC-03, como la liquidación.
- **Mismo detalle que la liquidación:** guarda sus importes en `tbl_invoice_liquidation_details`, con `ccp_id` nulo (la normal no se asocia a un otrosí; la liquidación sí, DEC-059). Así anticipo, retenido e I5 suman de una sola tabla. Que la liquidación tenga otrosí y la normal no lo garantiza el service, porque depende del tipo de la factura (otra tabla). Migración `0104`.
- **I5 aplicada (DEC-08):** Σ VALOR de normales y liquidaciones **aprobadas** ≤ base vigente antes de IVA del contrato. Se verifica al registrar y se revalida al aprobar, bajo el bloqueo del contrato (`billingTerms.js`, `assertBillingFits`). Vale también para la liquidación, que hasta ahora no tenía límite. Si el contrato creció, primero se registra el otrosí. Las registradas no reservan saldo, como en I1 a I4.
- `get_contract_advance` devuelve además `billing` (base, facturado y por facturar), que el formulario muestra bajo el VALOR. La bitácora de aprobar y anular guarda el cambio de lo facturado (`billing_billed`).
- No tiene permiso propio: usa los de facturas (DEC-19 sigue abierta en eso).

## Descartado

- **Una tabla de detalle propia para la normal:** los mismos datos que la liquidación duplicados, y dos caminos de suma para los saldos.
- **Límite contra el valor vigente con IVA:** el VALOR es antes de IVA (DEC-044); compararlo con un total con IVA dejaría facturar de más.
- **Admitirla suspendido o en liquidación:** suspendido no admite facturas (DEC-039), y en liquidación se factura con la liquidación.

## Qué implica

- La liquidación factura lo que falte del contrato y amortiza el anticipo pendiente que quede.
- Liquidaciones aprobadas antes de esta decisión que, sumadas, pasen de la base no se tocan; una liquidación nueva o pendiente de aprobar sí se rechaza si no cabe.
- El reporte de control de contratos ya suma las normales en "Vr. pagado" (DEC-070).

## Dónde

`database/migrations/0104_invoice_normal_type.sql`, `server/prisma/schema.prisma`, `server/src/modules/billing/invoices/{invoiceTerms,billingTerms}.js`, `invoices.service.js` (`resolveDetail`, `revalidateOnApprove`, `revalidateOnCancel`, `contractBalances`, `contractsBalances`), `server/src/modules/work/contracts/contractTerms.js` (`invoiceNormal`), `client/src/utils/constants.js` (`isBillingInvoiceType`), `client/src/views/billing/invoices/` (formulario, detalle, importes y pestaña del contrato). Tests: `invoices.service.test.js` ("factura normal (DEC-071)"), `invoiceTerms.test.js`.
