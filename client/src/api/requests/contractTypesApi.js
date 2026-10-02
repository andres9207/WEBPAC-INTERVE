import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de contrato: las seis llamadas estándar (DEC-020). */
export const contractTypesApi = createMasterApi('admin/contractTypes', {
  entity: 'contract_type',
  plural: 'contract_types'
});

/**
 * Tipos de contrato activos para el formulario de obra (DEC-018).
 * @param {number} [includeId]  tipo actual de la obra que se edita: se incluye aunque esté inactivo
 */
export const getContractTypesSelectAPI = contractTypesApi.select;

/**
 * Configuración de campos de un tipo (DEC-037): el tipo, su versión vigente
 * y todos los campos del catálogo con aplica, visible, obligatorio y orden.
 * @param {number} cttId
 */
export const getContractTypeFieldsAPI = (cttId) => httpCliente.get('admin/contractTypes/get_contract_type_fields', { cttId });

/**
 * Guarda la configuración completa (permiso "Configurar campos"). Si algo
 * cambia, el servidor sube la versión.
 * @param {{ cttId: number, fields: Array<{ cfdId, applies, visible, required, order }> }} params
 */
export const saveContractTypeFieldsAPI = (params) => httpCliente.put('admin/contractTypes/save_contract_type_fields', params);
