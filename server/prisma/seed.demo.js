import { createHash } from "node:crypto";
import { prisma } from "../src/common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../src/common/services/effectivePermissions.service.js";
import { DELETED_STATUS, ACTIVE_STATUS } from "../src/common/constants/status.constants.js";
import { nitCheckDigit } from "../src/modules/admin/identityDocuments/identityDocuments.formats.js";
import { reasonsService, REASON_SCOPES } from "../src/modules/admin/reasons/reasons.service.js";
import { contractTypesService } from "../src/modules/admin/contractTypes/contractTypes.service.js";
import { saveContractTypeFields } from "../src/modules/admin/contractTypes/contractTypeFields.service.js";
import { saveWork } from "../src/modules/work/works/works.service.js";
import { saveProvider, assignProviderToWork } from "../src/modules/work/providers/providers.service.js";
import { saveContract } from "../src/modules/work/contracts/contracts.service.js";
import { createAmendment, createLiquidation } from "../src/modules/work/contracts/contractConcepts.service.js";
import { suspendContract } from "../src/modules/work/contracts/contractSuspensions.service.js";
import { createPolicy, createPolicyVersion, cancelPolicy } from "../src/modules/work/contracts/contractPolicies.service.js";
import { policyTypesService } from "../src/modules/admin/policyTypes/policyTypes.service.js";
import { CONCEPT_TYPES } from "../src/modules/work/contracts/contractTerms.js";

// Datos de demostración para desarrollo (`yarn db:seed:demo`). No es el seed
// de catálogos (seed.js): este crea datos de negocio y nunca corre en
// producción.
//
// Todo pasa por los services reales, como el usuario Superadmin: autoría,
// bitácora, bloqueos, fecha fin derivada, numeración de otrosí y transiciones
// de estado quedan igual que si se hubieran capturado en la aplicación. Si un
// service cambia de firma o de reglas, este script falla en vez de sembrar
// datos que la aplicación no admitiría.
//
// Se puede correr varias veces sin duplicar: cada registro y cada acto se
// busca primero por su clave natural (código DEMO-, número de contrato o de
// otrosí, nombre [DEMO], NIT) y solo se crea si no está. Además cada
// creación lleva una clave de idempotencia estable derivada de su nombre.
// Prórroga del otrosí: en la unidad del plazo del contrato, no en días.
//
// Los datos de entrada ya vienen en la forma que dejaría la validación de la
// ruta (fechas AAAA-MM-DD, importes y porcentajes como texto): el script no
// pasa por express-validator.

if (process.env.NODE_ENV === "production") {
  console.error("seed.demo.js: no se siembran datos de demostración con NODE_ENV=production.");
  process.exit(1);
}

const ACTOR_USER_ID = 1; // Superadmin (ver SUPERADMIN_PROFILE_ID en seed.js)

// ─── Datos ───────────────────────────────────────────────────────────────────

const REASONS = ["[DEMO] Temporada de lluvias", "[DEMO] Falta de licencia", "[DEMO] Orden de la interventoría", "[DEMO] Falta de suministro de materiales"];
// Motivos de anulación de factura (DEC-042).
const CANCEL_REASONS = ["[DEMO] Error en el registro", "[DEMO] Factura duplicada", "[DEMO] Rechazada por el área contable"];
// Motivos de anulación de póliza (DEC-050).
const POLICY_CANCEL_REASONS = ["[DEMO] Póliza reemplazada por la aseguradora"];

// Tipos de póliza de demostración (DEC-050). NO son las semillas reales: qué
// tipos existen y qué base usa cada uno es DEC-04, pendiente. Por eso llevan
// [DEMO] en el nombre y DEMO_ en la clave.
const POLICY_TYPES = [
  { key: "DEMO_CUMPLIMIENTO", name: "[DEMO] Cumplimiento", base: "TOTAL_VALUE" },
  { key: "DEMO_ESTABILIDAD", name: "[DEMO] Estabilidad de obra", base: "TAXABLE_BASE" },
  { key: "DEMO_SALARIOS", name: "[DEMO] Salarios y prestaciones", base: "DIRECT_COST" },
];

