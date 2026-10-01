
// Formato moneda con decimales si no es entero
export function fCurrency(number, locale = "es-CO", currency = "COP") {
    if (number == null || isNaN(number)) return "";
    const options = {
        style: "currency",
        currency,
        minimumFractionDigits: Number.isInteger(number) ? 0 : 2,
        maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat(locale, options).format(number);
}

// Moneda sin decimales
export function fCurrencyWithOutDecimal(number, locale = "es-CO", currency = "COP") {
    if (number == null || isNaN(number)) return "";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
}

// Porcentaje con un decimal
export function fPercent(number, locale = "es-CO") {
    if (number == null || isNaN(number)) return "";
    return (number / 100).toLocaleString(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
}

// Número estándar con separadores
export function fNumber(number, locale = "es-CO") {
    if (number == null || isNaN(number)) return "";
    return number.toLocaleString(locale);
}

// Números abreviados (K, M, B, T)
export function fShortenNumber(number, locale = "es-CO") {
    if (number == null || isNaN(number)) return "";
    if (number === 0) return "0";
    const abs = Math.abs(number);
    const suffixes = ["", "K", "M", "B", "T"];
    const tier = Math.floor(Math.log10(abs) / 3);
    if (tier <= 0) return number.toLocaleString(locale);
    const scaled = number / Math.pow(10, tier * 3);
    return `${scaled.toFixed(2)}${suffixes[tier]}`;
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

// Formato genérico de número con 2 decimales
export const formatNumber = (value, locale = "es-CO") => {
    if (value === null || value === undefined || value === "" || isNaN(value)) return "";
    const num = parseFloat(value);
    return num.toLocaleString(locale, {
        minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
        maximumFractionDigits: 2,
    });
};

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
