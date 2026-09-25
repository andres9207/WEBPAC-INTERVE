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
