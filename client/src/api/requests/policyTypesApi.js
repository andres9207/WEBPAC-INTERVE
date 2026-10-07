import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/** Maestro de tipos de póliza: las seis llamadas estándar (DEC-020). */
export const policyTypesApi = createMasterApi('admin/policyTypes', { entity: 'policy_type', plural: 'policy_types' });

/**
 * Tipos activos para el formulario de póliza (DEC-018), cada uno con su base.
 * @param {number} [includeId]  tipo de la versión vigente: se incluye aunque esté inactivo
 */
export const getPolicyTypesSelectAPI = policyTypesApi.select;

/**
 * Cambiar la base de cálculo de un tipo (ADR-0019): permiso propio, queda en
 * la bitácora y no toca las pólizas ya emitidas.
 * @param {{ pltId: number, base: string }} params
 */
export const configurePolicyTypeBaseAPI = (params) => httpCliente.put('admin/policyTypes/configure_policy_type_base', params);
