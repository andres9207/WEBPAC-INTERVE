// Ayudas de presentación del tablero de la obra (DEC-063). Ninguna calcula
// cifras de negocio: todas llegan del servidor (FRONTEND_STANDARD, regla 9).

/**
 * Importe del servidor ("1234567.50") como número, SOLO para la escala de un
 * gráfico (alto de una barra, ancho de un segmento). Lo que se lee en
 * pantalla se formatea siempre desde el texto (fMoneyText).
 */
export const chartAmount = (text) => {
  const value = Number(text);
  return Number.isFinite(value) ? value : 0;
};

/** Porcentaje del servidor ("64.46") como número de 0 a 100, para el ancho de una barra. */
export const barPercent = (text) => Math.min(100, Math.max(0, chartAmount(text)));

/** "$ 1.234,5 M": importe abreviado para etiquetas de gráfico; el valor exacto va en el tooltip. */
export const fMillions = (text) => {
  const millions = chartAmount(text) / 1e6;
  return `$ ${millions.toLocaleString('es-CO', { maximumFractionDigits: 1 })} M`;
};

export const initialsOf = (name) =>
  String(name ?? '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const MANAGER_ROLE_NAMES = { MAIN: 'Responsable principal', SUPPORT: 'Apoyo' };

// Colores por clave de la paleta (DESIGN_SYSTEM, "Gráficos"): tipos de factura
// y estados del contrato, separables con daltonismo y ≥ 3:1 sobre el fondo
// (validado en DEC-063). El gris es el neutro: la simple no tiene importe y
// liquidado es terminal.
export const INVOICE_TYPE_COLORS = {
  ADVANCE: 'primary.800',
  NORMAL: 'success.dark',
  LIQUIDATION: 'orange.dark',
  RETENTION_REFUND: 'cyan.main',
  SIMPLE: 'grey.600'
};
export const CONTRACT_STATE_CHART_COLORS = {
  IN_PROGRESS: 'primary.800',
  SUSPENDED: 'cyan.main',
  IN_LIQUIDATION: 'orange.dark',
  LIQUIDATED: 'grey.600'
};

export const POLICY_STATUS_COLORS = { NONE: 'default', NO_DATE: 'default', ACTIVE: 'success', EXPIRING: 'warning', EXPIRED: 'error' };

/** Lee "primary.800" de la paleta del tema. */
export const paletteColor = (theme, key) => key.split('.').reduce((node, part) => node?.[part], theme.palette) ?? key;

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "2026-10" → "oct 26". */
export const monthLabel = (month) => {
  const [year, m] = String(month).split('-');
  return `${MONTHS[Number(m) - 1]} ${year.slice(2)}`;
};

const MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
];

/** "2026-10" → "octubre de 2026". */
export const monthName = (month) => {
  const [year, m] = String(month).split('-');
  return `${MONTH_NAMES[Number(m) - 1]} de ${year}`;
};

// El tablero y sus expedientes, abiertos encima como rutas hijas (MainRoutes):
// desde el tablero de la obra nada lleva a otro menú; cerrar vuelve aquí.
export const DASHBOARD_PATH = '/home/default';
export const dashboardTo = {
  work: (wrkId) => `${DASHBOARD_PATH}/works/${wrkId}`,
  provider: (prvId) => `${DASHBOARD_PATH}/providers/${prvId}`,
  contract: (ctrId) => `${DASHBOARD_PATH}/contracts/${ctrId}`,
  invoice: (invId) => `${DASHBOARD_PATH}/invoices/${invId}`
};

export const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;
