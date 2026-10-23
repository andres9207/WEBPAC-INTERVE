import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { BILLING_TYPES } from "./billingTerms.js";
import { INVOICE_STATES, INVOICE_TYPES } from "./invoiceTerms.js";

/**
 * Filtros "Anticipo" de los listados de facturas y de contratos (ADR-0024,
 * DEC-044). Las facturas se filtran por lo que tienen guardado; los
 * contratos, por sus saldos de anticipo, que se calculan con las mismas
 * reglas del expediente (`contractsBalances`, solo aprobadas) y nunca se
 * guardan. "Por aprobar" es lo registrado: anticipo o amortización que
 * todavía no mueve los saldos.
 */

// Facturas: la que es anticipo, la que amortiza (la normal y la liquidación, BILLING_TYPES) y lo por aprobar.
export const INVOICE_ADVANCE_FILTERS = Object.freeze({
  ADVANCE: "ADVANCE",
  AMORTIZATION: "AMORTIZATION",
  PENDING: "PENDING",
  PENDING_ADVANCE: "PENDING_ADVANCE",
  PENDING_AMORTIZATION: "PENDING_AMORTIZATION",
});

export const INVOICE_ADVANCE_FILTER_NAMES = Object.freeze({
  ADVANCE: "Anticipo",
  AMORTIZATION: "Con amortización",
  PENDING: "Anticipo o amortización por aprobar",
  PENDING_ADVANCE: "Anticipo por aprobar",
  PENDING_AMORTIZATION: "Amortización por aprobar",
});

const isAdvance = { inv_type: INVOICE_TYPES.ADVANCE };
const amortizes = { inv_type: { in: BILLING_TYPES }, tbl_invoice_liquidation_details: { ild_amortization: { gt: 0 } } };
const registered = { inv_state: INVOICE_STATES.REGISTERED };

const INVOICE_WHERE = {
  ADVANCE: isAdvance,
  AMORTIZATION: amortizes,
  PENDING: { ...registered, OR: [isAdvance, amortizes] },
  PENDING_ADVANCE: { ...registered, ...isAdvance },
  PENDING_AMORTIZATION: { ...registered, ...amortizes },
};

/** Condición Prisma sobre tbl_invoices del filtro, o null sin filtro. */
export const invoiceAdvanceWhere = (filter) => (filter ? (INVOICE_WHERE[filter] ?? null) : null);

// Contratos: por sus saldos de anticipo, y los que tienen anticipo o amortización por aprobar.
export const CONTRACT_ADVANCE_FILTERS = Object.freeze({
  WITH_ADVANCE: "WITH_ADVANCE",
  TO_INVOICE: "TO_INVOICE",
  TO_AMORTIZE: "TO_AMORTIZE",
  AMORTIZED: "AMORTIZED",
  PENDING: "PENDING",
});

export const CONTRACT_ADVANCE_FILTER_NAMES = Object.freeze({
  WITH_ADVANCE: "Con anticipo pactado",
  TO_INVOICE: "Anticipo por facturar",
  TO_AMORTIZE: "Anticipo por amortizar",
  AMORTIZED: "Anticipo amortizado por completo",
  PENDING: "Anticipo o amortización por aprobar",
});

/**
 * Si los saldos de anticipo de un contrato (`advanceBalances`) cumplen el
 * filtro. Amortizado por completo: pactado, todo facturado y todo amortizado.
 */
export const matchesContractAdvance = (filter, advance) => {
  const agreed = advance.agreed.gt(0);
  switch (filter) {
    case CONTRACT_ADVANCE_FILTERS.WITH_ADVANCE:
      return agreed;
    case CONTRACT_ADVANCE_FILTERS.TO_INVOICE:
      return advance.toInvoice.gt(0);
    case CONTRACT_ADVANCE_FILTERS.TO_AMORTIZE:
      return advance.toAmortize.gt(0);
    case CONTRACT_ADVANCE_FILTERS.AMORTIZED:
      return agreed && advance.toInvoice.lte(0) && advance.toAmortize.lte(0);
    default:
      return false;
  }
};

/** Contratos con alguna factura de anticipo o de amortización por aprobar: condición Prisma sobre tbl_contracts. */
export const contractsWithPendingAdvanceWhere = () => ({
  tbl_invoices: { some: { sta_id: { not: DELETED_STATUS }, ...INVOICE_WHERE.PENDING } },
});
