import { getIO } from "../../../common/configs/socket.manager.js";
import { auditContext } from "../../../common/services/audit.service.js";
import { getEffectivePermissionIds } from "../../../common/services/effectivePermissions.service.js";
import { IDEMPOTENCY_HEADER } from "../../../common/services/idempotency.service.js";
import * as providersService from "./providers.service.js";

// Solo leen la petición y delegan. El autor y sus permisos salen de req.user
// (DEC-005); la clave de idempotencia, del encabezado (DEC-016).

const notifyProviders = () => getIO().emit("refresh-providers", {});
// La asignación cambia a la vez la obra y el proveedor.
const notifyAssignment = () => {
  getIO().emit("refresh-providers", {});
  getIO().emit("refresh-works", {});
};

const handle = (fn) => async (req, res, next) => {
  try {
    return res.status(200).json(await fn(req));
  } catch (err) {
    next(err);
  }
};

// Campos del proveedor que el service acepta. Nada más del body llega al service.
const INPUT_FIELDS = ["iddId", "identification", "name", "pvtId", "serviceType", "email", "observation", "contacts", "assignment"];

const ASSIGNMENT_FIELDS = ["assignmentDate", "observation", "staId"];
const pick = (source, fields) => Object.fromEntries(fields.map((field) => [field, source[field]]));

export const paginationProvidersController = handle((req) => {
  const { search, staId, rows, first, sortField, sortOrder } = req.body;
  return providersService.paginationProviders({ search, staId, rows, first, sortField, sortOrder });
});

export const getProviderController = handle((req) => providersService.getProvider({ prvId: req.query.prvId }));

export const checkIdentificationController = handle((req) => {
  const { iddId, identification, excludeId } = req.query;
  return providersService.checkIdentification({ iddId, identification, excludeId });
});

export const selectProvidersController = handle((req) => providersService.selectProviders({ search: req.query.search, wrkId: req.query.wrkId }));

export const saveProviderController = handle(async (req) => {
  const { useId, proId } = req.user;
  // Cambiar la identificación y asignar a una obra tienen permiso propio: el
  // service decide cuál exige según lo que realmente pasa.
  const granted = new Set(await getEffectivePermissionIds({ useId, proId }));
  const result = await providersService.saveProvider({
    prvId: req.body.prvId,
    input: pick(req.body, INPUT_FIELDS),
    useBy: useId,
    granted,
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  if (req.body.assignment) notifyAssignment();
  else notifyProviders();
  return result;
});

export const changeProviderStatusController = handle(async (req) => {
  const result = await providersService.changeProviderStatus({
    prvId: req.body.prvId,
    staId: req.body.staId,
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  notifyProviders();
  return result;
});

export const deleteProviderController = handle(async (req) => {
  const result = await providersService.deleteProvider({ prvId: req.body.prvId, useBy: req.user.useId, ctx: auditContext(req) });
  notifyProviders();
  return result;
});

export const paginationWorkProvidersController = handle((req) => {
  const { wrkId, search, rows, first } = req.body;
  return providersService.paginationWorkProviders({ wrkId, search, rows, first });
});

export const assignProviderController = handle(async (req) => {
  const result = await providersService.assignProviderToWork({
    wrkId: req.body.wrkId,
    prvId: req.body.prvId,
    input: pick(req.body, ASSIGNMENT_FIELDS),
    useBy: req.user.useId,
    ctx: auditContext(req),
    idempotencyKey: req.get(IDEMPOTENCY_HEADER),
  });
  notifyAssignment();
  return result;
});

export const updateWorkProviderController = handle(async (req) => {
  const result = await providersService.updateWorkProvider({
    wrkId: req.body.wrkId,
    prvId: req.body.prvId,
    input: pick(req.body, ASSIGNMENT_FIELDS),
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  notifyAssignment();
  return result;
});

export const unassignProviderController = handle(async (req) => {
  const result = await providersService.unassignProviderFromWork({
    wrkId: req.body.wrkId,
    prvId: req.body.prvId,
    useBy: req.user.useId,
    ctx: auditContext(req),
  });
  notifyAssignment();
  return result;
});
