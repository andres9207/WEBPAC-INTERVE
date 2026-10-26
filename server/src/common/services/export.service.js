import { readFileSync } from "node:fs";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

/**
 * Reportes en Excel y PDF (DEC-070). Cada módulo arma el `where` con los
 * mismos filtros que su listado, lee las filas con `findExportRows` (sin
 * paginar, con el tope EXPORT_MAX_ROWS) y las entrega aquí con sus columnas.
 * Este servicio solo presenta: no lee la BD ni calcula.
 *
 * Columna: `{ header, value(row), kind?, width?, group? }`. `kind`: "money"
 * (texto de importe ya redondeado por money.utils, que en Excel va como número
 * con dos decimales), "percent" (texto de porcentaje de money.utils, 0 a 100),
 * "date" (texto AAAA-MM-DD) o texto. `width`: peso relativo.
 *
 * Filas agrupadas (opcional): con `groupKey(row)`, las filas seguidas con la
 * misma clave son de un mismo registro (p. ej. los conceptos de un contrato) y
 * las columnas con `group: true` se muestran una vez por grupo: combinadas en
 * Excel, solo en la primera fila del grupo en el PDF. `totals`: una fila más,
 * en negrita, que pasa por las mismas columnas; sus cifras las suma el módulo.
 *
 * Dos formas: `renderExport`, una tabla (el reporte de un listado), y
 * `renderDocument`, un documento con secciones (el de un registro, como el
 * resumen de un contrato).
 *
 * Todos llevan el logo de INTERVE: en Excel, en la primera fila de cada hoja;
 * en el PDF, a la derecha del encabezado de la primera página. Y el pie con
 * los datos de la empresa (COMPANY_FOOTER): en el PDF, en cada página; en
 * Excel, al final de cada hoja.
 */

// Logo de INTERVE (src/images), leído una vez al cargar el módulo. Proporción 2359 × 1005.
const LOGO = readFileSync(new URL("../../images/logo-interve.png", import.meta.url));
const LOGO_RATIO = 1005 / 2359;

// Pie de los reportes: los datos de INTERVE (pedido del usuario, 2026-10-26).
export const COMPANY_FOOTER = Object.freeze([
  "INTERVE S.A.S",
  "Cra. 30 No. 10C-228 | Ed. Interplaza, Of. 503",
  "PBX: (57+4) 352 3434 | CEL.3007856546 – ie@interve.co",
  "Medellín - Colombia",
]);

/** Máximo de filas de un reporte (DEC-070). Más que eso responde 422: hay que afinar los filtros. */
export const EXPORT_MAX_ROWS = 5000;

