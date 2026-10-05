import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';

/** Maestro de motivos: las seis llamadas estándar (DEC-020). */
export const reasonsApi = createMasterApi('admin/reasons', { entity: 'reason', plural: 'reasons' });

/**
 * Motivos activos de un acto (DEC-018, DEC-039), p. ej. los de suspensión.
 * @param {string} scope  acto (REASON_SCOPE_OPTIONS)
 * @param {number} [includeId]  motivo actual: se incluye aunque esté inactivo
 */
export const getReasonsSelectAPI = (scope, includeId) =>
  httpCliente.get('admin/reasons/get_reasons_select', { scope, ...(includeId ? { includeId } : {}) });
