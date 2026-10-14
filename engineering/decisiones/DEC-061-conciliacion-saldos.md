# DEC-061 — Conciliación diaria de los saldos de anticipo y retenido (I1 a I4), con permiso propio

**Fecha:** 2026-10-14 · **Tipo:** Vigente · **ADR:** [0024](../adr/0024-amortizacion-anticipo.md) (B9), [0025](../adr/0025-retenciones.md) (B8), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-14: un segundo job del cron, con un permiso propio para recibir el informe. Completa FND-BE-36, que [DEC-049](DEC-049-cron-conciliacion-fecha-fin.md) había cerrado solo con la conciliación de la fecha fin.

## Contexto

- I1 a I4 se verifican en cada escritura, con el contrato bloqueado ([DEC-044](DEC-044-anticipo-amortizacion.md), [DEC-051](DEC-051-retenido-contractual.md)). Nada revisaba después que lo aprobado siguiera dentro de los límites: un defecto, una migración o un cambio directo en la BD podían dejar un contrato fuera sin que nadie lo notara.
- La entrega del informe (log, notificación, correo) estaba escrita dentro de la conciliación de la fecha fin.

## Decisión

- **Job `contract-balance-reconciliation`**, una vez al día (por defecto 08:30 UTC, las 03:30 en Colombia, después de la de fechas fin; `CRON_BALANCE_RECONCILIATION`).
  - Revisa cada contrato no eliminado **con facturas**, por lotes, cada lote en una transacción de solo lectura.
  - Calcula los saldos con `contractBalances`, el mismo cálculo de las validaciones y del panel, y compara cada valor con su límite:

    | Invariante | Incumple si |
    | --- | --- |
    | I1 | anticipo facturado > anticipo pactado |
    | I2 | anticipo amortizado > anticipo facturado |
    | I3 | retenido devuelto > retenido acumulado |
    | I4 | retenido acumulado > retenido pactado |

  - **Nunca escribe.** Cada hallazgo lleva contrato, obra, invariante, valor, límite y exceso.
- **Permiso 108**, "Recibir conciliación de saldos de facturación", en el grupo Facturas (migración `0096`). No protege ningún endpoint: decide quién recibe la notificación. La migración lo otorga a quien ya tenía el 92 (la conciliación de fechas fin), por perfil o individual; `yarn db:seed` lo da al perfil Superadmin.
- **Entrega común** en `common/services/reconciliationReport.service.js` (`deliverReconciliationReport`), que usan las dos conciliaciones: siempre al log; si hay hallazgos, notificación a cada usuario activo con el permiso y correo a `RECONCILIATION_REPORT_EMAILS`. La de fechas fin pasó a usarla sin cambiar su comportamiento.

## Descartado

- **Ampliar el permiso 92** a "conciliaciones de contratos": el usuario prefirió un permiso por conciliación, para darlas por separado.
- **Corregir los saldos:** no hay saldos que corregir (no se guardan), y anular facturas en automático escondería el defecto.
- **Revisar todos los contratos:** uno sin facturas cumple I1 a I4 por definición.

## Qué implica

- Una conciliación nueva se declara en `src/cron/jobs/`, se registra en `cronJobs` y entrega su informe con `deliverReconciliationReport`, con su propio permiso de destinatario.
- Desplegar: aplicar `0096` (y `yarn db:seed` donde se use) y, si se quiere otro horario, definir `CRON_BALANCE_RECONCILIATION`.

## Dónde

`server/src/modules/billing/invoices/balanceReconciliation.service.js` · `server/src/cron/jobs/contractBalanceReconciliation.job.js` · `server/src/cron/index.js` · `server/src/common/services/reconciliationReport.service.js` · `server/src/modules/work/contracts/contractEndDateReconciliation.service.js` · `permissions.constants.js` (`billing.invoices.receiveBalanceReconciliation`) · `server/prisma/seed.js` · migración `0096` · Tests: `test/modules/billing/invoices/balanceReconciliation.service.test.js` y `contractEndDateReconciliation.service.test.js`.
