import {
  hashPassword,
  comparePassword,
} from "../../common/utils/funciones.js";
import { sendEmail } from "../../common/services/mailerService.js";
import { prisma } from "../../common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../../common/services/effectivePermissions.service.js";
import { revokeSession } from "../../common/services/session.service.js";
import { withLockedTransaction, withTransaction } from "../../common/services/transaction.service.js";
import {
  AUDIT_ENTITIES,
  AUDIT_OPERATIONS,
  REDACTED,
  diffFields,
  newOperationId,
  writeAudit,
  writeAuditEvent,
} from "../../common/services/audit.service.js";
import {
  generateResetCode,
  hashResetCode,
  verifyResetCode,
} from "../../common/utils/resetCode.utils.js";
import { userFullName } from "../../common/utils/user.utils.js";

// ── Bloqueo por intentos fallidos de login (por cuenta) ─────────────────────
// Complementa el rate limit por IP (authRateLimit), que se esquiva rotando
// IPs. Cada LOCK_EVERY fallos consecutivos la cuenta se bloquea, y cada
// bloqueo dura el doble que el anterior (15m, 30m, 1h, ...) hasta
// LOCK_MAX_MS. Un login exitoso o restaurar la contraseña reinician el
// contador. Ver database/migrations/0009_create_login_attempts.sql.
const LOCK_EVERY = 5;
const LOCK_BASE_MS = 15 * 60 * 1000;
const LOCK_MAX_MS = 24 * 60 * 60 * 1000;

// Mismo mensaje para usuario inexistente, contraseña incorrecta y cuenta
// bloqueada: distinguirlos permitiría averiguar qué cuentas existen.
const LOGIN_FAILED_MESSAGE =
  "Credenciales incorrectas. Tras varios intentos fallidos la cuenta se bloquea temporalmente.";

// Hash bcrypt de relleno: cuando el usuario no existe se compara igual contra
// este valor, para que esa rama tarde lo mismo que una contraseña incorrecta
// (sin esto, la diferencia de tiempo delata qué usuarios existen).
const DUMMY_PASSWORD_HASH = "$2b$10$ZDe4JB2rJnuJZbnHIZdfzOBwyrMa6nKuxsLqF5nZTjrThMwFBQoji";

const loginFailed = () => {
  const error = new Error(LOGIN_FAILED_MESSAGE);
  error.statusCode = 403;
  return error;
};

export const lockDurationFor = (failedCount) => {
  if (failedCount < LOCK_EVERY || failedCount % LOCK_EVERY !== 0) return 0;
  const level = failedCount / LOCK_EVERY - 1;
  return Math.min(LOCK_BASE_MS * 2 ** level, LOCK_MAX_MS);
};

// Eventos de login: el actor es anónimo (todavía no hay sesión), así que
// use_id queda NULL y el usuario afectado va en aud_record_id. Nunca se
// registra el identificador ni la contraseña tecleados: un usuario que
// escribe su contraseña en el campo de usuario la dejaría en la bitácora.
const anonymous = (ctx) => ({ useId: null, ip: ctx?.ip ?? null });

const registerFailedLogin = async (useId, ctx) =>
  withTransaction(async (tx) => {
    const { lat_failed_count } = await tx.tbl_login_attempts.upsert({
      where: { use_id: useId },
      create: { use_id: useId, lat_failed_count: 1, lat_last_failed_at: new Date() },
      update: { lat_failed_count: { increment: 1 }, lat_last_failed_at: new Date() },
      select: { lat_failed_count: true },
    });

    const operationId = newOperationId();
    await writeAudit(tx, {
      operationId,
      entity: AUDIT_ENTITIES.USER,
      recordId: useId,
      operation: AUDIT_OPERATIONS.LOGIN_FAILED,
      ctx: anonymous(ctx),
      changes: [{ field: "intentos_fallidos", oldValue: lat_failed_count - 1, newValue: lat_failed_count }],
    });

    const lockMs = lockDurationFor(lat_failed_count);
    if (lockMs > 0) {
      const lockedUntil = new Date(Date.now() + lockMs);
      await tx.tbl_login_attempts.update({
        where: { use_id: useId },
        data: { lat_locked_until: lockedUntil },
      });
      await writeAudit(tx, {
        operationId,
        entity: AUDIT_ENTITIES.USER,
        recordId: useId,
        operation: AUDIT_OPERATIONS.ACCOUNT_LOCKED,
        ctx: anonymous(ctx),
        changes: [{ field: "bloqueada_hasta", oldValue: null, newValue: lockedUntil }],
      });
    }
  });

