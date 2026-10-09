import httpCliente from 'api/services/httpCliente';
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

/**
 * Configuración de los campos del contrato de un tipo (DEC-053): el tipo, su
 * versión vigente y todos los campos del catálogo con aplica, visible,
 * obligatorio y orden.
 * @param {number} pvtId
 */
export const getProviderTypeFieldsAPI = (pvtId) => httpCliente.get('admin/providerTypes/get_provider_type_fields', { pvtId });

/**
 * Guarda la configuración completa (permiso "Configurar campos"). Si algo
 * cambia, el servidor sube la versión.
 * @param {{ pvtId: number, fields: Array<{ cfdId, applies, visible, required, order }> }} params
 */
export const saveProviderTypeFieldsAPI = (params) => httpCliente.put('admin/providerTypes/save_provider_type_fields', params);
