import express from 'express';
import { verifyToken } from '../../../common/middlewares/authjwt.middleware.js';
import { validate } from '../../../common/middlewares/validate.middleware.js';
import { listNotificationsSchema, markAsReadSchema } from './notifications.validation.js';
import {
  getNotificationCountController,
  listNotificationsController,
  markAllAsReadController,
  markAsReadController,
} from './notifications.controller.js';

const notificationsRoutes = express.Router();

// Sin requirePermission a propósito: son recursos propios (el service filtra
// siempre por use_id = req.user.useId, incluido markAsRead de una sola
// notificación), no objetos ajenos. Ver ADR-0001 "Autorización".

notificationsRoutes.get(
  '/get_notification_count',
  verifyToken,
  getNotificationCountController,
);

notificationsRoutes.post(
  '/pagination_notifications',
  verifyToken,
  listNotificationsSchema,
  validate,
  listNotificationsController,
);

notificationsRoutes.post('/markAsRead', verifyToken, markAllAsReadController);

notificationsRoutes.post('/:id/markAsRead', verifyToken, markAsReadSchema, validate, markAsReadController);

export default notificationsRoutes;
