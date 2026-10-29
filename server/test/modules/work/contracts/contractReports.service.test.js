import { jest } from "@jest/globals";
import ExcelJS from "exceljs";

// Reportes de control de contratos (DEC-070): los del sistema que se migra,
// con los contratos del listado y las cifras de las reglas que ya existen.

const prismaMock = {
  // Días de "a vencer" del listado (DEC-072): sin filas, el valor por defecto.
  tbl_business_rules: { findMany: jest.fn().mockResolvedValue([]) },
  tbl_contracts: { count: jest.fn(), findMany: jest.fn() },
  tbl_invoice_advance_details: { findMany: jest.fn() },
  tbl_invoice_liquidation_details: { findMany: jest.fn() },
  tbl_invoice_retention_refund_details: { findMany: jest.fn() },
  tbl_works: { findUnique: jest.fn() },
  tbl_contract_types: { findUnique: jest.fn() },
  tbl_providers: { findUnique: jest.fn() },
};

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: prismaMock }));

const { exportContractReport, exportPolicyReport } = await import("../../../../src/modules/work/contracts/contractReports.service.js");
const { COMPANY_FOOTER } = await import("../../../../src/common/services/export.service.js");

// Sin AIU: valor = costo × 1,19; anticipo 15 % y retenido 5 % del costo.
const concept = (ccp_id, ccp_type, ccp_number, ccp_direct_cost, sta_id = 1) => ({
  ccp_id,
  ctr_id: 1,
  ccp_type,
  ccp_number,
  ccp_direct_cost,
  ccp_admin_pct: "0",
  ccp_contingency_pct: "0",
  ccp_profit_pct: "0",
  ccp_vat_pct: "19",
  ccp_advance_pct: "15",
  ccp_retention_pct: "5",
  sta_id,
});

const contract = (overrides = {}) => ({
  ctr_id: 1,
  ctr_number: "C-001",
  ctr_name: "Suministro de acero",
  ctr_state: "IN_PROGRESS",
  tbl_works: { wrk_code: "OB-1" },
  tbl_providers: { prv_name: "Aceros SAS" },
  tbl_contract_concepts: [concept(2, "AMENDMENT", 1, "500000"), concept(1, "INITIAL", null, "1000000"), concept(3, "AMENDMENT", 2, "9", 3)],
  ...overrides,
});

const owner = (ctr_id) => ({ tbl_invoices: { ctr_id } });

const sheetOf = async (file) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);
  return workbook.worksheets[0];
};

// Filas de datos (después del encabezado de la tabla) como arreglos de valores,
// sin el pie de la hoja con los datos de INTERVE.
const tableOf = (sheet, firstHeader) => {
  let header = null;
  const rows = [];
  sheet.eachRow((row, n) => {
    if (row.getCell(1).value === firstHeader) header = n;
    else if (header && !COMPANY_FOOTER.includes(row.getCell(1).value)) rows.push(row.values.slice(1));
  });
  return { header, rows };
};

beforeEach(() => {
  jest.clearAllMocks();
  prismaMock.tbl_contracts.count.mockResolvedValue(1);
  prismaMock.tbl_contracts.findMany.mockResolvedValue([contract()]);
  prismaMock.tbl_invoice_advance_details.findMany.mockResolvedValue([{ iad_value: "150000", ...owner(1) }]);
  prismaMock.tbl_invoice_liquidation_details.findMany.mockResolvedValue([
    { ild_value: "600000", ild_amortization: "90000", ild_retention: "30000", ...owner(1) },
  ]);
  prismaMock.tbl_invoice_retention_refund_details.findMany.mockResolvedValue([{ irr_value: "10000", ...owner(1) }]);
});

