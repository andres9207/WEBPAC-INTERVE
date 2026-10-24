# DEC-081 — Liquidación automática del contrato por condiciones de cierre

**Fecha:** 2026-10-24 · **Tipo:** Obligatoria · **ADR:** [0017](../adr/0017-estados-contrato.md)

Decidido por el usuario el 2026-10-24. Implementa la transición `EN LIQUIDACIÓN → LIQUIDADO` del ADR-0017 (C1–C8) y agrega C9. Resuelve DEC-15 del backlog (C7 y C8).

## Contexto

- El estado Liquidado existía, pero ninguna transición llevaba a él: un contrato llegaba como máximo a "En liquidación" (otrosí de liquidación) y se quedaba ahí.
- El usuario pidió controlar el cierre con condiciones mínimas: amortización total, devolución total del retenido, documento de liquidación, factura final y lo contratado igual a lo pagado, con una diferencia de hasta el 0,01 % del valor del contrato.

## Decisión

- **Automática** (ADR-0017, regla 5): tras cada hecho que puede completar las condiciones, en su transacción y con el contrato ya bloqueado, se evalúan todas. Si se cumplen las que bloquean, el contrato pasa a liquidado (transición `liquidate`, origen automático), con historial, foto de las condiciones en la bitácora y aviso a los responsables de la obra después del COMMIT.
- **Hechos que evalúan:** aprobar, anular o eliminar una factura de contrato; modificar el otrosí de liquidación; registrar o renovar una póliza. Y "Volver a evaluar", a pedido, para un contrato que ya cumplía todo antes de esta ficha (permiso del otrosí de liquidación, 73).
- **Condiciones** (`liquidationTerms.js`), todas a la vez:
  - C1: existe el otrosí de liquidación. **Hace de documento de liquidación** por ahora: no se exige un archivo adjunto (los contratos todavía no tienen documentos).
  - C2: anticipo facturado aprobado − amortizado = 0. C3: retenido acumulado − devuelto = 0. Con `contractBalances`, los saldos del expediente.
  - C4: al menos una factura de liquidación aprobada (la factura final).
  - C5: ninguna factura del contrato registrada sin aprobar. C6: ninguna suspensión abierta.
  - C7: informes de interventoría. **No bloquea**: el sistema no registra los informes; se muestra cuántas suspensiones los exigían.
  - C8: todo concepto vigente con al menos una póliza vigente (`uncoveredConcepts`), sin mirar si ya venció su fecha.
  - C9: valor inicial + otrosíes antes de IVA (la base vigente B) − lo facturado aprobado (F, el VALOR de normales y liquidaciones, I5) ≤ 0,01 % de B (`LIQUIDATION_TOLERANCE_PCT`). "Pagado" es lo facturado aprobado: el sistema no registra pagos.
- **Lo que falta se calcula al consultar**, no se guarda: la pestaña Liquidación del expediente (`get_contract_liquidation`, con ver contratos y ver facturas) lista cada condición, si se cumple y lo que falta. Una evaluación que no liquida no escribe nada; `csh_failed_condition` sigue sin uso.

## Descartado

- Liquidar con un botón manual: el usuario eligió automática, como el ADR-0017.
- Registrar en el historial cada evaluación fallida (ADR-0017, "registrar cuál falló"): llenaría el historial de filas sin transición. La condición que falta se ve siempre actualizada en la pestaña.
- Bloquear por C7: sin registro de informes, ningún contrato con una suspensión que lo exigía se liquidaría.

## Qué implica

- Un hecho nuevo que cambie saldos, facturas, conceptos o pólizas de un contrato en liquidación llama a `evaluateLiquidation` al final de su transacción, con `contractBalances`, y avisa con `notifyLiquidated` después del COMMIT.
- Una condición nueva va en `liquidationTerms.js`: la transición y la pestaña usan la misma función.
- Reabrir un contrato liquidado sigue sin existir (ADR-0017, regla 10).

## Dónde

`server/src/modules/work/contracts/liquidationTerms.js` (condiciones), `contractLiquidation.service.js` (hechos, evaluación, aviso), `contractTerms.js` (`liquidate`), `contractConcepts.service.js` (otrosí de liquidación, `getContractLiquidation`, `evaluateContractLiquidation`), `contractPolicies.service.js`, `billing/invoices/invoices.service.js` (aprobar, anular, eliminar) · Rutas `get_contract_liquidation` y `evaluate_contract_liquidation` · Cliente: `views/work/contracts/components/LiquidationTab.jsx` · Tests: `liquidationTerms.test.js`, `contractLiquidation.service.test.js`, `invoices.service.test.js`, `contractConcepts.service.test.js`.
