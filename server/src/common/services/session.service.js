import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../configs/prismaClient.js";
import { getIO } from "../configs/socket.manager.js";

/**
 * Sesiones de usuario (ADR-0001, B14) — tbl_sessions.
 *
 * - Access token: JWT corto (JWT_EXPIRES_IN, 15m por defecto) en la cookie
 *   httpOnly `token`. Lleva `sid` = tbl_sessions.ses_key, y verifyToken exige
 *   que esa sesión siga viva: revocar la fila invalida el access token en la
 *   siguiente petición, sin esperar a que venza.
 * - Refresh token: valor opaco aleatorio (32 bytes) en la cookie httpOnly
 *   `refresh_token`, válido durante JWT_REFRESH_EXPIRES_IN ("7d" por defecto).
 *   En BD solo se guarda su SHA-256 (es de alta entropía, no necesita
 *   bcrypt/HMAC como el código de 6 dígitos). Se rota en cada uso.
 * - Sesión única por usuario: UNIQUE(use_id). Un login nuevo reemplaza la
 *   fila con un ses_key nuevo, así que la sesión anterior (otro dispositivo,
 *   otra pestaña, un token robado) queda fuera de inmediato.
 */

export const ACCESS_COOKIE_NAME = "token";
export const REFRESH_COOKIE_NAME = "refresh_token";

const DEFAULT_REFRESH_TTL = "7d";

const DURATION_UNITS_MS = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };

/**
 * Convierte una duración con el mismo formato que JWT_EXPIRES_IN ("15m",
 * "12h", "7d"; un número solo = segundos, como en jsonwebtoken) a
 * milisegundos. El refresh token es opaco, no un JWT, así que no hay una
 * librería que la interprete: su vencimiento se calcula aquí para la fila de
 * tbl_sessions y el maxAge de la cookie. Un valor inválido lanza al arrancar,
 * en vez de dejar sesiones con una vida inesperada.
 */
export const parseDuration = (value) => {
  const match = /^\s*(\d+)\s*([smhd]?)\s*$/i.exec(String(value));
  if (!match || Number(match[1]) <= 0) {
    throw new Error(
      `Duración inválida para JWT_REFRESH_EXPIRES_IN: "${value}". Usa un número seguido de s, m, h o d (p. ej. "7d").`
    );
  }
  const unit = (match[2] || "s").toLowerCase();
  return Number(match[1]) * DURATION_UNITS_MS[unit];
};

const ACCESS_TOKEN_TTL = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_MS = parseDuration(process.env.JWT_REFRESH_EXPIRES_IN || DEFAULT_REFRESH_TTL);

// Dos pestañas que renuevan a la vez: la segunda llega con el refresh token
// que la primera acaba de rotar. Dentro de esta ventana no se trata como
// robo: se le entrega un access token nuevo sin volver a rotar (la cookie
// refresh_token ya nueva la comparten ambas pestañas).
const ROTATION_GRACE_MS = 30 * 1000;

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  path: "/",
};

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const newRefreshToken = () => crypto.randomBytes(32).toString("base64url");
const refreshExpiry = () => new Date(Date.now() + REFRESH_TOKEN_MS);

const sessionError = (message = "Sesión inválida o expirada.") => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

/** Desconecta los sockets de una sesión revocada (sala `session:<ses_key>`). */
const disconnectSessionSockets = (sessionKey) => {
  if (!sessionKey) return;
  try {
    getIO().in(`session:${sessionKey}`).disconnectSockets(true);
  } catch {
    // Socket.IO no inicializado (tests, scripts): no hay nada que cerrar.
  }
};

export const signAccessToken = ({ useId, name, email, proId, sessionKey }) =>
  jwt.sign({ useId, name, email, proId, sid: sessionKey }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });

export const setSessionCookies = (res, { accessToken, refreshToken }) => {
  if (accessToken) {
    res.cookie(ACCESS_COOKIE_NAME, accessToken, baseCookieOptions);
  }
  if (refreshToken) {
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, { ...baseCookieOptions, maxAge: REFRESH_TOKEN_MS });
  }
};

export const clearSessionCookies = (res) => {
  res.clearCookie(ACCESS_COOKIE_NAME, baseCookieOptions);
  res.clearCookie(REFRESH_COOKIE_NAME, baseCookieOptions);
};

/**
 * Abre la sesión del usuario, reemplazando cualquier sesión anterior
 * (política de sesión única). Devuelve el access token y el refresh token
 * en claro — este último solo existe aquí y en la cookie.
 */
export const createSession = async ({ user, ip, userAgent }) => {
  const sessionKey = crypto.randomUUID();
  const refreshToken = newRefreshToken();

  const data = {
    ses_key: sessionKey,
    ses_refresh_hash: sha256(refreshToken),
    ses_prev_refresh_hash: null,
    ses_rotated_at: null,
    ses_expires_at: refreshExpiry(),
    ses_ip: ip?.slice(0, 45) ?? null,
    ses_user_agent: userAgent?.slice(0, 255) ?? null,
    ses_create_at: new Date(),
  };

  const previous = await prisma.tbl_sessions.findUnique({
    where: { use_id: user.useId },
    select: { ses_key: true },
  });

  await prisma.tbl_sessions.upsert({
    where: { use_id: user.useId },
    create: { use_id: user.useId, ...data },
    update: data,
  });

  disconnectSessionSockets(previous?.ses_key);

  return {
    sessionKey,
    refreshToken,
    accessToken: signAccessToken({ ...user, sessionKey }),
  };
};

