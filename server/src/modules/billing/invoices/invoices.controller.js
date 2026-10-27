import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import { workScopeOf } from "../../../common/services/workScope.service.js";
import { sendExport } from "../../../common/services/export.service.js";
import * as invoicesService from "./invoices.service.js";
import { getInvoiceEvidence } from "./invoiceEvidence.service.js";
import * as followUpsService from "./invoiceFollowUps.service.js";
import * as glossesService from "./invoiceGlosses.service.js";
import { getInvoiceMenu, listInvoiceMenus } from "./invoiceMenus.js";
import { SIMPLE_FIELDS, SIMPLE_PAIRS } from "./simpleInvoiceTerms.js";
import { CONTRACT_PAIRS, CONTRACT_TAX_FIELDS } from "./contractInvoiceTerms.js";

// Importes capturados de la simple, salvo el valor (que comparte con las de contrato).
const SIMPLE_AMOUNT_FIELDS = Object.keys(SIMPLE_FIELDS).filter((field) => field !== "value");

// Solo leen la petición y delegan. El autor sale de req.user (DEC-005); la
// clave de idempotencia, del encabezado (DEC-016). Nada más del body llega al
// service: estado, fecha de aprobación y saldos nunca. Los importes
// capturados (valor, amortización, retenido) sí, y el service los valida
// (DEC-044, DEC-051). Ver facturas lo verifica la ruta (DEC-074): el menú
// (`pvtId`) solo filtra.

// Un hecho de facturación puede liquidar el contrato (DEC-081): entonces también se recargan los contratos.
const notify = (result) => {
  getIO().emit("refresh-invoices", {});
  if (result?.contractLiquidated) getIO().emit("refresh-contracts", {});
};

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
  "pvtId",
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
  // IVA, retenciones y descuento de materiales de la normal y la liquidación
  // (DEC-075); el % IVA y las retenciones comparten nombre con los de la simple.
  ...Object.keys(CONTRACT_TAX_FIELDS).filter((field) => !SIMPLE_AMOUNT_FIELDS.includes(field)),
];

const grantedOf = async ({ useId, proId }) => new Set(await getEffectivePermissionIds({ useId, proId }));

// Filtros del listado, también los del reporte (DEC-070).
const listFiltersOf = (req) => {
  const { search, state, pvtId, type, wrkId, prvId, ctrId, sortField, sortOrder } = req.body;
  const { number, voucherNumber, statement, contractNumber, providerName, dateFrom, dateTo, approvalDateFrom, approvalDateTo } = req.body;
  const { wksId, contractName, valueFrom, valueTo, discountFrom, discountTo, vatPctFrom, vatPctTo } = req.body;
  const { advance } = req.body;
  return {
    search,
    state,
    pvtId,
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
    wksId,
    contractName,
    valueFrom,
    valueTo,
    discountFrom,
    discountTo,
    vatPctFrom,
    vatPctTo,
    advance,
    sortField,
    sortOrder,
  };
};

export const paginationInvoicesController = handle(async (req) =>
  invoicesService.paginationInvoices({ ...listFiltersOf(req), scope: await workScopeOf(req), rows: req.body.rows, first: req.body.first })
);

// Reporte del listado de un menú (DEC-070): responde el archivo, no JSON.
export const exportInvoicesController = handleExport(async (req) =>
  invoicesService.exportInvoices({ ...listFiltersOf(req), scope: await workScopeOf(req), format: req.body.format })
);

export const getInvoiceMenuController = handle(async (req) => getInvoiceMenu({ pvtId: req.query.pvtId }));

export const selectInvoiceMenusController = handle(async () => listInvoiceMenus());

export const getInvoiceController = handle(async (req) => invoicesService.getInvoice({ invId: req.query.invId, scope: await workScopeOf(req) }));

