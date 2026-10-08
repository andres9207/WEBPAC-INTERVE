# DEC-052 — Tablero: indicadores en la base de datos, estado de pólizas por contrato con un solo predicado y bloques según los permisos

**Fecha:** 2026-10-08 · **Tipo:** Obligatoria · **ADR:** [0002](../adr/0002-dashboard.md), [0018](../adr/0018-polizas.md), [0014](../adr/0014-autorizacion-permisos.md) · **Decisiones:** [DEC-047](DEC-047-alcance-por-obra.md), [DEC-050](DEC-050-polizas.md)

Implementa ADR-0002 sobre lo que hoy existe: obras, proveedores, contratos, pólizas y facturas. Cubre las tareas PRO-BD-24, PRO-BE-34, PRO-BE-35, PRO-FE-15, PRO-FE-16 y PRO-QA-06, y cierra PRO-BE-22 (criterio 5 obligatorio de PRO-BE-34).

El usuario decidió el 2026-10-08:

- **B5, la póliza que manda:** el peor estado.
- **Universo del estado de pólizas:** todos los contratos no eliminados, también los liquidados.
- **B7, qué facturas cuentan:** las registradas y las aprobadas; las anuladas no.
- **Alcance:** solo datos reales, con el estilo de Berry. El rediseño del mockup (menú lateral, marca "Intervé 360", foto en la bienvenida) no se hace: choca con [DESIGN_SYSTEM](../standards/DESIGN_SYSTEM.md) ("no se cambia la marca de Berry", "sin ilustraciones"). El logo queda pendiente (ADR-0002).
- **Tema:** solo el claro. El proyecto no tiene tema oscuro.

## Decisión

- **Dónde vive:** `server/src/modules/app/dashboard/` (área transversal existente), montado en `/api/app/dashboard`, con un solo endpoint de lectura, `get_summary`. En el cliente, la vista que ya existía, `views/dashboard/Default/`, y `api/requests/dashboardApi.js`.
- **Cálculo en la base de datos, bajo demanda:** `count` y `groupBy` de Prisma, sin precálculo, vistas ni caché (ADR-0002, decisión 10). Fecha de referencia del servidor; umbral de "a vencer", el de las pólizas (`POLICY_EXPIRING_DAYS`, 30 por defecto), devuelto en la respuesta.
- **Estado de pólizas por contrato.** Cada contrato cae en exactamente una categoría, y la suma es el total:
  - **Sin póliza:** no tiene ninguna póliza vigente (`pol_is_current`).
  - **Sin fecha de vigencia:** ninguna de sus pólizas vigentes tiene fecha fin.
  - **Con póliza vencida**, **con póliza a vencer** o **pólizas vigentes:** manda el peor estado entre las pólizas con fecha. Una póliza sin fecha no cambia el estado de un contrato que tiene otras con fecha.
  - Los límites son los de `policyValidity` del expediente: vencida si fin < hoy; a vencer si hoy ≤ fin ≤ hoy + umbral; vigente después.
- **Un solo predicado (PRO-BE-22, PRO-BE-35):** `policyTerms.js` tiene la regla en las dos formas que necesita el sistema, una junto a la otra:
  - `contractPolicyStatus`: en memoria, sobre las pólizas de un contrato.
  - `contractPolicyStatusWhere`: el filtro Prisma. Con él cuenta el tablero y filtra el listado de contratos (`policyStatus`).
  - `uncoveredContractsWhere`: contratos con algún concepto sin póliza vigente, el mismo criterio que `uncoveredConcepts`. Lo usan el tablero y el listado (`uncovered`).
  - Un test aplica el filtro Prisma a datos en memoria y lo cruza con la regla en todas las combinaciones de hasta tres pólizas en los bordes de la vigencia: cada contrato coincide con exactamente una categoría, la misma de la regla.
- **Permisos (ADR-0002, decisión 8):** sin permiso propio de tablero, porque es la pantalla de inicio de todos. Cada bloque se calcula solo si el usuario puede ver su módulo:

  | Bloque | Exige |
  | --- | --- |
  | Obras activas, obras en seguimiento | Ver obras (52); las cifras de contratos y facturas de cada obra, además, su permiso |
  | Proveedores activos | Ver proveedores (60) |
  | Contratos por estado | Ver contratos (68) |
  | Estado de pólizas, pólizas vigentes, vencidas o por vencer | Ver contratos (68) **y** ver pólizas (99) |
  | Facturas por aprobar, por obra y últimas | Ver facturas (83) |

  Filtrar el listado de contratos por estado de pólizas exige también el permiso 99: si falta, 403.
