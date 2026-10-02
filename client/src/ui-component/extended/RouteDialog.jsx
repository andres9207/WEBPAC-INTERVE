import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconX } from '@tabler/icons-react';

/**
 * Modal grande con dirección propia (DEC-034): el detalle y el formulario de
 * un agregado (obra, proveedor) se abren sobre su listado, pero cada uno
 * tiene su ruta (`/:id`, `/:id/edit`, `/new`), así que recargar o compartir
 * el enlace abre el mismo modal. Lo monta la ruta hija; cerrar navega.
 *
 * Partes: `header` (identidad y estado), `tabs` (opcional), el cuerpo con
 * scroll y `footer` con las acciones. Con `onSubmit`, el modal entero es el
 * formulario: el botón de tipo submit del pie lo envía.
 * En pantallas chicas ocupa la pantalla completa.
 */
export default function RouteDialog({
  onClose,
  labelledBy,
  header,
  tabs,
  footer,
  loading = false,
  onSubmit,
  closeLabel = 'Cerrar',
  children
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const formProps = onSubmit ? { component: 'form', noValidate: true, onSubmit } : {};

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      aria-labelledby={labelledBy}
      slotProps={{
        paper: {
          ...formProps,
          sx: {
            height: fullScreen ? '100%' : 'min(880px, calc(100vh - 64px))',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }
        }
      }}
    >
      <Box sx={{ px: 3, pt: 2.5, pb: tabs ? 1 : 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>{header}</Box>
        <IconButton
          onClick={onClose}
          aria-label={closeLabel}
          title={closeLabel}
          sx={{ bgcolor: 'grey.100', borderRadius: 2, flexShrink: 0 }}
        >
          <IconX size={18} aria-hidden="true" />
        </IconButton>
      </Box>

      {tabs && <Box sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>{tabs}</Box>}
      {!tabs && <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, bgcolor: 'grey.50' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ py: 8 }} role="status" aria-label="Cargando">
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>

      {footer && (
        <Box
          sx={{
            px: 3,
            py: 1.75,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
            bgcolor: 'background.paper'
          }}
        >
          {footer}
        </Box>
      )}
    </Dialog>
  );
}

RouteDialog.propTypes = {
  /** Cierra el modal: navega al listado (o al detalle, desde la edición). */
  onClose: PropTypes.func.isRequired,
  /** Id del título que va dentro de `header`. */
  labelledBy: PropTypes.string,
  header: PropTypes.node,
  /** Pestañas (Tabs de MUI) debajo del encabezado. */
  tabs: PropTypes.node,
  /** Acciones del pie. Un `<Box sx={{ flexGrow: 1 }} />` separa las de la izquierda. */
  footer: PropTypes.node,
  loading: PropTypes.bool,
  /** Convierte el modal en formulario. */
  onSubmit: PropTypes.func,
  closeLabel: PropTypes.string,
  children: PropTypes.node
};