export const getInvoiceEvidenceController = handle(async (req) => getInvoiceEvidence({ invId: req.query.invId, scope: await workScopeOf(req) }));

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
    pvtId: req.query.pvtId,
    search: req.query.search,
    includePrvId: req.query.includePrvId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceFilterProvidersController = handle(async (req) =>
  invoicesService.selectInvoiceFilterProviders({
    pvtId: req.query.pvtId,
    search: req.query.search,
    includePrvId: req.query.includePrvId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceFilterStagesController = handle(async (req) =>
  invoicesService.selectInvoiceFilterStages({
    pvtId: req.query.pvtId,
    search: req.query.search,
    includeWksId: req.query.includeWksId,
    scope: await workScopeOf(req),
  })
);

export const selectInvoiceContractsController = handle(async (req) =>
  invoicesService.selectInvoiceContracts({
    type: req.query.type,
    pvtId: req.query.pvtId,
    prvId: req.query.prvId,
    search: req.query.search,
    includeCtrId: req.query.includeCtrId,
    scope: await workScopeOf(req),
  })
);

export const getContractAdvanceController = handle(async (req) =>
  invoicesService.getContractAdvance({
    ctrId: req.query.ctrId,
    invId: req.query.invId,
    value: req.query.value,
    amortization: req.query.amortization,
    amortizationPct: req.query.amortizationPct,
    retention: req.query.retention,
    retentionPct: req.query.retentionPct,
    scope: await workScopeOf(req),
  })
);

// Composición de la factura simple para el panel Detalle (DEC-065): solo calcula, no lee datos.
export const previewSimpleInvoiceController = handle(async (req) =>
  invoicesService.previewSimpleInvoice(pick(req.body, ["value", ...SIMPLE_AMOUNT_FIELDS, ...SIMPLE_PAIRS.map((pair) => pair.alt)]))
);

// Composición de la normal y la liquidación para el panel Detalle (DEC-075): solo calcula, no lee datos.
export const previewContractInvoiceController = handle(async (req) =>
  invoicesService.previewContractInvoice(
    pick(req.body, ["value", "amortization", "retention", ...Object.keys(CONTRACT_TAX_FIELDS), ...CONTRACT_PAIRS.map((pair) => pair.alt)])
  )
);

export const saveInvoiceController = handle(async (req) => {
  // Ajustar la amortización o el retenido exige además su permiso: el
  // service decide con los valores por defecto calculados bajo bloqueo.
  const result = await invoicesService.saveInvoice({
    invId: req.body.invId,
    input: pick(req.body, INVOICE_FIELDS),
    useBy: req.user.useId,
    granted: await grantedOf(req.user),
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify(result);
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
  notify(result);
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
  notify(result);
  return result;
});

export const deleteInvoiceController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Eliminar una aprobada exige además el permiso reforzado: el service decide
  // con el estado bajo bloqueo (DEC-068).
  const granted = await grantedOf({ useId, proId });
  const result = await invoicesService.deleteInvoice({
    invId: req.body.invId,
    input: pick(req.body, ["observation"]),
    useBy: useId,
    granted,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
  });
  notify(result);
  return result;
});

// ─── Seguimiento (DEC-076) ───────────────────────────────────────────────────
// Ver lo protege la ruta con ver facturas; operar, además con gestionar seguimientos.

export const listInvoiceFollowUpsController = handle(async (req) =>
  followUpsService.listFollowUps({ invId: req.query.invId, scope: await workScopeOf(req) })
);

const followUpAction = (fn, fields) =>
  handle(async (req) => {
    const result = await fn({
      ifuId: req.body.ifuId,
      input: pick(req.body, fields),
      useBy: req.user.useId,
      scope: await workScopeOf(req),
      ctx: auditContext(req),
    });
    notify();
    return result;
  });

export const openInvoiceFollowUpController = handle(async (req) => {
  const result = await followUpsService.openFollowUp({
    invId: req.body.invId,
    input: pick(req.body, ["openDate", "description"]),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify(result);
  return result;
});

export const updateInvoiceFollowUpController = followUpAction(followUpsService.updateFollowUp, ["openDate", "description"]);
export const closeInvoiceFollowUpController = followUpAction(followUpsService.closeFollowUp, ["observation"]);
export const deleteInvoiceFollowUpController = followUpAction(followUpsService.deleteFollowUp, []);

// ─── Glosas (DEC-085) ────────────────────────────────────────────────────────
// Ver lo protege la ruta con ver facturas; operar, además con gestionar glosas.

export const listInvoiceGlossesController = handle(async (req) => glossesService.listGlosses({ invId: req.query.invId, scope: await workScopeOf(req) }));

const GLOSS_FIELDS = ["statement", "code", "value", "description"];

const glossAction = (fn, fields) =>
  handle(async (req) => {
    const result = await fn({
      iglId: req.body.iglId,
      input: pick(req.body, fields),
      useBy: req.user.useId,
      scope: await workScopeOf(req),
      ctx: auditContext(req),
    });
    notify();
    return result;
  });

export const createInvoiceGlossController = handle(async (req) => {
  const result = await glossesService.createGloss({
    invId: req.body.invId,
    input: pick(req.body, GLOSS_FIELDS),
    useBy: req.user.useId,
    scope: await workScopeOf(req),
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notify();
  return result;
});

export const updateInvoiceGlossController = glossAction(glossesService.updateGloss, GLOSS_FIELDS);
export const releaseInvoiceGlossController = glossAction(glossesService.releaseGloss, ["releaseStatement", "observation"]);
export const deleteInvoiceGlossController = glossAction(glossesService.deleteGloss, []);
