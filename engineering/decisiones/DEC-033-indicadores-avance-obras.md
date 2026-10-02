# DEC-033 — Listado de obras: indicadores y avance del plazo calculados en el servidor, con vista de tarjetas

**Fecha:** 2026-10-02 · **Tipo:** Vigente · **ADR:** [0011](../adr/0011-obras.md) · **Relacionada:** [DEC-030](DEC-030-obra-paginas-propias-plazo.md), [DEC-028](DEC-028-convencion-monetaria.md)

## Contexto

El prototipo de vistas aprobado con el área usuaria pide un listado de obras más visual: indicadores arriba (cuántas obras, valor vigente total, avance promedio del plazo, obras cerca de terminar) y una tarjeta por obra con su avance del plazo y sus etapas. El avance es un dato derivado de fechas, y el valor total es una suma de importes: los dos los prohíbe calcular en el cliente [`FRONTEND_STANDARD`](../standards/FRONTEND_STANDARD.md), regla 9.

## Decisión

- **Avance del plazo** = días transcurridos desde la fecha de inicio sobre los días del plazo inicial (inicio → fecha final de DEC-030), en porcentaje entero de 0 a 100. Antes del inicio es 0; desde la fecha final, 100. Sin fecha de inicio no hay avance (`null`). Lo calcula `termProgress` en `term.utils.js`.
- **"Hoy" es la fecha local del servidor** (`todayDateOnly`), no la UTC: un servidor en Colombia no adelanta el día entre las 7 p. m. y la medianoche.
- **Nivel del avance** (`progressLevel`): `NORMAL`, `WARNING` desde el 70 % y `CRITICAL` desde el 90 %. Los umbrales viven solo en el servidor; la pantalla elige el color por el nivel.
- **El listado** (`pagination_works`) devuelve además, por obra: `progressPercent`, `progressLevel`, `extendedValue`, `activeManagers` y `stages` (nombre y estado, en orden).
- **Indicadores** en `GET /api/work/works/summary_works`, con el permiso de ver obras: total, activas, inactivas, valor vigente total (suma en `Decimal`, DEC-028), avance promedio de las activas con fechas, cuántas activas están en `WARNING` o más, y el umbral (`closingThreshold`) para que la pantalla lo nombre sin repetirlo. Son de todas las obras no eliminadas: no cambian con la búsqueda ni con la pestaña.
- **Vista de tarjetas en `MasterPage`**: `header` (contenido arriba del listado) y `renderCard(row, actions)` (activa el selector Tarjetas | Tabla). Las tarjetas comparten búsqueda, pestañas, paginación y acciones con la tabla; una acción con `confirm` pasa por `ConfirmDialog`. La vista elegida se recuerda por listado en el navegador.

## Descartado

- **Calcular el avance o el total en el cliente**: rompe la regla 9 y dejaría los umbrales repetidos en dos lugares.
- **Guardar el avance en la BD**: cambia cada día; habría que recalcularlo con una tarea programada.
- **Indicadores que siguen la búsqueda**: cada búsqueda pediría el resumen de nuevo, y un indicador que cambia al escribir confunde.
- **Valor total abreviado en millones** ("$ 24.905 M", como en el prototipo): redondea un importe. Se muestra completo, con `fMoneyText`.

## Qué implica

- El resumen recorre todas las obras no eliminadas en memoria. Con cientos va bien; con miles conviene pasarlo a una consulta agregada.
- El avance usa solo el plazo inicial. Si el plazo ampliado vuelve a la pantalla (DEC-030), hay que decidir si el avance se mide contra él.

## Dónde

`server/src/common/utils/term.utils.js` (`todayDateOnly`, `termProgress`, `progressLevel`) · `server/src/common/utils/money.utils.js` (`sumMoney`) · `server/src/modules/work/works/works.service.js` (`summaryWorks`, `toListDto`) · `client/src/ui-component/extended/MasterPage.jsx` · `client/src/views/work/works/components/WorksSummary.jsx`, `WorkCard.jsx`