export const EXPORT_FORMATS = Object.freeze({
  xlsx: { contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", extension: "xlsx" },
  pdf: { contentType: "application/pdf", extension: "pdf" },
});

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

/**
 * Filas de un reporte con el `where` y el orden del listado, sin paginar.
 * Cuenta primero: si pasan del tope, 422 sin leerlas.
 */
export const findExportRows = async (model, { where, select, orderBy }) => {
  const total = await model.count({ where });
  if (total > EXPORT_MAX_ROWS) {
    throw httpError(422, `El reporte tendría ${total} filas y el máximo es ${EXPORT_MAX_ROWS}. Aplica más filtros e inténtalo de nuevo.`);
  }
  return model.findMany({ where, select, orderBy });
};

const cellText = (column, row) => {
  const value = column.value(row);
  return value === null || value === undefined || value === "" ? "" : String(value);
};

// Fecha y hora de generación, en la zona del negocio.
const generatedAt = () =>
  new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Bogota" }).format(new Date());

// Tramos [desde, hasta) de filas seguidas con la misma clave de grupo.
const groupRuns = (rows, groupKey) => {
  const runs = [];
  rows.forEach((row, index) => {
    const key = groupKey ? groupKey(row) : index;
    const last = runs[runs.length - 1];
    if (last && last.key === key) last.end = index + 1;
    else runs.push({ key, start: index, end: index + 1 });
  });
  return runs;
};

// ─── Excel ───────────────────────────────────────────────────────────────────

// Importe ya redondeado (texto de money.utils) como número de celda: Excel
// solo lo muestra y lo suma; el servidor no calcula con él.
const excelValue = (column, row) => {
  const text = cellText(column, row);
  if (column.kind === "money" && text !== "") return Number(text);
  if (column.kind === "percent" && text !== "") return Number(text) / 100;
  return text;
};

const EXCEL_FORMATS = { money: "#,##0.00", percent: "0.00%" };
const PURPLE = "FF5E35B1";

// Nombre de hoja válido y único: hasta 31 caracteres, sin los que Excel prohíbe.
const sheetName = (workbook, title) => {
  const base = title.replace(/[\\/?*[\]:]/g, " ").slice(0, 31);
  let name = base;
  for (let i = 2; workbook.getWorksheet(name); i += 1) name = `${base.slice(0, 28)} ${i}`;
  return name;
};

// Título, "Generado: …" (con `count` filas, si se da) y las líneas que siguen.
const generatedLine = (count) => `Generado: ${generatedAt()}${count === undefined ? "" : ` · ${count} fila(s)`}`;

// El logo se agrega una vez por libro y se dibuja en cada hoja.
const EXCEL_LOGO_WIDTH = 170;
const logoIds = new WeakMap();
const logoId = (workbook) => {
  if (!logoIds.has(workbook)) logoIds.set(workbook, workbook.addImage({ buffer: LOGO, extension: "png" }));
  return logoIds.get(workbook);
};

const addSheetHeading = (sheet, title, lines, count) => {
  // Primera fila, solo para el logo: alto en puntos (los píxeles del logo × 0,75) y un margen.
  const logoHeight = Math.round(EXCEL_LOGO_WIDTH * LOGO_RATIO);
  sheet.addRow([]).height = logoHeight * 0.75 + 6;
  sheet.addImage(logoId(sheet.workbook), { tl: { col: 0, row: 0 }, ext: { width: EXCEL_LOGO_WIDTH, height: logoHeight }, editAs: "oneCell" });
  sheet.addRow([title]).font = { bold: true, size: 14 };
  sheet.addRow([generatedLine(count)]).font = { italic: true, size: 9, color: { argb: "FF666666" } };
  for (const line of lines) sheet.addRow([line]).font = { size: 9 };
  sheet.addRow([]);
};

// Pie de la hoja, después del contenido: una fila en blanco y los datos de la empresa.
const addSheetFooter = (sheet) => {
  sheet.addRow([]);
  COMPANY_FOOTER.forEach((line, i) => {
    sheet.addRow([line]).font = { size: 8, bold: i === 0, color: { argb: "FF666666" } };
  });
};

// Una tabla en su propia hoja: encabezado fijo, filtro y formato por columna.
const addTableSheet = (workbook, { title, filters = [], columns, rows, groupKey, totals, empty }) => {
  const sheet = workbook.addWorksheet(sheetName(workbook, title));
  addSheetHeading(sheet, title, filters, rows.length);

  const header = sheet.addRow(columns.map((c) => c.header));
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PURPLE } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  const headerRow = header.number;

  for (const row of rows) sheet.addRow(columns.map((column) => excelValue(column, row)));
  if (rows.length === 0 && empty) sheet.addRow([empty]).font = { italic: true };

  columns.forEach((column, i) => {
    const col = sheet.getColumn(i + 1);
    col.width = Math.min(60, Math.max(12, (column.width ?? 1) * 14));
    if (EXCEL_FORMATS[column.kind]) {
      col.numFmt = EXCEL_FORMATS[column.kind];
      col.alignment = { horizontal: "right" };
    }
  });

  if (groupKey) {
    for (const run of groupRuns(rows, groupKey)) {
      if (run.end - run.start < 2) continue;
      columns.forEach((column, i) => {
        if (!column.group) return;
        sheet.mergeCells(headerRow + 1 + run.start, i + 1, headerRow + run.end, i + 1);
        const cell = sheet.getCell(headerRow + 1 + run.start, i + 1);
        cell.alignment = { ...cell.alignment, vertical: "middle", wrapText: true };
      });
    }
  }
  if (totals) sheet.addRow(columns.map((column) => excelValue(column, totals))).font = { bold: true };
  addSheetFooter(sheet);
  sheet.views = [{ state: "frozen", ySplit: headerRow }];
  if (rows.length > 0) sheet.autoFilter = { from: { row: headerRow, column: 1 }, to: { row: headerRow, column: columns.length } };
};

