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

/**
 * Fecha fin mientras se edita el contrato: la calcula el servidor (FRONTEND_STANDARD, regla 9).
 * Con `ctrId`, suma las prórrogas y los días suspendidos del contrato.
 * @param {{ ctrId?: number, startDate: string, term: number|string, termUnit: string }} params
 * @returns {Promise<{ data: { endDate: string|null } }>}
 */
export const previewContractEndDateAPI = (params) => httpCliente.get('work/contracts/preview_contract_end_date', params);

/**
 * Descriptores de los campos configurables de un tipo de contrato (ADR-0006,
 * DEC-037): la configuración vigente o, con `version`, la de esa versión.
 * @param {{ cttId: number, version?: number }} params
 */
export const getContractFieldsAPI = (params) => httpCliente.get('work/contracts/get_contract_fields', params);

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

/**
 * Suspender un contrato en ejecución (ADR-0017, DEC-039). No hay llamada de
 * levantar: lo hace el otrosí que reanuda el contrato (`createAmendment` con
 * `liftDate`), con el permiso de levantar.
 * @param {{ ctrId, reaId, suspensionDate, liftCondition, observation, requiresReport }} params
 */
export const suspendContractAPI = (params, idempotencyKey) =>
  httpCliente.post('work/contracts/suspend_contract', params, idempotencyConfig(idempotencyKey));

/**
 * Pólizas del contrato (ADR-0018, DEC-050). La base y el valor asegurado los
 * pone el servidor: nunca se envían.
 */
export const contractPoliciesApi = {
  /** Pólizas agrupadas con sus versiones, conceptos sin póliza y umbral de "a vencer". @param {number} ctrId */
  list: (ctrId) => httpCliente.get('work/contracts/get_contract_policies', { ctrId }),
  /** @param {{ ctrId, ccpId, pltId, insId, number, percentage, startDate, endDate, observation }} params */
  create: (params, idempotencyKey) => httpCliente.post('work/contracts/create_policy', params, idempotencyConfig(idempotencyKey)),
  /** Modificar: emite la versión siguiente. @param {{ polId, pltId, insId, number, percentage, startDate, endDate, observation }} params */
  createVersion: (params, idempotencyKey) =>
    httpCliente.post('work/contracts/create_policy_version', params, idempotencyConfig(idempotencyKey)),
  /** @param {{ polId, reaId, observation }} params */
  cancel: (params) => httpCliente.put('work/contracts/cancel_policy', params)
};
