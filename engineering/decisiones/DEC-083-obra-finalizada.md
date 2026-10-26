# DEC-083 — Obra en curso o finalizada, y los contratos por liquidar en el tablero

**Fecha:** 2026-10-26 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md), [0002](../adr/0002-dashboard.md)

Decidido por el usuario el 2026-10-26, a partir del documento de alcance de Intervé (punto 2.1: "registro de obras en curso y finalizadas, incluye su almacenamiento y definición de estado").

## Contexto

- La obra solo tenía su estado de visibilidad (`sta_id`: activa, inactiva, eliminada). No había forma de registrar que terminó.

## Decisión

- **Ciclo de vida propio** en `tbl_works.wrk_state`: `IN_PROGRESS` (en curso, por defecto) o `FINISHED` (finalizada), con `wrk_finish_date`, que existe si y solo si la obra está finalizada (`CHECK`). Aparte de `sta_id`.
- **Finalizar no bloquea nada**: la obra sigue admitiendo contratos, facturas y pólizas, y no exige sus contratos liquidados. Se puede reabrir; reabrir borra la fecha.
- **Permiso**: el 56 "Cambiar estado obra", que ya existía (ADR-0011, "CAMBIAR ESTADO OBRA"). Endpoint `change_state_work`, bajo el bloqueo de la obra, reintentable, con bitácora del estado y la fecha. La fecha no es anterior al inicio de la obra.
- **Contratos por liquidar**: los que no están liquidados ni anulados (`CLOSED_STATES`, DEC-082). El tablero de una obra finalizada los avisa en "Por atender", con su detalle; el tablero general avisa los de todas las obras finalizadas del alcance, con su detalle por contrato y obra.
- El listado de obras muestra el ciclo y filtra por él.

## Descartado

- Exigir los contratos liquidados para finalizar: el usuario pidió que no, y que el tablero los informe.
- Un permiso nuevo: el 56 ya es la acción de cambiar el estado de la obra.

## Qué implica

- Un aviso nuevo sobre obras finalizadas usa `CLOSED_STATES` para saber qué falta por liquidar.

## Dónde

Migración `0118_works_state.sql` · `server/src/modules/work/works/works.service.js` (`WORK_STATES`, `changeWorkState`, filtro `state`), `works.routes.js`, `works.validation.js` · `app/dashboard/workDashboard.service.js` (`toLiquidate`), `dashboard.service.js` (`finishedWorksToLiquidate`) · Cliente: `views/work/works/components/FinishWorkDialog.jsx`, `WorkDetailPage.jsx`, `WorksPage.jsx`, `views/dashboard/Default/work/WorkSummaryTab.jsx`, `GeneralDashboard.jsx` · Tests: `works.service.test.js`, `workDashboard.service.test.js`, `dashboard.service.test.js`.
