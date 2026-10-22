import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { useSocket } from 'socket/SocketProvider';
import { ALL_WORKS } from 'utils/workScope';
import { getNotificationCountAPI, paginationNotificationsAPI, markAsReadAPI, markAllAsReadAPI } from 'api/requests/notificationsApi';

// assets
import { IconBell } from '@tabler/icons-react';

const PAGE_SIZE = 10;

/** ¿La notificación es de la obra elegida? Las de ninguna obra, siempre (DEC-072). */
const inActiveWork = (notification, activeWork) =>
  activeWork === ALL_WORKS || notification?.wrk_id == null || Number(notification.wrk_id) === Number(activeWork);

/** Adónde lleva una notificación: el expediente del contrato, si es de uno. */
const targetOf = (notification) => {
  const ctrId = notification?.not_data?.ctrId;
  return notification?.not_module === 'contracts' && ctrId ? `/work/contracts/${ctrId}` : null;
};

// ==============================|| NOTIFICATION ||============================== //

/**
 * Campana del encabezado (DEC-072). Cuenta y lista las notificaciones de la
 * obra elegida (más las de ninguna obra; con "Ver todo", todas) y se ilumina
 * solo si hay alguna sin leer. Una leída deja de iluminarla y sigue en la
 * lista al desplegarla.
 */
export default function NotificationSection() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeWork } = useWorkScope();
  const socket = useSocket();

  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState({ current: 0, totalPages: 0 });
  const anchorRef = useRef(null);

  const fetchUnreadCount = useCallback(async () => {
    if (!user?.useId) return;
    try {
      const response = await getNotificationCountAPI();
      setUnreadCount(response.data);
    } catch (err) {
      console.error('Error fetching notification count:', err);
    }
  }, [user]);

  const fetchNotifications = useCallback(
    async (pageNumber = 1) => {
      if (!user?.useId) return;
      try {
        const { data } = await paginationNotificationsAPI({ page: pageNumber, limit: PAGE_SIZE });
        const results = data?.results ?? [];
        setNotifications((prev) => (pageNumber === 1 ? results : [...prev, ...results]));
        setPage({ current: pageNumber, totalPages: data?.totalPages ?? 0 });
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    },
    [user]
  );

  // Al cambiar de obra, la campana cuenta las de la obra nueva (el encabezado
  // X-Work-Id ya cambió cuando llega activeWork).
  useEffect(() => {
    fetchUnreadCount();
    setOpen(false);
    setNotifications([]);
  }, [fetchUnreadCount, activeWork]);

  useEffect(() => {
    if (!socket) return undefined;

    const handleNewNotification = (notification) => {
      if (!inActiveWork(notification, activeWork)) return;
      setUnreadCount((prev) => prev + 1);
      setNotifications((prev) => (prev.length ? [notification, ...prev] : prev));
    };

    socket.on('newNotification', handleNewNotification);

    return () => {
      socket.off('newNotification', handleNewNotification);
    };
  }, [socket, activeWork]);

  const handleToggle = () => {
    setOpen((prevOpen) => {
      if (!prevOpen) {
        fetchNotifications(1);
      }
      return !prevOpen;
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsReadAPI(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.not_id === notificationId ? { ...n, not_is_read: 1, not_read_at: new Date().toISOString() } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user?.useId) return;
    try {
      await markAllAsReadAPI();
      setNotifications((prev) => prev.map((n) => (n.not_is_read ? n : { ...n, not_is_read: 1 })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  // Abrir una notificación la da por leída y lleva a lo que avisa.
  const handleOpenNotification = (notification) => {
    if (!notification.not_is_read) handleMarkAsRead(notification.not_id);
    const target = targetOf(notification);
    if (target) {
      setOpen(false);
      navigate(target);
    }
  };

  const lit = unreadCount > 0;

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Badge badgeContent={unreadCount} color="error">
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              // Iluminada solo con notificaciones sin leer.
              color: lit ? theme.vars.palette.warning.dark : theme.vars.palette.grey[500],
              background: lit ? theme.vars.palette.warning.light : theme.vars.palette.grey[100],
              '&:hover, &[aria-controls="menu-list-grow"]': {
                color: theme.vars.palette.warning.light,
                background: theme.vars.palette.warning.dark
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            aria-label="Notificaciones"
            onClick={handleToggle}
          >
            <IconBell stroke={1.5} size="20px" />
          </Avatar>
        </Badge>
      </Box>
      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [downMD ? 5 : 0, 20] } }]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
              <Paper>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{ maxWidth: 330 }}>
                  <Stack sx={{ gap: 2 }}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
                      <Stack direction="row" sx={{ gap: 2 }}>
                        <Typography variant="subtitle1">Notificaciones</Typography>
                        {unreadCount > 0 && (
                          <Chip
                            size="small"
                            label={unreadCount}
                            variant="filled"
                            sx={{ color: 'background.default', bgcolor: 'warning.dark' }}
                          />
                        )}
                      </Stack>
                      {unreadCount > 0 && (
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: 'primary.main', cursor: 'pointer' }}
                          onClick={handleMarkAllAsRead}
                        >
                          Marcar todas leídas
                        </Typography>
                      )}
                    </Stack>
                    <Divider sx={{ mt: 0 }} />
                    <Box sx={{ maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden', '&::-webkit-scrollbar': { width: 5 } }}>
                      <NotificationList
                        notifications={notifications}
                        onMarkAsRead={handleMarkAsRead}
                        onOpen={handleOpenNotification}
                        isClickable={(n) => Boolean(targetOf(n))}
                      />
                    </Box>
                  </Stack>
                  {page.current < page.totalPages && (
                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                      <Button size="small" disableElevation onClick={() => fetchNotifications(page.current + 1)}>
                        Ver más
                      </Button>
                    </CardActions>
                  )}
                </MainCard>
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