// Campo `{ label, value, kind? }` → valor de celda (importes y porcentajes como número).
const fieldColumn = (field) => ({ kind: field.kind, value: () => field.value });

// Secciones de campos en una hoja de resumen: título de sección y pares etiqueta/valor.
const addFieldsSheet = (workbook, title, lines, sections) => {
  const sheet = workbook.addWorksheet(sheetName(workbook, "Resumen"));
  addSheetHeading(sheet, title, lines);
  for (const section of sections) {
    const heading = sheet.addRow([section.title]);
    heading.font = { bold: true, color: { argb: "FFFFFFFF" } };
    heading.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: PURPLE } };
    heading.getCell(2).fill = { type: "pattern", pattern: "solid", fgColor: { argb: PURPLE } };
    for (const field of section.fields) {
      const row = sheet.addRow([field.label, excelValue(fieldColumn(field), null)]);
      row.getCell(1).font = { bold: true };
      const cell = row.getCell(2);
      cell.alignment = { horizontal: "left", wrapText: true, vertical: "top" };
      if (EXCEL_FORMATS[field.kind]) cell.numFmt = EXCEL_FORMATS[field.kind];
    }
    sheet.addRow([]);
  }
  addSheetFooter(sheet);
  sheet.getColumn(1).width = 30;
  sheet.getColumn(2).width = 70;
};

const buildExcel = async ({ title, filters, columns, rows, groupKey, totals }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  addTableSheet(workbook, { title, filters, columns, rows, groupKey, totals });
  return Buffer.from(await workbook.xlsx.writeBuffer());
};

const buildExcelDocument = async ({ title, lines, sections }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  addFieldsSheet(
    workbook,
    title,
    lines,
    sections.filter((s) => s.fields)
  );
  for (const section of sections.filter((s) => s.columns)) addTableSheet(workbook, section);
  return Buffer.from(await workbook.xlsx.writeBuffer());
};

// ─── PDF ─────────────────────────────────────────────────────────────────────

const MARGIN = 30;
// Alto reservado al pie de cada página: los datos de la empresa y la numeración.
const FOOTER_HEIGHT = 34;
const FONT_SIZE = 7.5;
const CELL_PADDING = 3;
const PDF_PURPLE = "#5E35B1";