// Campos del catálogo (seed.js, CONTRACT_FIELDS): 1 etapa, 2 observaciones,
// 3 descripción del otrosí, 4–9 porcentajes (A, I, U, IVA, anticipo, retenido).
const field = (cfdId, order, { required = false } = {}) => ({ cfdId, applies: true, visible: true, required, order });

const CONTRACT_TYPES = [
  {
    key: "civil",
    name: "[DEMO] Obra civil",
    fields: [field(1, 1, { required: true }), field(2, 2), field(3, 1), field(4, 2), field(5, 3), field(6, 4), field(7, 5), field(8, 6), field(9, 7)],
  },
  {
    // Suministro: sin etapa ni AIU.
    key: "supply",
    name: "[DEMO] Suministro",
    fields: [field(2, 1), field(3, 1), field(7, 2), field(8, 3), field(9, 4)],
  },
];

// Ids fijos de los maestros que siembra seed.js (tipos de identificación,
// proveedor, dirección e interventoría). Constructoras: las primeras activas.
const ID_DOC = { CC: 1, NIT: 3 };
const PROVIDER_TYPE = { SIMPLE: 1, SUBCONTRACTOR: 2, MAJOR: 3 };
const ADDRESS_TYPE = { OFFICE: 1, BRANCH: 2, BILLING: 4, WAREHOUSE: 5 };
const SUPERVISION_TYPE = { TECHNICAL: 1, INTEGRAL: 4 };

const WORKS = [
  {
    code: "DEMO-OBR-01",
    name: "[DEMO] Torre Mirador del Parque",
    company: 0,
    type: "civil",
    sptId: SUPERVISION_TYPE.INTEGRAL,
    startDate: "2026-02-01",
    initialTerm: "18",
    termUnit: "MES",
    area: "12500.00",
    directCost: "3800000000.00",
    initialValue: "4500000000.00",
    stages: ["Cimentación", "Estructura", "Mampostería", "Acabados"],
  },
  {
    code: "DEMO-OBR-02",
    name: "[DEMO] Centro Comercial Las Palmas",
    company: 1,
    type: "civil",
    sptId: SUPERVISION_TYPE.INTEGRAL,
    startDate: "2025-11-15",
    initialTerm: "24",
    termUnit: "MES",
    area: "28000.00",
    directCost: "9200000000.00",
    initialValue: "11000000000.00",
    stages: ["Movimiento de tierras", "Estructura", "Redes", "Fachada"],
  },
  {
    code: "DEMO-OBR-03",
    name: "[DEMO] Conjunto Residencial Altos del Río",
    company: 2,
    type: "supply",
    sptId: SUPERVISION_TYPE.TECHNICAL,
    startDate: "2026-04-01",
    initialTerm: "12",
    termUnit: "MES",
    area: "8400.00",
    directCost: "2100000000.00",
    initialValue: "2600000000.00",
    stages: ["Urbanismo", "Vivienda"],
  },
];

const nit = (digits) => `${digits}-${nitCheckDigit(digits)}`;

