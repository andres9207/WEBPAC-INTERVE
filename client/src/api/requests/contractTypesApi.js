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
