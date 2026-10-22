import { jest } from "@jest/globals";
import ExcelJS from "exceljs";

// Reporte de un contrato (DEC-070): el expediente completo, con cada parte
// tomada de la misma función que la pantalla y solo lo que el usuario ve.

const contract = {
  ctrId: 1,
  number: "C-001",
  name: "Suministro de acero",
  workCode: "OB-1",
  workName: "Torre 1",
  providerName: "Aceros SAS",
  providerIdentification: "NIT 900",
  invoiceView: "MAJOR",
  stateName: "En ejecución",
  term: 6,
  termUnit: "MES",
  base: "1500000.00",
  vat: "285000.00",
  currentValue: "1785000.00",
  advance: "225000.00",
  retention: "75000.00",
  concepts: [
    { type: "INITIAL", typeName: "Valor inicial", value: "1190000.00", directCost: "1000000.00", staId: 1 },
    { type: "AMENDMENT", typeName: "Otrosí", number: 1, value: "595000.00", directCost: "500000.00", staId: 1 },
    { type: "AMENDMENT", typeName: "Otrosí", number: 2, value: "1.00", staId: 3 },
  ],
  suspensions: [],
  history: [{ toStateName: "En ejecución", origin: "AUTOMATIC", createdAt: new Date("2026-01-31T15:00:00Z") }],
};

const getContract = jest.fn(async () => contract);
const getContractPolicies = jest.fn(async () => ({ policies: [{ conceptLabel: "Valor inicial", typeName: "Cumplimiento", number: "P-1", insuredValue: "119000.00" }] }));
const contractBalances = jest.fn(async () => ({
  advance: { agreed: "225000", invoiced: "150000", toInvoice: "75000", amortized: "90000", toAmortize: "60000" },
  retention: { agreed: "75000", retained: "30000", refunded: "10000", balance: "20000" },
}));
const contractInvoicesForReport = jest.fn(async () => [
  { number: "F-1", typeName: "Anticipo", value: "150000.00", state: "APPROVED", stateName: "Aprobada" },
  { number: "F-2", typeName: "Liquidación", value: "600000.00", state: "REGISTERED", stateName: "Registrada" },
]);

jest.unstable_mockModule("../../../../src/common/configs/prismaClient.js", () => ({ prisma: {} }));
jest.unstable_mockModule("../../../../src/modules/work/contracts/contracts.service.js", () => ({
  CONCEPT_SELECT: {},
  contractListQuery: jest.fn(),
  exportFilterLines: jest.fn(),
  getContract,
}));
jest.unstable_mockModule("../../../../src/modules/work/contracts/contractPolicies.service.js", () => ({ getContractPolicies }));
jest.unstable_mockModule("../../../../src/modules/billing/invoices/invoices.service.js", () => ({
  contractBalances,
  contractInvoicesForReport,
  contractsBalances: jest.fn(),
}));

const { exportContractSummary } = await import("../../../../src/modules/work/contracts/contractReports.service.js");

const SCOPE = { all: false, wrkId: 8 };

const workbookOf = async (file) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);
  return workbook;
};

const columnA = (sheet) => {
  const values = [];
  sheet.eachRow((row) => values.push(row.getCell(1).value));
  return values;
};

beforeEach(() => jest.clearAllMocks());

describe("exportContractSummary", () => {
  it("con todos los permisos: resumen y una hoja por cada parte del expediente", async () => {
    const file = await exportContractSummary({ ctrId: 1, format: "xlsx", scope: SCOPE, views: ["MAJOR"], canViewPolicies: true });
    const workbook = await workbookOf(file);

    expect(workbook.worksheets.map((s) => s.name)).toEqual(["Resumen", "Conceptos", "Pólizas", "Facturas", "Suspensiones", "Historial de estado"]);
    const summary = columnA(workbook.getWorksheet("Resumen"));
    expect(summary).toEqual(expect.arrayContaining(["Datos del contrato", "Valor", "Saldos de anticipo y retenido", "Falta por amortizar"]));
    // El alcance llega a cada lectura.
    expect(getContract).toHaveBeenCalledWith({ ctrId: 1, scope: SCOPE });
    expect(getContractPolicies).toHaveBeenCalledWith({ ctrId: 1, scope: SCOPE });
    expect(contractInvoicesForReport).toHaveBeenCalledWith({ ctrId: 1, views: ["MAJOR"] });
  });

  it("los conceptos eliminados no salen y las facturas cierran con el total aprobado", async () => {
    const workbook = await workbookOf(await exportContractSummary({ ctrId: 1, format: "xlsx", scope: SCOPE, views: ["MAJOR"], canViewPolicies: true }));
    const concepts = columnA(workbook.getWorksheet("Conceptos"));
    expect(concepts).toContain("Otrosí N.º 1");
    expect(concepts).not.toContain("Otrosí N.º 2");

    const invoices = workbook.getWorksheet("Facturas");
    const last = invoices.lastRow;
    expect(last.getCell(1).value).toBe("Total aprobado");
    expect(last.getCell(6).value).toBe(150000);
  });

  it("sin permiso de pólizas ni la vista de facturas del contrato, esas partes no se leen y el encabezado lo dice", async () => {
    const file = await exportContractSummary({ ctrId: 1, format: "xlsx", scope: SCOPE, views: ["SIMPLE"], canViewPolicies: false });
    const workbook = await workbookOf(file);

    expect(workbook.worksheets.map((s) => s.name)).toEqual(["Resumen", "Conceptos", "Suspensiones", "Historial de estado"]);
    expect(getContractPolicies).not.toHaveBeenCalled();
    expect(contractBalances).not.toHaveBeenCalled();
    expect(contractInvoicesForReport).not.toHaveBeenCalled();
    const summary = columnA(workbook.getWorksheet("Resumen"));
    expect(summary.some((v) => String(v).startsWith("No se incluyen: pólizas"))).toBe(true);
    expect(summary).not.toContain("Saldos de anticipo y retenido");
  });

  it("en PDF también genera el documento", async () => {
    const file = await exportContractSummary({ ctrId: 1, format: "pdf", scope: SCOPE, views: ["MAJOR"], canViewPolicies: true });
    expect(file.contentType).toBe("application/pdf");
    expect(file.buffer.subarray(0, 4).toString()).toBe("%PDF");
  });

  it("fuera del alcance, el 404 de getContract y no se arma nada", async () => {
    getContract.mockRejectedValueOnce(Object.assign(new Error("No se encontró el contrato."), { statusCode: 404 }));
    await expect(exportContractSummary({ ctrId: 1, format: "pdf", scope: SCOPE, views: ["MAJOR"], canViewPolicies: true })).rejects.toMatchObject({
      statusCode: 404,
    });
    expect(contractInvoicesForReport).not.toHaveBeenCalled();
  });
});
