import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Facturas (DEC-042). Listado, detalle y guardado tienen la forma de un
 * maestro: se reutiliza createMasterApi. No hay eliminar ni cambiar estado:
 * una factura se aprueba o se anula con su propia llamada. El listado de un
 * menú lleva `pvtId`, su tipo de proveedor (DEC-074); sin él, el servidor
 * devuelve todas (pestañas de los expedientes).
 */
export const invoicesApi = createMasterApi('billing/invoices', { entity: 'invoice', plural: 'invoices' });

/**
 * Un menú de facturas (DEC-074): `{ pvtId, name, mode, menu }`. También uno
 * oculto o inactivo; 404 si el tipo no factura.
 * @param {number|string} pvtId
 */
export const getInvoiceMenuAPI = (pvtId) => httpCliente.get('billing/invoices/get_invoice_menu', { pvtId });

/** Los menús visibles (tipos activos con la casilla), por nombre: `[{ pvtId, name, mode, menu }]`. */
export const getInvoiceMenusAPI = () => httpCliente.get('billing/invoices/select_invoice_menus');

/**
 * Reporte del listado de un menú en Excel o PDF (DEC-070): los mismos
 * filtros que la tabla, sin paginar. Responde el archivo como blob.
 * @param {object} params  filtros, pestaña, orden y `pvtId` del listado
 * @param {'xlsx'|'pdf'} format
 */
export const exportInvoicesAPI = (params, format) =>
  httpCliente.post('billing/invoices/export_invoices', { ...params, format }, { responseType: 'blob' });

/**
 * Obras activas del alcance para la factura simple (DEC-058), con tope: se
 * busca en el servidor por código o nombre. Con `prvId`, solo las obras a las
 * que está asignado ese proveedor.
 * @param {{ search?: string, prvId?: number, includeWrkId?: number }} [params]  la obra ya elegida vuelve aunque la búsqueda la deje fuera
 */
export const getInvoiceWorksSelectAPI = (params = {}) => httpCliente.get('billing/invoices/select_invoice_works', params);

/**
 * Etapas y proveedores asignados de una obra, para la factura simple.
 * @param {{ wrkId: number, includeWksId?: number, includePrvId?: number }} params  los actuales se incluyen aunque estén inactivos
 */
export const getInvoiceFormOptionsAPI = (params) => httpCliente.get('billing/invoices/get_invoice_form_options', params);

/**
 * Proveedores con facturas del menú, en el alcance por obra: el filtro
 * Proveedor del listado. Busca por razón social o identificación.
 * @param {{ pvtId: number, search?: string, includePrvId?: number }} params  el ya elegido vuelve aunque la búsqueda lo deje fuera
 */
export const getInvoiceFilterProvidersAPI = (params) => httpCliente.get('billing/invoices/select_invoice_filter_providers', params);

/**
 * Etapas con facturas del menú, propias o por su contrato, en el alcance por
 * obra: el filtro Etapa del listado. Busca por nombre o código de la obra.
 * @param {{ pvtId: number, search?: string, includeWksId?: number }} params  la ya elegida vuelve aunque la búsqueda la deje fuera
 */
export const getInvoiceFilterStagesAPI = (params) => httpCliente.get('billing/invoices/select_invoice_filter_stages', params);

/**
 * Proveedores con algún contrato del menú cuyo estado admite el tipo de
 * factura: se eligen antes que el contrato. Busca por razón social o
 * identificación.
 * @param {{ type?: string, pvtId: number, search?: string, includePrvId?: number }} params  el ya elegido vuelve aunque la búsqueda lo deje fuera
 */
export const getInvoiceProvidersSelectAPI = (params) => httpCliente.get('billing/invoices/select_invoice_providers', params);

/**
 * Contratos firmados bajo el tipo del menú (DEC-074) cuyo estado admite el tipo de
 * factura (ADR-0017): el anticipo, en ejecución; liquidación y devolución de
 * retenido, en liquidación. Busca por número, nombre, proveedor y obra; con
 * `prvId`, solo los de ese proveedor.
 * @param {{ type?: string, pvtId: number, prvId?: number, search?: string, includeCtrId?: number }} params  el contrato ya elegido vuelve aunque la búsqueda lo deje fuera
 */
export const getInvoiceContractsSelectAPI = (params) => httpCliente.get('billing/invoices/select_invoice_contracts', params);

