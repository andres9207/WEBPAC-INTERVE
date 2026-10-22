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
- **Colores por clave de la paleta**, con su vista en texto al lado:
  - Tipos de factura: anticipo `primary.800`, liquidación `orange.dark`, devolución `cyan.main` y simple `grey.600`.
  - Estados del contrato: en ejecución `primary.800`, suspendido `cyan.main`, en liquidación `orange.dark` y liquidado `grey.600`.
  - Anticipos: facturado `primary.800` y amortizado `cyan.main`.
- **Validación de colores (2026-10-15, PRO-FE-16)**, con el validador de paletas (OKLab, simulación de daltonismo) y contraste WCAG, solo en el tema claro, que es el único que existe:
  - **Series:** `primary.800`, `orange.dark` y `cyan.main` pasan todos los pares: contraste ≥ 3:1, ΔE ≥ 16 con daltonismo y ≥ 15,9 con visión normal. Antes, el tercer color era `secondary.dark` y fallaba contra el azul (ΔE 12,7 con visión normal y 5,1 con deuteranopía); por eso se agregó `cyan.main` a la paleta.
  - **El gris es neutro a propósito:** la simple no tiene importe y liquidado es terminal. Frente al azul queda en ΔE 14,7, apenas bajo 15. Se acepta porque la simple nunca se dibuja como marca (solo aparece su muestra junto al nombre) y, en la dona, liquidado lleva separación de 2 px y la lista con nombre y cantidad.
  - **Línea de tiempo:** la etiqueta del contrato pasa a `primary.800` sobre `primary.light`, con 5,0:1 (antes, `primary.dark`, 3,2:1). La de la póliza vencida pasa a `grey.900` sobre `error.light`, con 8,2:1 (antes, `error.dark`, 2,6:1).
  - **Marcas de las facturas:** la factura por aprobar se dibuja hueca, con el borde del color de su tipo (≥ 3,07:1). Antes iba con opacidad 0,55 y quedaba entre 1,8 y 2,3:1. El estado también está en el texto de ayuda y en `aria-label`.
  - **Se acepta** el borde verde de la póliza vigente (2,2:1), porque la barra lleva su texto en `grey.900` a 14:1.

## Detalle de cada cifra (2026-10-22)

El usuario pidió el drill-down de los elementos y gráficos del tablero de la obra, y eligió un **panel dentro del tablero** (no navegar al listado), solo en el tablero de la obra; el general sigue llevando al listado (DEC-052).

- **Por qué un panel y no el listado:** una cifra de facturas junta filas de varias vistas (simples, contrato mayor y subcontratistas, DEC-054), y cada vista es un listado distinto con su permiso. El panel las muestra juntas, y cada fila abre su expediente con su vista.
- **Las mismas filas, el mismo criterio:** `invoices.items` trae las facturas de las que salen las cifras: las no anuladas de la obra en las vistas del usuario, con el valor con que entran en las sumas. Reemplaza a `marks`, que eran solo las de contrato. El cliente filtra esas filas con el predicado de la cifra (mes por la fecha de la factura y estado, tipo, contrato), y los contratos, sobre `contracts.items` (estado, etapa, con anticipo facturado, con retenido por devolver). **El total del panel es el de la cifra del servidor**; el cliente no suma importes.
- **Qué abre detalle:** en "Contratos y facturas", las cuatro cifras, las barras y las etiquetas de "Facturado por mes", los segmentos y la lista de "Facturas por tipo", los segmentos y el total de cada contrato en "Facturado por contrato" y la dona y la lista de "Contratos por estado". Las marcas de la línea de tiempo abren su factura y el nombre de cada contrato en "Anticipos", su expediente. En "Resumen de la obra", las cifras Contratado y Facturado aprobado (antes llevaban a un listado, y la de facturas, a una sola vista) y las etapas con contratos; "Por atender" con varios contratos o facturas, "Ver todas" las facturas y "Ver contratos".
- **Nada del tablero de la obra lleva a otro menú (2026-10-22, pedido del usuario):** los expedientes de obra, proveedor, contrato y factura se abren encima del tablero, como rutas hijas de `/home/default` (`works/:wrkId`, `providers/:prvId`, `contracts/:ctrId`, `invoices/:invId`; `dashboardTo`), con el mismo `RouteDialog` de su módulo. El tablero da `returnTo` en el contexto de la ruta, y cerrar vuelve a él sin recargarlo; el panel de detalle sigue abierto debajo. Lo que cambie un expediente (aprobar, anular) recarga el tablero con `refresh`. La factura no lleva su vista en esa dirección: la API la lee con las vistas del usuario. Sin `returnTo`, cada expediente vuelve a su listado como antes. Las acciones dentro del expediente (editar un contrato o una factura, registrar una factura, ver otro registro relacionado) siguen yendo a su módulo.
- **Teclado:** las listas, las cifras y los totales son botones o enlaces. Las barras de ApexCharts y los segmentos solo responden al clic; por teclado se llega al mismo detalle desde la lista de al lado, salvo "Facturado por mes", que no tiene lista.
- **Componentes:** `work/DrillDownDialog.jsx` (`useDrillDown`, `invoiceRows`, `contractRows`), sobre `BaseDialog`. `DashboardCards` acepta `onClick` además de `to`. `returnTo` en `ContractDetailPage`, `InvoiceDetailPage`, `WorkDetailPage` y `ProviderDetailPage`; las rutas, en `MainRoutes.jsx`, y el `Outlet`, en `views/dashboard/Default/index.jsx`.

## Descartado

- **Navegar al listado desde el tablero de la obra:** con facturas de varias vistas no hay un solo listado, y uno sin vista sería una ruta nueva.
- **Pedir las filas al listado de facturas, paginado:** sería una segunda consulta con su propio filtro; las filas ya llegan con el tablero y así coinciden con la cifra por construcción. Si una obra llega a tener muchas facturas, se mide el tamaño de la respuesta antes de cambiarlo.
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
