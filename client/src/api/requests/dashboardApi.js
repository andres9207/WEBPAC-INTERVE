import httpCliente from 'api/services/httpCliente';

/**
 * Resumen del tablero (ADR-0002, DEC-052). Sin parámetros: la fecha de
 * referencia y el umbral de "a vencer" los pone el servidor, y el alcance va
 * en el encabezado de la obra elegida (DEC-047). Cada bloque llega en null si
 * el usuario no puede ver su módulo.
 */
export const getDashboardSummaryAPI = () => httpCliente.get('app/dashboard/get_summary');

/**
 * Tablero de la obra elegida en el encabezado (DEC-063): la obra viaja en
 * `X-Work-Id` y el servidor la verifica. Con "Ver todo" o sin obra, todos
 * los bloques llegan en null.
 */
export const getWorkDashboardAPI = () => httpCliente.get('app/dashboard/get_work_summary');

/**
 * Detalle de una cifra del tablero general (DEC-052): las filas de las que
 * sale, con el tope de los listados y el total. `params`: `metric` y, según
 * ella, `state`, `policyStatus`, `wrkId` o `invoiceState`.
 */
export const getDashboardDetailAPI = (params) => httpCliente.get('app/dashboard/get_summary_detail', params);