- **Alcance por obra (DEC-047):** todas las consultas llevan el alcance de la petición. El controller del tablero entra en la prueba de arquitectura que lo exige (`workScope.guard.test.js`).
- **Clic en una cifra:** lleva al listado con el filtro en la URL (`/work/contracts?policyStatus=EXPIRED`, `?uncovered=true`, `?status=IN_PROGRESS`; `/billing/invoices?status=REGISTERED`, `?wrkId=…`). El listado lo lee una vez (`useLinkedFilters`), lo envía en la petición y muestra un aviso para quitarlo (`LinkedFilterNotice`). `MasterPage` acepta la pestaña inicial (`initialStatus`).
- **Gráficos** con `react-apexcharts`, ya instalado. Colores por clave de la paleta, nunca hex:
  - Estado de pólizas: una sola serie, barras horizontales en `primary.800`, cada una con su nombre. La lista de al lado es la vista en texto.
  - Facturas por obra: dos series apiladas, registradas en `orange.dark` y aprobadas en `primary.800`, con leyenda. Validadas contra el fondo claro: contraste ≥ 3:1 y separables con daltonismo (ΔE 24,8).
- **Lo que no entra:** pagos, fondo rotatorio, comprobantes de egreso, actas, reportes y el estado "en revisión" de contratos. No existen en el sistema.

## Descartado

- **Permiso "Ver tablero":** dejaría sin pantalla de inicio a quien no lo tenga. Los permisos de cada módulo ya cumplen la decisión 8 del ADR.
- **Universo de solo contratos no liquidados:** el usuario eligió contar todos.
- **La póliza de mayor valor asegurado como la que manda:** exigía calcular el valor asegurado en la consulta. Manda el peor estado.
- **Clasificar en JavaScript y contar en memoria:** obligaría a cargar todos los contratos con sus pólizas. El filtro Prisma cuenta en la base de datos, y el test cruzado lo mantiene igual a la regla.
- **Colores de estado en las barras de pólizas:** rojo y naranja no se distinguen (ΔE 6,3) y los grises no tienen color suficiente. Una serie va en un color.

## Rendimiento (PRO-BD-24)

Medido el 2026-10-08 sobre los datos de demostración (10 contratos, 11 pólizas, 15 conceptos, 2 facturas): el resumen completo tarda entre 9 y 75 ms. Con `EXPLAIN`, las consultas usan índices existentes: `idx_policies_end_date` y `idx_policies_contract_current` (categorías y conceptos sin póliza), `idx_invoices_state` (facturas por estado) y las claves de concepto. **No se agregó ningún índice:** no hay evidencia que lo pida. Falta medir con un volumen representativo acordado.

## Qué implica

- Una regla nueva de vigencia o de cobertura se cambia en `policyTerms.js`, en sus dos formas, y el test cruzado tiene que seguir pasando.
- Un indicador nuevo lleva su filtro al listado del que sale, con el mismo predicado.
- Las consultas del tablero no corren en una sola transacción de lectura: las tarjetas pueden reflejar instantes distintos ante escrituras simultáneas (ADR-0002, "Transacciones"). No es crítico para tarjetas informativas.

## Dónde

- Servidor:
  - `server/src/modules/app/dashboard/` (routes, controller, service).
  - `server/src/modules/work/contracts/policyTerms.js`: `contractPolicyStatus`, `contractPolicyStatusWhere`, `uncoveredContractsWhere`.
  - `contracts.service.js` / `.controller.js` / `.validation.js`: filtros `policyStatus` y `uncovered` del listado.
- Cliente:
  - `client/src/views/dashboard/Default/` (vista y `components/`).
  - `client/src/hooks/useLinkedFilters.js`, `ui-component/extended/LinkedFilterNotice.jsx` y `initialStatus` en `MasterPage`.
  - Los listados de contratos, facturas, obras y proveedores leen el filtro del tablero.
- Tests:
  - `server/test/modules/work/contracts/policyTerms.test.js`: el cruce de la regla con el filtro.
  - `server/test/modules/app/dashboard/dashboard.service.test.js`.
  - `server/test/common/workScope.guard.test.js`, que ahora incluye el tablero.
