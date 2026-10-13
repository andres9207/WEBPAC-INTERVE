# DEC-055 — Sin facturación de avance de obra durante la ejecución: todo el valor ejecutado se factura en la liquidación

**Fecha:** 2026-10-13 · **Tipo:** Vigente · **ADR:** [0021](../adr/0021-facturacion-contrato-mayor.md), [0017](../adr/0017-estados-contrato.md)

Resuelve la decisión de negocio **DEC-01** del backlog (cómo se factura el avance de obra durante la ejecución). El usuario la decidió el 2026-10-13: alternativa **a** de ADR-0021.

## Contexto

La factura de liquidación se asocia al otrosí de liquidación (ADR-0021, confirmado el 2026-09-10), así que en `EN EJECUCIÓN` la única factura de contrato es la de anticipo. ADR-0021 dejaba abierta, como brecha B1, la forma de facturar el avance mientras el contrato se ejecuta, con tres alternativas y sin elegir ninguna. Tres tareas del backlog esperaban la decisión: PRO-BD-13, PRO-BE-25 y PRO-FE-11.

## Decisión

- **No se factura avance de obra durante la ejecución.** Todo el valor ejecutado se factura en la liquidación, después del otrosí de liquidación.
- En ejecución, la única factura de contrato es la de anticipo. La amortización del anticipo y el retenido se aplican solo en la factura de liquidación (DEC-044, DEC-051).
- No hay un quinto tipo de factura ni tabla de detalle de avance. PRO-BD-13, PRO-BE-25 y PRO-FE-11 pasan a "no aplica".

## Descartado

- **b — Facturar el avance con facturas simples:** sin control contra el contrato (no amortiza, no retiene, no respeta el valor pactado) y, desde DEC-054, la factura simple no tiene obra ni contrato: el avance no quedaría ligado al contrato.
- **c — Un tipo de factura de avance admisible en ejecución:** control completo de saldos, pero añade un tipo que el alcance no nombra y depende de la composición económica todavía abierta (DEC-03, DEC-07). Si se adoptara más adelante, el modelo de ADR-0020 la admite como una tabla de detalle más; sería una ficha nueva que reemplaza a esta. Las preguntas que habría que responder antes están en ADR-0021, "Preguntas para reabrir la decisión con la alternativa c".

## Qué implica

- En contratos largos, el proveedor financia la obra hasta la liquidación.
- El costo ejecutado de un contrato en ejecución solo refleja sus anticipos aprobados; el resto aparece con la liquidación. El indicador del tablero (ADR-0002, pendiente) debe leerse así.
- Ningún código nuevo admite facturas de contrato en ejecución salvo el anticipo.

## Dónde

- `server/src/modules/work/contracts/contractTerms.js`: `STATE_ALLOWS` (en `IN_PROGRESS`, solo `invoiceAdvance`) e `INVOICE_ACTIONS`.
- `server/src/modules/billing/invoices/invoiceTerms.js`: `INVOICE_TYPES`, los cuatro tipos.
- No requiere migración ni cambio de código: es el comportamiento vigente desde DEC-042.
