import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import * as contractsService from "./contracts.service.js";
import * as conceptsService from "./contractConcepts.service.js";

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
const CONTRACT_FIELDS = ["wrkId", "prvId", "wksId", "cttId", "number", "name", "startDate", "term", "termUnit", "observation"];
const ACT_FIELDS = ["startDate", "description", ...CONCEPT_FIELDS];

export const paginationContractsController = handle((req) => {
  const { search, state, wrkId, rows, first, sortField, sortOrder } = req.body;
  return contractsService.paginationContracts({ search, state, wrkId, rows, first, sortField, sortOrder });
});

export const getContractController = handle((req) => contractsService.getContract({ ctrId: req.query.ctrId }));

export const selectContractWorksController = handle((req) => contractsService.selectContractWorks({ search: req.query.search }));

export const getContractFormOptionsController = handle((req) => {
  const { wrkId, includeWksId, includePrvId } = req.query;
  return contractsService.getContractFormOptions({ wrkId, includeWksId, includePrvId });
});

export const getContractFieldsController = handle((req) =>
  contractsService.getContractFields({ cttId: req.query.cttId, version: req.query.version })
);

export const saveContractController = handle(async (req) => {
  const result = await contractsService.saveContract({
    ctrId: req.body.ctrId,
    input: { ...pick(req.body, CONTRACT_FIELDS), initialConcept: pick(req.body.initialConcept, CONCEPT_FIELDS) },
    useBy: req.user.useId,
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const deleteContractController = handle(async (req) => {
  const result = await contractsService.deleteContract({ ctrId: req.body.ctrId, useBy: req.user.useId, ctx: auditContext(req) });
  notify();
  return result;
});

export const createAmendmentController = handle(async (req) => {
  const result = await conceptsService.createAmendment({
    ctrId: req.body.ctrId,
    input: pick(req.body, [...ACT_FIELDS, "extension"]),
    useBy: req.user.useId,
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
    ctx: auditContext(req),
  });
  notify();
  return result;
});
