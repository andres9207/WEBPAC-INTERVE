import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import { sendExport } from "../../../common/services/export.service.js";
import * as invoicesService from "./invoices.service.js";
import { getInvoiceEvidence } from "./invoiceEvidence.service.js";
import { grantedViews } from "./invoiceViews.js";
import { SIMPLE_FIELDS } from "./simpleInvoiceTerms.js";

// Importes capturados de la simple, salvo el valor (que comparte con las de contrato).
const SIMPLE_AMOUNT_FIELDS = Object.keys(SIMPLE_FIELDS).filter((field) => field !== "value");

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005); la
// clave de idempotencia, del encabezado (DEC-016). Nada más del body llega al
// service: estado, fecha de aprobación y saldos nunca. Los importes
// capturados (valor, amortización, retenido) sí, y el service los valida
// (DEC-044, DEC-051). Las vistas que ve el usuario (DEC-054) salen de sus
// permisos efectivos, nunca del cliente.

const notify = () => getIO().emit("refresh-invoices", {});

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

// Como `handle`, pero responde el archivo del reporte (DEC-070) en vez de JSON.
const handleExport = (fn) => async (req, res, next) => {
  try {
    sendExport(res, await fn(req));
  } catch (err) {
    next(err);
  }
};

const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source?.[field]]));

const INVOICE_FIELDS = [
  "type",
  "ctrId",
  "wrkId",
  "wksId",
  "prvId",
  "number",
  "date",
  "voucherNumber",
  "statement",
  "description",
  "value",
  "amortization",
  "amortizationObservation",
  "retention",
  "retentionObservation",
  // Importes de la simple (DEC-065); `value` es compartido.
  ...SIMPLE_AMOUNT_FIELDS,
];

const grantedOf = async ({ useId, proId }) => new Set(await getEffectivePermissionIds({ useId, proId }));

/** Permisos efectivos y vistas de facturas que ve el usuario. */
const accessOf = async (user) => {
  const granted = await grantedOf(user);
  return { granted, views: grantedViews(granted) };
};

// Filtros del listado, también los del reporte (DEC-070).
const listFiltersOf = async (req) => {
  const { search, state, view, type, wrkId, prvId, ctrId, sortField, sortOrder } = req.body;
  const { number, voucherNumber, statement, contractNumber, providerName, dateFrom, dateTo, approvalDateFrom, approvalDateTo } = req.body;
  const { views } = await accessOf(req.user);
  return {
    search,
    state,
    view,
    views,
    type,
    wrkId,
    prvId,
    ctrId,
    number,
    voucherNumber,
    statement,
    contractNumber,
    providerName,
    dateFrom,
    dateTo,
    approvalDateFrom,
    approvalDateTo,
    sortField,
    sortOrder,
  };
};

export const paginationInvoicesController = handle(async (req) =>
  invoicesService.paginationInvoices({ ...(await listFiltersOf(req)), scope: await workScopeOf(req), rows: req.body.rows, first: req.body.first })
);

// Reporte del listado de una vista (DEC-070): responde el archivo, no JSON.
export const exportInvoicesController = handleExport(async (req) =>
  invoicesService.exportInvoices({ ...(await listFiltersOf(req)), scope: await workScopeOf(req), format: req.body.format })
);

export const getInvoiceController = handle(async (req) =>
  invoicesService.getInvoice({ invId: req.query.invId, scope: await workScopeOf(req), views: (await accessOf(req.user)).views })
);

export const getInvoiceEvidenceController = handle(async (req) =>
  getInvoiceEvidence({ invId: req.query.invId, scope: await workScopeOf(req), views: (await accessOf(req.user)).views })
);

export const selectInvoiceWorksController = handle(async (req) =>
  invoicesService.selectInvoiceWorks({
    search: req.query.search,
    prvId: req.query.prvId,
    includeWrkId: req.query.includeWrkId,
    scope: await workScopeOf(req),
  })
);

export const getInvoiceFormOptionsController = handle(async (req) =>
  invoicesService.getInvoiceFormOptions({
    wrkId: req.query.wrkId,
    includeWksId: req.query.includeWksId,
    includePrvId: req.query.includePrvId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceProvidersController = handle(async (req) =>
  invoicesService.selectInvoiceProviders({
    type: req.query.type,
    view: req.query.view,
    search: req.query.search,
    includePrvId: req.query.includePrvId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceFilterProvidersController = handle(async (req) =>
  invoicesService.selectInvoiceFilterProviders({
    view: req.query.view,
    views: (await accessOf(req.user)).views,
    search: req.query.search,
    includePrvId: req.query.includePrvId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceContractsController = handle(async (req) =>
  invoicesService.selectInvoiceContracts({
    type: req.query.type,
    view: req.query.view,
    prvId: req.query.prvId,
    search: req.query.search,
    includeCtrId: req.query.includeCtrId,
    scope: await workScopeOf(req),
  })
);

export const getContractAdvanceController = handle(async (req) =>
  invoicesService.getContractAdvance({
    ctrId: req.query.ctrId,
    value: req.query.value,
    scope: await workScopeOf(req),
    views: (await accessOf(req.user)).views,
  })
);

// Composición de la factura simple para el panel Detalle (DEC-065): solo calcula, no lee datos.
export const previewSimpleInvoiceController = handle(async (req) =>
  invoicesService.previewSimpleInvoice(pick(req.body, ["value", ...SIMPLE_AMOUNT_FIELDS]))
);

export const saveInvoiceController = handle(async (req) => {
  // Ajustar la amortización o el retenido exige además su permiso: el
  // service decide con los valores por defecto calculados bajo bloqueo.
  const { granted, views } = await accessOf(req.user);
  const result = await invoicesService.saveInvoice({
    invId: req.body.invId,
    input: pick(req.body, INVOICE_FIELDS),
    useBy: req.user.useId,
    granted,
    views,
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
    views: (await accessOf(req.user)).views,
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
  const { granted, views } = await accessOf({ useId, proId });
  const result = await invoicesService.cancelInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["reaId", "observation"]),
    useBy: useId,
    granted,
    views,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const deleteInvoiceController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Eliminar una aprobada exige además el permiso reforzado: el service decide
  // con el estado bajo bloqueo (DEC-068).
  const { granted, views } = await accessOf({ useId, proId });
  const result = await invoicesService.deleteInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["observation"]),
    useBy: useId,
    granted,
    views,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify();
  return result;
});
