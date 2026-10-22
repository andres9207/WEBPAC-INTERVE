# DEC-070 — Reportes de los listados en Excel y PDF, con sus filtros y sin paginar

**Fecha:** 2026-10-22 · **Tipo:** Obligatoria · **ADR:** [0014](../adr/0014-autorizacion-permisos.md), [0027](../adr/0027-integridad-transaccional.md)

Decidido por el usuario el 2026-10-22. Es una excepción acotada a la regla de listados de [`ENDPOINT_STANDARD`](../standards/ENDPOINT_STANDARD.md) ("ningún listado devuelve la tabla completa").

## Contexto

Se pidió exportar a Excel y PDF los listados de contratos y facturas: lo que muestra la tabla con los filtros aplicados, todas las páginas, no solo la visible. El tope de 100 filas de `paginate` lo impedía, y no había ninguna exportación ni permiso de exportar (ADR-0014, B13).

## Decisión

- **Un endpoint de reporte por listado**, aparte del paginado: `POST /api/work/contracts/export_contracts` y `POST /api/billing/invoices/export_invoices`. Reciben el mismo cuerpo que el listado (pestaña de estado, búsqueda, filtros por campo, orden) más `format` (`xlsx` o `pdf`), y responden el archivo.
- **Mismos filtros que la tabla, por construcción:** el service arma el `where` y el orden con la misma función que el listado paginado (`contractListQuery`, `invoiceListQuery`), con el alcance por obra y, en facturas, la vista. No hay un segundo camino de filtrado.
- **Sin paginar, con tope de 5.000 filas** (`EXPORT_MAX_ROWS`). Se cuenta antes de leer: si pasa del tope, responde 422 pidiendo afinar los filtros. Nunca corta el reporte en silencio. El parámetro `rows` del cuerpo se ignora.
- **Permisos propios:** 112 "Exportar contratos" y 113 "Exportar facturas" (migración `0103`). Exportar facturas exige además ver la vista del listado (403 si no).
- **Se genera en el servidor** con `exceljs` y `pdfkit` (`common/services/export.service.js`), que solo presenta: no lee la BD ni calcula. Columnas: las de la tabla. El encabezado lleva título, fecha de generación, número de filas y los filtros aplicados. En Excel los importes van como número con dos decimales; en PDF, como texto formateado. Horizontal, con encabezado repetido y numeración de páginas.
- **Reportes de control de contratos**, los del sistema que se migra (`docs/backlog/reports`), en el mismo endpoint con `report`: `control` (control de contratos: una fila por concepto vigente con su valor con IVA y, agrupados por contrato, total, Vr. pagado, % pagado y estado; fila de totales) y `advances` (anticipos y retenidos: una fila por contrato con anticipo pactado, facturado, amortizado, falta por amortizar, retenido, devolución y pendiente por devolver; fila de totales). Sin `report`, el listado. Toman los contratos con `contractListQuery`, el mismo permiso 112 y el mismo tope (de contratos).
  - Las cifras son las de las reglas que ya existen: `conceptAmounts`, `contractTotals` y los saldos de `contractBalances` (DEC-044, DEC-051), calculados para todos los contratos con `contractsBalances` en tres consultas.
  - **"Vr. pagado" = suma de las facturas aprobadas del contrato** (anticipo, liquidación y devolución de retenido). El sistema que se migra suma también la facturación del avance, que aquí no existe (DEC-01): cuando exista, se suma. El encabezado del reporte lo aclara. El % pagado es sobre el total del contrato (el sistema anterior lo calculaba por concepto y daba cifras sin sentido).
  - Las cifras de facturas de un contrato salen solo si el usuario ve la vista de facturas de su contrato (DEC-054, DEC-066); si no, van vacías y el encabezado dice cuántos.
  - El reporte de liquidaciones del sistema anterior queda pendiente: necesita la liquidación de contratos (C1–C8).
- **`renderExport` admite** filas agrupadas (`groupKey` y columnas con `group`, combinadas en Excel y mostradas una vez por grupo en PDF), una fila de totales que suma el módulo, y columnas de porcentaje.
- **El handler de un reporte** usa `handleExport` y pasa el alcance como los demás; la regla de alcance de los controllers (`workScope.guard.test.js`) también lo revisa.

## Descartado

- **Quitar el tope del listado o un parámetro `all: true`:** abriría cualquier listado a devolver la tabla entera; el estándar lo prohíbe.
- **Generarlo en el cliente pidiendo página por página:** muchas peticiones y la posibilidad de que los datos cambien entre páginas. Además requería librerías nuevas en el cliente, cuyo `yarn install` está roto (deuda).
- **Tope de 20.000 filas:** el PDF quedaba demasiado largo.

## Qué implica

- Un reporte nuevo de otro listado sigue este patrón: separar el armado del `where` del listado, `findExportRows` y `renderExport`, un permiso propio y el botón Exportar de `MasterPage` (`exportOptions`).
- Exportar es lectura: no escribe en la bitácora.

## Dónde

`server/src/common/services/export.service.js`, `work/contracts/contracts.{service,controller,routes,validation}.js` (`exportContracts`), `billing/invoices/invoices.{service,controller,routes,validation}.js` (`exportInvoices`), `common/utils/validation.utils.js` (`exportFormatRule`), `database/migrations/0103_seed_export_permissions.sql`, `client/src/ui-component/extended/MasterPage.jsx` (`exportOptions`), `client/src/views/work/contracts/ContractsPage.jsx`, `client/src/views/billing/invoices/InvoicesPage.jsx`. Reportes de control: `work/contracts/contractReports.service.js` (`exportContractReport`), `billing/invoices/invoices.service.js` (`contractsBalances`), `client/src/ui-component/extended/ExportButton.jsx` (`reports`).
