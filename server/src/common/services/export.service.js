import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

/**
 * Reportes de un listado en Excel y PDF (DEC-070). Cada módulo arma el
 * `where` con los mismos filtros que su listado, lee las filas con
 * `findExportRows` (sin paginar, con el tope EXPORT_MAX_ROWS) y las entrega
 * aquí con sus columnas. Este servicio solo presenta: no lee la BD ni calcula.
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
 */

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

// ─── Excel ───────────────────────────────────────────────────────────────────

// Importe ya redondeado (texto de money.utils) como número de celda: Excel
// solo lo muestra y lo suma; el servidor no calcula con él.
const excelValue = (column, row) => {
  const text = cellText(column, row);
  if (column.kind === "money" && text !== "") return Number(text);
  if (column.kind === "percent" && text !== "") return Number(text) / 100;
  return text;
};

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

const buildExcel = async ({ title, filters, columns, rows, groupKey, totals }) => {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  const sheet = workbook.addWorksheet(title.slice(0, 31));

  sheet.addRow([title]).font = { bold: true, size: 14 };
  sheet.addRow([`Generado: ${generatedAt()} · ${rows.length} fila(s)`]).font = { italic: true, size: 9, color: { argb: "FF666666" } };
  for (const line of filters) sheet.addRow([line]).font = { size: 9 };
  sheet.addRow([]);

  const header = sheet.addRow(columns.map((c) => c.header));
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF5E35B1" } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  const headerRow = header.number;

  for (const row of rows) sheet.addRow(columns.map((column) => excelValue(column, row)));

  columns.forEach((column, i) => {
    const col = sheet.getColumn(i + 1);
    col.width = Math.min(60, Math.max(12, (column.width ?? 1) * 14));
    if (column.kind === "money") {
      col.numFmt = "#,##0.00";
      col.alignment = { horizontal: "right" };
    }
    if (column.kind === "percent") {
      col.numFmt = "0.00%";
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
  sheet.views = [{ state: "frozen", ySplit: headerRow }];
  sheet.autoFilter = { from: { row: headerRow, column: 1 }, to: { row: headerRow, column: columns.length } };

  return Buffer.from(await workbook.xlsx.writeBuffer());
};

// ─── PDF ─────────────────────────────────────────────────────────────────────

const MARGIN = 30;
const FONT_SIZE = 7.5;
const CELL_PADDING = 3;

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

const buildPdf = ({ title, filters, columns, rows, groupKey, totals }) =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: MARGIN, bufferPages: true });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const width = doc.page.width - MARGIN * 2;
    const totalWeight = columns.reduce((sum, c) => sum + (c.width ?? 1), 0);
    const widths = columns.map((c) => (width * (c.width ?? 1)) / totalWeight);
    const bottom = doc.page.height - MARGIN - 14;

    doc.font("Helvetica-Bold").fontSize(13).text(title, MARGIN, MARGIN);
    doc.font("Helvetica").fontSize(8).fillColor("#666666").text(`Generado: ${generatedAt()} · ${rows.length} fila(s)`);
    for (const line of filters) doc.text(line);
    doc.fillColor("black").moveDown(0.6);

    const rowHeight = (texts, font) => {
      doc.font(font).fontSize(FONT_SIZE);
      return Math.max(...texts.map((t, i) => doc.heightOfString(t || " ", { width: widths[i] - CELL_PADDING * 2 }))) + CELL_PADDING * 2;
    };

    const drawRow = (texts, { font, fill }) => {
      const height = rowHeight(texts, font);
      const y = doc.y;
      let x = MARGIN;
      if (fill) doc.rect(MARGIN, y, width, height).fill(fill);
      doc.fillColor(fill === "#5E35B1" ? "white" : "black").font(font).fontSize(FONT_SIZE);
      texts.forEach((t, i) => {
        const align = isRight(columns[i]) ? "right" : "left";
        doc.text(t, x + CELL_PADDING, y + CELL_PADDING, { width: widths[i] - CELL_PADDING * 2, align });
        x += widths[i];
      });
      doc.moveTo(MARGIN, y + height).lineTo(MARGIN + width, y + height).lineWidth(0.3).strokeColor("#DDDDDD").stroke();
      doc.x = MARGIN;
      doc.y = y + height;
      return height;
    };

    const headers = columns.map((c) => c.header);
    const drawHeader = () => drawRow(headers, { font: "Helvetica-Bold", fill: "#5E35B1" });
    drawHeader();

    // Las columnas de grupo, solo en la primera fila del grupo o de la página.
    const runs = groupRuns(rows, groupKey);
    runs.forEach((run, runIndex) => {
      for (let index = run.start; index < run.end; index += 1) {
        const full = columns.map((column) => pdfText(column, rows[index]));
        if (doc.y + rowHeight(full, "Helvetica") > bottom) {
          doc.addPage();
          doc.y = MARGIN;
          drawHeader();
        } else if (index > run.start) {
          full.forEach((_, i) => {
            if (columns[i].group) full[i] = "";
          });
        }
        drawRow(full, { font: "Helvetica", fill: runIndex % 2 === 1 ? "#F5F3FA" : null });
      }
    });
    if (totals) {
      const texts = columns.map((column) => pdfText(column, totals));
      if (doc.y + rowHeight(texts, "Helvetica-Bold") > bottom) {
        doc.addPage();
        doc.y = MARGIN;
        drawHeader();
      }
      drawRow(texts, { font: "Helvetica-Bold", fill: null });
    }
    if (rows.length === 0) doc.font("Helvetica-Oblique").fontSize(9).text("Sin filas con los filtros aplicados.", MARGIN, doc.y + 6);

    // Numeración de páginas al final, cuando ya se sabe cuántas hay.
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i += 1) {
      doc.switchToPage(range.start + i);
      // El pie va bajo el margen inferior: sin esto, pdfkit abriría una página nueva.
      doc.page.margins.bottom = 0;
      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor("#666666")
        .text(`Página ${i + 1} de ${range.count}`, MARGIN, doc.page.height - MARGIN - 6, { width, align: "right", lineBreak: false });
    }
    doc.end();
  });

/**
 * Archivo del reporte: `{ buffer, contentType, extension }`. `filters`: las
 * líneas que describen los filtros aplicados, para el encabezado. `groupKey` y
 * `totals`: filas agrupadas y fila de totales (ver arriba).
 */
export const renderExport = async ({ format, title, filters = [], columns, rows, groupKey = null, totals = null }) => {
  const spec = EXPORT_FORMATS[format];
  if (!spec) throw httpError(400, "El formato del reporte debe ser xlsx o pdf.");
  const input = { title, filters, columns, rows, groupKey, totals };
  const buffer = format === "xlsx" ? await buildExcel(input) : await buildPdf(input);
  return { buffer, ...spec };
};

/** Envía el archivo del reporte (controller). El nombre lo pone el cliente. */
export const sendExport = (res, file) => {
  res.setHeader("Content-Type", file.contentType);
  res.setHeader("Content-Disposition", `attachment; filename="reporte.${file.extension}"`);
  res.send(file.buffer);
};
