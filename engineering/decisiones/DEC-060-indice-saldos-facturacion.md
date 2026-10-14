# DEC-060 — Índice (contrato, tipo, estado) para los saldos de facturación y su impacto en las escrituras

**Fecha:** 2026-10-14 · **Tipo:** Vigente · **ADR:** [0024](../adr/0024-amortizacion-anticipo.md), [0025](../adr/0025-retenciones.md), [0027](../adr/0027-integridad-transaccional.md)

Backlog PRO-BD-21. Registra la revisión del índice que creó la migración `0071` ([DEC-044](DEC-044-anticipo-amortizacion.md)) y su impacto sobre las escrituras de factura, que ocurren bajo el bloqueo del contrato.

## Contexto

- Los saldos de anticipo y de retenido no se guardan: `contractBalances` los suma en cada consulta sobre las facturas aprobadas del contrato ([DEC-044](DEC-044-anticipo-amortizacion.md), [DEC-051](DEC-051-retenido-contractual.md)). Corre dentro de la transacción de registrar, editar, aprobar y anular, con el contrato bloqueado, y en el panel de saldos.
- Cada suma filtra el encabezado por `ctr_id`, `inv_type` e `inv_state` y une el detalle por `inv_id`. Las escrituras con el contrato bloqueado deben ser cortas: otra factura del mismo contrato espera ese bloqueo.

## Decisión

- **Se conserva `idx_invoices_contract_type_state (ctr_id, inv_type, inv_state)`** en `tbl_invoices`. Sirve las tres sumas de `contractBalances` con una búsqueda que no lee la fila (*covering index lookup*) y la unión al detalle por clave primaria.
- **Su costo en las escrituras es despreciable.** Agrega una entrada de índice al registrar y la mueve al aprobar o anular (cambia `inv_state`). En la medición de abajo, las tres sumas tardan unos 2 ms cada una, y la transacción completa de aprobación, 23 ms en la mediana.
- **Objetivo de tiempo (provisional, a confirmar por el usuario):** la transacción de aprobación con contrato, por debajo de **100 ms** en condiciones normales. El techo duro es la espera máxima por un bloqueo (`LOCK_WAIT_TIMEOUT_SECONDS` = 3 s, ADR-0027): una transacción que lo acerque bloquearía al resto de facturas del contrato.
- No se agregan ni se retiran otros índices: ninguna consulta medida lo pide.

## Planes de ejecución

Consultas tal como las genera Prisma para `contractBalances(tx, 15)` (capturadas con el log de consultas): `SELECT SUM(<importe>) FROM <detalle> LEFT JOIN tbl_invoices j0 ON j0.inv_id = <detalle>.inv_id WHERE j0.ctr_id = ? AND j0.inv_type = ? AND j0.inv_state = 'APPROVED'`. `EXPLAIN` en la BD de desarrollo (MySQL 8.0.45, 22 facturas), el 2026-10-14. Cada celda: `type/key` del encabezado; el detalle se lee siempre por `eq_ref/PRIMARY`. El "antes" se obtuvo con `IGNORE INDEX`, sin tocar el esquema.

| Suma | Con el índice | Sin `idx_invoices_contract_type_state` | Sin ningún índice por contrato |
| --- | --- | --- | --- |
| Anticipos aprobados | `ref/idx_invoices_contract_type_state` · Using index · 1 fila | `ref/idx_invoices_state` · 3 filas, filtra el 36 % | `ref/idx_invoices_state` · 3 filas, filtra el 9 % |
| Liquidaciones aprobadas (amortización y retenido) | `ref/idx_invoices_contract_type_state` · Using index · 1 fila | `index_merge` de `idx_invoices_type` e `idx_invoices_state` | igual |
| Devoluciones de retenido aprobadas | `ref/idx_invoices_type` (no hay ninguna devolución: el tipo es lo más selectivo) | igual | igual |

`EXPLAIN ANALYZE` con el índice: anticipos, 0,09 ms; liquidaciones y devoluciones, 0,01 ms.

**Lectura:** sin el índice, el optimizador recorre todas las facturas aprobadas, o todas las de un tipo, de **todos** los contratos y filtra después. Ese recorrido crece con el total de facturas del sistema. Con el índice crece solo con las del contrato. Con 22 facturas la diferencia de tiempo no se mide; lo que se verifica es que exista un índice que la consulta use. Cuando haya devoluciones, la tercera suma debería pasar al índice compuesto; se revisa con volumen.

## Medición de las transacciones

Diez registros y diez aprobaciones de anticipos de prueba en DEMO-CTR-01, en la BD de desarrollo, sin contención, después de una ejecución de calentamiento. "Transacción" es el tiempo de `prisma.$transaction` (del primer bloqueo a la confirmación); "llamada" suma las lecturas previas (visibilidad e idempotencia). Las facturas de prueba (`IDX-…`, 142 a 152) quedaron anuladas y los saldos del contrato, como estaban.

| Operación | Mínimo | Mediana | p90 / máximo |
| --- | --- | --- | --- |
| Registrar anticipo · transacción | 21 ms | 30 ms | 97 ms |
| Registrar anticipo · llamada | 25 ms | 36 ms | 100 ms |
| Aprobar anticipo · transacción | 17 ms | 23 ms | 44 ms |
| Aprobar anticipo · llamada | 20 ms | 26 ms | 49 ms |

El tiempo lo ponen las idas y vueltas a la BD (unas quince sentencias por transacción) y la confirmación, no las sumas.

## Descartado

- **Guardar los saldos en una tabla o columna** para no sumar: ADR-0024 y ADR-0025 lo descartan (los movimientos son las facturas aprobadas).
- **Índice que cubra también el importe**: el importe está en las tablas de detalle, no en el encabezado; la unión por clave primaria ya es de una fila.
- **Retirar `idx_invoices_type` o `idx_invoices_state`:** los usan los listados y los filtros por pestaña; esta revisión no los mide.

## Qué implica

- Una consulta nueva que sume facturas de un contrato filtra por `ctr_id`, `inv_type` e `inv_state` para usar este índice.
- Toda transacción de facturación con el contrato bloqueado se mantiene corta. Si se acerca al objetivo, se mide antes de sumarle lecturas.
- **Pendiente:** repetir planes y medición con un volumen de prueba (ADR-0002 también lo pide para el tablero), y confirmar el objetivo de 100 ms.

## Dónde

`database/migrations/0071` (el índice) · `server/src/modules/billing/invoices/invoices.service.js` (`contractBalances`) · `server/src/common/services/transaction.service.js` (`LOCK_WAIT_TIMEOUT_SECONDS`) · `database/INDEXES.md` (inventario de las tablas de facturas).
