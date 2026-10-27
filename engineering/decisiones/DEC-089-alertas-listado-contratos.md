# DEC-089 — Alertas del listado de contratos: vencido y pólizas vencidas

**Fecha:** 2026-10-27 · **Tipo:** Obligatoria · **ADR:** [0015](../adr/0015-contratos.md), [0018](../adr/0018-polizas.md), [0002](../adr/0002-dashboard.md)

Pedido por el usuario el 2026-10-27: filtros de contratos vencidos y de pólizas vencidas, en el módulo de contratos y en el tablero, y que los filtros del listado quepan en la pantalla.

## Contexto

- El listado tenía nueve pestañas (Todos, cinco estados y "Contrato próximo a vencer", "Pólizas por vencer" y "Contrato sin póliza", DEC-072 y DEC-088) en la misma línea que Filtros, Exportar y Nuevo. Con dos más no cabían.
- Las tres que no son estados iban en el mismo parámetro que el estado (`state`), así que no se podían combinar con él.

## Decisión

- Las pestañas son **solo los estados** del ciclo de vida. Las otras pasan a ser **alertas**, en una fila de chips con su conteo bajo el encabezado (`AlertChips`), en un parámetro propio (`alert`, `CONTRACT_ALERTS`). Se elige una a la vez y se combina con la pestaña: el listado cumple las dos, los estados cuentan dentro de la alerta y las alertas, dentro del estado.
- Cinco alertas, con un solo predicado cada una (`contractAlertWheres`) para el listado, su reporte y el tablero de la obra:
  - **Próximo a vencer** (DEC-072): en ejecución, fecha fin de hoy a hoy + días de aviso.
  - **Contrato vencido** (nueva): **en ejecución** y con la fecha fin anterior a hoy. Es el complemento de la anterior. El suspendido tiene la fecha fin provisional, y en liquidación ya se está cerrando.
  - **Pólizas por vencer** (DEC-072): sin cambios, **sigue incluyendo las vencidas** (decisión del usuario).
  - **Pólizas vencidas** (nueva): no liquidados ni anulados con alguna póliza vigente cuyo fin de vigencia es anterior a hoy. Es un subconjunto de la anterior.
  - **Sin póliza** (DEC-088): sin cambios.
- Las tres de pólizas exigen el permiso de verlas (403 sin él, y sin él no se cuentan ni se muestran).
- Tableros: el general suma la alerta "contrato(s) vencido(s)", que lleva a `/work/contracts?alert=EXPIRED` con el mismo predicado; el de la obra tiene las mismas pestañas y alertas en su lista de contratos, y "contratos vencidos" en lo que hay por atender. La alerta "con póliza vencida" del tablero general no cambia: sigue clasificando por la póliza de mayor exposición (DEC-064).
- El aviso de vencimiento de la campana (DEC-072) no cambia.

## Descartado

- Dejar todo en pestañas con desplazamiento: el problema de espacio seguía.
- Llevar las alertas al panel Filtros: los conteos dejaban de verse.
- Separar "Pólizas por vencer" de las vencidas: el usuario prefirió conservarla como estaba.

## Qué implica

- Una alerta nueva se agrega en `CONTRACT_ALERTS` (servidor), en `contractAlertWheres` y en `CONTRACT_ALERT_OPTIONS` (cliente), que deben coincidir.
- `state` ya no admite `EXPIRING`, `POLICIES_EXPIRING` ni `NO_POLICIES`: van en `alert`.

## Dónde

`server/src/modules/work/contracts/contractTerms.js` (`CONTRACT_ALERTS`, `CONTRACT_ALERT_NAMES`, `POLICY_ALERTS`), `contractAlerts.js` (`contractAlertWheres`), `expirationNotice.service.js` (`expiredContractsWhere`, `contractsWithExpiredPoliciesWhere`), `contracts.service.js` (`contractListQuery`, `paginationContracts`, `exportFilterLines`), `contracts.validation.js`, `contracts.controller.js`, `app/dashboard/dashboard.service.js`, `app/dashboard/workDashboard.service.js` · Cliente: `ui-component/extended/AlertChips.jsx`, `MasterPage.jsx` (`alerts`, `initialAlert`), `utils/constants.js` (`CONTRACT_ALERT_OPTIONS`), `views/work/contracts/ContractsPage.jsx`, `views/dashboard/Default/GeneralDashboard.jsx`, `work/WorkContracts.jsx`, `work/WorkSummaryTab.jsx` · Tests: `contracts.service.test.js`, `workDashboard.service.test.js`.
