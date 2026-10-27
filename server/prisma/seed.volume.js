import { createHash } from "node:crypto";
import { prisma } from "../src/common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../src/common/services/effectivePermissions.service.js";
import { ACTIVE_STATUS, DELETED_STATUS } from "../src/common/constants/status.constants.js";
import { nitCheckDigit } from "../src/modules/admin/identityDocuments/identityDocuments.formats.js";
import { REASON_SCOPES } from "../src/modules/admin/reasons/reasons.service.js";
import { saveProviderTypeFields } from "../src/modules/admin/providerTypes/providerTypeFields.service.js";
import { saveWork } from "../src/modules/work/works/works.service.js";
import { saveProvider, assignProviderToWork } from "../src/modules/work/providers/providers.service.js";
import { saveContract } from "../src/modules/work/contracts/contracts.service.js";
import { createLiquidation } from "../src/modules/work/contracts/contractConcepts.service.js";
import { suspendContract } from "../src/modules/work/contracts/contractSuspensions.service.js";
import { createPolicy } from "../src/modules/work/contracts/contractPolicies.service.js";
import { CONCEPT_TYPES } from "../src/modules/work/contracts/contractTerms.js";
import { saveInvoice, approveInvoice, cancelInvoice } from "../src/modules/billing/invoices/invoices.service.js";
import { INVOICE_TYPES } from "../src/modules/billing/invoices/invoiceTerms.js";

// Volumen de prueba del tablero (PRO-BD-24, criterio 4; DEC-052): 10 obras
// con 10 contratos cada una, con sus pólizas y facturas. Lo usa
// `yarn db:measure-dashboard` para medir las agregaciones.
//
// Solo corre contra una base cuyo nombre termina en `_volume`: es una copia de
// la de desarrollo (ver DEC-052, "Rendimiento"), porque además deja los tipos
// de proveedor Subcontratista y Contrato mayor con todos los campos del
// contrato, para que haya anticipo y retenido que facturar.
//
// Como seed.demo.js, todo pasa por los services reales con el Superadmin.
// Cada acto lleva una clave de idempotencia estable y datos fijos (fechas e
// importes), así que se puede correr otra vez: los services devuelven lo ya
// creado.