describe("exportContractReport — control de contratos", () => {
  it("una fila por concepto vigente, en orden, con el total, lo pagado y su porcentaje agrupados por contrato", async () => {
    const file = await exportContractReport({ report: "control", format: "xlsx", seesInvoices: true, scope: { all: true } });
    const sheet = await sheetOf(file);
    const { header, rows } = tableOf(sheet, "Contratista");

    // El contratista es la primera columna, una sola celda para todas sus filas, y su grupo cierra con
    // su subtotal; valor inicial antes que el otrosí; el otrosí eliminado no sale.
    expect(rows).toHaveLength(4);
    const [initial, amendment, subtotal, totals] = rows;
    expect(initial.slice(0, 6)).toEqual(["Aceros SAS", "C-001", "Suministro de acero", "OB-1", "Valor inicial", 1190000]);
    expect(sheet.getCell(header + 1, 1).isMerged).toBe(true);
    expect(sheet.getCell(header + 2, 1).master.address).toBe(sheet.getCell(header + 1, 1).address);
    expect(amendment[4]).toBe("Otrosí N.º 1");
    expect(amendment[5]).toBe(595000);
    // Total 1.785.000; pagado = 150.000 + 600.000 + 10.000.
    expect(initial.slice(6, 8)).toEqual([1785000, 760000]);
    expect(initial[8]).toBeCloseTo(0.4258, 6);
    // El subtotal cuenta cada contrato una vez, aunque ocupe una fila por concepto.
    expect(subtotal.slice(0, 8)).toEqual(["", "Subtotal", "", "", "", 1785000, 1785000, 760000]);
    expect(totals.slice(0, 8)).toEqual(["", "TOTALES", "", "", "", 1785000, 1785000, 760000]);
    expect(totals[8]).toBeCloseTo(0.4258, 6);
    // Las columnas del contrato, combinadas en las filas de sus conceptos.
    expect(sheet.getCell(header + 1, 2).isMerged).toBe(true);
    expect(sheet.getCell(header + 1, 5).isMerged).toBe(false);
    // La obra, una vez bajo el título: todas las filas son de la misma.
    const texts = [];
    sheet.eachRow((row) => texts.push(String(row.getCell(1).value)));
    expect(texts).toContain("Obra: OB-1");
  });

  it("toma los contratos del listado: sus filtros y el alcance, sin paginar", async () => {
    await exportContractReport({ report: "control", format: "pdf", seesInvoices: true, scope: { wrkId: 8 }, prvId: 77, state: "IN_PROGRESS" });
    const args = prismaMock.tbl_contracts.findMany.mock.calls[0][0];
    expect(args.where).toMatchObject({ wrk_id: { in: [8] }, ctr_state: "IN_PROGRESS" });
    expect(JSON.stringify(args.where)).toContain('"prv_id":77');
    expect(args).not.toHaveProperty("take");
  });

  it("solo suma facturas aprobadas y no eliminadas de esos contratos", async () => {
    await exportContractReport({ report: "control", format: "pdf", seesInvoices: true, scope: { all: true } });
    const where = prismaMock.tbl_invoice_liquidation_details.findMany.mock.calls[0][0].where;
    expect(where.tbl_invoices).toEqual({ ctr_id: { in: [1] }, inv_type: { in: ["NORMAL", "LIQUIDATION"] }, inv_state: "APPROVED", sta_id: { not: 3 } });
  });

  it("sin el permiso de ver facturas, las cifras de facturación van vacías y el encabezado lo dice (DEC-074)", async () => {
    const file = await exportContractReport({ report: "control", format: "xlsx", seesInvoices: false, scope: { all: true } });
    const sheet = await sheetOf(file);
    const { rows } = tableOf(sheet, "Contratista");
    expect(rows[0][6]).toBe(1785000);
    expect(rows[0][7]).toBe("");
    expect(rows[0][8]).toBe("");
    const texts = [];
    sheet.eachRow((row) => texts.push(String(row.getCell(1).value)));
    expect(texts.some((t) => t.includes("Sin acceso a las facturas de 1 contrato(s)"))).toBe(true);
  });

  it("más filas que el tope: 422 sin leerlas", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValue(5001);
    await expect(exportContractReport({ report: "control", format: "pdf", seesInvoices: false, scope: { all: true } })).rejects.toMatchObject({ statusCode: 422 });
    expect(prismaMock.tbl_contracts.findMany).not.toHaveBeenCalled();
  });

  it("un reporte desconocido responde 400", async () => {
    await expect(exportContractReport({ report: "otro", format: "pdf", seesInvoices: false, scope: { all: true } })).rejects.toMatchObject({ statusCode: 400 });
  });
});

