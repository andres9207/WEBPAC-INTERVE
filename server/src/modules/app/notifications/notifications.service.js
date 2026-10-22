import { prisma } from '../../../common/configs/prismaClient.js';
import { paginate } from '../../../common/utils/pagination.utils.js';
import { getIO } from '../../../common/configs/socket.manager.js';
import { isUniqueViolation } from '../../../common/utils/dbErrors.utils.js';

/**
 * Notificaciones de la obra del alcance (DEC-072): la campana muestra las de
 * la obra elegida en el encabezado más las que no son de ninguna obra (p. ej.
 * las conciliaciones); con "Ver todo", todas; sin obra válida, solo las de
 * ninguna obra. Siempre del usuario de la sesión.
 */
const scopeWhere = (scope) => {
  if (!scope || scope.all) return {};
  if (scope.wrkId) return { OR: [{ wrk_id: Number(scope.wrkId) }, { wrk_id: null }] };
  return { wrk_id: null };
};

const ownWhere = (userId, scope) => ({ use_id: Number(userId), ...scopeWhere(scope) });

export const getNotificationCount = async ({ userId, scope }) => {
  return prisma.tbl_notifications.count({
    where: { ...ownWhere(userId, scope), not_is_read: false },
  });
};

export const listNotifications = async ({ userId, scope, page = 1, limit = 10 }) => {
  if (!userId) {
    throw new Error('Parámetros no válidos');
  }

  // Prisma deserializa la columna JSON `not_data` solo, no requiere el
  // JSON.parse manual que hacía falta con el resultado crudo de mysql2.
  return paginate(
    prisma.tbl_notifications,
    { where: ownWhere(userId, scope), orderBy: { not_created_at: 'desc' } },
    { page, limit }
  );
};

// Marca las que el usuario está viendo: las de la obra del alcance.
export const markAllAsRead = async ({ userId, scope }) => {
  await prisma.tbl_notifications.updateMany({
    where: { ...ownWhere(userId, scope), not_is_read: false },
    data: { not_is_read: true, not_read_at: new Date(), not_updated_at: new Date() },
  });
};

export const markAsRead = async ({ notificationId, userId }) => {
  // updateMany (no update): igual que el UPDATE original de mysql2, no lanza
  // error si el ID no existe, solo no afecta ninguna fila. El filtro por
  // use_id evita marcar como leída una notificación de otro usuario (antes
  // solo filtraba por not_id, sin validar dueño — ver engineering/anti-patterns/SECURITY.md).
  await prisma.tbl_notifications.updateMany({
    where: { not_id: Number(notificationId), use_id: Number(userId) },
    data: { not_is_read: true, not_read_at: new Date(), not_updated_at: new Date() },
  });
};

/**
 * - `wrkId`: obra de la notificación, para la campana por obra (DEC-072).
 * - `key`: aviso que se da una sola vez por usuario (uq_notifications_user_key).
 *   Si ya existe, no se crea otro y devuelve null, sin registrarlo como error.
 */
export const insertNotification = async ({
  userId,
  priority = 'medium',
  title,
  message,
  type = 'info',
  module = null,
  action = null,
  data = null,
  wrkId = null,
  key = null,
  tx = prisma,
}) => {
  if (!userId) return null;

  try {
    const notification = await tx.tbl_notifications.create({
      data: {
        use_id: Number(userId),
        wrk_id: wrkId ? Number(wrkId) : null,
        not_priority: priority,
        not_title: title || 'Notificación',
        not_message: message || '',
        not_type: type,
        not_module: module,
        not_action: action,
        not_key: key,
        not_data: data ?? undefined,
      },
    });

    // Sin Socket.IO (un proceso fuera del servidor, p. ej. un job corrido a
    // mano) la notificación igual queda guardada: el usuario la ve al entrar.
    try {
      getIO().to(`user:${String(userId)}`).emit('newNotification', notification);
    } catch (socketErr) {
      console.error(`[notifications] Error emitiendo socket a usuario ${userId}:`, socketErr);
    }

    return notification;
  } catch (err) {
    if (key && isUniqueViolation(err)) return null;
    console.error('[notifications] Error en insertNotification:', err);
    return null;
  }
};
