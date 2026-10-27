import httpCliente from 'api/services/httpCliente';

/**
 * Extractos (DEC-084). La pantalla es de solo lectura: agrupa las facturas
 * por el texto de su campo Extracto. Los extractos registrados solo los usan
 * las glosas.
 */

/**
 * Extractos registrados activos de una obra, para las glosas, el más reciente primero.
 * @param {{ wrkId: number, includeId?: number }} params  `includeId`: uno que ya se usa, aunque esté inactivo
 */
export const getStatementsSelectAPI = (params) => httpCliente.get('billing/statements/get_statements_select', params);

/**
 * Extractos escritos en las facturas (solo lectura): uno por obra y texto, con
 * sus facturas, fechas y total. @param {{ search?, first, rows, sortField, sortOrder }} params
 */
export const paginationStatementGroupsAPI = (params) => httpCliente.post('billing/statements/pagination_statement_groups', params);

/** Reporte de un extracto escrito: sus facturas, totales por menú y las aprobadas sin comprobante de egreso. */
export const getStatementGroupReportAPI = ({ wrkId, number }) =>
  httpCliente.get('billing/statements/get_statement_group_report', { wrkId, number });

/** El reporte en Excel o PDF (DEC-070). @param {'xlsx'|'pdf'} format */
export const exportStatementGroupAPI = ({ wrkId, number }, format) =>
  httpCliente.post('billing/statements/export_statement_group', { wrkId, number, format }, { responseType: 'blob' });
