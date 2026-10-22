import "dotenv/config";
import { prisma } from "../src/common/configs/prismaClient.js";

// Comprobación de las invariantes de estructura I6 a I15 contra la BD
// configurada (`yarn db:check-invariants`; PRO-BD-25). Catálogo:
// engineering/invariants/DOMAIN_INVARIANTS.md.
//
// Cada caso intenta violar una invariante y espera que la BD lo rechace con
// **la restricción que la declara** (UNIQUE, CHECK o UNIQUE sobre columna
// generada). Un rechazo por otra restricción no cuenta: no probaría nada.
//
// Nada queda escrito: cada caso corre en su transacción y se revierte siempre.
// Para no depender de datos concretos, los casos que necesitan una segunda
// fila copian una existente dentro de esa transacción. Lo único que deja es
// huecos en los AUTO_INCREMENT. Si la BD no tiene una fila de la que partir,
// el caso queda "sin datos".
//
// Salida: 0 si todas fueron rechazadas por su restricción; 1 si alguna fue
// aceptada o rechazada por otra; 2 si ninguna falló pero alguna quedó sin
// datos. En producción no corre sin --allow-production.
//
// I1 a I5 (saldos) no son expresables en el esquema: las garantizan el
// bloqueo del contrato y la revalidación en el backend, y las concilia el
// cron (DEC-061).

const one = async (tx, sql) => (await tx.$queryRawUnsafe(sql))[0] ?? null;

const columnsCache = new Map();
const insertableColumns = async (tx, table) => {
  if (!columnsCache.has(table)) {
    const rows = await tx.$queryRawUnsafe(
      `SELECT COLUMN_NAME c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND EXTRA NOT LIKE '%GENERATED%' AND EXTRA NOT LIKE '%auto_increment%'
       ORDER BY ORDINAL_POSITION`,
      table
    );
    columnsCache.set(table, rows.map((r) => r.c));
  }
  return columnsCache.get(table);
};

/** INSERT … SELECT que copia una fila, con columnas reemplazadas por expresiones SQL. */
const cloneSql = async (tx, table, pk, id, overrides = {}) => {
  const cols = await insertableColumns(tx, table);
  const values = cols.map((c) => (c in overrides ? `${overrides[c]} AS \`${c}\`` : `\`${c}\``));
  return `INSERT INTO \`${table}\` (${cols.map((c) => `\`${c}\``).join(", ")}) SELECT ${values.join(", ")} FROM \`${table}\` WHERE \`${pk}\` = ${Number(id)}`;
};

const NO_IDEMPOTENCY = (pre) => ({ [`${pre}_idempotency_key`]: "NULL", [`${pre}_idempotency_hash`]: "NULL" });

/**
 * Cada caso: `prepare(tx)` devuelve las sentencias a ejecutar en orden, o null
 * si no hay datos. Las primeras son preparación; la que falle es el resultado.
 */
