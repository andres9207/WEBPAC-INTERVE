// Estados de visibilidad (tbl_status, DEC-038): los mismos ids que
// server/src/common/constants/status.constants.js. El ciclo de vida de un
// contrato no va aquí: tiene su propio estado (CONTRACT_STATE_*).
export const STATUS = Object.freeze({ ACTIVE: 1, INACTIVE: 2, DELETED: 3 });

export const STATUS_OPTIONS = [
  { value: STATUS.ACTIVE, label: 'Activo' },
  { value: STATUS.INACTIVE, label: 'Inactivo' }
];

// Pestañas por estado de los listados (StatusTabs): activo e inactivo; eliminado nunca se lista.
export const STATUS_TABS = [
  { staId: STATUS.ACTIVE, staName: 'Activos', staColor: 'success' },
  { staId: STATUS.INACTIVE, staName: 'Inactivos', staColor: 'warning' }
];

/** Pestañas con el conteo que devuelve el servidor (`statusCounts`). */
export const statusTabsWithCounts = (statusCounts = {}) => STATUS_TABS.map((s) => ({ ...s, total: statusCounts[s.staId] ?? 0 }));

const dev = import.meta.env.DEV;

export const urlSocket = import.meta.env.VITE_SOCKET_URL || (dev ? 'http://localhost:4000' : 'https://pavastecnologia.com');

export const pathSocket = import.meta.env.VITE_SOCKET_PATH || (dev ? '/socket.io' : '/template/socket.io');

export const toBr = (str) => {
  const replaceStr = '<br />';
  return str !== null && str !== undefined && str !== '' ? str.replace(/<\s*\/?br\s*\/?>/gi, replaceStr) : '';
};

export const toNlBr = (str, replaceMode, isXhtml) => {
  const breakTag = isXhtml ? '<br />' : '<br>';
  const replaceStr = replaceMode ? '$1' + breakTag : '$1' + breakTag + '$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return toNlBr(text?.substring(0, maxLength)) + '...';
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
  { id: 'LIQUIDATED', name: 'Liquidados' },
  { id: 'CANCELLED', name: 'Anulados', color: 'error' }
];

export const CONTRACT_STATE_COLORS = {
  IN_PROGRESS: 'success',
  SUSPENDED: 'lilac',
  IN_LIQUIDATION: 'info',
  LIQUIDATED: 'default',
  CANCELLED: 'error'
};

// Alertas del listado de contratos: las mismas de CONTRACT_ALERTS en
// server/src/modules/work/contracts/contractTerms.js. Van aparte de las
// pestañas de estado y se combinan con ellas. Las de pólizas (`policies`)
// solo con el permiso de verlas: el servidor responde 403 sin él.
export const CONTRACT_ALERT_OPTIONS = [
  { id: 'EXPIRING', name: 'Próximo a vencer', color: 'warning' },
  { id: 'EXPIRED', name: 'Contrato vencido', color: 'error' },
  { id: 'POLICIES_EXPIRING', name: 'Pólizas por vencer', color: 'warning', policies: true },
  { id: 'POLICIES_EXPIRED', name: 'Pólizas vencidas', color: 'error', policies: true },
  { id: 'NO_POLICIES', name: 'Sin póliza', color: 'error', policies: true }
];

/** Alertas que el usuario puede ver: las de pólizas, solo con su permiso. */
export const contractAlertOptions = (canViewPolicies) => CONTRACT_ALERT_OPTIONS.filter((a) => canViewPolicies || !a.policies);

// Estado de pólizas del contrato (DEC-052): los mismos de
// CONTRACT_POLICY_STATUS_NAMES en server/src/modules/work/contracts/policyTerms.js.
export const CONTRACT_POLICY_STATUS_LABELS = {
  EXPIRED: 'Con póliza vencida',
  EXPIRING: 'Con póliza a vencer',
  ACTIVE: 'Pólizas vigentes',
  NO_DATE: 'Pólizas sin fecha de vigencia',
  NONE: 'Sin póliza'
};

// Actos a los que aplica un motivo (rea_scope, DEC-039): los mismos de
// REASON_SCOPES en server/src/modules/admin/reasons/reasons.service.js.
export const REASON_SCOPE_OPTIONS = [
  { value: 'SUSPENSION', label: 'Suspensión de contrato' },
  { value: 'INVOICE_CANCEL', label: 'Anulación de factura' },
  { value: 'POLICY_CANCEL', label: 'Anulación de póliza' },
  { value: 'CONTRACT_CANCEL', label: 'Anulación de contrato' }
];

// Bases de cálculo de una póliza (ADR-0019, DEC-050). Mismo dominio que
// POLICY_BASES en server/src/modules/admin/policyTypes/policyBases.js. La
// descripción va en el selector: quien configura un tipo debe ver qué compone
// cada base.
// Ciclo de vida de la obra (DEC-083): los mismos de WORK_STATES en server/src/modules/work/works/works.service.js.
export const WORK_STATE_OPTIONS = [
  { value: 'IN_PROGRESS', label: 'En curso' },
  { value: 'FINISHED', label: 'Finalizada' }
];

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
  { id: 'REGISTERED', name: 'Por aprobar', color: 'warning' },
  { id: 'APPROVED', name: 'Aprobadas', color: 'success' },
  { id: 'CANCELLED', name: 'Anuladas' }
];

