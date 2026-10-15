# DEC-063 — Tablero de la obra: con una obra elegida, la propuesta B en dos pestañas; con "Ver todo", el tablero general

**Fecha:** 2026-10-15 · **Tipo:** Vigente · **ADR:** [0002](../adr/0002-dashboard.md) · **Decisiones:** [DEC-052](DEC-052-tablero.md), [DEC-047](DEC-047-alcance-por-obra.md)

## Contexto

El usuario pidió reemplazar el tablero de inicio por la propuesta B del lienzo de diseño ("Dashboard, propuesta B: centrado en la obra"; copia en `docs/design/dashboard-b/`). La B muestra una sola obra; con "Ver todo" en el encabezado no hay una obra que mostrar.

El usuario decidió el 2026-10-15:

- **Con una obra elegida**, la B con sus **dos pestañas**: "Resumen de la obra" y "Contratos y facturas".
- **Con "Ver todo" o sin obra**, el tablero general de DEC-052, hasta que exista el diseño del tablero de todas las obras.

## Decisión

- **Un endpoint de lectura nuevo**, `GET /api/app/dashboard/get_work_summary` (`workDashboard.service.js`), en el mismo módulo y con las mismas reglas que `get_summary` (DEC-052): sin permiso propio, cada bloque solo con el permiso de ver su módulo (obra 52, proveedores 60, contratos 68, pólizas 99 junto con contratos, facturas de las vistas que ve, DEC-054), en el alcance de la petición. La obra es la del alcance (`X-Work-Id`, verificada, DEC-047), nunca un parámetro. Con "Ver todo" o sin obra responde `wrkId: null` y todos los bloques en null, sin consultar nada más.
- **Las cifras salen de los cálculos que ya existen**, no de unos propios: valor vigente con `contractTotals`, saldos de anticipo y de retenido con `contractBalances` (las mismas sumas del expediente y de la conciliación, DEC-061), vigencia y estado de pólizas con `policyValidity`, `contractPolicyStatus` y `uncoveredConcepts`, avance del plazo con `termProgress`. Los porcentajes de las barras (contratado frente al valor de la obra, anticipo facturado y amortizado, retenido por devolver, facturado frente a lo contratado) los calcula el servidor con `ratioPercent`.
- **Facturas:** las anuladas no cuentan (B7, DEC-052). Valor de cada factura: el capturado por tipo (anticipo, VALOR de la liquidación, devolución); la simple cuenta en las cantidades, sin importe (DEC-02 pendiente). Por mes, los últimos 12 meses por fecha de la factura, aprobado y por aprobar.
- **Cliente:** `views/dashboard/Default/index.jsx` elige entre `GeneralDashboard.jsx` (el de DEC-052, sin cambios) y `work/WorkDashboard.jsx`. Estilo Berry y solo tema claro (DEC-052). Gráficos con `react-apexcharts` (facturado por mes, contratos por estado); la línea de tiempo, las barras por tipo y por contrato se dibujan con componentes, porque son barras de proporción, no series. Los importes se convierten a número solo para la escala de un gráfico (`chartAmount`); lo que se lee se formatea siempre desde el texto (`fMoneyText`).
- **Colores por clave de la paleta:** tipos de factura (anticipo `primary.800`, liquidación `orange.dark`, devolución `secondary.dark`) y estados del contrato en los gráficos, con su vista en texto al lado.

## Descartado

- **Retirar el tablero general y pedir elegir una obra con "Ver todo":** dejaría sin pantalla de inicio útil a quien ve todas las obras.
- **Sumar los saldos de todos los contratos de la obra en una sola consulta agrupada:** sería una segunda forma de calcular lo que ya hace `contractBalances`. Se llama una vez por contrato; con los datos de demostración, 9 contratos responden en menos de un segundo. Si una obra llega a tener muchos contratos, se mide antes de cambiarlo.
- **El plazo ampliado y el logo de la marca del mockup:** el plazo ampliado está oculto en la interfaz de obras, y la marca no cambia (DESIGN_SYSTEM).

## Qué implica

- Un bloque nuevo del tablero de la obra exige el permiso de ver su módulo y lee con la obra del alcance.
- Si cambia la regla de un saldo, de la vigencia o del valor del contrato, cambia en su función, y el tablero la sigue.
- Cuando exista el diseño del tablero de todas las obras, reemplaza a `GeneralDashboard.jsx` con "Ver todo".
- Rendimiento: medido con el volumen acordado junto con el tablero general ([DEC-052](DEC-052-tablero.md), "Rendimiento"). Son 70 consultas, 40 de ellas de `contractBalances`, y la mediana es de 25 ms. No hace falta índice.

## Dónde

- Servidor: `server/src/modules/app/dashboard/workDashboard.service.js`, `getWorkDashboardController` en `dashboard.controller.js` y la ruta en `dashboard.routes.js`.
- Cliente: `client/src/views/dashboard/Default/index.jsx`, `GeneralDashboard.jsx` y `work/` (`WorkDashboard.jsx`, `WorkSummaryTab.jsx`, `WorkChartsTab.jsx`, `workDashboard.utils.js`); `getWorkDashboardAPI` en `api/requests/dashboardApi.js`.
- Tests: `server/test/modules/app/dashboard/workDashboard.service.test.js`; el controller entra en `server/test/common/workScope.guard.test.js`.
- Diseño de referencia: `docs/design/dashboard-b/`.
