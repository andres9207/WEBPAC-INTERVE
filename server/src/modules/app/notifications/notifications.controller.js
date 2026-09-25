import {
  getNotificationCount,
  listNotifications,
  markAllAsRead,
  markAsRead,
} from './notifications.service.js';

export const getNotificationCountController = async (req, res, next) => {
  const { useId } = req.user;
  try {
    const count = await getNotificationCount({ userId: useId });
    res.json(count);
  } catch (err) {
    next(err);
  }
};

export const listNotificationsController = async (req, res, next) => {
  const { useId } = req.user;
  const { page = 1, limit = 10 } = req.body;
  try {
    const notifications = await listNotifications({ userId: useId, page, limit });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

export const markAllAsReadController = async (req, res, next) => {
  const { useId } = req.user;
  try {
    await markAllAsRead({ userId: useId });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const markAsReadController = async (req, res, next) => {
  const { useId } = req.user;
  const { id } = req.params;
  try {
    await markAsRead({ notificationId: id, userId: useId });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