const clearFailedLogins = (useId) =>
  prisma.tbl_login_attempts.deleteMany({ where: { use_id: useId } });

export const login = async ({ usuario, clave, password, ctx = {} }) => {
  const passwordTextoPlano = clave || password;

  if (!passwordTextoPlano) {
    const error = new Error("La contraseña es requerida.");
    error.statusCode = 400;
    throw error;
  }

  const userData = await prisma.tbl_users.findFirst({
    where: {
      sta_id: 1,
      OR: [{ use_email: usuario }, { use_user: usuario }],
    },
    select: {
      use_id: true,
      use_user: true,
      use_password: true,
      use_name: true,
      use_last_name: true,
      use_email: true,
      pro_id: true,
      tbl_profiles: { select: { pro_name: true } },
    },
  });

  if (!userData) {
    await comparePassword(passwordTextoPlano, DUMMY_PASSWORD_HASH);
    // Sin registro afectado: solo queda constancia del intento y su IP.
    await writeAuditEvent({
      entity: AUDIT_ENTITIES.USER,
      operation: AUDIT_OPERATIONS.LOGIN_FAILED,
      ctx: anonymous(ctx),
      changes: [{ field: "motivo", newValue: "usuario inexistente o inactivo" }],
    });
    throw loginFailed();
  }

  const attempts = await prisma.tbl_login_attempts.findUnique({
    where: { use_id: userData.use_id },
    select: { lat_locked_until: true },
  });

  // Cuenta bloqueada: se rechaza sin siquiera comparar la contraseña (ni
  // una contraseña correcta entra mientras dure el bloqueo) y sin sumar
  // otro fallo, para que el bloqueo no se extienda solo con reintentos.
  if (attempts?.lat_locked_until && attempts.lat_locked_until.getTime() > Date.now()) {
    await writeAuditEvent({
      entity: AUDIT_ENTITIES.USER,
      recordId: userData.use_id,
      operation: AUDIT_OPERATIONS.LOGIN_FAILED,
      ctx: anonymous(ctx),
      changes: [{ field: "motivo", newValue: "cuenta bloqueada" }],
    });
    throw loginFailed();
  }

  const matchPassword = userData.use_password
    ? await comparePassword(passwordTextoPlano, userData.use_password)
    : false;

  if (!matchPassword) {
    await registerFailedLogin(userData.use_id, ctx);
    throw loginFailed();
  }

  if (attempts) await clearFailedLogins(userData.use_id);

  // Unión de los permisos del perfil (plantilla) y las excepciones
  // individuales del usuario — ver effectivePermissions.service.js.
  const permissions = await getEffectivePermissionIds({
    useId: userData.use_id,
    proId: userData.pro_id,
  });

  const fullName = userFullName(userData) ?? "";

  // La sesión (tbl_sessions + cookies) la abre el controller con estos
  // datos: el service no conoce la request (IP, user-agent) ni la respuesta.
  return {
    sessionUser: {
      useId: userData.use_id,
      name: userData.use_name,
      email: userData.use_email,
      proId: userData.pro_id,
    },
    useId: userData.use_id,
    username: userData.use_user,
    fullName,
    email: userData.use_email,
    proId: userData.pro_id,
    profileName: userData.tbl_profiles?.pro_name ?? null,
    permissions,
  };
};

export const getBasicInformation = async ({ useId }) => {
  const user = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: { use_name: true, use_last_name: true, use_user: true, use_email: true },
  });

  if (!user) return undefined;

  return {
    name: user.use_name,
    lastName: user.use_last_name,
    username: user.use_user,
    email: user.use_email,
  };
};

