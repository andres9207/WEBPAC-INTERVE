import httpCliente from 'api/services/httpCliente';

/**
 * Resumen del tablero (ADR-0002, DEC-052). Sin parámetros: la fecha de
 * referencia y el umbral de "a vencer" los pone el servidor, y el alcance va
 * en el encabezado de la obra elegida (DEC-047). Cada bloque llega en null si
 * el usuario no puede ver su módulo.
 */
export const getDashboardSummaryAPI = () => httpCliente.get('app/dashboard/get_summary');
