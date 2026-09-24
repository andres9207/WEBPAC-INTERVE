import crypto from "crypto";

/**
 * Código de recuperación de contraseña (ADR-0001, B8).
 *
 * - Se genera con crypto.randomInt (CSPRNG), no con Math.random().
 * - Nunca se guarda en claro: tbl_password_resets.par_code_hash guarda un
 *   HMAC-SHA256 del código atado al use_id. Un hash plano (SHA-256 del código)
 *   no serviría: con solo 900.000 combinaciones, quien lea la tabla lo
 *   invierte en milisegundos. El HMAC exige además la clave del servidor,
 *   que no vive en la BD.
 * - La clave se deriva de JWT_SECRET con una etiqueta propia, para que el
 *   mismo secreto no firme dos cosas distintas con el mismo material.
 */

const deriveKey = () =>
  crypto.createHmac("sha256", process.env.JWT_SECRET).update("password-reset-code:v1").digest();

export const generateResetCode = () => crypto.randomInt(100000, 1000000);

export const hashResetCode = ({ code, useId }) =>
  crypto.createHmac("sha256", deriveKey()).update(`${useId}:${String(code).trim()}`).digest("hex");

export const verifyResetCode = ({ code, useId, hash }) => {
  if (!hash) return false;
  const expected = Buffer.from(hashResetCode({ code, useId }), "hex");
  const actual = Buffer.from(hash, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
};