const PROVIDERS = [
  {
    key: "concrete",
    iddId: ID_DOC.NIT,
    identification: nit("900900101"),
    name: "[DEMO] Concretos del Norte S.A.S.",
    pvtIds: [PROVIDER_TYPE.MAJOR, PROVIDER_TYPE.SIMPLE],
    serviceType: "Concreto premezclado",
    email: "ventas@concretosnorte.demo",
    contacts: [
      { adtId: ADDRESS_TYPE.OFFICE, name: "Laura Gómez", position: "Gerente comercial", address: "Calle 80 # 45-12, Bogotá", mobile: "3105550101", email: "laura.gomez@concretosnorte.demo", main: true },
      { adtId: ADDRESS_TYPE.BILLING, name: "Andrés Ruiz", position: "Cartera", address: "Calle 80 # 45-12, Bogotá", phone: "6015550102", email: "cartera@concretosnorte.demo" },
    ],
    works: ["DEMO-OBR-01", "DEMO-OBR-02"],
  },
  {
    key: "steel",
    iddId: ID_DOC.NIT,
    identification: nit("900900102"),
    name: "[DEMO] Aceros y Estructuras Andinas S.A.",
    pvtIds: [PROVIDER_TYPE.SUBCONTRACTOR],
    serviceType: "Estructura metálica",
    email: "contacto@acerosandinas.demo",
    contacts: [{ adtId: ADDRESS_TYPE.OFFICE, name: "Felipe Torres", position: "Director de proyectos", address: "Autopista Sur # 60-30, Bogotá", mobile: "3115550201", email: "felipe.torres@acerosandinas.demo", main: true }],
    works: ["DEMO-OBR-01", "DEMO-OBR-02"],
  },
  {
    key: "hardware",
    iddId: ID_DOC.NIT,
    identification: nit("900900103"),
    name: "[DEMO] Ferretería La Constructora Ltda.",
    pvtIds: [PROVIDER_TYPE.SIMPLE],
    serviceType: "Ferretería y herramienta",
    email: "pedidos@ferrelaconstructora.demo",
    contacts: [
      { adtId: ADDRESS_TYPE.BRANCH, name: "Marcela Díaz", position: "Asesora", address: "Carrera 30 # 12-40, Bogotá", phone: "6015550301", email: "marcela.diaz@ferrelaconstructora.demo", main: true },
      { adtId: ADDRESS_TYPE.WAREHOUSE, name: "Jorge Peña", position: "Jefe de bodega", address: "Zona industrial Montevideo, bodega 7", mobile: "3125550302" },
    ],
    works: ["DEMO-OBR-01", "DEMO-OBR-03"],
  },
  {
    key: "electric",
    iddId: ID_DOC.NIT,
    identification: nit("900900104"),
    name: "[DEMO] Redes Eléctricas Integrales S.A.S.",
    pvtIds: [PROVIDER_TYPE.SUBCONTRACTOR],
    serviceType: "Instalaciones eléctricas",
    email: "proyectos@redeselectricas.demo",
    contacts: [{ adtId: ADDRESS_TYPE.OFFICE, name: "Sandra Ríos", position: "Ingeniera residente", address: "Avenida 68 # 22-15, Bogotá", mobile: "3135550401", email: "sandra.rios@redeselectricas.demo", main: true }],
    works: ["DEMO-OBR-02"],
  },
  {
    key: "wood",
    iddId: ID_DOC.NIT,
    identification: nit("900900105"),
    name: "[DEMO] Maderas y Carpintería El Roble S.A.S.",
    pvtIds: [PROVIDER_TYPE.SIMPLE],
    serviceType: "Carpintería en madera",
    email: "ventas@elroble.demo",
    contacts: [{ adtId: ADDRESS_TYPE.OFFICE, name: "Óscar Medina", position: "Gerente", address: "Calle 13 # 68-50, Bogotá", phone: "6015550501", email: "oscar.medina@elroble.demo", main: true }],
    works: ["DEMO-OBR-03"],
  },
  {
    key: "labor",
    iddId: ID_DOC.CC,
    identification: "79555606",
    name: "[DEMO] Carlos Hernández Mora",
    pvtIds: [PROVIDER_TYPE.SUBCONTRACTOR],
    serviceType: "Mano de obra en mampostería",
    email: "carlos.hernandez@correo.demo",
    contacts: [{ adtId: ADDRESS_TYPE.OFFICE, name: "Carlos Hernández Mora", position: "Contratista", address: "Calle 45 Sur # 10-20, Bogotá", mobile: "3145550601", main: true }],
    works: ["DEMO-OBR-01"],
  },
];

// Valor de un concepto: costo directo y porcentajes como texto. `aiu` false
// para los tipos sin administración, imprevistos ni utilidad.
const concept = (directCost, { aiu = true, vat = "19", advance = "15", retention = "5" } = {}) => ({
  directCost,
  ...(aiu ? { adminPct: "8", contingencyPct: "2", profitPct: "5" } : {}),
  vatPct: vat,
  advancePct: advance,
  retentionPct: retention,
});

