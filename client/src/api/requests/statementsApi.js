import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/**
 * Extractos de la obra (DEC-084), el acta de WebPAC. Las rutas de listado,
 * detalle, guardado, estado y eliminación tienen la forma de las de un
 * maestro, así que se reutiliza createMasterApi; `save` lleva la obra al crear.
 */
export const statementsApi = createMasterApi('billing/statements', { entity: 'statement', plural: 'statements' });

/**
 * Extractos activos de una obra para el formulario de factura, el más reciente primero.
 * @param {{ wrkId: number, includeId?: number }} params  `includeId`: el que ya tiene la factura, aunque esté inactivo
 */
export const getStatementsSelectAPI = (params) => httpCliente.get('billing/statements/get_statements_select', params);

/** Reporte del extracto: sus facturas, totales por menú y las aprobadas sin comprobante de egreso. */
export const getStatementReportAPI = (stmId) => httpCliente.get('billing/statements/get_statement_report', { stmId });

/** El reporte en Excel o PDF (DEC-070). @param {'xlsx'|'pdf'} format */
export const exportStatementAPI = (stmId, format) => httpCliente.post('billing/statements/export_statement', { stmId, format }, { responseType: 'blob' });
