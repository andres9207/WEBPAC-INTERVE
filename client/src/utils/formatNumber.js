// Formatos de importes y porcentajes (DEC-028, DEC-045): trabajan sobre el
// texto que manda el servidor, sin pasar por Number ni parseFloat. Solo
// muestran; el cliente no calcula importes.

// Porcentaje que llega como texto ("26.666667", "15.00") → "26,67 %", "15 %".
// Redondea a `decimals` con medio hacia arriba sobre los dígitos (BigInt) y
// quita los ceros sobrantes de la parte decimal.
export function fPercentText(value, decimals = 2) {
    if (value === null || value === undefined || value === "") return "";
    const [integer, fraction = ""] = String(value).trim().split(".");
    const scaled = BigInt(`${integer}${fraction.padEnd(decimals + 1, "0").slice(0, decimals + 1)}`);
    const rounded = ((scaled + 5n) / 10n).toString().padStart(decimals + 1, "0");
    const int = rounded.slice(0, rounded.length - decimals) || "0";
    const dec = rounded.slice(rounded.length - decimals).replace(/0+$/, "");
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${grouped}${dec ? `,${dec}` : ""} %`;
}

// Formato de bytes (ej: 3.5 MB)
export function fData(bytes, locale = "es-CO") {
    if (bytes == null || isNaN(bytes)) return "";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    return `${size.toLocaleString(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    })} ${sizes[i]}`;
}

// Importe que llega del servidor como texto ("1234567.50", DEC-028) → "$ 1.234.567,50".
// Trabaja sobre el texto, sin pasar por Number: un DECIMAL(18,2) tiene más
// dígitos de los que un double representa exactos. Solo muestra; no calcula.
export function fMoneyText(value) {
    if (value === null || value === undefined || value === "") return "";
    const [integer, decimals = ""] = String(value).split(".");
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `$ ${grouped},${decimals.padEnd(2, "0").slice(0, 2)}`;
}

// Importe mientras se escribe (es-CO): el valor del formulario es el texto que
// recibe el servidor ("1234567.5"); el campo muestra "1.234.567,5". Sin Number.
export function moneyInputText(raw) {
    if (raw === null || raw === undefined || raw === "") return "";
    const [integer, decimals] = String(raw).split(".");
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimals === undefined ? grouped : `${grouped},${decimals}`;
}

// Lo que el usuario escribe ("1.234.567,5") → texto para el servidor
// ("1234567.5"). Punto = miles, coma = decimal, hasta dos decimales.
export function parseMoneyInput(text) {
    const clean = String(text ?? "").replace(/[^\d,]/g, "");
    const comma = clean.indexOf(",");
    if (comma < 0) return clean.replace(/^0+(?=\d)/, "");
    const integer = clean.slice(0, comma).replace(/^0+(?=\d)/, "") || "0";
    const decimals = clean.slice(comma + 1).replace(/,/g, "").slice(0, 2);
    return `${integer}.${decimals}`;
}
