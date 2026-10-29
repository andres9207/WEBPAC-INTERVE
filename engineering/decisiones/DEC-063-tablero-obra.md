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

El usuario pidió el drill-down de los elementos y gráficos del tablero de la obra, y eligió un **panel dentro del tablero** (no navegar al listado), solo en el tablero de la obra; el general sigue llevando al listado (DEC-052). Desde el 2026-10-29 el general también abre un panel, con las filas pedidas al servidor (DEC-052, "Detalle de cada cifra").

- **Por qué un panel y no el listado:** una cifra de facturas junta filas de varias vistas (simples, contrato mayor y subcontratistas, DEC-054), y cada vista es un listado distinto con su permiso. El panel las muestra juntas, y cada fila abre su expediente con su vista.
- **Las mismas filas, el mismo criterio:** `invoices.items` trae las facturas de las que salen las cifras: las no anuladas de la obra en las vistas del usuario, con el valor con que entran en las sumas. Reemplaza a `marks`, que eran solo las de contrato. El cliente filtra esas filas con el predicado de la cifra (mes por la fecha de la factura y estado, tipo, contrato), y los contratos, sobre `contracts.items` (estado, etapa, con anticipo facturado, con retenido por devolver). **El total del panel es el de la cifra del servidor**; el cliente no suma importes.
- **Qué abre detalle:** en "Contratos y facturas", las cuatro cifras, las barras y las etiquetas de "Facturado por mes", los segmentos y la lista de "Facturas por tipo", los segmentos y el total de cada contrato en "Facturado por contrato" y la dona y la lista de "Contratos por estado". Las marcas de la línea de tiempo abren su factura y el nombre de cada contrato en "Anticipos", su expediente. En "Resumen de la obra", las cifras Contratado y Facturado aprobado (antes llevaban a un listado, y la de facturas, a una sola vista) y las etapas con contratos; "Por atender" con varios contratos o facturas, "Ver todas" las facturas y "Ver contratos".
- **Nada del tablero de la obra lleva a otro menú (2026-10-22, pedido del usuario):** los expedientes de obra, proveedor, contrato y factura se abren encima del tablero, como rutas hijas de `/home/default` (`works/:wrkId`, `providers/:prvId`, `contracts/:ctrId`, `invoices/:invId`; `dashboardTo`), con el mismo `RouteDialog` de su módulo. El tablero da `returnTo` en el contexto de la ruta, y cerrar vuelve a él sin recargarlo; el panel de detalle sigue abierto debajo. Lo que cambie un expediente (aprobar, anular) recarga el tablero con `refresh`. La factura no lleva su vista en esa dirección: la API la lee con las vistas del usuario. Sin `returnTo`, cada expediente vuelve a su listado como antes. Las acciones dentro del expediente (editar un contrato o una factura, registrar una factura, ver otro registro relacionado) siguen yendo a su módulo.
- **Teclado:** las listas, las cifras y los totales son botones o enlaces. Las barras de ApexCharts y los segmentos solo responden al clic; por teclado se llega al mismo detalle desde la lista de al lado, salvo "Facturado por mes", que no tiene lista.
- **Componentes:** `work/DrillDownDialog.jsx` (`useDrillDown`, `invoiceRows`, `contractRows`), sobre `BaseDialog`. `DashboardCards` acepta `onClick` además de `to`. `returnTo` en `ContractDetailPage`, `InvoiceDetailPage`, `WorkDetailPage` y `ProviderDetailPage`; las rutas, en `MainRoutes.jsx`, y el `Outlet`, en `views/dashboard/Default/index.jsx`.

## Pestaña Pólizas (2026-10-22)

El usuario pidió una tercera pestaña con las pólizas de la obra, como la del sistema que se migra: cinco cifras y una tabla.