const ACCOUNT_FIELDS = ["use_name", "use_last_name", "use_user", "use_email"];

export const updateAccount = async ({ name, lastName, username, email, useId, ctx = { useId } }) =>
  withLockedTransaction({ USUARIO: useId }, async (tx) => {
    const before = await tx.tbl_users.findUnique({
      where: { use_id: Number(useId) },
      select: { use_id: true, use_name: true, use_last_name: true, use_user: true, use_email: true, pro_id: true },
    });

    if (!before) {
      const error = new Error("Error al actualizar la cuenta.");
      error.statusCode = 400;
      throw error;
    }

    // Autoedición: el autor de la modificación es el propio usuario.
    const data = { use_name: name, use_last_name: lastName, use_user: username, use_email: email };
    await tx.tbl_users.update({
      where: { use_id: Number(useId) },
      data: { ...data, use_update_by: Number(useId) },
    });

    const changes = diffFields(before, data, ACCOUNT_FIELDS);
    if (changes.length > 0) {
      await writeAudit(tx, {
        entity: AUDIT_ENTITIES.USER,
        recordId: useId,
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes,
      });
    }

    // El access token lleva name/email y verifyToken exige que el email del
    // token coincida con el de la BD: el controller reemite el token con los
    // datos nuevos para que cambiar el propio correo no cierre la sesión.
    return { useId: before.use_id, name, email, proId: before.pro_id };
  });

export const updatePassword = async ({ currentPassword, newPassword, useId, ctx = { useId } }) => {
  const user = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: { use_id: true, use_name: true, use_email: true, pro_id: true, use_password: true },
  });

  if (!user) {
    const error = new Error("Usuario no encontrado.");
    error.statusCode = 404;
    throw error;
  }

  const match = await comparePassword(currentPassword, user.use_password);

  if (!match) {
    const error = new Error(
      "Contraseña incorrecta, por favor valida nuevamente."
    );
    error.statusCode = 400;
    throw error;
  }

  const hash = await hashPassword(newPassword);

  // bcrypt (compare + hash) queda FUERA de la transacción a propósito: tarda
  // decenas de ms y no debe retener el bloqueo (ADR-0027, decisión 9). A
  // cambio, el update se condiciona al hash que se verificó: si otra petición
  // cambió la contraseña en medio, no se pisa ese cambio.
  await withLockedTransaction({ USUARIO: useId }, async (tx) => {
    const result = await tx.tbl_users.updateMany({
      where: { use_id: Number(useId), use_password: user.use_password },
      data: { use_password: hash, use_update_by: Number(useId) },
    });

    if (result.count === 0) {
      const error = new Error("Tu contraseña cambió mientras se procesaba la solicitud. Intenta de nuevo.");
      error.statusCode = 409;
      throw error;
    }

    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.USER,
      recordId: useId,
      operation: AUDIT_OPERATIONS.PASSWORD_CHANGED,
      ctx,
      changes: [{ field: "use_password", oldValue: REDACTED, newValue: REDACTED }],
    });
  });

  // El controller abre una sesión nueva con estos datos: cambiar la
  // contraseña rota la sesión, así que cualquier copia robada del token o
  // del refresh token anterior deja de servir.
  return { useId: user.use_id, name: user.use_name, email: user.use_email, proId: user.pro_id };
};

export const getWindowsByProfile = async ({ proId }) => {
  // pag_id: { not: null } reproduce el INNER JOIN original (excluye filas
  // sin página asociada), ya que la relación en Prisma es opcional.
  const rows = await prisma.tbl_page_permissions.findMany({
    where: { pro_id: Number(proId), pag_id: { not: null } },
    select: { tbl_pages: { select: { pag_id: true, pag_description: true } } },
  });

  return rows.map((r) => ({
    pagId: r.tbl_pages.pag_id,
    description: r.tbl_pages.pag_description,
  }));
};

