import { createMasterApi } from 'api/services/masterApi';

/** Maestro de aseguradoras: las seis llamadas estándar (DEC-020). */
export const insurersApi = createMasterApi('admin/insurers', {
  entity: 'insurer',
  plural: 'insurers'
});

/**
 * Aseguradoras activas para el formulario de póliza (DEC-018).
 * @param {number} [includeId]  aseguradora actual de la póliza que se edita: se incluye aunque esté inactiva
 */
export const getInsurersSelectAPI = insurersApi.select;
