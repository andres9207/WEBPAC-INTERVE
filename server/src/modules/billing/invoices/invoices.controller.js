import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import * as invoicesService from "./invoices.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005); la
// clave de idempotencia, del encabezado (DEC-016). Nada más del body llega al
// service: estado, fecha de aprobación y saldos nunca. Los importes
// capturados (valor, amortización) sí, y el service los valida (DEC-044).

const notify = () => getIO().emit("refresh-invoices", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source?.[field]]));

const INVOICE_FIELDS = [
  "type",
  "ctrId",
  "wrkId",
  "prvId",
  "wksId",
  "number",
  "date",
  "voucherNumber",
  "statement",
  "description",
  "value",
  "amortization",
  "amortizationObservation",
];

const grantedOf = async ({ useId, proId }) => new Set(await getEffectivePermissionIds({ useId, proId }));

export const paginationInvoicesController = handle(async (req) => {
  const { search, state, type, wrkId, prvId, ctrId, rows, first, sortField, sortOrder } = req.body;
  const scope = await workScopeOf(req);
  return invoicesService.paginationInvoices({ search, state, type, wrkId, prvId, ctrId, rows, first, sortField, sortOrder, scope });
});

export const getInvoiceController = handle(async (req) => invoicesService.getInvoice({ invId: req.query.invId, scope: await workScopeOf(req) }));

export const selectInvoiceWorksController = handle(async (req) =>
  invoicesService.selectInvoiceWorks({ search: req.query.search, includeWrkId: req.query.includeWrkId, scope: await workScopeOf(req) })
);

export const getInvoiceFormOptionsController = handle(async (req) => {
  const { wrkId, includeWksId, includePrvId } = req.query;
  return invoicesService.getInvoiceFormOptions({ wrkId, includeWksId, includePrvId, scope: await workScopeOf(req) });
});

export const selectInvoiceContractsController = handle(async (req) =>
  invoicesService.selectInvoiceContracts({
    type: req.query.type,
    search: req.query.search,
    includeCtrId: req.query.includeCtrId,
    scope: await workScopeOf(req),
  })
);

export const getContractAdvanceController = handle(async (req) =>
  invoicesService.getContractAdvance({ ctrId: req.query.ctrId, value: req.query.value, scope: await workScopeOf(req) })
);

export const saveInvoiceController = handle(async (req) => {
  // Ajustar la amortización exige además su permiso: el service decide con
  // la amortización por defecto calculada bajo bloqueo.
  const result = await invoicesService.saveInvoice({
    invId: req.body.invId,
    input: pick(req.body, INVOICE_FIELDS),
    useBy: req.user.useId,
    granted: await grantedOf(req.user),
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const approveInvoiceController = handle(async (req) => {
  const result = await invoicesService.approveInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["approvalDate", "observation"]),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const cancelInvoiceController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Anular una aprobada exige además el permiso reforzado: el service decide
  // con el estado bajo bloqueo.
  const granted = await grantedOf({ useId, proId });
  const result = await invoicesService.cancelInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["reaId", "observation"]),
    useBy: useId,
    granted,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});
