/**
 * Plazos y fechas sin hora (DEC-030). Un plazo es una cantidad entera más su
 * unidad (DIA, MES, ANIO; mismo dominio que el contrato, ADR-0015). La fecha
 * final que resulta la calcula siempre el servidor (FRONTEND_STANDARD, regla 9).
 *
 * Las fechas sin hora viajan como texto "AAAA-MM-DD" y se guardan en columnas
 * DATE. Se opera en UTC para que la zona del servidor no corra el día.
 */

export const TERM_UNITS = Object.freeze(["DIA", "MES", "ANIO"]);

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** "2026-03-15" → Date a medianoche UTC, o null si no es una fecha real. */
export const toDateOnly = (text) => {
  const match = ISO_DATE.exec(String(text ?? "").trim());
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const valid = date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  return valid ? date : null;
};

/** Date de una columna DATE → "AAAA-MM-DD", o null. */
export const dateOnlyText = (date) => (date ? new Date(date).toISOString().slice(0, 10) : null);

const daysInMonth = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

/**
 * Fecha de inicio + plazo. Sumar meses o años conserva el día; si el mes de
 * destino es más corto, cae en su último día (31 ene + 1 mes = 28 o 29 feb).
 * Devuelve "AAAA-MM-DD", o null si falta la fecha, el plazo o la unidad.
 */
export const addTerm = (startDate, amount, unit) => {
  const start = startDate instanceof Date ? startDate : toDateOnly(startDate);
  const n = Number(amount);
  if (!start || !Number.isInteger(n) || n < 0 || !TERM_UNITS.includes(unit)) return null;

  if (unit === "DIA") return dateOnlyText(new Date(start.getTime() + n * 86400000));

  const months = unit === "ANIO" ? n * 12 : n;
  const total = start.getUTCMonth() + months;
  const year = start.getUTCFullYear() + Math.floor(total / 12);
  const monthIndex = total % 12;
  const day = Math.min(start.getUTCDate(), daysInMonth(year, monthIndex));
  return dateOnlyText(new Date(Date.UTC(year, monthIndex, day)));
};

/** Fecha de hoy en la zona del servidor, a medianoche UTC (como una columna DATE). */
export const todayDateOnly = (now = new Date()) => new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

/**
 * Avance del plazo (DEC-033): porcentaje entero de 0 a 100 de los días
 * transcurridos entre la fecha de inicio y la final. Antes del inicio es 0 y
 * después del final, 100. null si falta alguna de las dos fechas.
 */
export const termProgress = (startDate, endDate, today = todayDateOnly()) => {
  const start = startDate instanceof Date ? startDate : toDateOnly(startDate);
  const end = endDate instanceof Date ? endDate : toDateOnly(endDate);
  if (!start || !end) return null;
  const span = end.getTime() - start.getTime();
  if (span <= 0) return today.getTime() >= end.getTime() ? 100 : 0;
  const percent = Math.round(((today.getTime() - start.getTime()) / span) * 100);
  return Math.min(100, Math.max(0, percent));
};

/** Umbrales del avance del plazo: desde aquí la obra se marca en alerta o crítica. */
export const PROGRESS_WARNING = 70;
export const PROGRESS_CRITICAL = 90;

/** NORMAL, WARNING o CRITICAL según el avance; null sin avance. */
export const progressLevel = (percent) => {
  if (percent === null || percent === undefined) return null;
  if (percent >= PROGRESS_CRITICAL) return "CRITICAL";
  if (percent >= PROGRESS_WARNING) return "WARNING";
  return "NORMAL";
};
