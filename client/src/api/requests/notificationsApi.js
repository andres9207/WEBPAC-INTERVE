import httpCliente from '../services/httpCliente';

// Ninguna de estas peticiones envía el id del usuario: el backend siempre
// trabaja con las notificaciones del usuario de la sesión (req.user).

export const getNotificationCountAPI = () =>
  httpCliente.get('app/notifications/get_notification_count');

export const paginationNotificationsAPI = (params) =>
  httpCliente.post('app/notifications/pagination_notifications', params);

export const markAsReadAPI = (id) =>
  httpCliente.post(`app/notifications/${id}/markAsRead`);

export const markAllAsReadAPI = () =>
  httpCliente.post('app/notifications/markAsRead');
