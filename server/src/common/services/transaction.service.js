import { Prisma } from "@prisma/client";
import { prisma } from "../configs/prismaClient.js";
import logger from "../configs/winston.config.js";
import { isDeadlock } from "../utils/dbErrors.utils.js";

/**
 * Utilidad única de transacciones (ADR-0027, decisiones 2, 3 y 4).
 *
 * Toda escritura de varias sentencias usa withTransaction o
 * withLockedTransaction; nunca prisma.$transaction directo.
 *
 * Nivel de aislamiento: REPEATABLE READ, declarado en cada transacción en vez
 * de heredado de la configuración del servidor MySQL. En ese nivel InnoDB
 * fija la instantánea de lectura en la PRIMERA lectura no bloqueante: una
 * fila bloqueada después de haber leído otra cosa ya no protege, porque las
 * lecturas siguientes siguen viendo la instantánea vieja. Por eso
 * withLockedTransaction bloquea antes de entregar el `tx` a la operación.
 *
 * Protocolo de bloqueo:
 *   1. El bloqueo (SELECT … FOR UPDATE) es la primera sentencia de lectura de
 *      la transacción.
 *   2. Orden fijo entre entidades: LOCK_ORDER (contrato → factura → póliza →
 *      concepto → …). Dos operaciones que toman los mismos bloqueos en el
 *      mismo orden no pueden interbloquearse.
 *   3. Dentro de una entidad, por identificador ascendente (p. ej. una
 *      operación que afecte a dos contratos bloquea primero el menor).
 * withLockedTransaction aplica los tres puntos por construcción: el service
 * declara QUÉ bloquear y la utilidad decide cuándo y en qué orden.
 */

export const ISOLATION_LEVEL = Prisma.TransactionIsolationLevel.RepeatableRead;

// Espera máxima por un bloqueo, en segundos. Debe quedar por debajo del
// timeout de la transacción interactiva de Prisma (5 s por defecto): así una
// espera larga llega como el error 1205 de MySQL, que error.middleware
// responde con 503, y no como un corte genérico de Prisma. El valor por
// defecto de MySQL (50 s) retendría una de las 10 conexiones del pool.
export const LOCK_WAIT_TIMEOUT_SECONDS = 3;

/**
 * Orden global de bloqueo. Una entidad que aparece antes se bloquea antes.
 * El orden del CORE (contrato → factura → póliza → concepto) es el de
 * ADR-0027; las entidades de seguridad van después y nunca se mezclan con
 * las del CORE en una misma operación, pero tener un único orden total hace
 * imposible el interbloqueo aunque algún día se mezclen.
 */
export const LOCK_ORDER = Object.freeze([
  "CONTRATO",
  "FACTURA",
  "POLIZA",
  "CONCEPTO",
  "DOCUMENTO",
  "PERFIL",
  "USUARIO",
]);

/**
 * Tabla y columna de identificador de cada entidad bloqueable. Solo las
 * tablas que existen: al crear la tabla de contratos, facturas, pólizas o
 * conceptos, se agrega aquí su entrada (la posición en el orden ya está
 * fijada en LOCK_ORDER). Nombres fijos del código, nunca del cliente: se
 * interpolan como identificadores SQL.
 */
const LOCKABLE = Object.freeze({
  DOCUMENTO: { table: "tbl_documents", id: "doc_id" },
  PERFIL: { table: "tbl_profiles", id: "pro_id" },
  USUARIO: { table: "tbl_users", id: "use_id" },
});

const transactionMisuse = (message) => new Error(`[transaction] ${message}`);

const toSortedIds = (entity, ids) => {
  const list = [...new Set((Array.isArray(ids) ? ids : [ids]).map(Number))];
  if (list.length === 0 || list.some((id) => !Number.isInteger(id) || id <= 0)) {
    throw transactionMisuse(`ids inválidos para ${entity}: ${JSON.stringify(ids)}`);
  }
  return list.sort((a, b) => a - b);
};

/**
 * Normaliza lo que el service pide bloquear (`{ ENTIDAD: id | ids[] }`) al
 * plan de bloqueo: entidades en LOCK_ORDER, ids ascendentes. El orden en que
 * el service escribe las claves no importa.
 */
