import { jest } from "@jest/globals";
import ExcelJS from "exceljs";

const { COMPANY_FOOTER, EXPORT_MAX_ROWS, findExportRows, renderDocument, renderExport } = await import("../../../src/common/services/export.service.js");

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

  it("Excel: logo, título, filtros, encabezado y filas; el importe como número con dos decimales", async () => {
    const file = await renderExport({ format: "xlsx", title: "Contratos", filters: ["Filtros: Estado: Todos"], columns: COLUMNS, rows: ROWS });
    expect(file).toMatchObject({ extension: "xlsx", contentType: expect.stringContaining("spreadsheetml") });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    // La primera fila es del logo de INTERVE.
    expect(sheet.getImages().map((image) => image.range.tl.nativeRow)).toEqual([0]);
    expect(sheet.getCell("A2").value).toBe("Contratos");
    expect(sheet.getCell("A4").value).toBe("Filtros: Estado: Todos");
    expect(sheet.getRow(6).values.slice(1)).toEqual(["Número", "Valor", "Fecha"]);
    expect(sheet.getCell("B7").value).toBe(1234567.5);
    expect(sheet.getColumn(2).numFmt).toBe("#,##0.00");
    expect(sheet.getCell("B8").value).toBe("");
  });

  it("Excel: termina con el pie de los datos de INTERVE", async () => {
    const file = await renderExport({ format: "xlsx", title: "Contratos", columns: COLUMNS, rows: ROWS });
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    const last = sheet.rowCount;
    const footer = Array.from({ length: COMPANY_FOOTER.length }, (_, i) => sheet.getCell(`A${last - COMPANY_FOOTER.length + 1 + i}`).value);
    expect(footer).toEqual([...COMPANY_FOOTER]);
    expect(COMPANY_FOOTER[0]).toBe("INTERVE S.A.S");
  });

  it("PDF: un documento válido", async () => {
    const file = await renderExport({ format: "pdf", title: "Facturas", columns: COLUMNS, rows: ROWS });
    expect(file).toMatchObject({ extension: "pdf", contentType: "application/pdf" });
    expect(file.buffer.subarray(0, 5).toString()).toBe("%PDF-");
  });

});

