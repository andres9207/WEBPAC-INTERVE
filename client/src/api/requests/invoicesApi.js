import httpCliente from 'api/services/httpCliente';
import { createMasterApi } from 'api/services/masterApi';
import { idempotencyConfig } from 'utils/idempotency';

/**
 * Facturas (DEC-042). Listado, detalle y guardado tienen la forma de un
 * maestro: se reutiliza createMasterApi. No hay eliminar ni cambiar estado:
 * una factura se aprueba o se anula con su propia llamada.
 */
export const invoicesApi = createMasterApi('billing/invoices', { entity: 'invoice', plural: 'invoices' });

/**
 * Obras activas para la factura simple, con tope: se busca en el servidor.
 * @param {{ search?: string, includeWrkId?: number }} [params]  la obra ya elegida vuelve aunque la búsqueda la deje fuera
 */
export const getInvoiceWorksSelectAPI = (params = {}) => httpCliente.get('billing/invoices/select_invoice_works', params);

/**
 * Etapas y proveedores asignados de una obra, para la factura simple.
 * @param {{ wrkId: number, includeWksId?: number, includePrvId?: number }} params  los actuales se incluyen aunque estén inactivos
 */
export const getInvoiceFormOptionsAPI = (params) => httpCliente.get('billing/invoices/get_invoice_form_options', params);

/**
 * Contratos cuyo estado admite el tipo de factura (ADR-0017): el anticipo,
 * en ejecución; liquidación y devolución de retenido, en liquidación. Busca
 * por número, nombre, proveedor y obra.
 * @param {{ type: string, search?: string, includeCtrId?: number }} params  el contrato ya elegido vuelve aunque la búsqueda lo deje fuera
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

/** Transiciones: cada una con su endpoint y su permiso (WORKFLOW_STANDARD, regla 3). */
export const invoiceTransitionsApi = {
  /** @param {{ invId, approvalDate, observation }} params */
  approve: (params, idempotencyKey) => httpCliente.post('billing/invoices/approve_invoice', params, idempotencyConfig(idempotencyKey)),
  /** Anular una aprobada exige además el permiso reforzado. @param {{ invId, reaId, observation }} params */
  cancel: (params, idempotencyKey) => httpCliente.post('billing/invoices/cancel_invoice', params, idempotencyConfig(idempotencyKey))
};
