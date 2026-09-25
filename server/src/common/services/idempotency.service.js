import crypto from "crypto";

/**
 * Idempotencia por clave (ADR-0027, decisión 7).
 *
 * El cliente genera una clave (UUID) al abrir el formulario y la envía en el
 * encabezado Idempotency-Key en cada intento de la misma operación. La clave
 * se guarda en la propia entidad (<pre>_idempotency_key, UNIQUE), junto con
 * la huella del contenido (<pre>_idempotency_hash).
 *
 *   - Misma clave, mismo contenido, mismo autor → se devuelve la entidad ya
 *     creada (o el estado ya alcanzado), sin volver a ejecutar nada.
 *   - Misma clave con otro contenido, u otro autor → 422. No se devuelve una
 *     entidad que no corresponde a esa petición, ni se revela la de otro.
 *   - Dos peticiones con la misma clave a la vez → el UNIQUE deja pasar solo
 *     una; la otra, al chocar, encuentra la ya creada y la devuelve.
 *
 * Transiciones de estado (aprobar, anular…): el mismo mecanismo con el `target`
 * apuntando a la tabla de historial de estado del agregado, cuya fila de
 * historial lleva la clave. La precondición de estado se sigue leyendo bajo
 * bloqueo dentro de la operación (withLockedTransaction).
 */

export const IDEMPOTENCY_HEADER = "Idempotency-Key";

// Nunca entran en la huella: la huella se guarda en la BD y, con el resto de
// campos conocidos, permitiría probar contraseñas por fuerza bruta. Un
// reintento que solo cambie la contraseña se trata como el mismo contenido.
const EXCLUDED_FROM_FINGERPRINT = new Set(["password", "currentPassword", "newPassword", "nuevaContrasena"]);

const canonical = (value) => {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) return value.map(canonical);
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    return Object.keys(value)
      .filter((k) => !EXCLUDED_FROM_FINGERPRINT.has(k) && value[k] !== undefined)
      .sort()
      .reduce((acc, k) => ({ ...acc, [k]: canonical(value[k]) }), {});
  }
  return value;
};

/** SHA-256 del contenido, estable frente al orden de las claves. */
export const requestFingerprint = (payload) =>
  crypto.createHash("sha256").update(JSON.stringify(canonical(payload ?? {}))).digest("hex");

const keyReused = () => {
  const error = new Error(
    "La clave de idempotencia ya se usó para otra solicitud. Vuelve a abrir el formulario e intenta de nuevo."
  );
  error.statusCode = 422;
  return error;
};

const idempotencyMisuse = (message) => new Error(`[idempotency] ${message}`);

/**
 * Busca una ejecución previa con esta clave. Devuelve el resultado a repetir,
 * o null si la clave no se ha usado. Lanza 422 si la clave se usó con otro
 * contenido o por otro autor.
 */
const findReplay = async (target, { key, hash, ownerId }) => {
  const previous = await target.model.findUnique({
    where: { [target.keyField]: key },
    select: { ...target.select, [target.hashField]: true, [target.ownerField]: true },
  });
  if (!previous) return null;

  const sameOwner = Number(previous[target.ownerField]) === Number(ownerId);
  if (!sameOwner || previous[target.hashField] !== hash) throw keyReused();

  return target.toResult(previous);
};

const isUniqueViolation = (err) => err?.code === "P2002";

/**
 * Ejecuta `execute(keyData)` una sola vez por clave.
 *
 *   target: {
 *     model,        // delegate de Prisma donde vive la clave (prisma.tbl_x)
 *     keyField,     // p. ej. "use_idempotency_key"
 *     hashField,    // p. ej. "use_idempotency_hash"
 *     ownerField,   // autor de la fila, p. ej. "use_create_by"
 *     select,       // campos que necesita toResult
 *     toResult,     // (fila) => la misma respuesta que devolvió la ejecución original
 *   }
 *   key:      el valor del encabezado Idempotency-Key (obligatorio)
 *   ownerId:  autor de la sesión (req.user)
 *   payload:  el contenido de la petición que define "la misma operación"
 *   execute:  (keyData) => la operación real; debe incluir `keyData` en la
 *             fila que crea, dentro de su transacción.
 *
 * La búsqueda va ANTES de todo, incluidas las validaciones de duplicado del
 * service: si no, el reintento de una creación que ya tuvo éxito respondería
 * "ya existe" en vez de devolver lo creado.
 */
export const runIdempotent = async ({ target, key, ownerId, payload, execute }) => {
  if (!key) throw idempotencyMisuse("falta la clave: la ruta debe exigir el encabezado Idempotency-Key");

  const hash = requestFingerprint(payload);
  const replay = await findReplay(target, { key, hash, ownerId });
  if (replay) return replay;

  try {
    return await execute({ [target.keyField]: key, [target.hashField]: hash });
  } catch (err) {
    // Otra petición con la misma clave ganó la carrera y ya confirmó: se
    // devuelve lo que creó. Si el UNIQUE que saltó es otro (p. ej. correo
    // duplicado), no hay fila con esta clave y se propaga el error original.
    if (!isUniqueViolation(err)) throw err;
    const winner = await findReplay(target, { key, hash, ownerId });
    if (winner) return winner;
    throw err;
  }
};
