import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de interventoría: las seis llamadas estándar (DEC-020). */
export const supervisionTypesApi = createMasterApi('admin/supervisionTypes', {
  entity: 'supervision_type',
  plural: 'supervision_types'
});

/**
 * Tipos activos para el formulario de obra (DEC-018).
 * @param {number} [includeId]  tipo actual de la obra que se edita: se incluye aunque esté inactivo
 */
export const getSupervisionTypesSelectAPI = supervisionTypesApi.select;