const CONTRACTS = [
  {
    number: "DEMO-CTR-01",
    work: "DEMO-OBR-01",
    provider: "concrete",
    type: "civil",
    stage: "Cimentación",
    name: "Suministro de concreto para cimentación",
    startDate: "2026-02-15",
    term: "6",
    termUnit: "MES",
    initialConcept: concept("850000000.00"),
    amendments: [{ startDate: "2026-06-01", description: "Mayores cantidades de concreto en zapatas", extension: "1", ...concept("120000000.00", { advance: "0" }) }],
    // Ampara el valor inicial y se renueva; el otrosí N.º 1 queda sin póliza (hallazgo).
    policies: [
      {
        number: "DEMO-POL-0101",
        concept: { type: "INITIAL" },
        type: "DEMO_CUMPLIMIENTO",
        insurer: 0,
        percentage: "10",
        startDate: "2026-02-15",
        endDate: "2026-08-15",
        renewal: { percentage: "10", startDate: "2026-02-15", endDate: "2027-02-15", observation: "Renovada al ampliar el plazo." },
      },
    ],
  },
  {
    number: "DEMO-CTR-02",
    work: "DEMO-OBR-01",
    provider: "steel",
    type: "civil",
    stage: "Estructura",
    name: "Estructura metálica de la torre",
    startDate: "2026-03-01",
    term: "8",
    termUnit: "MES",
    initialConcept: concept("1200000000.00"),
    amendments: [
      { startDate: "2026-05-10", description: "Cambio de perfilería en cubierta", ...concept("45000000.00", { advance: "0" }) },
      { startDate: "2026-08-01", description: "Ampliación de plazo por ajuste de diseño", extension: "2", ...concept("0", { advance: "0" }) },
    ],
    policies: [
      { number: "DEMO-POL-0201", concept: { type: "INITIAL" }, type: "DEMO_CUMPLIMIENTO", insurer: 1, percentage: "10", startDate: "2026-03-01", endDate: "2026-10-25" },
      // Sin fecha de vigencia: categoría explícita (ADR-0002).
      { number: "DEMO-POL-0202", concept: { type: "INITIAL" }, type: "DEMO_ESTABILIDAD", insurer: 1, percentage: "5" },
      { number: "DEMO-POL-0203", concept: { type: "AMENDMENT", number: 1 }, type: "DEMO_CUMPLIMIENTO", insurer: 1, percentage: "10", startDate: "2026-05-10", endDate: "2027-01-10" },
    ],
  },
  {
    number: "DEMO-CTR-03",
    work: "DEMO-OBR-01",
    provider: "hardware",
    type: "supply",
    name: "Suministro de ferretería para obra",
    startDate: "2026-03-10",
    term: "10",
    termUnit: "MES",
    initialConcept: concept("95000000.00", { aiu: false, advance: "0" }),
  },
  {
    number: "DEMO-CTR-04",
    work: "DEMO-OBR-01",
    provider: "labor",
    type: "civil",
    stage: "Mampostería",
    name: "Mano de obra de mampostería",
    startDate: "2026-05-01",
    term: "4",
    termUnit: "MES",
    initialConcept: concept("180000000.00", { vat: "0" }),
    suspension: {
      reason: "[DEMO] Temporada de lluvias",
      suspensionDate: "2026-08-20",
      liftCondition: "Reanudar cuando la interventoría certifique condiciones de clima aptas para mampostería exterior.",
      observation: "Suspensión registrada con datos de demostración.",
      requiresReport: true,
    },
  },
  {
    number: "DEMO-CTR-05",
    work: "DEMO-OBR-02",
    provider: "concrete",
    type: "civil",
    stage: "Movimiento de tierras",
    name: "Excavación y movimiento de tierras",
    startDate: "2025-12-01",
    term: "3",
    termUnit: "MES",
    initialConcept: concept("600000000.00"),
    liquidation: { startDate: "2026-03-05", description: "Liquidación por terminación del alcance", ...concept("15000000.00", { advance: "0" }) },
    // En liquidación solo se ampara el otrosí de liquidación (ADR-0017); el valor inicial queda sin póliza.
    policies: [
      { number: "DEMO-POL-0501", concept: { type: "LIQUIDATION" }, type: "DEMO_ESTABILIDAD", insurer: 2, percentage: "20", startDate: "2026-03-05", endDate: "2031-03-05" },
    ],
  },
  {
    number: "DEMO-CTR-06",
    work: "DEMO-OBR-02",
    provider: "steel",
    type: "civil",
    stage: "Estructura",
    name: "Estructura del edificio principal",
    startDate: "2026-01-10",
    term: "12",
    termUnit: "MES",
    initialConcept: concept("2100000000.00"),
    policies: [
      { number: "DEMO-POL-0601", concept: { type: "INITIAL" }, type: "DEMO_CUMPLIMIENTO", insurer: 0, percentage: "10", startDate: "2026-01-10", endDate: "2027-01-10" },
      // Vencida.
      { number: "DEMO-POL-0602", concept: { type: "INITIAL" }, type: "DEMO_SALARIOS", insurer: 0, percentage: "5", startDate: "2026-01-10", endDate: "2026-07-10" },
      // Anulada: queda en el expediente con su motivo.
      {
        number: "DEMO-POL-0603",
        concept: { type: "INITIAL" },
        type: "DEMO_SALARIOS",
        insurer: 2,
        percentage: "5",
        startDate: "2026-01-10",
        endDate: "2027-01-10",
        cancel: { reason: "[DEMO] Póliza reemplazada por la aseguradora", observation: "Se emitió por error con otra aseguradora." },
      },
    ],
  },
  {
    number: "DEMO-CTR-07",
    work: "DEMO-OBR-02",
    provider: "electric",
    type: "civil",
    stage: "Redes",
    name: "Redes eléctricas y de iluminación",
    startDate: "2026-04-15",
    term: "6",
    termUnit: "MES",
    initialConcept: concept("340000000.00"),
  },
  {
    number: "DEMO-CTR-08",
    work: "DEMO-OBR-03",
    provider: "wood",
    type: "supply",
    name: "Suministro de puertas y closets",
    startDate: "2026-04-20",
    term: "6",
    termUnit: "MES",
    initialConcept: concept("75000000.00", { aiu: false }),
  },
  {
    number: "DEMO-CTR-09",
    work: "DEMO-OBR-03",
    provider: "hardware",
    type: "supply",
    name: "Suministro de materiales eléctricos y sanitarios",
    startDate: "2026-05-05",
    term: "5",
    termUnit: "MES",
    initialConcept: concept("48000000.00", { aiu: false, advance: "10" }),
  },
];

