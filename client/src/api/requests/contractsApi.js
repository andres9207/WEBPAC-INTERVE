import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Contratos (DEC-035). Listado, detalle, guardado y eliminación tienen la
 * forma de un maestro: se reutiliza createMasterApi. `save` crea el contrato
 * con su valor inicial (`initialConcept`) o edita la cabecera. El estado no
 * se cambia con `changeStatus`: solo lo cambian los actos (otrosí de
 * liquidación) en el servidor.
 */
export const contractsApi = createMasterApi('work/contracts', { entity: 'contract', plural: 'contracts' });

/** Obras activas para el formulario de contrato. @param {string} [search] */
export const getContractWorksSelectAPI = (search) => httpCliente.get('work/contracts/select_contract_works', search ? { search } : {});

/**
 * Etapas y proveedores asignados de una obra, para el formulario.
 * @param {{ wrkId: number, includeWksId?: number, includePrvId?: number }} params  los actuales se incluyen aunque estén inactivos
 */
export const getContractFormOptionsAPI = (params) => httpCliente.get('work/contracts/get_contract_form_options', params);

/** Actos sobre los conceptos: cada uno con su endpoint y su permiso (ADR-0016). */
export const contractConceptsApi = {
  /** @param {{ ctrId, startDate, description, directCost, ...porcentajes, extension }} params  el número lo asigna el servidor */
  createAmendment: (params, idempotencyKey) =>
    httpCliente.post('work/contracts/create_amendment', params, idempotencyConfig(idempotencyKey)),
  /** Pasa el contrato a liquidación. */
  createLiquidation: (params, idempotencyKey) =>
    httpCliente.post('work/contracts/create_liquidation', params, idempotencyConfig(idempotencyKey)),
  /** @param {{ ccpId, startDate, description, directCost, ...porcentajes, extension }} params */
  update: (params) => httpCliente.put('work/contracts/update_concept', params)
};
