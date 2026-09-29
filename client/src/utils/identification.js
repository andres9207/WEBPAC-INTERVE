// Validación del número de documento en el formulario, solo para avisar antes
// de enviar: el servidor aplica la misma regla y es el que decide
// (server/src/modules/admin/identityDocuments/identityDocuments.formats.js).
// El formato no se copia aquí: llega con cada opción del selector de tipos
// ({ pattern, message, checkDigit }).

// Pesos de la DIAN, aplicados desde el dígito de la derecha. Mismo algoritmo
// que nitCheckDigit del servidor.
const DIAN_WEIGHTS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

const nitCheckDigit = (digits) => {
  const sum = String(digits)
    .split('')
    .reverse()
    .reduce((acc, d, i) => acc + Number(d) * DIAN_WEIGHTS[i], 0);
  const remainder = sum % 11;
  return remainder > 1 ? 11 - remainder : remainder;
};

/**
 * Devuelve el mensaje de error del número según el formato de su tipo, o null
 * si es válido (o si todavía no se conoce el formato).
 */
export const identificationFormatError = (format, number) => {
  if (!format) return null;
  const value = String(number ?? '').trim();
  if (!new RegExp(format.pattern).test(value)) return `El número ${format.message}`;
  if (format.checkDigit === 'DIAN') {
    const [digits, dv] = value.split('-');
    if (nitCheckDigit(digits) !== Number(dv)) return 'El dígito de verificación no corresponde al NIT';
  }
  return null;
};
