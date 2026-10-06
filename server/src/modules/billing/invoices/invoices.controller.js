import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import * as invoicesService from "./invoices.service.js";

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005); la
// clave de idempotencia, del encabezado (DEC-016). Nada más del body llega al
// service: estado, fecha de aprobación e importes nunca.

const notify = () => getIO().emit("refresh-invoices", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source?.[field]]));

const INVOICE_FIELDS = ["type", "ctrId", "wrkId", "prvId", "wksId", "number", "date", "voucherNumber", "statement", "description"];

export const paginationInvoicesController = handle((req) => {
  const { search, state, type, wrkId, prvId, ctrId, rows, first, sortField, sortOrder } = req.body;
  return invoicesService.paginationInvoices({ search, state, type, wrkId, prvId, ctrId, rows, first, sortField, sortOrder });
});

export const getInvoiceController = handle((req) => invoicesService.getInvoice({ invId: req.query.invId }));

export const selectInvoiceWorksController = handle((req) =>
  invoicesService.selectInvoiceWorks({ search: req.query.search, includeWrkId: req.query.includeWrkId })
);

export const getInvoiceFormOptionsController = handle((req) => {
  const { wrkId, includeWksId, includePrvId } = req.query;
  return invoicesService.getInvoiceFormOptions({ wrkId, includeWksId, includePrvId });
});

export const selectInvoiceContractsController = handle((req) =>
  invoicesService.selectInvoiceContracts({ type: req.query.type, search: req.query.search, includeCtrId: req.query.includeCtrId })
);

export const saveInvoiceController = handle(async (req) => {
  const result = await invoicesService.saveInvoice({
    invId: req.body.invId,
    input: pick(req.body, INVOICE_FIELDS),
    useBy: req.user.useId,
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
  const granted = new Set(await getEffectivePermissionIds({ useId, proId }));
  const result = await invoicesService.cancelInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["reaId", "observation"]),
    useBy: useId,
    granted,
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});