describe("exportContractReport — anticipos y retenidos", () => {
  it("una fila por contrato con los saldos de anticipo y de retenido, y sus totales", async () => {
    prismaMock.tbl_contracts.count.mockResolvedValue(2);
    prismaMock.tbl_contracts.findMany.mockResolvedValue([contract(), contract({ ctr_id: 2, ctr_number: "C-002", tbl_contract_concepts: [] })]);
    const file = await exportContractReport({ report: "advances", format: "xlsx", seesInvoices: true, scope: { all: true } });
    const { rows } = tableOf(await sheetOf(file), "Contratista");

    // Pactado 225.000 (15 % de 1.500.000), facturado 150.000, amortizado 90.000;
    // retenido 30.000, devuelto 10.000.
    // Los dos contratos son del mismo proveedor: una sola celda de contratista para los dos y su subtotal.
    expect(rows.map((r) => r[0])).toEqual(["Aceros SAS", "Aceros SAS", "", ""]);
    expect(rows.map((r) => r[1])).toEqual(["C-001", "C-002", "Subtotal", "TOTALES"]);
    expect(rows[0].slice(4)).toEqual([225000, 150000, 90000, 60000, 30000, 10000, 20000]);
    expect(rows[1].slice(4)).toEqual([0, 0, 0, 0, 0, 0, 0]);
    expect(rows[2].slice(4)).toEqual([225000, 150000, 90000, 60000, 30000, 10000, 20000]);
    expect(rows[3].slice(4)).toEqual([225000, 150000, 90000, 60000, 30000, 10000, 20000]);
  });
});

describe("exportPolicyReport — control de pólizas", () => {
  it("una fila por póliza vigente con su valor asegurado, vigencia y si cubre el plazo; los conceptos sin póliza también", async () => {
    prismaMock.tbl_contracts.findMany.mockResolvedValue([
      contract({
        ctr_end_date: new Date("2026-12-31T00:00:00Z"),
        tbl_policies: [
          {
            ccp_id: 1,
            pol_number: "P-1",
            pol_base: "TOTAL_VALUE",
            pol_percentage: "10",
            pol_start_date: new Date("2026-01-01T00:00:00Z"),
            pol_end_date: new Date("2026-06-30T00:00:00Z"),
            tbl_policy_types: { plt_name: "Cumplimiento" },
            tbl_insurers: { ins_description: "Seguros del Estado" },
          },
        ],
      }),
    ]);

    const sheet = await sheetOf(await exportPolicyReport({ format: "xlsx", scope: { all: true } }));
    const { rows } = tableOf(sheet, "Contratista");

    // Valor inicial con póliza; el otrosí N.º 1, sin ninguna; el eliminado no sale.
    expect(rows).toHaveLength(4);
    const [policy, uncovered, subtotal, totals] = rows;
    expect(policy[0]).toBe("Aceros SAS");
    expect(subtotal[1]).toBe("Subtotal");
    expect(subtotal[11]).toBe(119000);
    expect(policy.slice(5, 9)).toEqual(["Valor inicial", "Cumplimiento", "Seguros del Estado", "P-1"]);
    // 10 % del valor total del concepto (1.190.000).
    expect(policy[11]).toBe(119000);
    // Termina antes que el contrato: no cubre el plazo.
    expect(policy[15]).toBe("No");
    expect(uncovered.slice(5, 7)).toEqual(["Otrosí N.º 1", "Sin póliza vigente"]);
    expect(totals[1]).toBe("TOTAL ASEGURADO");
    expect(totals[11]).toBe(119000);
  });
});
