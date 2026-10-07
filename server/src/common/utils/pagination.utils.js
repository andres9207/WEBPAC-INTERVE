/**
 * Paginación estándar para listados con Prisma (findMany + count).
 *
 * Uso en un service:
 *   const page = await paginate(prisma.tbl_x, { where, select, orderBy }, { first, rows });
 *   return { ...page, results: page.results.map(toDto) };
 *
 * Respuesta: { results, total, page, limit, totalPages }. `results` y `total`
 * son el contrato que ya leen las tablas del cliente (UsersPage, ProfilePage,
 * DocumentManagement); page/limit/totalPages se agregan para quien los use.
 *
 * Entrada, cualquiera de las dos formas que envía el cliente:
 *   - { first, rows }: desplazamiento y tamaño (tablas con paginator).
 *   - { page, limit }: número de página desde 1 y tamaño (notificaciones).
 * El tamaño siempre queda entre 1 y MAX_ROWS: ningún listado devuelve la
 * tabla completa, aunque el cliente lo pida.
 *
 * Solo lectura: no va dentro de withTransaction. Si algún día hace falta
 * paginar dentro de una transacción, se pasa el delegate del tx
 * (`tx.tbl_x`) en vez del de `prisma`.
 */

export const DEFAULT_ROWS = 10;
export const MAX_ROWS = 100;

const toInt = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : NaN;
};

/** Normaliza la entrada del cliente a { skip, take } seguros. */
export const resolvePagination = ({ first, rows, page, limit } = {}) => {
  const size = toInt(rows ?? limit);
  const take = Math.min(Math.max(Number.isNaN(size) ? DEFAULT_ROWS : size, 1), MAX_ROWS);

  if (first !== undefined && first !== null && first !== "") {
    const offset = toInt(first);
    return { take, skip: Math.max(Number.isNaN(offset) ? 0 : offset, 0) };
  }

  const pageNumber = Math.max(toInt(page) || 1, 1);
  return { take, skip: (pageNumber - 1) * take };
};

/**
 * `model` es el delegate de Prisma (`prisma.tbl_x`). `queryArgs` lleva
 * where/select/include/orderBy; skip y take los decide el helper (si vienen
 * en queryArgs se ignoran). El conteo usa el mismo `where`, así que el total
 * siempre corresponde al filtro aplicado.
 */
export const paginate = async (model, queryArgs = {}, pagination = {}) => {
  const { take, skip } = resolvePagination(pagination);

  const [results, total] = await Promise.all([
    model.findMany({ ...queryArgs, skip, take }),
    model.count({ where: queryArgs.where }),
  ]);

  return {
    results,
    total,
    page: Math.floor(skip / take) + 1,
    limit: take,
    totalPages: Math.ceil(total / take),
  };
};

/**
 * Búsqueda general de un listado (DEC-024): el mismo texto en cualquiera de
 * las columnas dadas (OR de `contains`, parametrizado). Texto vacío: sin
 * filtro. Las columnas las fija el service, nunca el cliente.
 */
export const searchWhere = (columns, search) => {
  const text = String(search ?? "").trim();
  if (!text || columns.length === 0) return {};
  return { OR: columns.map((column) => ({ [column]: { contains: text } })) };
};

/**
 * Filtros por campo de un listado (DEC-048). Cada helper devuelve una
 * condición de Prisma, o null si el filtro viene vacío; `filtersWhere` las
 * junta en un `AND`. Van en un `AND` y no sueltas en el `where` para que un
 * filtro nunca pise otra condición de la misma columna (p. ej. el alcance por
 * obra, DEC-047, sobre `wrk_id`).
 */

/** Texto contenido: `build({ contains })` arma la condición (columna propia o de una relación). */
export const containsFilter = (value, build) => {
  const text = String(value ?? "").trim();
  return text ? build({ contains: text }) : null;
};

/** Id exacto: `build(id)` arma la condición. */
export const idFilter = (value, build) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? build(id) : null;
};

/** Valor exacto de una lista cerrada (tipo, acto…). */
export const valueFilter = (value, build) => (value ? build(String(value)) : null);

/** Rango de fechas "AAAA-MM-DD" sobre una columna DATE, con los dos extremos incluidos. */
export const dateRangeFilter = (column, from, to) => {
  const range = {
    ...(from ? { gte: new Date(`${from}T00:00:00.000Z`) } : {}),
    ...(to ? { lte: new Date(`${to}T00:00:00.000Z`) } : {}),
  };
  return Object.keys(range).length > 0 ? { [column]: range } : null;
};

/** `{ AND: [...] }` con las condiciones no vacías, o `{}`. */
export const filtersWhere = (conditions) => {
  const list = conditions.filter(Boolean);
  return list.length > 0 ? { AND: list } : {};
};

/**
 * Cuántos registros hay por estado con el `where` dado, para las pestañas
 * por estado: `{ 1: 4, 2: 1 }`. El `where` NO lleva el filtro de estado, o
 * todas las pestañas menos la elegida mostrarían 0.
 */
export const countByStatus = async (model, where) => {
  const grouped = await model.groupBy({ by: ["sta_id"], where, _count: { _all: true } });
  return Object.fromEntries(grouped.map((g) => [g.sta_id, g._count._all]));
};