export const buildLockPlan = (locks) => {
  const entities = Object.keys(locks ?? {});
  if (entities.length === 0) throw transactionMisuse("withLockedTransaction sin nada que bloquear");

  for (const entity of entities) {
    if (!LOCK_ORDER.includes(entity)) {
      throw transactionMisuse(`entidad "${entity}" fuera de LOCK_ORDER: agrégala en su posición del protocolo`);
    }
    if (!LOCKABLE[entity]) {
      throw transactionMisuse(`entidad "${entity}" sin tabla registrada en LOCKABLE`);
    }
  }

  return entities
    .sort((a, b) => LOCK_ORDER.indexOf(a) - LOCK_ORDER.indexOf(b))
    .map((entity) => ({ entity, ...LOCKABLE[entity], ids: toSortedIds(entity, locks[entity]) }));
};

// ── Interbloqueos (ADR-0027, decisión 8) ────────────────────────────────────
// InnoDB resuelve un interbloqueo abortando una de las transacciones, que se
// revierte entera. Repetirla es seguro solo si la operación es idempotente
// (fija un estado final: "estos son los permisos", "estos son los datos").
// Una operación que crea o que suma sin clave de idempotencia NO se repite,
// porque no se puede distinguir un reintento de una segunda petición.
// La espera de bloqueo agotada (1205) nunca se reintenta: ya esperó
// LOCK_WAIT_TIMEOUT_SECONDS y reintentar solo alarga la retención de la
// conexión; error.middleware responde 503. Un interbloqueo que persiste tras
// los reintentos responde 409.
export const MAX_DEADLOCK_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 25;

// Espera corta y aleatoria antes de reintentar: si las dos transacciones del
// interbloqueo reintentan a la vez, lo más probable es que vuelvan a chocar.
const backoff = (attempt) =>
  new Promise((resolve) => setTimeout(resolve, RETRY_BASE_DELAY_MS * attempt + Math.random() * RETRY_BASE_DELAY_MS));

const runTransaction = (fn) =>
  prisma.$transaction(
    async (tx) => {
      // Un SET no es una lectura: no fija la instantánea de REPEATABLE READ.
      await tx.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = ${LOCK_WAIT_TIMEOUT_SECONDS}`);
      return fn(tx);
    },
    { isolationLevel: ISOLATION_LEVEL }
  );

/**
 * Transacción con REPEATABLE READ declarado. Para operaciones que no afectan
 * a un registro existente (crear) o que ya son atómicas por una sola
 * sentencia condicionada.
 *
 * `{ idempotent: true }` habilita el reintento ante interbloqueo (hasta
 * MAX_DEADLOCK_RETRIES veces). Declararlo solo si repetir la operación
 * completa deja exactamente el mismo resultado.
 */
export const withTransaction = async (fn, { idempotent = false } = {}) => {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await runTransaction(fn);
    } catch (err) {
      if (!idempotent || !isDeadlock(err) || attempt >= MAX_DEADLOCK_RETRIES) throw err;
      logger.warn(
        `[transaction] interbloqueo, reintento ${attempt + 1}/${MAX_DEADLOCK_RETRIES} de una operación idempotente`
      );
      await backoff(attempt + 1);
    }
  }
};

/**
 * Transacción que bloquea las filas indicadas como primeras sentencias y
 * después ejecuta `fn(tx, locked)`. `locked` tiene, por entidad, los ids que
 * existían y quedaron bloqueados (un id inexistente no bloquea nada: el
 * service decide si eso es un 404).
 *
 *   withLockedTransaction({ USUARIO: useId }, async (tx) => { … })
 *   withLockedTransaction({ FACTURA: [9], CONTRATO: [7, 3] }, …)
 *     → bloquea contrato 3, contrato 7 y después factura 9.
 */
export const withLockedTransaction = (locks, fn, options) => {
  const plan = buildLockPlan(locks);

  return withTransaction(async (tx) => {
    const locked = {};
    for (const { entity, table, id, ids } of plan) {
      const rows = await tx.$queryRaw`
        SELECT ${Prisma.raw(id)} AS id
        FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(id)} IN (${Prisma.join(ids)})
        ORDER BY ${Prisma.raw(id)}
        FOR UPDATE`;
      locked[entity] = rows.map((row) => Number(row.id));
    }
    return fn(tx, locked);
  }, options);
};