// "1234567.5" → "1.234.567,50": solo formato de texto, sin pasar por número.
const moneyDisplay = (text) => {
  if (text === "") return "";
  const negative = text.startsWith("-");
  const [integer, decimals = ""] = text.replace("-", "").split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${negative ? "-" : ""}${grouped},${decimals.padEnd(2, "0").slice(0, 2)}`;
};

const pdfText = (column, row) => {
  const text = cellText(column, row);
  if (column.kind === "money") return moneyDisplay(text);
  if (column.kind === "percent" && text !== "") return `${text.replace(".", ",")} %`;
  return text;
};

const isRight = (column) => column.kind === "money" || column.kind === "percent";

const newPdf = () =>
  new PDFDocument({
    size: "A4",
    layout: "landscape",
    // El contenido no baja hasta el pie: el margen inferior lo reserva.
    margins: { top: MARGIN, left: MARGIN, right: MARGIN, bottom: MARGIN + FOOTER_HEIGHT },
    bufferPages: true,
  });

const pageWidth = (doc) => doc.page.width - MARGIN * 2;
const pageBottom = (doc) => doc.page.height - MARGIN - FOOTER_HEIGHT - 6;

// Si lo que sigue (de alto `height`) no cabe, página nueva.
const ensureRoom = (doc, height) => {
  if (doc.y + height <= pageBottom(doc)) return false;
  doc.addPage();
  doc.y = MARGIN;
  return true;
};

const PDF_LOGO_WIDTH = 120;

// Título y líneas a la izquierda; el logo a la derecha, sin que el texto lo pise.
const pdfHeading = (doc, title, lines, count) => {
  const logoX = doc.page.width - MARGIN - PDF_LOGO_WIDTH;
  const logoBottom = MARGIN + PDF_LOGO_WIDTH * LOGO_RATIO;
  doc.image(LOGO, logoX, MARGIN, { width: PDF_LOGO_WIDTH });
  const textWidth = logoX - MARGIN - 12;
  doc.font("Helvetica-Bold").fontSize(13).fillColor("black").text(title, MARGIN, MARGIN, { width: textWidth });
  doc.font("Helvetica").fontSize(8).fillColor("#666666").text(generatedLine(count), { width: textWidth });
  for (const line of lines) doc.text(line, { width: textWidth });
  doc.fillColor("black").moveDown(0.6);
  doc.x = MARGIN;
  doc.y = Math.max(doc.y, logoBottom + 8);
};

// Una tabla desde la posición actual, con encabezado repetido en cada página.
const drawTable = (doc, { columns, rows, groupKey, totals, empty }) => {
  const width = pageWidth(doc);
  const totalWeight = columns.reduce((sum, c) => sum + (c.width ?? 1), 0);
  const widths = columns.map((c) => (width * (c.width ?? 1)) / totalWeight);

  const rowHeight = (texts, font) => {
    doc.font(font).fontSize(FONT_SIZE);
    return Math.max(...texts.map((t, i) => doc.heightOfString(t || " ", { width: widths[i] - CELL_PADDING * 2 }))) + CELL_PADDING * 2;
  };

  const drawRow = (texts, { font, fill }) => {
    const height = rowHeight(texts, font);
    const y = doc.y;
    let x = MARGIN;
    if (fill) doc.rect(MARGIN, y, width, height).fill(fill);
    doc.fillColor(fill === PDF_PURPLE ? "white" : "black").font(font).fontSize(FONT_SIZE);
    texts.forEach((t, i) => {
      doc.text(t, x + CELL_PADDING, y + CELL_PADDING, { width: widths[i] - CELL_PADDING * 2, align: isRight(columns[i]) ? "right" : "left" });
      x += widths[i];
    });
    doc.moveTo(MARGIN, y + height).lineTo(MARGIN + width, y + height).lineWidth(0.3).strokeColor("#DDDDDD").stroke();
    doc.fillColor("black");
    doc.x = MARGIN;
    doc.y = y + height;
  };

  const headers = columns.map((c) => c.header);
  const drawHeader = () => drawRow(headers, { font: "Helvetica-Bold", fill: PDF_PURPLE });
  ensureRoom(doc, rowHeight(headers, "Helvetica-Bold") * 2);
  drawHeader();

  // Las columnas de grupo, solo en la primera fila del grupo o de la página.
  groupRuns(rows, groupKey).forEach((run, runIndex) => {
    for (let index = run.start; index < run.end; index += 1) {
      const texts = columns.map((column) => pdfText(column, rows[index]));
      if (ensureRoom(doc, rowHeight(texts, "Helvetica"))) drawHeader();
      else if (index > run.start) {
        texts.forEach((_, i) => {
          if (columns[i].group) texts[i] = "";
        });
      }
      drawRow(texts, { font: "Helvetica", fill: runIndex % 2 === 1 ? "#F5F3FA" : null });
    }
  });
  if (totals) {
    const texts = columns.map((column) => pdfText(column, totals));
    if (ensureRoom(doc, rowHeight(texts, "Helvetica-Bold"))) drawHeader();
    drawRow(texts, { font: "Helvetica-Bold", fill: null });
  }
  if (rows.length === 0) doc.font("Helvetica-Oblique").fontSize(9).text(empty ?? "Sin filas con los filtros aplicados.", MARGIN, doc.y + 6);
};

// Pares etiqueta/valor en dos columnas de pares por renglón.
const drawFields = (doc, fields) => {
  const width = pageWidth(doc);
  const pairWidth = width / 2;
  const labelWidth = 130;
  doc.fontSize(8.5);
  for (let i = 0; i < fields.length; i += 2) {
    const pair = fields.slice(i, i + 2).map((field) => ({ label: field.label, text: pdfText(fieldColumn(field), null) || "—" }));
    const height =
      Math.max(...pair.map((p) => doc.font("Helvetica").heightOfString(p.text, { width: pairWidth - labelWidth - 8 }))) + 4;
    ensureRoom(doc, height);
    const y = doc.y;
    pair.forEach((p, j) => {
      const x = MARGIN + j * pairWidth;
      doc.font("Helvetica-Bold").fillColor("#444444").text(p.label, x, y, { width: labelWidth - 4 });
      doc.font("Helvetica").fillColor("black").text(p.text, x + labelWidth, y, { width: pairWidth - labelWidth - 8 });
    });
    doc.x = MARGIN;
    doc.y = y + height;
  }
};

const drawSectionTitle = (doc, title) => {
  ensureRoom(doc, 40);
  doc.moveDown(0.6);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(PDF_PURPLE).text(title, MARGIN, y);
  doc.moveTo(MARGIN, doc.y + 1).lineTo(MARGIN + pageWidth(doc), doc.y + 1).lineWidth(0.6).strokeColor(PDF_PURPLE).stroke();
  doc.fillColor("black");
  doc.y += 5;
};

// Pie de cada página al final, cuando ya se sabe cuántas hay: los datos de la
// empresa a la izquierda y la numeración a la derecha, bajo una línea.
const drawFooters = (doc) => {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i += 1) {
    doc.switchToPage(range.start + i);
    // El pie va bajo el margen inferior: sin esto, pdfkit abriría una página nueva.
    doc.page.margins.bottom = 0;
    const top = doc.page.height - MARGIN - FOOTER_HEIGHT + 4;
    doc.moveTo(MARGIN, top).lineTo(MARGIN + pageWidth(doc), top).lineWidth(0.4).strokeColor("#BBBBBB").stroke();
    COMPANY_FOOTER.forEach((line, n) => {
      doc
        .font(n === 0 ? "Helvetica-Bold" : "Helvetica")
        .fontSize(6.5)
        .fillColor("#666666")
        .text(line, MARGIN, top + 3 + n * 7.5, { width: pageWidth(doc) * 0.7, lineBreak: false });
    });
    doc
      .font("Helvetica")
      .fontSize(7)
      .fillColor("#666666")
      .text(`Página ${i + 1} de ${range.count}`, MARGIN, top + 3, { width: pageWidth(doc), align: "right", lineBreak: false });
  }
};

const pdfBuffer = (draw) =>
  new Promise((resolve, reject) => {
    const doc = newPdf();
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    draw(doc);
    drawFooters(doc);
    doc.end();
  });

const buildPdf = ({ title, filters, columns, rows, groupKey, totals }) =>
  pdfBuffer((doc) => {
    pdfHeading(doc, title, filters, rows.length);
    drawTable(doc, { columns, rows, groupKey, totals });
  });

const buildPdfDocument = ({ title, lines, sections }) =>
  pdfBuffer((doc) => {
    pdfHeading(doc, title, lines);
    for (const section of sections) {
      drawSectionTitle(doc, section.title);
      if (section.fields) drawFields(doc, section.fields);
      else drawTable(doc, section);
    }
  });

const renderWith = async (format, builders, input) => {
  const spec = EXPORT_FORMATS[format];
  if (!spec) throw httpError(400, "El formato del reporte debe ser xlsx o pdf.");
  const buffer = format === "xlsx" ? await builders.xlsx(input) : await builders.pdf(input);
  return { buffer, ...spec };
};

/**
 * Archivo del reporte de un listado: `{ buffer, contentType, extension }`.
 * `filters`: las líneas que describen los filtros aplicados, para el
 * encabezado. `groupKey` y `totals`: filas agrupadas y fila de totales (ver arriba).
 */
export const renderExport = ({ format, title, filters = [], columns, rows, groupKey = null, totals = null }) =>
  renderWith(format, { xlsx: buildExcel, pdf: buildPdf }, { title, filters, columns, rows, groupKey, totals });

/**
 * Archivo del reporte de un registro, por secciones. Sección de campos:
 * `{ title, fields: [{ label, value, kind? }] }`; de tabla: `{ title, columns,
 * rows, totals?, empty? }` (`empty`: el texto si no hay filas). En Excel, los
 * campos van en una hoja "Resumen" y cada tabla en su hoja; en PDF, todo
 * seguido. `lines`: líneas bajo el título.
 */
export const renderDocument = ({ format, title, lines = [], sections }) =>
  renderWith(format, { xlsx: buildExcelDocument, pdf: buildPdfDocument }, { title, lines, sections });

/** Envía el archivo del reporte (controller). El nombre lo pone el cliente. */
export const sendExport = (res, file) => {
  res.setHeader("Content-Type", file.contentType);
  res.setHeader("Content-Disposition", `attachment; filename="reporte.${file.extension}"`);
  res.send(file.buffer);
};
