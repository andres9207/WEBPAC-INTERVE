import { jest } from "@jest/globals";
import ExcelJS from "exceljs";

const { EXPORT_MAX_ROWS, findExportRows, renderExport } = await import("../../../src/common/services/export.service.js");

const COLUMNS = [
  { header: "Número", value: (r) => r.number },
  { header: "Valor", value: (r) => r.value, kind: "money" },
  { header: "Fecha", value: (r) => r.date, kind: "date" },
];
const ROWS = [
  { number: "C-1", value: "1234567.50", date: "2026-03-01" },
  { number: "C-2", value: null, date: null },
];

describe("reportes de listados (DEC-070)", () => {
  it("cuenta antes de leer: más del tope responde 422 sin leer las filas", async () => {
    const model = { count: jest.fn(async () => EXPORT_MAX_ROWS + 1), findMany: jest.fn() };
    await expect(findExportRows(model, { where: { a: 1 }, select: {}, orderBy: {} })).rejects.toMatchObject({ statusCode: 422 });
    expect(model.count).toHaveBeenCalledWith({ where: { a: 1 } });
    expect(model.findMany).not.toHaveBeenCalled();
  });

  it("hasta el tope lee todas las filas con el mismo where y orden, sin paginar", async () => {
    const model = { count: jest.fn(async () => EXPORT_MAX_ROWS), findMany: jest.fn(async () => []) };
    await findExportRows(model, { where: { a: 1 }, select: { x: true }, orderBy: { y: "asc" } });
    expect(model.findMany).toHaveBeenCalledWith({ where: { a: 1 }, select: { x: true }, orderBy: { y: "asc" } });
  });

  it("Excel: título, filtros, encabezado y filas; el importe como número con dos decimales", async () => {
    const file = await renderExport({ format: "xlsx", title: "Contratos", filters: ["Filtros: Estado: Todos"], columns: COLUMNS, rows: ROWS });
    expect(file).toMatchObject({ extension: "xlsx", contentType: expect.stringContaining("spreadsheetml") });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    expect(sheet.getCell("A1").value).toBe("Contratos");
    expect(sheet.getCell("A3").value).toBe("Filtros: Estado: Todos");
    expect(sheet.getRow(5).values.slice(1)).toEqual(["Número", "Valor", "Fecha"]);
    expect(sheet.getCell("B6").value).toBe(1234567.5);
    expect(sheet.getColumn(2).numFmt).toBe("#,##0.00");
    expect(sheet.getCell("B7").value).toBe("");
  });

  it("PDF: un documento válido", async () => {
    const file = await renderExport({ format: "pdf", title: "Facturas", columns: COLUMNS, rows: ROWS });
    expect(file).toMatchObject({ extension: "pdf", contentType: "application/pdf" });
    expect(file.buffer.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("un formato desconocido responde 400", async () => {
    await expect(renderExport({ format: "csv", title: "x", columns: COLUMNS, rows: [] })).rejects.toMatchObject({ statusCode: 400 });
  });
});