const CHECKS = [
  {
    id: "I6",
    title: "un segundo valor inicial en el contrato",
    constraint: "uq_contract_concepts_initial",
    prepare: async (tx) => {
      const c = await one(tx, `SELECT ccp_id FROM tbl_contract_concepts WHERE ccp_type = 'INITIAL' LIMIT 1`);
      return c && [await cloneSql(tx, "tbl_contract_concepts", "ccp_id", c.ccp_id, NO_IDEMPOTENCY("ccp"))];
    },
  },
  {
    id: "I7",
    title: "un segundo otrosí de liquidación en el contrato",
    constraint: "uq_contract_concepts_liquidation",
    prepare: async (tx) => {
      const c = await one(tx, `SELECT ccp_id FROM tbl_contract_concepts WHERE ccp_type = 'INITIAL' LIMIT 1`);
      if (!c) return null;
      const clone = await cloneSql(tx, "tbl_contract_concepts", "ccp_id", c.ccp_id, { ...NO_IDEMPOTENCY("ccp"), ccp_type: "'LIQUIDATION'" });
      return [clone, clone];
    },
  },
  {
    id: "I8",
    title: "un número de otrosí repetido en el contrato",
    constraint: "uq_contract_concepts_number",
    prepare: async (tx) => {
      const c = await one(tx, `SELECT ccp_id FROM tbl_contract_concepts WHERE ccp_type = 'INITIAL' LIMIT 1`);
      if (!c) return null;
      const clone = await cloneSql(tx, "tbl_contract_concepts", "ccp_id", c.ccp_id, { ...NO_IDEMPOTENCY("ccp"), ccp_type: "'AMENDMENT'", ccp_number: "999999" });
      return [clone, clone];
    },
  },
  {
    id: "I9",
    title: "una segunda suspensión abierta en el contrato",
    constraint: "uq_contract_suspensions_open",
    prepare: async (tx) => {
      const s = await one(tx, `SELECT csp_id FROM tbl_contract_suspensions LIMIT 1`);
      if (!s) return null;
      const clone = await cloneSql(tx, "tbl_contract_suspensions", "csp_id", s.csp_id, { csp_lift_date: "NULL", csp_days: "NULL", ccp_id: "NULL" });
      return [clone, clone];
    },
  },
  {
    id: "I10",
    title: "una segunda versión vigente de la póliza",
    constraint: "uq_policies_current",
    prepare: async (tx) => {
      const p = await one(tx, `SELECT pol_id FROM tbl_policies WHERE pol_is_current = 1 LIMIT 1`);
      return p && [await cloneSql(tx, "tbl_policies", "pol_id", p.pol_id, { ...NO_IDEMPOTENCY("pol"), pol_version: "pol_version + 1" })];
    },
  },
  {
    id: "I11",
    title: "un número de factura repetido del proveedor entre no eliminadas (contra una anulada, si hay)",
    constraint: "uq_invoices_provider_number_active",
    prepare: async (tx) => {
      const i = await one(tx, `SELECT inv_id FROM tbl_invoices WHERE sta_id <> 3 ORDER BY inv_state = 'CANCELLED' DESC, inv_id LIMIT 1`);
      return i && [await cloneSql(tx, "tbl_invoices", "inv_id", i.inv_id, NO_IDEMPOTENCY("inv"))];
    },
  },
  {
    id: "I12",
    title: "un número de contrato repetido en la obra",
    constraint: "uq_contracts_work_number_active",
    prepare: async (tx) => {
      const c = await one(tx, `SELECT ctr_id FROM tbl_contracts WHERE sta_id <> 3 LIMIT 1`);
      return c && [await cloneSql(tx, "tbl_contracts", "ctr_id", c.ctr_id, NO_IDEMPOTENCY("ctr"))];
    },
  },
  {
    id: "I13",
    title: "una factura de contrato sin contrato",
    constraint: "ck_invoices_type_links",
    prepare: async (tx) => {
      const i = await one(tx, `SELECT inv_id FROM tbl_invoices WHERE inv_type <> 'SIMPLE' LIMIT 1`);
      return i && [`UPDATE tbl_invoices SET ctr_id = NULL WHERE inv_id = ${i.inv_id}`];
    },
  },
  {
    id: "I13",
    title: "una factura de contrato con etapa propia",
    constraint: "ck_invoices_type_links",
    prepare: async (tx) => {
      const i = await one(
        tx,
        `SELECT i.inv_id, s.wks_id FROM tbl_invoices i JOIN tbl_work_stages s ON s.wrk_id = i.wrk_id WHERE i.inv_type <> 'SIMPLE' LIMIT 1`
      );
      return i && [`UPDATE tbl_invoices SET wks_id = ${i.wks_id} WHERE inv_id = ${i.inv_id}`];
    },
  },
  {
    id: "I13",
    title: "una factura simple con contrato",
    constraint: "ck_invoices_type_links",
    prepare: async (tx) => {
      // La simple puede no tener etapa si su obra no tiene etapas (DEC-069): eso lo verifica el service.
      const i = await one(
        tx,
        `SELECT i.inv_id, c.ctr_id FROM tbl_invoices i JOIN tbl_contracts c ON c.wrk_id = i.wrk_id AND c.prv_id = i.prv_id WHERE i.inv_type = 'SIMPLE' LIMIT 1`
      );
      return i && [`UPDATE tbl_invoices SET ctr_id = ${i.ctr_id} WHERE inv_id = ${i.inv_id}`];
    },
  },
  {
    id: "I14",
    title: "una factura aprobada sin fecha de aprobación",
    constraint: "ck_invoices_approval",
    prepare: async (tx) => {
      const i = await one(tx, `SELECT inv_id FROM tbl_invoices LIMIT 1`);
      return i && [`UPDATE tbl_invoices SET inv_state = 'APPROVED', inv_approval_date = NULL WHERE inv_id = ${i.inv_id}`];
    },
  },
  {
    id: "I14",
    title: "una factura registrada con fecha de aprobación",
    constraint: "ck_invoices_approval",
    prepare: async (tx) => {
      const i = await one(tx, `SELECT inv_id FROM tbl_invoices LIMIT 1`);
      return i && [`UPDATE tbl_invoices SET inv_state = 'REGISTERED', inv_approval_date = inv_date WHERE inv_id = ${i.inv_id}`];
    },
  },
  {
    id: "I15",
    title: "un contrato con fecha fin antes del inicio",
    constraint: "ck_contracts_end_date",
    prepare: async (tx) => {
      const c = await one(tx, `SELECT ctr_id FROM tbl_contracts LIMIT 1`);
      return c && [`UPDATE tbl_contracts SET ctr_end_date = DATE_SUB(ctr_start_date, INTERVAL 1 DAY) WHERE ctr_id = ${c.ctr_id}`];
    },
  },
];

