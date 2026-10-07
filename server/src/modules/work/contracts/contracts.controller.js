import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import * as contractsService from "./contracts.service.js";
import * as conceptsService from "./contractConcepts.service.js";
import * as suspensionsService from "./contractSuspensions.service.js";
import * as policiesService from "./contractPolicies.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005); la
// clave de idempotencia, del encabezado (DEC-016). Nada más del body llega al
// service: la fecha fin, el estado y los valores derivados nunca.

const notify = () => getIO().emit("refresh-contracts", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source?.[field]]));

const CONCEPT_FIELDS = ["directCost", "adminPct", "contingencyPct", "profitPct", "vatPct", "advancePct", "retentionPct"];
const CONTRACT_FIELDS = ["wrkId", "prvId", "wksId", "cttId", "number", "name", "startDate", "term", "termUnit", "observation", "aiuRequested"];
const ACT_FIELDS = ["startDate", "description", ...CONCEPT_FIELDS];

export const paginationContractsController = handle(async (req) => {
  const { search, state, wrkId, cttId, number, name, providerName, endDateFrom, endDateTo, rows, first, sortField, sortOrder } = req.body;
  return contractsService.paginationContracts({
    search,
    state,
    wrkId,
    cttId,
    number,
    name,
    providerName,
    endDateFrom,
    endDateTo,
    rows,
    first,
    sortField,
    sortOrder,
    scope: await workScopeOf(req),
  });
});

export const getContractController = handle(async (req) => contractsService.getContract({ ctrId: req.query.ctrId, scope: await workScopeOf(req) }));

export const selectContractWorksController = handle(async (req) =>
  contractsService.selectContractWorks({ search: req.query.search, scope: await workScopeOf(req) })
);

export const getContractFormOptionsController = handle(async (req) => {
  const { wrkId, includeWksId, includePrvId } = req.query;
  return contractsService.getContractFormOptions({ wrkId, includeWksId, includePrvId, scope: await workScopeOf(req) });
});

export const previewContractEndDateController = handle(async (req) => {
  const { ctrId, startDate, term, termUnit } = req.query;
  return contractsService.previewContractEndDate({ ctrId, startDate, term, termUnit, scope: await workScopeOf(req) });
});

export const getContractFieldsController = handle(async (req) =>
  contractsService.getContractFields({
    cttId: req.query.cttId,
    version: req.query.version,
    ctrId: req.query.ctrId,
    scope: await workScopeOf(req),
  })
);

export const saveContractController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Cambiar la solicitud de AIU exige además su permiso (DEC-046): el
  // service decide con la configuración del tipo bajo bloqueo.
  const granted = new Set(await getEffectivePermissionIds({ useId, proId }));
  const result = await contractsService.saveContract({
    ctrId: req.body.ctrId,
    input: { ...pick(req.body, CONTRACT_FIELDS), initialConcept: pick(req.body.initialConcept, CONCEPT_FIELDS) },
    useBy: useId,
    granted,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const deleteContractController = handle(async (req) => {
  const result = await contractsService.deleteContract({
    ctrId: req.body.ctrId,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

export const createAmendmentController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Sobre un contrato suspendido el otrosí lo reanuda y exige además el
  // permiso de levantar (DEC-039): el service decide con el estado bloqueado.
  const granted = new Set(await getEffectivePermissionIds({ useId, proId }));
  const result = await conceptsService.createAmendment({
    ctrId: req.body.ctrId,
    input: pick(req.body, [...ACT_FIELDS, "extension", "liftDate"]),
    useBy: useId,
    granted,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const createLiquidationController = handle(async (req) => {
  const result = await conceptsService.createLiquidation({
    ctrId: req.body.ctrId,
    input: pick(req.body, ACT_FIELDS),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const suspendContractController = handle(async (req) => {
  const result = await suspensionsService.suspendContract({
    ctrId: req.body.ctrId,
    input: pick(req.body, ["reaId", "suspensionDate", "liftCondition", "observation", "requiresReport"]),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const updateConceptController = handle(async (req) => {
  const result = await conceptsService.updateConcept({
    ccpId: req.body.ccpId,
    input: pick(req.body, [...ACT_FIELDS, "extension"]),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});

// Pólizas (DEC-050). La base y el valor asegurado nunca se leen del body.
const POLICY_FIELDS = ["pltId", "insId", "number", "percentage", "startDate", "endDate", "observation"];

export const getContractPoliciesController = handle(async (req) =>
  policiesService.getContractPolicies({ ctrId: req.query.ctrId, scope: await workScopeOf(req) })
);

export const createPolicyController = handle(async (req) => {
  const result = await policiesService.createPolicy({
    ctrId: req.body.ctrId,
    input: pick(req.body, ["ccpId", ...POLICY_FIELDS]),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const createPolicyVersionController = handle(async (req) => {
  const result = await policiesService.createPolicyVersion({
    polId: req.body.polId,
    input: pick(req.body, POLICY_FIELDS),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const cancelPolicyController = handle(async (req) => {
  const result = await policiesService.cancelPolicy({
    polId: req.body.polId,
    reaId: req.body.reaId,
    observation: req.body.observation,
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});
