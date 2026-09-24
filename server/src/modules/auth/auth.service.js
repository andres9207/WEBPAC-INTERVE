import {
  hashPassword,
  comparePassword,
} from "../../common/utils/funciones.js";
import { sendEmail } from "../../common/services/mailerService.js";
import { prisma } from "../../common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../../common/services/effectivePermissions.service.js";
import { revokeSession } from "../../common/services/session.service.js";
import {
  generateResetCode,
  hashResetCode,
  verifyResetCode,
} from "../../common/utils/resetCode.utils.js";

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

const registerFailedLogin = async (useId) => {
  const { lat_failed_count } = await prisma.tbl_login_attempts.upsert({
    where: { use_id: useId },
    create: { use_id: useId, lat_failed_count: 1, lat_last_failed_at: new Date() },
    update: { lat_failed_count: { increment: 1 }, lat_last_failed_at: new Date() },
    select: { lat_failed_count: true },
  });

  const lockMs = lockDurationFor(lat_failed_count);
  if (lockMs > 0) {
    await prisma.tbl_login_attempts.update({
      where: { use_id: useId },
      data: { lat_locked_until: new Date(Date.now() + lockMs) },
    });
  }
};

const clearFailedLogins = (useId) =>
  prisma.tbl_login_attempts.deleteMany({ where: { use_id: useId } });

export const login = async ({ usuario, clave, password }) => {
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
    throw loginFailed();
  }

  const matchPassword = userData.use_password
    ? await comparePassword(passwordTextoPlano, userData.use_password)
    : false;

  if (!matchPassword) {
    await registerFailedLogin(userData.use_id);
    throw loginFailed();
  }

  if (attempts) await clearFailedLogins(userData.use_id);

  // Unión de los permisos del perfil (plantilla) y las excepciones
  // individuales del usuario — ver effectivePermissions.service.js.
  const permissions = await getEffectivePermissionIds({
    useId: userData.use_id,
    proId: userData.pro_id,
  });

  const fullName = [userData.use_name, userData.use_last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

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

export const updateAccount = async ({ name, lastName, username, email, useId }) => {
  const result = await prisma.tbl_users.updateMany({
    where: { use_id: Number(useId) },
    data: { use_name: name, use_last_name: lastName, use_user: username, use_email: email },
  });

  if (result.count === 0) {
    const error = new Error("Error al actualizar la cuenta.");
    error.statusCode = 400;
    throw error;
  }

  // El access token lleva name/email y verifyToken exige que el email del
  // token coincida con el de la BD: el controller reemite el token con los
  // datos nuevos para que cambiar el propio correo no cierre la sesión.
  const updated = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: { use_id: true, use_name: true, use_email: true, pro_id: true },
  });

  return { useId: updated.use_id, name: updated.use_name, email: updated.use_email, proId: updated.pro_id };
};

export const updatePassword = async ({ currentPassword, newPassword, useId }) => {
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

  const result = await prisma.tbl_users.updateMany({
    where: { use_id: Number(useId) },
    data: { use_password: hash },
  });

  if (result.count === 0) {
    const error = new Error("Hubo un problema al cambiar tu contraseña.");
    error.statusCode = 400;
    throw error;
  }

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
const consumeResetAttempt = async ({ email, codeTemp }) => {
  const reset = await prisma.tbl_password_resets.findFirst({
    where: {
      par_created_at: { gte: new Date(Date.now() - RESET_CODE_TTL_MS) },
      tbl_users: { use_email: email, sta_id: 1 },
    },
    select: { par_id: true, use_id: true, par_code_hash: true },
  });

  if (!reset) throw invalidCode();

  const consumed = await prisma.tbl_password_resets.updateMany({
    where: { par_id: reset.par_id, par_attempts: { lt: RESET_CODE_MAX_ATTEMPTS } },
    data: { par_attempts: { increment: 1 } },
  });

  if (consumed.count === 0) {
    await prisma.tbl_password_resets.deleteMany({ where: { par_id: reset.par_id } });
    throw invalidCode();
  }

  if (!verifyResetCode({ code: codeTemp, useId: reset.use_id, hash: reset.par_code_hash })) {
    throw invalidCode();
  }

  return { usuarioID: reset.use_id };
};

export const validateCodePassword = async ({ email, codeTemp }) => {
  await consumeResetAttempt({ email, codeTemp });
};

export const restorePassword = async ({ email, nuevaContrasena, codeTemp }) => {
  const { usuarioID } = await consumeResetAttempt({ email, codeTemp });
  const hashedPassword = await hashPassword(nuevaContrasena);

  // Quien demuestra acceso al correo recupera la cuenta por completo: se
  // levanta un posible bloqueo por intentos fallidos de login.
  await prisma.$transaction([
    prisma.tbl_users.updateMany({
      where: { use_id: usuarioID },
      data: { use_password: hashedPassword },
    }),
    prisma.tbl_password_resets.deleteMany({ where: { use_id: usuarioID } }),
    prisma.tbl_login_attempts.deleteMany({ where: { use_id: usuarioID } }),
  ]);

  // Fuera de la transacción a propósito: también cierra los sockets de la
  // sesión, algo que no se puede deshacer con un rollback. Cualquier sesión
  // abierta (posiblemente la de quien tenía la contraseña anterior) cae.
  await revokeSession({ useId: usuarioID });
};

// Piso de duración para forgot_password: sin esto, la rama "cuenta existe"
// (dos escrituras en BD) sigue siendo más lenta que "no existe" (una
// lectura), y esa diferencia es medible remotamente con suficientes
// muestras aunque hoy sea de pocos milisegundos.
const FORGOT_PASSWORD_MIN_MS = 300;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const forgotPassword = async ({ email }) => {
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
    // invalida el anterior y reinicia intentos y vigencia.
    const resetData = {
      par_use_email: email,
      par_code_hash: hashResetCode({ code: codeTemp, useId: usuarioID }),
      par_attempts: 0,
      par_created_at: new Date(),
    };

    await prisma.tbl_password_resets.upsert({
      where: { use_id: usuarioID },
      create: { use_id: usuarioID, ...resetData },
      update: resetData,
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
