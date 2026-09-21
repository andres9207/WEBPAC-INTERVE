import jwt from "jsonwebtoken";
import {
  hashPassword,
  comparePassword,
} from "../../common/utils/funciones.js";
import { sendEmail } from "../../common/services/mailerService.js";
import { prisma } from "../../common/configs/prismaClient.js";
import { getEffectivePermissionIds } from "../../common/services/effectivePermissions.service.js";

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
    const error = new Error("Credenciales incorrectas.");
    error.statusCode = 403;
    throw error;
  }

  const matchPassword = await comparePassword(
    passwordTextoPlano,
    userData.use_password
  );

  if (!matchPassword) {
    const error = new Error("Credenciales incorrectas.");
    error.statusCode = 403;
    throw error;
  }

  // Unión de los permisos del perfil (plantilla) y las excepciones
  // individuales del usuario — ver effectivePermissions.service.js.
  const permissions = await getEffectivePermissionIds({
    useId: userData.use_id,
    proId: userData.pro_id,
  });

  const token = jwt.sign(
    {
      useId: userData.use_id,
      name: userData.use_name,
      email: userData.use_email,
      proId: userData.pro_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const fullName = [userData.use_name, userData.use_last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    token,
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
};

export const updatePassword = async ({ currentPassword, newPassword, useId }) => {
  const user = await prisma.tbl_users.findUnique({
    where: { use_id: Number(useId) },
    select: { use_password: true },
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

/**
 * Identifica la solicitud de reset por email + código (los dos únicos datos
 * que legítimamente conoce quien tiene acceso al correo), nunca por un token
 * que hubiera viajado por la respuesta HTTP.
 */
const findValidPasswordReset = async ({ email, codeTemp }) => {
  const reset = await prisma.tbl_password_resets.findFirst({
    where: {
      par_code_temp: parseInt(codeTemp),
      par_created_at: { gte: new Date(Date.now() - 15 * 60 * 1000) },
      tbl_users: { use_email: email },
    },
    select: { use_id: true },
  });

  return reset ? { usuarioID: reset.use_id } : null;
};

export const validateCodePassword = async ({ email, codeTemp }) => {
  const reset = await findValidPasswordReset({ email, codeTemp });

  if (!reset) {
    const error = new Error("Código Incorrecto.");
    error.statusCode = 400;
    throw error;
  }
};

export const restorePassword = async ({ email, nuevaContrasena, codeTemp }) => {
  const reset = await findValidPasswordReset({ email, codeTemp });

  if (!reset) {
    const error = new Error("Código Temporal Incorrecto.");
    error.statusCode = 400;
    throw error;
  }

  const { usuarioID } = reset;
  const hashedPassword = await hashPassword(nuevaContrasena);

  await prisma.$transaction([
    prisma.tbl_users.updateMany({
      where: { use_id: usuarioID },
      data: { use_password: hashedPassword },
    }),
    prisma.tbl_password_resets.deleteMany({ where: { use_id: usuarioID } }),
  ]);
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

  const user = await prisma.tbl_users.findUnique({
    where: { use_email: email },
    select: { use_id: true, use_name: true },
  });

  // Respuesta idéntica exista o no la cuenta: revelar la diferencia (404 vs
  // 200, o el tiempo de respuesta) permite enumerar qué correos están
  // registrados. Si no existe, no se genera ni se envía nada.
  if (user) {
    const usuarioID = user.use_id;
    const name = user.use_name;
    const codeTemp = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign(
      { usuarioID },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await prisma.tbl_password_resets.deleteMany({ where: { use_id: usuarioID } });

    await prisma.tbl_password_resets.create({
      data: {
        use_id: usuarioID,
        par_use_email: email,
        par_token: token,
        par_code_temp: codeTemp,
      },
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
