import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/**
 * Obras (DEC-026). Las rutas de listado, detalle, guardado, estado y
 * eliminación tienen la misma forma que las de un maestro, así que se
 * reutiliza createMasterApi. `save` envía la obra con sus responsables y
 * etapas en una sola petición.
 */
export const worksApi = createMasterApi('work/works', { entity: 'work', plural: 'works' });

/**
 * Obras que el usuario puede elegir en el selector del encabezado (DEC-047):
 * `{ viewAll, works: [{ value, label, active }] }`. Con `viewAll`, todas las
 * obras y además la opción "Ver todo".
 */
export const getMyWorksSelectAPI = () => httpCliente.get('work/works/select_my_works');

/**
 * Reporte del listado en Excel o PDF (DEC-070), con los mismos filtros, pestaña, búsqueda y orden.
 * @param {object} params  los del listado, sin paginación
 * @param {'xlsx'|'pdf'} format
 */
export const exportWorksAPI = (params, format) => httpCliente.post('work/works/export_works', { ...params, format }, { responseType: 'blob' });

/** Indicadores del listado de obras (DEC-033): conteos, valor vigente total y avance. */
export const getWorksSummaryAPI = () => httpCliente.get('work/works/summary_works');

/**
 * Candidatos a responsable de obra: usuarios activos (DEC-029).
 * @param {string} [search]  texto para filtrar por nombre
 */
export const getWorkManagersSelectAPI = (search) => httpCliente.get('work/works/select_work_managers', search ? { search } : {});

/**
 * Fecha final mientras se edita la obra: la calcula el servidor (FRONTEND_STANDARD, regla 9).
 * @param {{ startDate: string, initialTerm: number|string, termUnit: string }} params
 * @returns {Promise<{ data: { endDate: string|null } }>}
 */
export const previewWorkEndDateAPI = (params) => httpCliente.get('work/works/preview_work_end_date', params);

/**
 * Finalizar o reabrir la obra (DEC-083), con el permiso de cambiar su estado.
 * @param {{ wrkId: number, state: 'IN_PROGRESS'|'FINISHED', finishDate?: string }} params
 */
export const changeWorkStateAPI = (params) => httpCliente.put('work/works/change_state_work', params);
