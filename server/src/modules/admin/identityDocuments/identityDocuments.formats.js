/**
 * Formato del número de documento según el tipo (ADR-0008, decisión 5;
 * backlog MAE-BE-07). Regla de negocio: vive en el código, versionada, y no
 * en el esquema ni en la BD (una expresión editable desde la interfaz sería
 * un riesgo de ReDoS y de configuración rota, ADR-0008 alternativa 2).
 *
 * Única fuente de verdad: el servidor la aplica al crear y al editar, y el
 * selector se la entrega al cliente (pattern como texto) para avisar antes de
 * enviar. El dígito de verificación del NIT lo recalcula el cliente con el
 * mismo algoritmo (`checkDigit: "DIAN"`).
 *
 * Formatos definidos el 2026-09-29. Un tipo creado desde la interfaz sin
 * regla propia usa GENERIC_FORMAT; darle una regla exige desplegar código
 * (asimetría aceptada en ADR-0008, alternativa 3).
 */

export const IDENTIFICATION_FORMATS = Object.freeze({
  CC: { pattern: "^\\d{6,10}$", message: "debe tener de 6 a 10 dígitos, sin puntos ni espacios" },
  CE: { pattern: "^\\d{3,7}$", message: "debe tener de 3 a 7 dígitos" },
  NIT: {
    pattern: "^\\d{9}-\\d$",
    message: "debe tener 9 dígitos, guion y dígito de verificación (p. ej. 900123456-7)",
    checkDigit: "DIAN",
  },
  PA: { pattern: "^[A-Za-z0-9]{5,20}$", message: "debe tener de 5 a 20 letras o números" },
  PPT: { pattern: "^\\d{6,15}$", message: "debe tener de 6 a 15 dígitos" },
});

export const GENERIC_FORMAT = Object.freeze({
  pattern: "^[A-Za-z0-9-]{3,20}$",
  message: "debe tener de 3 a 20 letras, números o guiones",
});

export const formatFor = (code) => IDENTIFICATION_FORMATS[String(code ?? "").toUpperCase()] ?? GENERIC_FORMAT;

// Pesos de la DIAN, aplicados desde el dígito de la derecha.
const DIAN_WEIGHTS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

/** Dígito de verificación de un NIT (sin el DV), algoritmo módulo 11 de la DIAN. */
export const nitCheckDigit = (digits) => {
  const reversed = String(digits).split("").reverse();
  const sum = reversed.reduce((acc, d, i) => acc + Number(d) * DIAN_WEIGHTS[i], 0);
  const remainder = sum % 11;
  return remainder > 1 ? 11 - remainder : remainder;
};

/**
 * Valida `number` contra el formato del tipo `code`. Devuelve null si es
 * válido, o el motivo en texto para el mensaje de error.
 */
export const identificationError = (code, number) => {
  const format = formatFor(code);
  const value = String(number ?? "").trim();
  if (!new RegExp(format.pattern).test(value)) return format.message;
  if (format.checkDigit === "DIAN") {
    const [digits, dv] = value.split("-");
    if (nitCheckDigit(digits) !== Number(dv)) return "el dígito de verificación no corresponde al NIT";
  }
  return null;
};
