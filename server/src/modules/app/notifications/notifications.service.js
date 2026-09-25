import { prisma } from '../../../common/configs/prismaClient.js';
import { paginate } from '../../../common/utils/pagination.utils.js';
import { getIO } from '../../../common/configs/socket.manager.js';

export const getNotificationCount = async ({ userId }) => {
  return prisma.tbl_notifications.count({
    where: { use_id: Number(userId), not_is_read: false },
  });
};

export const listNotifications = async ({ userId, page = 1, limit = 10 }) => {
  if (!userId) {
    throw new Error('Parámetros no válidos');
  }

  // Prisma deserializa la columna JSON `not_data` solo, no requiere el
  // JSON.parse manual que hacía falta con el resultado crudo de mysql2.
  return paginate(
    prisma.tbl_notifications,
    { where: { use_id: Number(userId) }, orderBy: { not_created_at: 'desc' } },
    { page, limit }
  );
};

export const markAllAsRead = async ({ userId }) => {
  await prisma.tbl_notifications.updateMany({
    where: { use_id: Number(userId), not_is_read: false },
    data: { not_is_read: true, not_read_at: new Date(), not_updated_at: new Date() },
  });
};

export const markAsRead = async ({ notificationId, userId }) => {
  // updateMany (no update): igual que el UPDATE original de mysql2, no lanza
  // error si el ID no existe, solo no afecta ninguna fila. El filtro por
  // use_id evita marcar como leída una notificación de otro usuario (antes
  // solo filtraba por not_id, sin validar dueño — ver SECURITY.md).
  await prisma.tbl_notifications.updateMany({
    where: { not_id: Number(notificationId), use_id: Number(userId) },
    data: { not_is_read: true, not_read_at: new Date(), not_updated_at: new Date() },
  });
};

export const insertNotification = async ({
  userId,
  priority = 'medium',
  title,
  message,
  type = 'info',
  module = null,
  action = null,
  data = null,
  tx = prisma,
}) => {
  if (!userId) return null;

  try {
    const io = getIO();

    const notification = await tx.tbl_notifications.create({
      data: {
        use_id: Number(userId),
        not_priority: priority,
        not_title: title || 'Notificación',
        not_message: message || '',
        not_type: type,
        not_module: module,
        not_action: action,
        not_data: data ?? undefined,
      },
    });

    try {
      io.to(`user:${String(userId)}`).emit('newNotification', notification);
    } catch (socketErr) {
      console.error(`[notifications] Error emitiendo socket a usuario ${userId}:`, socketErr);
    }

    return notification;
  } catch (err) {
    console.error('[notifications] Error en insertNotification:', err);
    return null;
  }
};