const SESSION_USER_SELECT = {
  use_id: true,
  use_name: true,
  use_email: true,
  pro_id: true,
  sta_id: true,
};

const toTokenUser = (u) => ({ useId: u.use_id, name: u.use_name, email: u.use_email, proId: u.pro_id });

/**
 * Renueva la sesión a partir del refresh token de la cookie. Rota el refresh
 * token (el anterior deja de servir) y emite un access token nuevo.
 *
 * - Token desconocido → 401.
 * - Token ya rotado, dentro de la ventana de gracia → access token nuevo, sin
 *   rotar (pestañas concurrentes).
 * - Token ya rotado, fuera de la ventana → reutilización: se revoca la
 *   sesión completa (alguien más tenía ese token) y 401.
 * - Sesión vencida o usuario no activo → se revoca y 401.
 */
export const refreshSession = async ({ refreshToken }) => {
  if (!refreshToken) throw sessionError();

  const hash = sha256(refreshToken);
  const now = Date.now();

  const session = await prisma.tbl_sessions.findUnique({
    where: { ses_refresh_hash: hash },
    select: { ses_id: true, ses_key: true, ses_expires_at: true, tbl_users: { select: SESSION_USER_SELECT } },
  });

  if (!session) {
    const reused = await prisma.tbl_sessions.findFirst({
      where: { ses_prev_refresh_hash: hash },
      select: {
        ses_id: true,
        ses_key: true,
        ses_rotated_at: true,
        ses_expires_at: true,
        tbl_users: { select: SESSION_USER_SELECT },
      },
    });

    if (!reused) throw sessionError();

    const withinGrace = reused.ses_rotated_at && now - reused.ses_rotated_at.getTime() <= ROTATION_GRACE_MS;
    const usable = reused.ses_expires_at.getTime() > now && reused.tbl_users.sta_id === 1;

    if (withinGrace && usable) {
      return {
        accessToken: signAccessToken({ ...toTokenUser(reused.tbl_users), sessionKey: reused.ses_key }),
        refreshToken: null,
      };
    }

    await revokeSession({ useId: reused.tbl_users.use_id });
    throw sessionError();
  }

  if (session.ses_expires_at.getTime() <= now || session.tbl_users.sta_id !== 1) {
    await revokeSession({ useId: session.tbl_users.use_id });
    throw sessionError();
  }

  const nextRefreshToken = newRefreshToken();

  // Condicionado al hash actual: si otra petición rotó entre la lectura y
  // esta escritura, count = 0 y esta petición cae en la rama de gracia en
  // su próximo intento en vez de pisar la rotación ajena.
  const rotated = await prisma.tbl_sessions.updateMany({
    where: { ses_id: session.ses_id, ses_refresh_hash: hash },
    data: {
      ses_refresh_hash: sha256(nextRefreshToken),
      ses_prev_refresh_hash: hash,
      ses_rotated_at: new Date(now),
      ses_expires_at: refreshExpiry(),
    },
  });

  if (rotated.count === 0) throw sessionError();

  return {
    accessToken: signAccessToken({ ...toTokenUser(session.tbl_users), sessionKey: session.ses_key }),
    refreshToken: nextRefreshToken,
  };
};

/** Cierra la sesión del usuario (logout, cambio/restauración de contraseña, desactivación). */
export const revokeSession = async ({ useId }) => {
  if (!useId) return;
  const previous = await prisma.tbl_sessions.findUnique({
    where: { use_id: Number(useId) },
    select: { ses_key: true },
  });
  if (!previous) return;

  await prisma.tbl_sessions.deleteMany({ where: { use_id: Number(useId) } });
  disconnectSessionSockets(previous.ses_key);
};

/**
 * Cierra la sesión solo si sigue siendo la del token presentado (mismo
 * ses_key). Un access token viejo —de una sesión ya reemplazada— no debe
 * poder cerrar la sesión vigente del usuario.
 */
export const revokeSessionByKey = async ({ useId, sessionKey }) => {
  if (!useId || !sessionKey) return;
  const current = await prisma.tbl_sessions.findFirst({
    where: { use_id: Number(useId), ses_key: sessionKey },
    select: { use_id: true },
  });
  if (current) await revokeSession({ useId: current.use_id });
};

/** Cierra la sesión dueña de un refresh token (logout sin access token vigente). */
export const revokeSessionByRefreshToken = async ({ refreshToken }) => {
  if (!refreshToken) return;
  const session = await prisma.tbl_sessions.findUnique({
    where: { ses_refresh_hash: sha256(refreshToken) },
    select: { use_id: true },
  });
  if (session) await revokeSession({ useId: session.use_id });
};

/**
 * ¿Sigue viva la sesión de este access token? La usan verifyToken y el
 * handshake de Socket.IO: sesión existente con ese ses_key, no vencida, y
 * usuario activo (sta_id = 1) con el mismo correo que firmó el token.
 */
export const isSessionActive = async ({ sid, useId, email }) => {
  if (!sid || !useId) return false;
  const session = await prisma.tbl_sessions.findFirst({
    where: {
      ses_key: sid,
      use_id: useId,
      ses_expires_at: { gt: new Date() },
      tbl_users: { use_email: email, sta_id: 1 },
    },
    select: { ses_id: true },
  });
  return !!session;
};
