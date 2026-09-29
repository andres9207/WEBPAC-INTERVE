import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de proveedor: las seis llamadas estándar (DEC-020). */
export const providerTypesApi = createMasterApi('admin/providerTypes', {
  entity: 'provider_type',
  plural: 'provider_types'
});

/**
 * Tipos activos para el selector del formulario de proveedor (DEC-018).
 * @param {number} [includeId]  tipo actual del proveedor que se edita: se incluye aunque esté inactivo
 */
export const getProviderTypesSelectAPI = providerTypesApi.select;
