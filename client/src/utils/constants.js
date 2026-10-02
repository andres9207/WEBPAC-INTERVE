export const STATUS_OPTIONS = [
  { value: 1, label: 'Activo' },
  { value: 2, label: 'Inactivo' },
];

// Pestañas por estado de los listados (StatusTabs): activo e inactivo; eliminado nunca se lista.
export const STATUS_TABS = [
  { staId: 1, staName: 'Activos', staColor: 'success' },
  { staId: 2, staName: 'Inactivos', staColor: 'warning' }
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
  { id: 'SUSPENDED', name: 'Suspendidos', color: 'warning' },
  { id: 'IN_LIQUIDATION', name: 'En liquidación', color: 'info' },
  { id: 'LIQUIDATED', name: 'Liquidados' }
];

export const CONTRACT_STATE_COLORS = { IN_PROGRESS: 'success', SUSPENDED: 'warning', IN_LIQUIDATION: 'info', LIQUIDATED: 'default' };

const TERM_UNIT_NAMES ={ DIA: ['día', 'días'], MES: ['mes', 'meses'], ANIO: ['año', 'años'] };

/** Plazo para mostrar: "14 meses", "1 año". */
export const fTerm = (amount, unit) => {
  if (amount === null || amount === undefined || amount === '') return '';
  const names = TERM_UNIT_NAMES[unit];
  return names ? `${amount} ${Number(amount) === 1 ? names[0] : names[1]}` : String(amount);
};
