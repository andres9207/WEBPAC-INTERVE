# DEC-088 — Pestaña "Contrato sin póliza" en el listado de contratos

**Fecha:** 2026-10-27 · **Tipo:** Obligatoria · **ADR:** [0018](../adr/0018-polizas.md), [0002](../adr/0002-dashboard.md)

Pedido por el usuario el 2026-10-27, junto con el cambio de nombre de la pestaña "A vencer" a "Contrato próximo a vencer" (DEC-072).

## Contexto

- El listado solo llegaba a los contratos sin póliza desde el tablero (filtro `policyStatus=NONE`, DEC-064), sin una pestaña propia.

## Decisión

- Pestaña **"Contrato sin póliza"** (`state=NO_POLICIES`), al lado de "Pólizas por vencer": contratos **sin ninguna póliza vigente**, salvo los liquidados y los anulados (`contractsWithoutPoliciesWhere`).
- Es la categoría "Sin póliza" de DEC-064 restringida a los contratos abiertos, como "Pólizas por vencer". No es "con conceptos sin póliza" (`uncovered`): un contrato con una póliza en el valor inicial y un otrosí sin amparar no aparece aquí.
- No es un estado: no suma a "Todos" y cuenta dentro de los demás filtros.
- Revela datos de pólizas: exige el permiso de verlas (403 sin él, y sin él no se cuenta ni se muestra).
- El reporte del listado la respeta y la nombra en sus filtros.

## Descartado

- Incluir liquidados y anulados: ya no se amparan, y "Pólizas por vencer" tampoco los cuenta.

## Qué implica

- Quien cambie qué es una póliza vigente revisa este predicado junto con el de DEC-064.

## Dónde

`server/src/modules/work/contracts/policyTerms.js` (`contractsWithoutPoliciesWhere`), `contractTerms.js` (`NO_POLICIES_TAB`), `contracts.service.js` (`contractListQuery`, `paginationContracts`, `exportFilterLines`), `contracts.validation.js` · Cliente: `views/work/contracts/ContractsPage.jsx` · Tests: `contracts.service.test.js`.