const dbName = (() => {
  try {
    return new URL(process.env.DATABASE_URL).pathname.replace(/^\//, "");
  } catch {
    return "";
  }
})();
if (process.env.NODE_ENV === "production" || !dbName.endsWith("_volume")) {
  console.error(`seed.volume.js: solo corre contra una base *_volume (DATABASE_URL apunta a "${dbName}").`);
  process.exit(1);
}

const ACTOR_USER_ID = 1;
const WORKS = 10;
const CONTRACTS_PER_WORK = 10;
const SIMPLE_INVOICES_PER_WORK = 10;
const PROVIDERS_PER_WORK = 5;
const CONTRACT_PROVIDERS = 10;
const SIMPLE_PROVIDERS = 3;

const ID_DOC_NIT = 3;
const PROVIDER_TYPE = { SIMPLE: 1, SUBCONTRACTOR: 2, MAJOR: 3 };
const SUPERVISION_TYPES = [1, 2, 3, 4];
const STAGES = ["Cimentación", "Estructura", "Mampostería", "Acabados"];

// Todos los campos del contrato, con la etapa obligatoria (como los deja seed.js).
const ALL_FIELDS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((cfdId, i) => ({ cfdId, applies: true, visible: true, required: cfdId === 1, order: i + 1 }));

// Ciclo de vida de los contratos de cada obra, por posición (0–9).
const PLAN = [
  { advance: "approved" },
  { advance: "approved" },
  { advance: "approved" },
  { advance: "approved" },
  { advance: "registered" },
  { advance: "cancelled" },
  { advance: "approved", suspend: true },
  { advance: "approved", liquidation: "approved" },
  { advance: "approved", liquidation: "approved", refund: true },
  { advance: "approved", liquidation: "registered" },
];

// Fin de vigencia de las pólizas, por posición: vencida, a vencer, vigente y sin fecha (frente al 2026-10-15).
const END_DATES = ["2026-08-31", "2026-11-05", "2027-06-30", null];

const pad = (n) => String(n).padStart(2, "0");
const addDays = (date, days) => new Date(new Date(`${date}T00:00:00Z`).getTime() + days * 86400000).toISOString().slice(0, 10);
const nit = (digits) => `${digits}-${nitCheckDigit(digits)}`;
const concept = (directCost) => ({ directCost, adminPct: "8", contingencyPct: "2", profitPct: "5", vatPct: "19", advancePct: "15", retentionPct: "5" });

const volumeKey = (name) => {
  const hex = createHash("sha1").update(`webpac-interve-volume:${name}`).digest("hex");
  const variant = ((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
};

const firstActive = async (model, idField, take) =>
  (await prisma[model].findMany({ where: { sta_id: ACTIVE_STATUS }, select: { [idField]: true }, orderBy: { [idField]: "asc" }, take })).map((r) => r[idField]);

const reasonOf = async (scope) => {
  const row = await prisma.tbl_reasons.findFirst({ where: { rea_scope: scope, sta_id: ACTIVE_STATUS }, select: { rea_id: true }, orderBy: { rea_id: "asc" } });
  if (!row) throw new Error(`No hay un motivo activo de ${scope}: corre antes yarn db:seed:demo.`);
  return row.rea_id;
};

async function main() {
  const actor = await prisma.tbl_users.findUnique({ where: { use_id: ACTOR_USER_ID }, select: { use_id: true, pro_id: true, sta_id: true } });
  if (!actor || actor.sta_id !== ACTIVE_STATUS) throw new Error(`El usuario ${ACTOR_USER_ID} (Superadmin) no existe o no está activo.`);
  const useBy = actor.use_id;
  const ctx = { useId: useBy };
  const granted = new Set(await getEffectivePermissionIds({ useId: actor.use_id, proId: actor.pro_id }));
  const scope = { all: true, wrkId: null };

  const companies = await firstActive("tbl_construction_companies", "cnc_id", 10);
  const contractTypes = await firstActive("tbl_contract_types", "ctt_id", 4);
  const insurers = await firstActive("tbl_insurers", "ins_id", 5);
  const policyTypes = await firstActive("tbl_policy_types", "plt_id", 3);
  if (!companies.length || !contractTypes.length || !insurers.length || policyTypes.length < 3) {
    throw new Error("Faltan maestros activos (constructoras, tipos de contrato, aseguradoras o tres tipos de póliza): corre antes yarn db:seed:demo.");
  }
  const suspensionReason = await reasonOf(REASON_SCOPES.SUSPENSION);
  const cancelReason = await reasonOf(REASON_SCOPES.INVOICE_CANCEL);
  const managers = [{ useId: useBy, role: "MAIN" }];

  console.log("Campos del contrato de Subcontratista y Contrato mayor: todos");
  for (const pvtId of [PROVIDER_TYPE.SUBCONTRACTOR, PROVIDER_TYPE.MAJOR]) await saveProviderTypeFields({ pvtId, fields: ALL_FIELDS, useBy, ctx });

  console.log("Proveedores");
  // Tipo de cada proveedor: con él trabaja en sus obras y firma sus contratos (DEC-066).
  const providerTypeOf = {};
  const contractProviders = [];
  for (let i = 1; i <= CONTRACT_PROVIDERS; i++) {
    const identification = nit(`9009002${pad(i)}`);
    const input = {
      iddId: ID_DOC_NIT,
      identification,
      name: `[VOL] Contratista ${pad(i)} S.A.S.`,
      pvtIds: [i % 2 ? PROVIDER_TYPE.MAJOR : PROVIDER_TYPE.SUBCONTRACTOR],
      serviceType: "Obra civil",
      email: `contratista${pad(i)}@volumen.demo`,
      contacts: [],
    };
    const { prvId } = await saveProvider({ input, useBy, granted, ctx, idempotencyKey: volumeKey(`provider:${identification}`) });
    contractProviders.push(prvId);
    providerTypeOf[prvId] = input.pvtIds[0];
  }
  const simpleProviders = [];
  for (let i = 1; i <= SIMPLE_PROVIDERS; i++) {
    const identification = nit(`9009003${pad(i)}`);
    const input = {
      iddId: ID_DOC_NIT,
      identification,
      name: `[VOL] Suministros ${pad(i)} Ltda.`,
      pvtIds: [PROVIDER_TYPE.SIMPLE],
      serviceType: "Suministros",
      email: `suministros${pad(i)}@volumen.demo`,
      contacts: [],
    };
    const { prvId } = await saveProvider({ input, useBy, granted, ctx, idempotencyKey: volumeKey(`provider:${identification}`) });
    simpleProviders.push(prvId);
    providerTypeOf[prvId] = PROVIDER_TYPE.SIMPLE;
  }

  for (let w = 1; w <= WORKS; w++) {
    const code = `VOL-OBR-${pad(w)}`;
    const startDate = addDays("2025-10-01", (w - 1) * 3);
    console.log(`Obra ${code}`);
    const { wrkId } = await saveWork({
      input: {
        code,
        name: `[VOL] Obra de volumen ${pad(w)}`,
        cncId: companies[(w - 1) % companies.length],
        cttId: contractTypes[(w - 1) % contractTypes.length],
        sptId: SUPERVISION_TYPES[(w - 1) % SUPERVISION_TYPES.length],
        startDate,
        initialTerm: "24",
        termUnit: "MES",
        area: "10000.00",
        directCost: "8000000000.00",
        initialValue: "10000000000.00",
        managers,
        stages: STAGES.map((name, i) => ({ name, order: i + 1 })),
      },
      useBy,
      granted,
      ctx,
      idempotencyKey: volumeKey(`work:${code}`),
    });
    const stages = await prisma.tbl_work_stages.findMany({
      where: { wrk_id: wrkId, sta_id: { not: DELETED_STATUS } },
      select: { wks_id: true },
      orderBy: { wks_order: "asc" },
    });

    const assigned = Array.from({ length: PROVIDERS_PER_WORK }, (_, k) => contractProviders[(w - 1 + k) % CONTRACT_PROVIDERS]);
    const simpleProvider = simpleProviders[(w - 1) % SIMPLE_PROVIDERS];
    for (const prvId of [...assigned, simpleProvider]) {
      await assignProviderToWork({
        wrkId,
        prvId,
        input: { assignmentDate: startDate, observation: "Asignación de volumen.", pvtIds: [providerTypeOf[prvId]] },
        useBy,
        ctx,
        idempotencyKey: volumeKey(`assignment:${code}:${prvId}`),
      });
    }

    const invoice = async (name, input) => (await saveInvoice({ input, useBy, granted, scope, ctx, idempotencyKey: volumeKey(`invoice:${name}`) })).invId;
    const approve = (name, invId, approvalDate) =>
      approveInvoice({ invId, input: { approvalDate }, useBy, scope, ctx, idempotencyKey: volumeKey(`approve:${name}`) });

    for (let j = 0; j < CONTRACTS_PER_WORK; j++) {
      const plan = PLAN[j];
      const number = `VOL-CTR-${pad(w)}${pad(j + 1)}`;
      const ctrStart = addDays("2025-11-01", j * 7);
      const { ctrId } = await saveContract({
        input: {
          wrkId,
          prvId: assigned[j % PROVIDERS_PER_WORK],
          pvtId: providerTypeOf[assigned[j % PROVIDERS_PER_WORK]],
          wksId: stages[j % stages.length].wks_id,
          number,
          name: `Contrato de volumen ${pad(w)}-${pad(j + 1)}`,
          startDate: ctrStart,
          term: "12",
          termUnit: "MES",
          observation: "Contrato de volumen.",
          initialConcept: concept(`${300 + j * 50}000000.00`),
        },
        useBy,
        ctx,
        idempotencyKey: volumeKey(`contract:${number}`),
      });
      const initial = await prisma.tbl_contract_concepts.findFirst({ where: { ctr_id: ctrId, ccp_type: CONCEPT_TYPES.INITIAL }, select: { ccp_id: true } });

      // Dos o tres pólizas por contrato, de tipos distintos (una vigente por concepto y tipo).
      for (let k = 0; k < 2 + (j % 2); k++) {
        const polNumber = `VOL-POL-${pad(w)}${pad(j + 1)}${k + 1}`;
        const endDate = END_DATES[(j + k) % END_DATES.length];
        await createPolicy({
          ctrId,
          input: {
            number: polNumber,
            ccpId: initial.ccp_id,
            pltId: policyTypes[k],
            insId: insurers[(j + k) % insurers.length],
            percentage: "10",
            ...(endDate ? { startDate: ctrStart, endDate } : {}),
          },
          useBy,
          ctx,
          idempotencyKey: volumeKey(`policy:${polNumber}`),
        });
      }

      // Anticipo, en ejecución.
      const advanceName = `${number}:advance`;
      const advanceId = await invoice(advanceName, { type: INVOICE_TYPES.ADVANCE, ctrId, number: `ANT-${number}`, date: "2026-02-10", value: "40000000.00" });
      if (plan.advance === "approved") await approve(advanceName, advanceId, "2026-02-20");
      if (plan.advance === "cancelled") {
        await cancelInvoice({
          invId: advanceId,
          input: { reaId: cancelReason, observation: "Anulada en el volumen de prueba." },
          useBy,
          granted,
          scope,
          ctx,
          idempotencyKey: volumeKey(`cancel:${advanceName}`),
        });
      }

      if (plan.suspend) {
        await suspendContract({
          ctrId,
          input: { reaId: suspensionReason, suspensionDate: "2026-09-01", liftCondition: "Volumen de prueba.", observation: "Suspensión de volumen.", requiresReport: false },
          useBy,
          ctx,
          idempotencyKey: volumeKey(`suspension:${number}`),
        });
      }

      if (plan.liquidation) {
        await createLiquidation({
          ctrId,
          input: { startDate: "2026-07-01", description: "Liquidación de volumen", ...concept("10000000.00"), advancePct: "0" },
          useBy,
          ctx,
          idempotencyKey: volumeKey(`liquidation:${number}`),
        });
        const liquidationName = `${number}:liquidation`;
        const liquidationId = await invoice(liquidationName, { type: INVOICE_TYPES.LIQUIDATION, ctrId, number: `LIQ-${number}`, date: "2026-08-10", value: "150000000.00", vatPct: "19" });
        if (plan.liquidation === "approved") await approve(liquidationName, liquidationId, "2026-08-20");
        if (plan.refund) {
          const refundName = `${number}:refund`;
          const refundId = await invoice(refundName, { type: INVOICE_TYPES.RETENTION_REFUND, ctrId, number: `DEV-${number}`, date: "2026-09-10", value: "1000000.00" });
          await approve(refundName, refundId, "2026-09-15");
        }
      }
    }

    // Facturas simples, una por mes, en las etapas de la obra; aprobadas las pares.
    for (let s = 1; s <= SIMPLE_INVOICES_PER_WORK; s++) {
      const name = `${code}:simple:${s}`;
      const date = `2026-${pad(s)}-05`;
      const invId = await invoice(name, {
        type: INVOICE_TYPES.SIMPLE,
        wrkId,
        prvId: simpleProvider,
        wksId: stages[s % stages.length].wks_id,
        number: `SIM-${code}-${pad(s)}`,
        date,
      });
      if (s % 2 === 0) await approve(name, invId, addDays(date, 5));
    }
  }

  const count = async (model, where = {}) => prisma[model].count({ where });
  console.log("Volumen sembrado en", dbName, {
    obras: await count("tbl_works"),
    contratos: await count("tbl_contracts"),
    conceptos: await count("tbl_contract_concepts"),
    polizas: await count("tbl_policies"),
    facturas: await count("tbl_invoices"),
  });
}

main()
  .catch((err) => {
    console.error(err.status || err.statusCode ? `Error ${err.status ?? err.statusCode}: ${err.message}` : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
