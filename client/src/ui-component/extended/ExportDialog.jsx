import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from './BaseDialog';
import { EXPORT_FORMATS, downloadExport } from './ExportButton';

/**
 * Exportar un registro desde una acción de fila (DEC-070), donde no hay un
 * botón al que anclar el menú: elige Excel o PDF y descarga. `request(format)`
 * pide el archivo como blob; al terminar bien, se cierra.
 */
export default function ExportDialog({ open, onClose, title, description, request, fileName }) {
  const [busy, setBusy] = useState(null);

  const run = async (format) => {
    setBusy(format);
    const done = await downloadExport(() => request(format), fileName, format);
    setBusy(null);
    if (done) onClose();
  };

  return (
    <BaseDialog open={open} onClose={onClose} title={title} maxWidth="xs">
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      <Stack direction="row" spacing={1.5}>
        {EXPORT_FORMATS.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            fullWidth
            variant="outlined"
            startIcon={busy === value ? <CircularProgress size={16} /> : <Icon size={18} />}
            disabled={busy !== null}
            onClick={() => run(value)}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </BaseDialog>
  );
}

ExportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  /** `(format: 'xlsx' | 'pdf') => Promise<{ data: Blob }>` */
  request: PropTypes.func.isRequired,
  /** Nombre base del archivo, sin fecha ni extensión. */
  fileName: PropTypes.string.isRequired
};
