import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de dirección: las seis llamadas estándar (DEC-020). */
export const addressTypesApi = createMasterApi('admin/addressTypes', {
  entity: 'address_type',
  plural: 'address_types'
});

/**
 * Tipos activos para el componente de contactos compartido entre obra y proveedor (DEC-018).
 * @param {number} [includeId]  tipo actual del contacto que se edita: se incluye aunque esté inactivo
 */
export const getAddressTypesSelectAPI = addressTypesApi.select;