- **Solo con pólizas visibles:** la pestaña aparece si el bloque de contratos trae pólizas (ver contratos y pólizas, como el resto del bloque).
- **Cifras, del servidor** (`contracts.policyCounts`): las pólizas vigentes (versión vigente, `pol_is_current`) por vigencia con `policyValidity` y el umbral de DEC-072 (vencidas, a vencer, vigentes, sin fecha de vigencia), y los **contratos sin ninguna póliza vigente**: la categoría "Sin póliza" de `contractPolicyStatus` (DEC-064), no los contratos con algún concepto sin póliza. Cuentan **todos los contratos de la obra**, también los liquidados, como el resto del tablero (decidido por el usuario).
- **Tabla:** una fila por póliza vigente y una por contrato sin póliza, con tipo de contrato, nombre y número, tipo de valor (el concepto amparado: valor inicial u otrosí, `conceptLabel`), tipo de póliza, vencimiento y estado. El cliente solo filtra y pagina esas filas. Cada cifra filtra la tabla por su estado; el ojo abre el expediente del contrato encima del tablero.
- **Filtros con el botón "Filtros"** (DEC-048), no en una fila bajo los encabezados como en el sistema que se migra: un solo patrón de listados.
- **Datos agregados a la respuesta**, sin consultas nuevas: `contractTypeName` en cada contrato, `conceptLabel` en cada póliza y `policyCounts`.
- **"Por atender" del resumen (2026-10-22):** la cifra suma **registros**, no avisos (un aviso como "2 contratos con conceptos sin póliza" vale 2), el texto nombra los avisos que hay y el clic lleva a la tarjeta "Por atender en la obra", donde cada aviso abre su contrato o su detalle. Antes contaba avisos, decía siempre lo mismo y no respondía al clic. La pestaña Pólizas y "Por atender" no cuentan lo mismo: "Contratos sin póliza" son los que no tienen ninguna; el aviso de conceptos sin póliza incluye también un contrato con el valor inicial amparado y un otrosí sin amparar.

## Analítica: costo ejecutado y estado de costos (2026-10-27)

El usuario pidió en el Resumen, entre las cifras y los contratos de la obra, las dos donas del sistema que se migra. Cierra el costo ejecutado y el estado de costos de ADR-0002 para el tablero de la obra. Decidido por el usuario:

- **Ejecutado:** las facturas **aprobadas** de la obra, de los **cinco tipos** (también anticipo y devolución de retenido), con el valor con que ya suman en el tablero (`invoiceValue`: el capturado en las de contrato y el total facturado en la simple, DEC-065). Una simple sin importes cuenta en la cantidad (`unpriced`) y no en el valor.
- **Por tipo** es por **menú de facturas** (el tipo de proveedor de la factura, DEC-074), no por tipo de factura: lo que agrupa el sistema que se migra. De mayor a menor; los colores, por posición, con las claves de DEC-063.
- **Estado de costos:** ejecutado frente al **valor vigente de la obra** (el ampliado si existe). Pendiente = valor vigente − ejecutado, sin bajar de 0; lo que pasa del valor vigente va en `exceeded` y se muestra como fila, no como porción. Solo si el usuario ve la obra y las facturas.
- **Colores** (2026-10-29): las dos donas usan primero las series de esta ficha. Los menús van por posición en `primary.800`, `orange.dark`, `cyan.main`, `success.dark`, `secondary.main` y `grey.600`. En el estado de costos, ejecutado va en `primary.800` y pendiente en `orange.dark`. Antes había dos azules (`primary.800` y `primary.200`) y, en el modo oscuro, el pendiente (`#26406b`) se confundía con el fondo de la tarjeta.
- **Servidor:** `invoices.executed` (`value`, `count`, `byMenu` y `status`), calculado con `sumMoney` y `ratioPercent`. **Cliente:** `work/WorkCosts.jsx`. Lo ejecutado y cada menú abren sus facturas aprobadas en el detalle; lo pendiente no tiene filas.

## Pestañas de contratos en el resumen (2026-10-27)

