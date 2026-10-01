import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Proveedores (DEC-031). Listado, detalle, guardado, estado y eliminación
 * tienen la forma de un maestro: se reutiliza createMasterApi. `save` envía el
 * proveedor con sus contactos; al crear desde una obra, también `assignment`.
 * Un 409 por documento repetido trae el proveedor existente en
 * `err.response.data.data.existing` (ADR-0012, decisión 7).
 */
export const providersApi = createMasterApi('work/providers', { entity: 'provider', plural: 'providers' });

/**
 * ¿Ya hay un proveedor con este documento? Coincidencia exacta del par.
 * @param {{ iddId: number, identification: string, excludeId?: number }} params
 */
export const checkProviderIdentificationAPI = (params) => httpCliente.get('work/providers/check_provider_identification', params);

/**
 * Proveedores activos para asignar a una obra, sin los ya asignados a ella.
 * @param {{ search?: string, wrkId?: number }} params
 */
export const getProvidersSelectAPI = (params) => httpCliente.get('work/providers/select_providers', params);

/** Asignación proveedor-obra: endpoints propios (DEC-031). */
export const workProvidersApi = {
  /** @param {{ wrkId: number, rows, first, search? }} params */
  pagination: (params) => httpCliente.post('work/providers/pagination_work_providers', params),
  /**
   * @param {{ wrkId, prvId, assignmentDate, observation }} params
   * @param {string} idempotencyKey  una por diálogo abierto (utils/idempotency.js)
   */
  assign: (params, idempotencyKey) => httpCliente.post('work/providers/assign_provider_work', params, idempotencyConfig(idempotencyKey)),
  /** @param {{ wrkId, prvId, assignmentDate, observation, staId }} params */
  update: (params) => httpCliente.put('work/providers/update_provider_work', params),
  /** @param {{ wrkId, prvId }} params  el proveedor sigue en el maestro */
  unassign: (params) => httpCliente.put('work/providers/unassign_provider_work', params)
};