/**
 * Saldos de anticipo del contrato (DEC-044): pactado, facturado, amortizado,
 * pendientes y porcentaje efectivo. Con `value`, también la amortización por
 * defecto de una liquidación por ese VALOR. Los calcula el servidor; al
 * guardar los vuelve a calcular bajo bloqueo.
 * @param {{ ctrId: number, value?: string }} params
 */
export const getContractAdvanceAPI = (params) => httpCliente.get('billing/invoices/get_contract_advance', params);

/**
 * Composición de la factura simple (DEC-065) para el panel Detalle: la
 * calcula el servidor con la misma fórmula que al guardar. Lo vacío cuenta
 * 0; si lo escrito no se podría guardar, `valid` es false y `message` dice
 * por qué. No guarda nada.
 * @param {{ value?, withholdingPct?, discount?, vatPct?, vatWithholdingPct?, icaWithholding?, freight?, earlyPaymentDiscount? }} params
 */
export const previewSimpleInvoiceAPI = (params) => httpCliente.post('billing/invoices/preview_simple_invoice', params);

/**
 * Composición de la normal y la liquidación (DEC-075) para el panel Detalle,
 * con el mismo criterio que la de la simple: IVA, retenciones, amortización,
 * retenido, descuento de materiales y el neto a pagar. No guarda nada.
 * @param {{ value?, amortization?, retention?, utilityPct?, vatPct?, withholdingPct?, vatWithholdingPct?, icaWithholding?, materialsDiscount? }} params
 */
export const previewContractInvoiceAPI = (params) => httpCliente.post('billing/invoices/preview_contract_invoice', params);

/** Transiciones: cada una con su endpoint y su permiso (WORKFLOW_STANDARD, regla 3). */
export const invoiceTransitionsApi = {
  /** @param {{ invId, approvalDate, observation }} params */
  approve: (params, idempotencyKey) => httpCliente.post('billing/invoices/approve_invoice', params, idempotencyConfig(idempotencyKey)),
  /** Anular una aprobada exige además el permiso reforzado. @param {{ invId, reaId, observation }} params */
  cancel: (params, idempotencyKey) => httpCliente.post('billing/invoices/cancel_invoice', params, idempotencyConfig(idempotencyKey)),
  /** Eliminación lógica (DEC-068); una aprobada exige además el permiso reforzado. @param {{ invId, observation }} params */
  remove: (params) => httpCliente.post('billing/invoices/delete_invoice', params)
};

/**
 * Seguimiento de una factura (DEC-076): verlo con ver facturas; abrir, editar, cerrar y eliminar, además con
 * gestionar seguimientos. La fecha de cierre la pone el servidor.
 */
export const invoiceFollowUpsApi = {
  list: (invId) => httpCliente.get('billing/invoices/list_invoice_follow_ups', { invId }),
  /** @param {{ invId, openDate, description }} params */
  open: (params, idempotencyKey) => httpCliente.post('billing/invoices/open_invoice_follow_up', params, idempotencyConfig(idempotencyKey)),
  /** @param {{ ifuId, openDate, description }} params */
  update: (params) => httpCliente.post('billing/invoices/update_invoice_follow_up', params),
  /** @param {{ ifuId, observation }} params */
  close: (params) => httpCliente.post('billing/invoices/close_invoice_follow_up', params),
  remove: (ifuId) => httpCliente.post('billing/invoices/delete_invoice_follow_up', { ifuId })
};

/**
 * Glosas de una factura (DEC-085): verlas con ver facturas; levantar, editar, liberar y eliminar, además con
 * gestionar glosas. La fecha de liberación la pone el servidor.
 */
export const invoiceGlossesApi = {
  list: (invId) => httpCliente.get('billing/invoices/list_invoice_glosses', { invId }),
  /** @param {{ invId, statement, code, value, description }} params */
  create: (params, idempotencyKey) => httpCliente.post('billing/invoices/create_invoice_gloss', params, idempotencyConfig(idempotencyKey)),
  /** @param {{ iglId, statement, code, value, description }} params */
  update: (params) => httpCliente.post('billing/invoices/update_invoice_gloss', params),
  /** @param {{ iglId, releaseStatement, observation }} params */
  release: (params) => httpCliente.post('billing/invoices/release_invoice_gloss', params),
  remove: (iglId) => httpCliente.post('billing/invoices/delete_invoice_gloss', { iglId })
};