const ROLLBACK = Symbol("rollback");
const errorText = (e) => `${e?.message ?? ""} ${JSON.stringify(e?.meta ?? {})}`;
const shortError = (e) => (e?.meta?.driverAdapterError?.cause?.message ?? e?.message ?? String(e)).split("\n").pop().slice(0, 160);

const runCheck = async (check) => {
  let outcome;
  try {
    await prisma.$transaction(async (tx) => {
      const statements = await check.prepare(tx);
      if (!statements) {
        outcome = { status: "SKIPPED" };
        throw ROLLBACK;
      }
      for (const sql of statements) {
        try {
          await tx.$executeRawUnsafe(sql);
        } catch (e) {
          outcome = errorText(e).includes(check.constraint) ? { status: "REJECTED" } : { status: "OTHER", detail: shortError(e) };
          throw ROLLBACK;
        }
      }
      outcome = { status: "ACCEPTED" };
      throw ROLLBACK;
    });
  } catch (e) {
    if (e !== ROLLBACK) throw e;
  }
  return outcome;
};

const LABELS = {
  REJECTED: "ok     ",
  ACCEPTED: "FALLA  ",
  OTHER: "FALLA  ",
  SKIPPED: "sin datos",
};

if (process.env.NODE_ENV === "production" && !process.argv.includes("--allow-production")) {
  console.error("En producción solo corre con --allow-production: toma bloqueos breves y deja huecos en los AUTO_INCREMENT.");
  process.exit(1);
}

let failed = 0;
let skipped = 0;
try {
  for (const check of CHECKS) {
    const { status, detail } = await runCheck(check);
    if (status === "ACCEPTED" || status === "OTHER") failed += 1;
    if (status === "SKIPPED") skipped += 1;
    const why =
      status === "REJECTED"
        ? `rechazada por ${check.constraint}`
        : status === "ACCEPTED"
          ? "la BD la aceptó"
          : status === "OTHER"
            ? `rechazada por otra restricción, no por ${check.constraint}: ${detail}`
            : "no hay una fila de la que partir";
    console.log(`${LABELS[status]} ${check.id.padEnd(4)} ${check.title}: ${why}`);
  }
} finally {
  await prisma.$disconnect();
}

console.log(`\n${CHECKS.length} casos: ${CHECKS.length - failed - skipped} ok, ${failed} con falla, ${skipped} sin datos. Nada quedó escrito.`);
process.exit(failed ? 1 : skipped ? 2 : 0);