// ─── Utilidades ──────────────────────────────────────────────────────────────

/** Clave de idempotencia estable (UUID con forma de v5) derivada de un nombre. */
const demoKey = (name) => {
  const hex = createHash("sha1").update(`webpac-interve-demo:${name}`).digest("hex");
  const variant = ((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
};

const notDeleted = { sta_id: { not: DELETED_STATUS } };

const log = (entity, label, created) => console.log(`  ${created ? "+" : "="} ${entity}: ${label}${created ? "" : " (ya existía)"}`);

/** Busca por clave natural; si no está, la crea con `create` y devuelve su id. */
const ensure = async ({ entity, label, find, create }) => {
  const existing = await find();
  if (existing) {
    log(entity, label, false);
    return existing;
  }
  const id = await create();
  log(entity, label, true);
  return id;
};

// ─── Siembra ─────────────────────────────────────────────────────────────────

async function main() {
  const actor = await prisma.tbl_users.findUnique({ where: { use_id: ACTOR_USER_ID }, select: { use_id: true, pro_id: true, sta_id: true } });
  if (!actor || actor.sta_id !== ACTIVE_STATUS) throw new Error(`El usuario ${ACTOR_USER_ID} (Superadmin) no existe o no está activo.`);
  const useBy = actor.use_id;
  const ctx = { useId: useBy };
  const granted = new Set(await getEffectivePermissionIds({ useId: actor.use_id, proId: actor.pro_id }));

  console.log("Motivos de suspensión");
  const reasonIds = {};
  for (const name of REASONS) {
    reasonIds[name] = await ensure({
      entity: "motivo",
      label: name,
      find: async () =>
        (await prisma.tbl_reasons.findFirst({ where: { rea_name: name, rea_scope: REASON_SCOPES.SUSPENSION, ...notDeleted }, select: { rea_id: true } }))?.rea_id,
      create: async () =>
        (await reasonsService.save({ input: { scope: REASON_SCOPES.SUSPENSION, name }, useBy, ctx, idempotencyKey: demoKey(`reason:${name}`) })).reaId,
    });
  }

  console.log("Motivos de anulación de factura");
  for (const name of CANCEL_REASONS) {
    await ensure({
      entity: "motivo",
      label: name,
      find: async () =>
        (await prisma.tbl_reasons.findFirst({ where: { rea_name: name, rea_scope: REASON_SCOPES.INVOICE_CANCEL, ...notDeleted }, select: { rea_id: true } }))?.rea_id,
      create: async () =>
        (await reasonsService.save({ input: { scope: REASON_SCOPES.INVOICE_CANCEL, name }, useBy, ctx, idempotencyKey: demoKey(`cancel-reason:${name}`) })).reaId,
    });
  }

  console.log("Motivos de anulación de póliza");
  const policyReasonIds = {};
  for (const name of POLICY_CANCEL_REASONS) {
    policyReasonIds[name] = await ensure({
      entity: "motivo",
      label: name,
      find: async () =>
        (await prisma.tbl_reasons.findFirst({ where: { rea_name: name, rea_scope: REASON_SCOPES.POLICY_CANCEL, ...notDeleted }, select: { rea_id: true } }))?.rea_id,
      create: async () =>
        (await reasonsService.save({ input: { scope: REASON_SCOPES.POLICY_CANCEL, name }, useBy, ctx, idempotencyKey: demoKey(`policy-cancel-reason:${name}`) })).reaId,
    });
  }

  console.log("Tipos de póliza");
  const policyTypeIds = {};
  for (const type of POLICY_TYPES) {
    policyTypeIds[type.key] = await ensure({
      entity: "tipo de póliza",
      label: type.name,
      find: async () => (await prisma.tbl_policy_types.findFirst({ where: { plt_key: type.key, ...notDeleted }, select: { plt_id: true } }))?.plt_id,
      create: async () => (await policyTypesService.save({ input: type, useBy, ctx, idempotencyKey: demoKey(`policy-type:${type.key}`) })).pltId,
    });
  }
  const insurers = await prisma.tbl_insurers.findMany({ where: { sta_id: ACTIVE_STATUS }, select: { ins_id: true }, orderBy: { ins_id: "asc" }, take: 3 });
  if (insurers.length === 0) throw new Error("No hay aseguradoras activas: crea al menos una antes de sembrar pólizas.");

  console.log("Tipos de contrato");
  const typeIds = {};
  for (const type of CONTRACT_TYPES) {
    typeIds[type.key] = await ensure({
      entity: "tipo de contrato",
      label: type.name,
      find: async () => (await prisma.tbl_contract_types.findFirst({ where: { ctt_name: type.name, ...notDeleted }, select: { ctt_id: true } }))?.ctt_id,
      create: async () => {
        const { cttId } = await contractTypesService.save({ input: { name: type.name }, useBy, ctx, idempotencyKey: demoKey(`contract-type:${type.name}`) });
        // La configuración solo se fija al crearlo: una ya editada desde el maestro no se pisa.
        await saveContractTypeFields({ cttId, fields: type.fields, useBy, ctx });
        return cttId;
      },
    });
  }

  console.log("Obras");
  const companies = await prisma.tbl_construction_companies.findMany({ where: { sta_id: ACTIVE_STATUS }, select: { cnc_id: true }, orderBy: { cnc_id: "asc" }, take: 3 });
  if (companies.length === 0) throw new Error("No hay constructoras activas: crea al menos una antes de sembrar obras.");
  const users = await prisma.tbl_users.findMany({ where: { sta_id: ACTIVE_STATUS }, select: { use_id: true }, orderBy: { use_id: "asc" }, take: 2 });
  const managers = users.map((u, i) => ({ useId: u.use_id, role: i === 0 ? "MAIN" : "SUPPORT" }));

  const workIds = {};
  for (const work of WORKS) {
    const { company, type, stages, ...header } = work;
    workIds[work.code] = await ensure({
      entity: "obra",
      label: `${work.code} ${work.name}`,
      find: async () => (await prisma.tbl_works.findFirst({ where: { wrk_code: work.code, ...notDeleted }, select: { wrk_id: true } }))?.wrk_id,
      create: async () => {
        const input = {
          ...header,
          cncId: companies[company % companies.length].cnc_id,
          cttId: typeIds[type],
          managers,
          stages: stages.map((name, i) => ({ name, order: i + 1 })),
        };
        return (await saveWork({ input, useBy, granted, ctx, idempotencyKey: demoKey(`work:${work.code}`) })).wrkId;
      },
    });
  }

  console.log("Proveedores y asignación a obras");
  const providerIds = {};
  for (const provider of PROVIDERS) {
    const { key, works, ...input } = provider;
    providerIds[key] = await ensure({
      entity: "proveedor",
      label: provider.name,
      find: async () =>
        (await prisma.tbl_providers.findFirst({ where: { idd_id: provider.iddId, prv_identification: provider.identification, ...notDeleted }, select: { prv_id: true } }))
          ?.prv_id,
      create: async () => (await saveProvider({ input, useBy, granted, ctx, idempotencyKey: demoKey(`provider:${provider.identification}`) })).prvId,
    });

    for (const code of works) {
      const wrkId = workIds[code];
      const prvId = providerIds[key];
      await ensure({
        entity: "asignación",
        label: `${provider.name} → ${code}`,
        find: () => prisma.tbl_work_providers.findUnique({ where: { wrk_id_prv_id: { wrk_id: wrkId, prv_id: prvId } }, select: { wkp_id: true } }),
        create: () =>
          assignProviderToWork({
            wrkId,
            prvId,
            input: { assignmentDate: WORKS.find((w) => w.code === code).startDate, observation: "Asignación de demostración." },
            useBy,
            ctx,
            idempotencyKey: demoKey(`assignment:${code}:${provider.identification}`),
          }),
      });
    }
  }

  console.log("Contratos");
  for (const contract of CONTRACTS) {
    const wrkId = workIds[contract.work];
    let wksId = null;
    if (contract.stage) {
      const stage = await prisma.tbl_work_stages.findFirst({ where: { wrk_id: wrkId, wks_name: contract.stage }, select: { wks_id: true } });
      if (!stage) throw new Error(`La obra ${contract.work} no tiene la etapa "${contract.stage}".`);
      wksId = stage.wks_id;
    }

    const ctrId = await ensure({
      entity: "contrato",
      label: `${contract.number} ${contract.name}`,
      find: async () =>
        (await prisma.tbl_contracts.findFirst({ where: { wrk_id: wrkId, ctr_number: contract.number, ...notDeleted }, select: { ctr_id: true } }))?.ctr_id,
      create: async () => {
        const input = {
          wrkId,
          prvId: providerIds[contract.provider],
          wksId,
          cttId: typeIds[contract.type],
          number: contract.number,
          name: contract.name,
          startDate: contract.startDate,
          term: contract.term,
          termUnit: contract.termUnit,
          observation: "Contrato de demostración.",
          initialConcept: contract.initialConcept,
        };
        return (await saveContract({ input, useBy, ctx, idempotencyKey: demoKey(`contract:${contract.work}:${contract.number}`) })).ctrId;
      },
    });

    // Actos, en orden: el otrosí N.º n se busca por su número; la suspensión y
    // la liquidación, por existir en el contrato.
    for (const [i, amendment] of (contract.amendments ?? []).entries()) {
      const number = i + 1;
      await ensure({
        entity: "otrosí",
        label: `${contract.number} N.º ${number}`,
        find: () =>
          prisma.tbl_contract_concepts.findFirst({ where: { ctr_id: ctrId, ccp_type: CONCEPT_TYPES.AMENDMENT, ccp_number: number }, select: { ccp_id: true } }),
        create: () => createAmendment({ ctrId, input: amendment, useBy, granted, ctx, idempotencyKey: demoKey(`amendment:${contract.number}:${number}`) }),
      });
    }
    if (contract.suspension) {
      const { reason, ...rest } = contract.suspension;
      await ensure({
        entity: "suspensión",
        label: contract.number,
        find: () => prisma.tbl_contract_suspensions.findFirst({ where: { ctr_id: ctrId }, select: { csp_id: true } }),
        create: () =>
          suspendContract({ ctrId, input: { ...rest, reaId: reasonIds[reason] }, useBy, ctx, idempotencyKey: demoKey(`suspension:${contract.number}`) }),
      });
    }
    if (contract.liquidation) {
      await ensure({
        entity: "otrosí de liquidación",
        label: contract.number,
        find: () => prisma.tbl_contract_concepts.findFirst({ where: { ctr_id: ctrId, ccp_type: CONCEPT_TYPES.LIQUIDATION }, select: { ccp_id: true } }),
        create: () => createLiquidation({ ctrId, input: contract.liquidation, useBy, ctx, idempotencyKey: demoKey(`liquidation:${contract.number}`) }),
      });
    }

    // Pólizas (DEC-050), después de los actos: amparan conceptos ya creados. Se
    // buscan por su número en el contrato; la renovación, por su versión 2, y
    // la anulación, por el motivo en alguna de sus versiones.
    for (const policy of contract.policies ?? []) {
      const { concept: ref, type, insurer, renewal, cancel, ...fields } = policy;
      const target = await prisma.tbl_contract_concepts.findFirst({
        where: { ctr_id: ctrId, ccp_type: ref.type, ...(ref.number ? { ccp_number: ref.number } : {}) },
        select: { ccp_id: true },
      });
      if (!target) throw new Error(`${contract.number} no tiene el concepto ${ref.type} ${ref.number ?? ""}.`);
      const values = { ...fields, pltId: policyTypeIds[type], insId: insurers[insurer % insurers.length].ins_id };

      await ensure({
        entity: "póliza",
        label: `${contract.number} ${policy.number}`,
        find: () => prisma.tbl_policies.findFirst({ where: { ctr_id: ctrId, pol_number: policy.number, pol_version: 1 }, select: { pol_id: true } }),
        create: () =>
          createPolicy({ ctrId, input: { ...values, ccpId: target.ccp_id }, useBy, ctx, idempotencyKey: demoKey(`policy:${contract.number}:${policy.number}`) }),
      });
      const { pol_root_id: rootId } = await prisma.tbl_policies.findFirst({
        where: { ctr_id: ctrId, pol_number: policy.number, pol_version: 1 },
        select: { pol_root_id: true },
      });
      const currentVersion = async () =>
        (await prisma.tbl_policies.findFirst({ where: { pol_root_id: rootId, pol_is_current: true }, select: { pol_id: true } })).pol_id;

      if (renewal) {
        await ensure({
          entity: "renovación de póliza",
          label: policy.number,
          find: () => prisma.tbl_policies.findFirst({ where: { pol_root_id: rootId, pol_version: 2 }, select: { pol_id: true } }),
          create: async () =>
            createPolicyVersion({
              polId: await currentVersion(),
              input: { ...values, ...renewal },
              useBy,
              ctx,
              idempotencyKey: demoKey(`policy-renewal:${policy.number}`),
            }),
        });
      }
      if (cancel) {
        await ensure({
          entity: "anulación de póliza",
          label: policy.number,
          find: () => prisma.tbl_policies.findFirst({ where: { pol_root_id: rootId, rea_id: { not: null } }, select: { pol_id: true } }),
          create: async () =>
            cancelPolicy({ polId: await currentVersion(), reaId: policyReasonIds[cancel.reason], observation: cancel.observation, useBy, ctx }),
        });
      }
    }
  }

  console.log("Datos de demostración sembrados.");
}

main()
  .catch((err) => {
    console.error(err.status || err.statusCode ? `Error ${err.status ?? err.statusCode}: ${err.message}` : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