describe("grupos por proveedor (formato del sistema que se migra)", () => {
  const rowsOf = async (file) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    const values = [];
    sheet.eachRow((row, n) => values.push({ n, first: row.getCell(1).value, cells: row.values.slice(1) }));
    return { sheet, values };
  };
  const INVOICES = [
    { number: "F-3", provider: "Zeus", work: "IEFL — Flor de loto", value: "10.00" },
    { number: "F-1", provider: "Inversiones", work: "IEFL — Flor de loto", value: "5.00" },
    { number: "F-2", provider: "Zeus", work: "IEFL — Flor de loto", value: "7.50" },
  ];
  const GROUP_COLUMNS = [
    { header: "Número", value: (r) => r.number },
    { header: "Valor", value: (r) => r.value, kind: "money" },
  ];
  const rowGroups = {
    heading: { label: "Obra", value: (r) => r.work },
    label: (r) => r.provider,
    // La suma la arma el módulo: aquí, una fija por grupo para ver dónde va.
    subtotal: (own) => ({ number: "Subtotal", value: own.length === 2 ? "17.50" : "5.00" }),
  };

  it("Excel: la obra una vez bajo el título y cada proveedor, en orden alfabético, con su encabezado combinado, sus filas y su subtotal", async () => {
    const file = await renderExport({ format: "xlsx", title: "Facturas", columns: GROUP_COLUMNS, rows: INVOICES, rowGroups, totals: { number: "Total", value: "22.50" } });
    const { sheet, values } = await rowsOf(file);
    expect(values.map((v) => v.first)).toContain("Obra: IEFL — Flor de loto");
    const header = values.find((v) => v.first === "Número").n;
    const table = values.filter((v) => v.n > header && !COMPANY_FOOTER.includes(v.first) && v.first !== null).map((v) => [v.cells[0], v.cells[1]]);
    expect(table).toEqual([
      ["Inversiones", "Inversiones"],
      ["F-1", 5],
      ["Subtotal", 5],
      ["Zeus", "Zeus"],
      // Dentro del grupo, el orden recibido.
      ["F-3", 10],
      ["F-2", 7.5],
      ["Subtotal", 17.5],
      ["Total", 22.5],
    ]);
    expect(sheet.getCell(header + 1, 2).isMerged).toBe(true);
    expect(sheet.getCell(header + 2, 2).isMerged).toBe(false);
  });

  it("con `column`, el proveedor es la primera columna y una sola celda combinada para todas sus filas, sin fila aparte", async () => {
    const columns = [...GROUP_COLUMNS, { header: "Proveedor", value: (r) => r.provider }];
    const file = await renderExport({ format: "xlsx", title: "Facturas", columns, rows: INVOICES, rowGroups: { ...rowGroups, column: "Proveedor" } });
    const { sheet, values } = await rowsOf(file);
    const header = values.find((v) => v.first === "Proveedor").n;
    expect(sheet.getRow(header).values.slice(1)).toEqual(["Proveedor", "Número", "Valor"]);
    const table = values.filter((v) => v.n > header && !COMPANY_FOOTER.includes(v.first) && v.first !== null).map((v) => v.cells.slice(0, 3));
    expect(table).toEqual([
      ["Inversiones", "F-1", 5],
      ["", "Subtotal", 5],
      ["Zeus", "F-3", 10],
      ["Zeus", "F-2", 7.5],
      ["", "Subtotal", 17.5],
    ]);
    // Zeus: una celda combinada para sus dos facturas; Inversiones, una sola fila sin combinar.
    expect(sheet.getCell(header + 3, 1).isMerged).toBe(true);
    expect(sheet.getCell(header + 4, 1).master.address).toBe(sheet.getCell(header + 3, 1).address);
    expect(sheet.getCell(header + 1, 1).isMerged).toBe(false);
    const pdf = await renderExport({ format: "pdf", title: "Facturas", columns, rows: INVOICES, rowGroups: { ...rowGroups, column: "Proveedor" } });
    expect(pdf.buffer.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("con filas de varias obras, la obra va delante del nombre de cada grupo y no bajo el título", async () => {
    const rows = [INVOICES[0], { ...INVOICES[1], work: "OB-2 — Torre" }];
    const { values } = await rowsOf(await renderExport({ format: "xlsx", title: "Facturas", columns: GROUP_COLUMNS, rows, rowGroups }));
    const firsts = values.map((v) => v.first);
    expect(firsts.some((t) => String(t).startsWith("Obra:"))).toBe(false);
    expect(firsts).toEqual(expect.arrayContaining(["IEFL — Flor de loto · Zeus", "OB-2 — Torre · Inversiones"]));
  });

  it("una fila sin proveedor va en el grupo de `emptyLabel`", async () => {
    const rows = [{ ...INVOICES[0], provider: null }];
    const { values } = await rowsOf(await renderExport({ format: "xlsx", title: "x", columns: GROUP_COLUMNS, rows, rowGroups: { ...rowGroups, emptyLabel: "Sin proveedor" } }));
    expect(values.map((v) => v.first)).toContain("Sin proveedor");
  });

  it("PDF: un documento válido con grupos que pasan de página, y el documento por secciones con la obra en el encabezado", async () => {
    const many = Array.from({ length: 120 }, (_, i) => ({ ...INVOICES[i % 3], number: `F-${i}` }));
    const file = await renderExport({ format: "pdf", title: "Facturas", columns: GROUP_COLUMNS, rows: many, rowGroups });
    expect(file.buffer.subarray(0, 5).toString()).toBe("%PDF-");
    const doc = await renderDocument({
      format: "pdf",
      title: "Listado de facturas — Extracto 10",
      heading: "Obra: IEFL — Flor de loto",
      sections: [{ title: "Facturas", columns: GROUP_COLUMNS, rows: INVOICES, rowGroups }],
    });
    expect(doc.buffer.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("Excel por secciones: la obra bajo el título en cada hoja", async () => {
    const file = await renderDocument({
      format: "xlsx",
      title: "Extracto",
      heading: "Obra: IEFL — Flor de loto",
      sections: [{ title: "Datos", fields: [{ label: "Número", value: "10" }] }, { title: "Facturas", columns: GROUP_COLUMNS, rows: INVOICES, rowGroups }],
    });
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    expect(workbook.worksheets.map((sheet) => sheet.getCell("A3").value)).toEqual(["Obra: IEFL — Flor de loto", "Obra: IEFL — Flor de loto"]);
  });
});

describe("formatos", () => {
  it("un formato desconocido responde 400", async () => {
    await expect(renderExport({ format: "csv", title: "x", columns: COLUMNS, rows: [] })).rejects.toMatchObject({ statusCode: 400 });
  });
});
