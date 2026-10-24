# DEC-079 — Barras de anticipo por nivel y filtro "Anticipo" en contratos y facturas

**Fecha:** 2026-10-23 · **Tipo:** Vigente · **ADR:** [0002](../adr/0002-dashboard.md), [0024](../adr/0024-amortizacion-anticipo.md)

Decidido por el usuario el 2026-10-23.

## Contexto

- La tarjeta "Anticipos" del tablero de la obra ([DEC-063](DEC-063-tablero-obra.md)) mostraba por contrato el facturado y el amortizado, los dos frente al anticipo pactado, en un solo color y solo con lo aprobado.
- Con I1 e I2 ([DEC-044](DEC-044-anticipo-amortizacion.md)) lo aprobado nunca pasa del 100 %: un aviso de exceso solo tiene sentido sumando lo registrado, que no mueve los saldos.
- Los listados no permitían encontrar las facturas de anticipo o que amortizan, ni lo que de eso está por aprobar, ni los contratos por su saldo de anticipo.

## Decisión

- **Barras del tablero.** Facturado frente al anticipo pactado; amortizado frente al anticipo facturado. Las dos suman lo por aprobar (facturas registradas), que se dibuja rayado. `amortizedPct` del contrato pasa a ser amortizado / facturado.
- **Nivel por el porcentaje con lo por aprobar**, calculado en el servidor (`advanceLevel`): menos de 50 %, azul (`primary.800`); de 50 % a menos de 80 %, amarillo (`warning.dark`); de 80 % a 100 %, verde (`success.dark`); más de 100 %, rojo (`error.dark`), con la marca del 100 % y el texto "excede".
- **En las dos pestañas:** las tarjetas de "Contratos de la obra" (Resumen) y la tarjeta "Anticipos" (Contratos y facturas) usan las mismas barras (`AdvanceBars.jsx`) y un selector "Anticipo" con las opciones del listado de contratos. Qué filtros cumple cada contrato lo manda el servidor (`advance.filters`, con `matchesContractAdvance`): el tablero no calcula el criterio. La leyenda también filtra (un clic elige una entrada y otro la quita, junto con el selector): un nivel muestra los contratos con anticipo con alguna de sus dos barras en ese nivel, y "Por aprobar", los que tienen algo por aprobar en alguna, con el nivel y los importes de cada barra que manda el servidor (`matchesAdvanceLegend`).
- **Detalle.** Con el permiso de ver facturas, cada barra de la tarjeta "Anticipos" abre sus facturas (en el resumen, la tarjeta entera ya abre el contrato): las de anticipo, o las normales y liquidaciones que amortizan, por lo que amortiza cada una.
- **Filtro "Anticipo" de facturas** (menús con contrato), sobre lo guardado: anticipo, con amortización, anticipo o amortización por aprobar, anticipo por aprobar, amortización por aprobar.
- **Filtro "Anticipo" de contratos:** con anticipo pactado, por facturar, por amortizar y amortizado por completo, por sus saldos (`contractsBalances`, los del expediente, solo aprobadas); y con anticipo o amortización por aprobar, por sus facturas registradas. Exige el permiso de ver facturas (403 sin él; el cliente no lo muestra). Va también al reporte del listado.

## Descartado

- **Las dos barras frente al pactado:** el usuario eligió medir la amortización contra lo facturado.
- **Solo lo aprobado:** el rojo no saldría nunca.

## Qué implica

- El amarillo y el verde no llegan a 3:1 sobre el fondo ([DESIGN_SYSTEM](../standards/DESIGN_SYSTEM.md), "Gráficos"). Se aceptan por pedido del usuario porque el color no es la única señal: cada barra lleva al lado su cifra, su porcentaje y, si excede, el texto; la leyenda nombra los rangos.
- Los saldos por contrato del filtro se calculan en la petición, sobre los contratos del alcance, como el filtro de pólizas del tablero (DEC-064). El service de contratos no importa el de facturas (que importa el suyo): el controller resuelve los contratos (`contractIdsByAdvance`) y el service los aplica.

## Dónde

Servidor: `app/dashboard/workDashboard.service.js` (`advanceLevel`, `advanceBar`, `pendingAdvances`), `billing/invoices/advanceFilters.js`, `invoices.service.js` (`invoiceListQuery`, `contractIdsByAdvance`), `invoices.controller.js`, `invoices.validation.js`, `work/contracts/contracts.service.js` (`advanceWhereOf`), `contracts.controller.js`, `contracts.validation.js` · Cliente: `views/dashboard/Default/work/AdvanceBars.jsx` (`AdvanceBar`, `AdvanceLegend`, `AdvanceFilter`), `WorkChartsTab.jsx` (`Advances`), `WorkSummaryTab.jsx` (`ContractCard`), `views/billing/invoices/InvoicesPage.jsx`, `views/work/contracts/ContractsPage.jsx`, `utils/constants.js` · Tests: `workDashboard.service.test.js`, `advanceFilters.test.js`, `invoices.service.test.js`, `contracts.service.test.js`, `contracts.controller.test.js`.
