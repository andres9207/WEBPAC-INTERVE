import { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

/**
 * Confirmación de una acción. Si `onConfirm` devuelve una promesa, espera a
 * que termine antes de cerrar: mientras tanto los botones quedan
 * deshabilitados (sin doble clic) y el diálogo no se cierra.
 */
export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel, cancelLabel, confirmColor }) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm?.();
    } finally {
      setBusy(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={busy ? undefined : onClose} maxWidth="xs" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={busy}>
          {cancelLabel || 'Cancelar'}
        </Button>
        <Button variant="contained" color={confirmColor || 'error'} onClick={handleConfirm} disabled={busy}>
          {busy ? 'Procesando…' : confirmLabel || 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** Puede ser asíncrona: el diálogo se cierra cuando termina. */
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmColor: PropTypes.string
};
