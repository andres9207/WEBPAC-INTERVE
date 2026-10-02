import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/**
 * Obras (DEC-026). Las rutas de listado, detalle, guardado, estado y
 * eliminación tienen la misma forma que las de un maestro, así que se
 * reutiliza createMasterApi. `save` envía la obra con sus responsables y
 * etapas en una sola petición.
 */
export const worksApi = createMasterApi('work/works', { entity: 'work', plural: 'works' });

/** Indicadores del listado de obras (DEC-033): conteos, valor vigente total y avance. */
export const getWorksSummaryAPI = () => httpCliente.get('work/works/summary_works');

/**
 * Candidatos a responsable de obra: usuarios activos (DEC-029).
 * @param {string} [search]  texto para filtrar por nombre
 */
export const getWorkManagersSelectAPI = (search) => httpCliente.get('work/works/select_work_managers', search ? { search } : {});