La tarjeta "Contratos de la obra" tiene las pestañas del listado de contratos (`StatusTabs`, con `CONTRACT_STATE_FILTER` y las dos de pólizas de `ContractsPage`), que se combinan con el filtro y la leyenda de anticipo. Las que no son un estado ("Contrato próximo a vencer", "Pólizas por vencer", "Contrato sin póliza") salen de **los mismos predicados del listado** (`expiringContractsWhere`, `contractsWithExpiringPoliciesWhere`, `contractsWithoutPoliciesWhere`) con los días de las reglas de negocio, en la obra: el servidor manda en cada contrato `listTabs` y los conteos en `contracts.statusCounts`. Las de pólizas, solo con el permiso de verlas, como en el listado.

Desde el mismo día la sección vive en `work/WorkContracts.jsx`, con búsqueda (número, nombre, proveedor, etapa), orden (número, valor vigente, fecha fin, avance facturado) y dos vistas, tarjetas compactas o tabla paginada; la vista elegida se recuerda en el navegador. Cada contrato trae del servidor:

- **Avance facturado** (`progress`): el VALOR de sus facturas normales y de liquidación **aprobadas** sobre la base vigente antes de IVA (`currentBase`), la misma medida de I5 (DEC-071). El anticipo no entra porque se amortiza dentro de ellas. Su nivel usa la escala de las barras de anticipo (DEC-079). Solo si el usuario ve facturas.
- **Días a la fecha fin** (`remainingDays`), con la fecha del servidor; la tarjeta los muestra solo en ejecución y suspendido.
- El detalle del anticipo queda plegado en la tarjeta: se ve el pactado y los porcentajes facturado y amortizado, y las barras al desplegarlo.

## Facturas por tipo de proveedor y glosas (2026-10-28)

El usuario pidió en "Contratos y facturas" dos donas con detalle. Decidido por el usuario:

- **Facturas por tipo de proveedor:** cuenta **facturas**, no contratos, para que entre la Simple, que no firma contratos. Es por **menú** (el tipo de proveedor de la factura, DEC-074), con las registradas y las aprobadas, sin las anuladas (las mismas filas de "Facturas por tipo"). Por menú: cantidad, valor total (`invoiceValue`), lo que de él es **anticipo** (el valor de sus facturas de anticipo) y las simples sin importes (`unpriced`). De mayor a menor cantidad; los colores, por posición. El detalle: las facturas del menú. Servidor: `invoices.byProviderType`.
- **Glosas** (DEC-085): **cerrada = liberada**. Abiertas y liberadas, con cuántas y la suma de su valor con signo. Las eliminadas no cuentan (`liveGlossesWhere`, el criterio del filtro «Glosas», DEC-093), ni las de una factura eliminada; las de una anulada, sí, como en el filtro. El detalle: cada glosa con su factura, la descripción, el campo, el código, el extracto y, si se liberó, la fecha y la factura que la liberó; abre la factura. Las filas llegan con tope de 100 por grupo, de la más reciente a la más antigua, y el detalle dice cuando se cortan. Servidor: `invoices.glosses` (`count`, `open`, `released`, `items`).
- Las dos, con el permiso de ver facturas, en el bloque de facturas. Cliente: `InvoicesByProviderType` y `Glosses` en `work/WorkChartsTab.jsx`, sobre la dona con tabla `DonutBreakdown`; las filas del detalle, `glossRows` en `DrillDownDialog.jsx`.

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
- Cliente: `client/src/views/dashboard/Default/index.jsx`, `GeneralDashboard.jsx` y `work/` (`WorkDashboard.jsx`, `WorkSummaryTab.jsx`, `WorkContracts.jsx`, `WorkCosts.jsx`, `WorkChartsTab.jsx`, `WorkPoliciesTab.jsx`, `workDashboard.utils.js`); `getWorkDashboardAPI` en `api/requests/dashboardApi.js`.
- Tests: `server/test/modules/app/dashboard/workDashboard.service.test.js`; el controller entra en `server/test/common/workScope.guard.test.js`.
- Diseño de referencia: `docs/design/dashboard-b/`.