const RESET_CODE_TTL_MS = 15 * 60 * 1000;
// Intentos por código: con 900.000 combinaciones, 5 intentos dan una
// probabilidad de acierto por fuerza bruta de ~1 en 180.000 por código
// solicitado (y cada solicitud nueva exige acceso al correo para leerlo).
export const RESET_CODE_MAX_ATTEMPTS = 5;

const invalidCode = () => {
  const error = new Error("Código incorrecto o vencido. Si agotaste los intentos, solicita uno nuevo.");
  error.statusCode = 400;
  return error;
};

/**
 * Identifica la solicitud de reset por email + código (los dos únicos datos
 * que legítimamente conoce quien tiene acceso al correo), nunca por un token
 * que hubiera viajado por la respuesta HTTP.
 *
 * Cada verificación consume un intento ANTES de comparar el código, con un
 * incremento condicionado (par_attempts < máximo): así, peticiones en
 * paralelo no pueden probar más códigos que el límite, aunque lean la fila
 * al mismo tiempo. Agotados los intentos, el código se invalida aunque no
 * haya vencido.
 */
const consumeResetAttempt = async ({ email, codeTemp, ctx }) => {
  const reset = await prisma.tbl_password_resets.findFirst({
    where: {
      par_create_at: { gte: new Date(Date.now() - RESET_CODE_TTL_MS) },
      tbl_users: { use_email: email, sta_id: 1 },
    },
    select: { par_id: true, use_id: true, par_code_hash: true },
  });

  if (!reset) throw invalidCode();

  // El intento consumido y su registro en la bitácora van juntos. La
  // transacción no lanza en los casos de fallo (eso revertiría el intento
  // consumido): devuelve el resultado y se lanza después de confirmarla.
  const outcome = await withTransaction(async (tx) => {
    const failed = (motivo) =>
      writeAudit(tx, {
        entity: AUDIT_ENTITIES.USER,
        recordId: reset.use_id,
        operation: AUDIT_OPERATIONS.PASSWORD_RESET_CODE_FAILED,
        ctx: anonymous(ctx),
        changes: [{ field: "motivo", newValue: motivo }],
      });

    const consumed = await tx.tbl_password_resets.updateMany({
      where: { par_id: reset.par_id, par_attempts: { lt: RESET_CODE_MAX_ATTEMPTS } },
      data: { par_attempts: { increment: 1 } },
    });

    if (consumed.count === 0) {
      await tx.tbl_password_resets.deleteMany({ where: { par_id: reset.par_id } });
      await failed("intentos agotados");
      return false;
    }

    if (!verifyResetCode({ code: codeTemp, useId: reset.use_id, hash: reset.par_code_hash })) {
      await failed("código incorrecto");
      return false;
    }

    return true;
  });

  if (!outcome) throw invalidCode();

  return { usuarioID: reset.use_id };
};

export const validateCodePassword = async ({ email, codeTemp, ctx = {} }) => {
  await consumeResetAttempt({ email, codeTemp, ctx });
};

export const restorePassword = async ({ email, nuevaContrasena, codeTemp, ctx = {} }) => {
  const { usuarioID } = await consumeResetAttempt({ email, codeTemp, ctx });
  const hashedPassword = await hashPassword(nuevaContrasena);

  // Quien demuestra acceso al correo recupera la cuenta por completo: se
  // levanta un posible bloqueo por intentos fallidos de login. El autor es
  // el propio usuario (demostró ser el dueño del correo), aunque no tenga
  // sesión.
  await withTransaction(async (tx) => {
    await tx.tbl_users.updateMany({
      where: { use_id: usuarioID },
      data: { use_password: hashedPassword, use_update_by: usuarioID },
    });
    await tx.tbl_password_resets.deleteMany({ where: { use_id: usuarioID } });
    await tx.tbl_login_attempts.deleteMany({ where: { use_id: usuarioID } });
    await writeAudit(tx, {
      entity: AUDIT_ENTITIES.USER,
      recordId: usuarioID,
      operation: AUDIT_OPERATIONS.PASSWORD_RESET,
      ctx: { useId: usuarioID, ip: ctx.ip },
      changes: [{ field: "use_password", oldValue: REDACTED, newValue: REDACTED }],
    });
  });

  // Fuera de la transacción a propósito: también cierra los sockets de la
  // sesión, algo que no se puede deshacer con un rollback. Cualquier sesión
  // abierta (posiblemente la de quien tenía la contraseña anterior) cae, y
  // queda en la bitácora si había una.
  await revokeSession({
    useId: usuarioID,
    audit: {
      operation: AUDIT_OPERATIONS.SESSION_REVOKED,
      ctx: { useId: usuarioID, ip: ctx.ip },
      reason: "contraseña restaurada",
    },
  });
};

