import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { IconX } from '@tabler/icons-react';

/**
 * Diálogo de formulario.
 *
 * - Un clic fuera del diálogo no lo cierra: perdería lo escrito. Se cierra con
 *   Cancelar, con la ✕ o con Esc.
 * - `loading`: carga inicial; el contenido se reemplaza por un indicador.
 *   Para el guardado, el diálogo mantiene el formulario y el botón muestra su estado.
 * - `fullScreenOnMobile`: formularios largos ocupan toda la pantalla en teléfono.
 */
const BaseDialog = ({ open, onClose, title, maxWidth = 'sm', loading = false, fullScreenOnMobile = false, children, actions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreenOnMobile && isMobile}
      aria-labelledby="base-dialog-title"
    >
      <DialogTitle id="base-dialog-title" variant="h3" component="h2" sx={{ pr: 7 }}>
        {title}
      </DialogTitle>
      <IconButton aria-label="Cerrar" onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12, color: 'grey.500' }}>
        <IconX size={20} />
      </IconButton>
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ py: 4 }} role="status" aria-label="Cargando">
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
};

BaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  loading: PropTypes.bool,
  fullScreenOnMobile: PropTypes.bool,
  children: PropTypes.node,
  actions: PropTypes.node
};

export default BaseDialog;
