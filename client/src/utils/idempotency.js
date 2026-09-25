// Clave de idempotencia (ADR-0027, decisión 7).
//
// Se genera UNA vez al abrir el formulario de creación y se envía en cada
// intento de guardar ese mismo formulario (encabezado Idempotency-Key). Si el
// primer intento ya creó el registro, un doble clic o un reenvío recibe el
// registro ya creado en vez de crear otro. Si un intento falla (p. ej. por un
// correo repetido), no queda nada guardado con esa clave: se puede corregir y
// volver a enviar con la misma.
//
// Formulario nuevo = clave nueva. Nunca reutilizar la clave de otro
// formulario: con otro contenido, el backend la rechaza con 422.

const fallbackUuid = () => {
  // crypto.randomUUID solo existe en contexto seguro (https o localhost).
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // versión 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variante RFC 4122
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const newIdempotencyKey = () =>
  typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : fallbackUuid();

/** Config de axios con el encabezado, o {} si no hay clave (p. ej. al editar). */
export const idempotencyConfig = (key) => (key ? { headers: { 'Idempotency-Key': key } } : {});