// Piso de duración para forgot_password: sin esto, la rama "cuenta existe"
// (dos escrituras en BD) sigue siendo más lenta que "no existe" (una
// lectura), y esa diferencia es medible remotamente con suficientes
// muestras aunque hoy sea de pocos milisegundos.
const FORGOT_PASSWORD_MIN_MS = 300;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const forgotPassword = async ({ email, ctx = {} }) => {
  if (!email) {
    const error = new Error("El correo es requerido.");
    error.statusCode = 400;
    throw error;
  }

  const start = Date.now();

  const user = await prisma.tbl_users.findFirst({
    where: { use_email: email, sta_id: 1 },
    select: { use_id: true, use_name: true },
  });

  // Respuesta idéntica exista o no la cuenta: revelar la diferencia (404 vs
  // 200, o el tiempo de respuesta) permite enumerar qué correos están
  // registrados. Si no existe (o no está activa), no se genera ni se envía
  // nada.
  if (user) {
    const usuarioID = user.use_id;
    const name = user.use_name;
    const codeTemp = generateResetCode();

    // Upsert sobre UNIQUE(use_id): un solo código vigente por usuario y en
    // una sola sentencia (antes era DELETE + INSERT sin transacción: una
    // falla entre ambas dejaba al usuario sin código). Un código nuevo
    // invalida el anterior y reinicia intentos y vigencia: par_create_at es
    // la creación del código VIGENTE, por eso también se reescribe en el
    // update. par_create_by/par_update_by quedan NULL: la solicitud es sin
    // sesión y no tiene autor verificable (migración 0015).
    const resetData = {
      par_use_email: email,
      par_code_hash: hashResetCode({ code: codeTemp, useId: usuarioID }),
      par_attempts: 0,
      par_create_at: new Date(),
    };

    await withTransaction(async (tx) => {
      await tx.tbl_password_resets.upsert({
        where: { use_id: usuarioID },
        create: { use_id: usuarioID, ...resetData },
        update: resetData,
      });
      // Solo cuando la cuenta existe: registrar también los correos
      // inexistentes guardaría en la bitácora texto arbitrario del cliente.
      await writeAudit(tx, {
        entity: AUDIT_ENTITIES.USER,
        recordId: usuarioID,
        operation: AUDIT_OPERATIONS.PASSWORD_RESET_REQUESTED,
        ctx: anonymous(ctx),
      });
    });

    // No esperar el envío: un SMTP real tarda de milisegundos a varios
    // segundos según la red, y bloquear la respuesta en eso sería una fuga
    // de temporización mucho peor que la que se está cerrando acá. Además,
    // si el envío falla, no debe cambiar la respuesta (antes un fallo de
    // correo solo daba 500 cuando la cuenta SÍ existía — otra forma de
    // filtrar su existencia).
    sendEmail({
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
          <h2>Hola, ${name}</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Tu código de verificación es:</p>
          <h1 style="letter-spacing: 8px; color: #5e35b1;">${codeTemp}</h1>
          <p>Este código expira en <strong>15 minutos</strong>.</p>
          <p>Si no solicitaste esto, ignora este correo.</p>
        </div>
      `,
    }).catch((err) => {
      console.error("[forgotPassword] Error al enviar el correo de recuperación:", err.message);
    });
  }

  const elapsed = Date.now() - start;
  if (elapsed < FORGOT_PASSWORD_MIN_MS) {
    await sleep(FORGOT_PASSWORD_MIN_MS - elapsed);
  }
};
