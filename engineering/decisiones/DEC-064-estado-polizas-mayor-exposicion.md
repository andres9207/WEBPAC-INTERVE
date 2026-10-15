# DEC-064 — Estado de pólizas del contrato: manda la póliza vigente de mayor valor asegurado

**Fecha:** 2026-10-15 · **Tipo:** Obligatoria · **ADR:** [0002](../adr/0002-dashboard.md) (decisión 5, B5), [0018](../adr/0018-polizas.md) · **Decisiones:** reemplaza B5 de [DEC-052](DEC-052-tablero.md)

## Contexto

ADR-0002 (decisión 5) pide que la categoría de un contrato con varias pólizas la decida "la póliza de mayor exposición", y PRO-BE-34 lo repite. DEC-052 había resuelto B5 con el peor estado: con una sola póliza vencida, aunque fuera la más pequeña, el contrato contaba como vencido. El 2026-10-15 el usuario pidió aplicar el criterio del ADR.

## Decisión

- **La exposición es el valor asegurado:** porcentaje × base del tipo, evaluada sobre la composición vigente del concepto que la póliza ampara. Se calcula con la misma función del expediente (`insuredValue` sobre `conceptAmounts`) y nunca se guarda (ADR-0018).
- **Decide la póliza vigente de mayor valor asegurado, tenga o no fecha:** si la mayor no tiene fecha, el contrato queda en "Pólizas sin fecha de vigencia", aunque otras más pequeñas estén vencidas.
- **En un empate, manda la de peor estado:** vencida, después a vencer, después vigente y, al final, sin fecha.
- **Sin pólizas vigentes**, el contrato queda en "Sin póliza". Las categorías siguen sin cruzarse y siguen sumando el total.
- **Se calcula en el servidor, no en SQL.** El valor asegurado no está en la BD y repetir la fórmula en SQL sería una segunda regla de importes (DEC-045, ADR-0026). `contractPolicyStatuses(where)` carga los contratos del alcance con sus conceptos y sus pólizas vigentes, y los clasifica con `contractPolicyStatus`. La decisión es del usuario y se aparta del "por agregación SQL" de PRO-BE-34.
- **Una sola regla para los tres usos:** el tablero general cuenta con `contractPolicyStatuses`; el listado de contratos filtra (`policyStatus`) por los ids que devuelve, dentro del mismo alcance, y el tablero de la obra usa `contractPolicyStatus` y muestra la póliza que decide (`deciding`).
- **Sin cambios:** la vigencia de cada póliza (`policyValidity`), las categorías y sus nombres, los conceptos sin póliza (`uncoveredContractsWhere`, que sigue en la BD) y los permisos.

## Descartado

- **Peor estado (DEC-052, B5):** el usuario eligió el criterio del ADR.
- **Calcular el valor asegurado en SQL:** duplicaría la composición del concepto (AIU, IVA) fuera de `conceptAmounts`.
- **Guardar el valor asegurado o la categoría:** ADR-0018 prohíbe guardarlo, y la vigencia cambia con la fecha sin que cambie ningún dato.
- **En el empate, la que vence antes:** el usuario eligió la de peor estado.

## Qué implica

- La categoría de un contrato solo se calcula con `contractPolicyStatus` / `contractPolicyStatuses`. No se escribe un filtro Prisma que la imite.
- **Rendimiento:** con "Ver todo", el tablero carga todos los contratos del alcance con sus conceptos y pólizas vigentes. Medido con el volumen acordado (DEC-052, "Rendimiento"): la mediana del tablero general con "Ver todo" pasa de 12 a 16 ms, y con una obra no cambia (10 ms). Crece con el número de contratos: si el volumen real crece, esto es lo primero que hay que volver a medir.
- Si cambia la composición del concepto o la base de un tipo de póliza, la categoría cambia con ella, sin migrar nada.

## Dónde

- `server/src/modules/work/contracts/policyTerms.js`: `policyExposure`, `decidingPolicy`, `contractPolicyStatus` y `assertPolicyStatus`. `contractPolicyStatusWhere` se eliminó.
- `server/src/modules/work/contracts/contractPolicies.service.js`: `contractPolicyStatuses` y `POLICY_STATUS_SELECT`.
- `server/src/modules/work/contracts/contracts.service.js`: filtro `policyStatus` de `paginationContracts`.
- `server/src/modules/app/dashboard/dashboard.service.js` (`policiesBlock`) y `workDashboard.service.js` (`deciding`).
- Cliente: `views/dashboard/Default/components/PolicyStatusCard.jsx` (el texto de la regla) y `work/WorkSummaryTab.jsx` (la póliza que decide).
- Tests: `policyTerms.test.js` (mayor exposición, sin fecha, empates, exhaustividad), `dashboard.service.test.js`, `workDashboard.service.test.js` y `contracts.service.test.js` (el filtro del listado, 403 y 400).
- Probado en vivo sobre el volumen acordado: con "Ver todo" y con una obra, cada categoría del tablero da la misma cifra que el filtro del listado, y las categorías suman el total (117 y 10).
