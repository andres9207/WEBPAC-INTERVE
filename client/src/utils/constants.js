// Estados de visibilidad (tbl_status, DEC-038): los mismos ids que
// server/src/common/constants/status.constants.js. El ciclo de vida de un
// contrato no va aquí: tiene su propio estado (CONTRACT_STATE_*).
export const STATUS = Object.freeze({ ACTIVE: 1, INACTIVE: 2, DELETED: 3 });

export const STATUS_OPTIONS = [
  { value: STATUS.ACTIVE, label: 'Activo' },
  { value: STATUS.INACTIVE, label: 'Inactivo' },
];

// Pestañas por estado de los listados (StatusTabs): activo e inactivo; eliminado nunca se lista.
export const STATUS_TABS = [
  { staId: STATUS.ACTIVE, staName: 'Activos', staColor: 'success' },
  { staId: STATUS.INACTIVE, staName: 'Inactivos', staColor: 'warning' }
];

/** Pestañas con el conteo que devuelve el servidor (`statusCounts`). */
export const statusTabsWithCounts = (statusCounts = {}) => STATUS_TABS.map((s) => ({ ...s, total: statusCounts[s.staId] ?? 0 }));

const dev = import.meta.env.DEV;

export const urlSocket = import.meta.env.VITE_SOCKET_URL || (
  dev ? "http://localhost:4000" : "https://pavastecnologia.com"
);

export const pathSocket = import.meta.env.VITE_SOCKET_PATH || (
  dev ? "/socket.io" : "/template/socket.io"
);

export const toBr = (str) => {
  const replaceStr = "<br />";
  return str !== null && str !== undefined && str !== ""
      ? str.replace(/<\s*\/?br\s*\/?>/gi, replaceStr)
      : "";
};

export const toNlBr = (str, replaceMode, isXhtml) => {
  const breakTag = isXhtml ? "<br />" : "<br>";
  const replaceStr = replaceMode ? "$1" + breakTag : "$1" + breakTag + "$2";
  return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
};


export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length > maxLength) {
    return toNlBr(text?.substring(0, maxLength)) + "...";
  }
  return toNlBr(text);
};

// Unidades del plazo (DEC-030): mismo dominio que el servidor (term.utils.js).
export const TERM_UNIT_OPTIONS = [
  { value: 'DIA', label: 'Días' },
  { value: 'MES', label: 'Meses' },
  { value: 'ANIO', label: 'Años' }
];

// Estados del ciclo de vida del contrato (ADR-0017). Los nombres los manda el
// servidor (`stateName`); aquí solo el color del chip y las pestañas.
export const CONTRACT_STATE_TABS = [
  { id: 'IN_PROGRESS', name: 'En ejecución', color: 'success' },
  { id: 'SUSPENDED', name: 'Suspendidos', color: 'lilac' },
  { id: 'IN_LIQUIDATION', name: 'En liquidación', color: 'info' },
  { id: 'LIQUIDATED', name: 'Liquidados' }
];

export const CONTRACT_STATE_COLORS = { IN_PROGRESS: 'success', SUSPENDED: 'lilac', IN_LIQUIDATION: 'info', LIQUIDATED: 'default' };

// Actos a los que aplica un motivo (rea_scope, DEC-039): los mismos de
// REASON_SCOPES en server/src/modules/admin/reasons/reasons.service.js.
export const REASON_SCOPE_OPTIONS = [
  { value: 'SUSPENSION', label: 'Suspensión de contrato' },
  { value: 'INVOICE_CANCEL', label: 'Anulación de factura' },
  { value: 'POLICY_CANCEL', label: 'Anulación de póliza' }
];

// Bases de cálculo de una póliza (ADR-0019, DEC-050). Mismo dominio que
// POLICY_BASES en server/src/modules/admin/policyTypes/policyBases.js. La
// descripción va en el selector: quien configura un tipo debe ver qué compone
// cada base.
export const POLICY_BASE_OPTIONS = [
  { value: 'DIRECT_COST', label: 'Costo directo', description: 'Solo el costo directo del concepto, sin AIU ni IVA.' },
  { value: 'TAXABLE_BASE', label: 'Base gravable', description: 'Costo directo + AIU, antes de IVA.' },
  { value: 'TOTAL_VALUE', label: 'Valor total', description: 'Costo directo + AIU + IVA: el valor del concepto.' },
  { value: 'VAT_ONLY', label: 'Solo IVA', description: 'Únicamente el IVA del concepto.' }
];

export const policyBaseName = (base) => POLICY_BASE_OPTIONS.find((o) => o.value === base)?.label ?? base;

// Facturas (DEC-042): estado del ciclo de vida y tipo. Los nombres los manda
// el servidor (stateName, typeName); aquí solo pestañas, colores y opciones.
export const INVOICE_STATE_TABS = [
  { id: 'REGISTERED', name: 'Registradas', color: 'warning' },
  { id: 'APPROVED', name: 'Aprobadas', color: 'success' },
  { id: 'CANCELLED', name: 'Anuladas' }
];

export const INVOICE_STATE_COLORS = { REGISTERED: 'warning', APPROVED: 'success', CANCELLED: 'default' };

export const INVOICE_TYPE_OPTIONS = [
  { value: 'SIMPLE', label: 'Simple', hint: 'Sin contrato: se imputa a una etapa de la obra' },
  { value: 'ADVANCE', label: 'Anticipo', hint: 'De un contrato en ejecución' },
  { value: 'LIQUIDATION', label: 'Liquidación', hint: 'De un contrato en liquidación' },
  { value: 'RETENTION_REFUND', label: 'Devolución de retenido', hint: 'De un contrato en liquidación' }
];
export const reasonScopeName = (scope) => REASON_SCOPE_OPTIONS.find((o) => o.value === scope)?.label ?? scope;

const TERM_UNIT_NAMES ={ DIA: ['día', 'días'], MES: ['mes', 'meses'], ANIO: ['año', 'años'] };

/** Plazo para mostrar: "14 meses", "1 año". */
export const fTerm = (amount, unit) => {
  if (amount === null || amount === undefined || amount === '') return '';
  const names = TERM_UNIT_NAMES[unit];
  return names ? `${amount} ${Number(amount) === 1 ? names[0] : names[1]}` : String(amount);
};