export const INVOICE_STATE_COLORS = { REGISTERED: 'warning', APPROVED: 'success', CANCELLED: 'default' };

export const INVOICE_TYPE_OPTIONS = [
  { value: 'SIMPLE', label: 'Simple', hint: 'Imputada a una etapa de la obra, sin contrato' },
  { value: 'ADVANCE', label: 'Anticipo', hint: 'De un contrato en ejecución' },
  { value: 'NORMAL', label: 'Normal', hint: 'Avance de un contrato en ejecución: amortiza y retiene' },
  { value: 'LIQUIDATION', label: 'Liquidación', hint: 'De un contrato en liquidación' },
  { value: 'RETENTION_REFUND', label: 'Devolución de retenido', hint: 'De un contrato en liquidación' }
];

const CONTRACT_INVOICE_TYPES = ['ADVANCE', 'NORMAL', 'LIQUIDATION', 'RETENTION_REFUND'];

// Filtro "Anticipo" de los listados (advanceFilters.js del servidor). "Por
// aprobar": las facturas registradas, que todavía no mueven los saldos.
export const INVOICE_ADVANCE_FILTER_OPTIONS = [
  { value: 'ADVANCE', label: 'Anticipo' },
  { value: 'AMORTIZATION', label: 'Con amortización' },
  { value: 'PENDING', label: 'Anticipo o amortización por aprobar' },
  { value: 'PENDING_ADVANCE', label: 'Anticipo por aprobar' },
  { value: 'PENDING_AMORTIZATION', label: 'Amortización por aprobar' }
];
export const CONTRACT_ADVANCE_FILTER_OPTIONS = [
  { value: 'WITH_ADVANCE', label: 'Con anticipo pactado' },
  { value: 'TO_INVOICE', label: 'Anticipo por facturar' },
  { value: 'TO_AMORTIZE', label: 'Anticipo por amortizar' },
  { value: 'AMORTIZED', label: 'Anticipo amortizado por completo' },
  { value: 'PENDING', label: 'Anticipo o amortización por aprobar' }
];

// Facturan el valor del contrato (DEC-071): VALOR antes de IVA, amortización
// del anticipo y retenido. La normal, en ejecución; la liquidación, al final.
export const isBillingInvoiceType = (type) => type === 'NORMAL' || type === 'LIQUIDATION';

// Menús de facturas (DEC-074): uno por tipo de proveedor con la casilla del
// menú, que da el servidor; ninguno está escrito aquí. Cada tipo factura de
// una de dos formas, que deciden la pantalla y los tipos de factura. La
// factura dice a qué menú pertenece (`pvtId`, del servidor).
export const INVOICE_MODES = { SIMPLE: 'SIMPLE', CONTRACT: 'CONTRACT' };

export const INVOICE_MODE_OPTIONS = [
  { value: INVOICE_MODES.SIMPLE, label: 'Simple (sin contrato)' },
  { value: INVOICE_MODES.CONTRACT, label: 'Con contrato' }
];

export const invoiceModeName = (mode) => INVOICE_MODE_OPTIONS.find((o) => o.value === mode)?.label ?? 'No factura';

/** Tipos de factura de cada forma de facturar. */
export const INVOICE_MODE_TYPES = { [INVOICE_MODES.SIMPLE]: ['SIMPLE'], [INVOICE_MODES.CONTRACT]: CONTRACT_INVOICE_TYPES };

/**
 * Dirección de un contrato o de un listado de contratos: sin menú, el general
 * (`/work/contracts`); con él, el del menú de su tipo de proveedor (DEC-077):
 * `contractPath(3, 70)` → `/work/contracts/menu/3/70`.
 */
export const contractPath = (pvtId, ctrId, suffix) =>
  [pvtId ? `/work/contracts/menu/${pvtId}` : '/work/contracts', ctrId, suffix]
    .filter((part) => part !== undefined && part !== null && part !== '')
    .join('/');
/** Dirección del listado de un menú (su tipo de proveedor), o de una factura en él: `invoicePath(3, 70, 'edit')`. */
export const invoicePath = (pvtId, invId, suffix) =>
  ['/billing/invoices', pvtId, invId, suffix].filter((part) => part !== undefined && part !== null && part !== '').join('/');
export const reasonScopeName = (scope) => REASON_SCOPE_OPTIONS.find((o) => o.value === scope)?.label ?? scope;

const TERM_UNIT_NAMES = { DIA: ['día', 'días'], MES: ['mes', 'meses'], ANIO: ['año', 'años'] };

/** Plazo para mostrar: "14 meses", "1 año". */
export const fTerm = (amount, unit) => {
  if (amount === null || amount === undefined || amount === '') return '';
  const names = TERM_UNIT_NAMES[unit];
  return names ? `${amount} ${Number(amount) === 1 ? names[0] : names[1]}` : String(amount);
};
