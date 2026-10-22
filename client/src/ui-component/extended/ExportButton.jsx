import { useState } from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconChevronDown, IconDownload, IconFileSpreadsheet, IconFileTypePdf } from '@tabler/icons-react';

import { showError } from 'services/ToastService';

/**
 * Botón "Exportar" de un listado (DEC-070): Excel o PDF de lo que muestra la
 * tabla con sus filtros, todas las páginas. El servidor arma el archivo;
 * `request(format, report)` lo pide como blob y aquí se descarga con el nombre
 * y la fecha. Si el servidor responde un error, llega como blob con su mensaje.
 * Con `reports`, el menú ofrece cada reporte en los dos formatos; sin él, solo
 * el del listado.
 */

export const EXPORT_FORMATS = [
  { value: 'xlsx', label: 'Excel', icon: IconFileSpreadsheet },
  { value: 'pdf', label: 'PDF', icon: IconFileTypePdf }
];

const errorMessage = async (err) => {
  const data = err.response?.data;
  if (data instanceof Blob) {
    try {
      return JSON.parse(await data.text()).message;
    } catch {
      return null;
    }
  }
  return data?.message;
};

const download = (blob, name) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

/** Pide el reporte y lo descarga como `<fileName>_<fecha>.<format>`; si falla, muestra el mensaje del servidor. */
export const downloadExport = async (request, fileName, format) => {
  try {
    const { data } = await request();
    download(data, `${fileName}_${formatDate(new Date(), 'yyyy-MM-dd')}.${format}`);
    return true;
  } catch (err) {
    showError((await errorMessage(err)) || 'No se pudo generar el reporte');
    return false;
  }
};

export default function ExportButton({ request, fileName, reports }) {
  const [anchor, setAnchor] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async (format, report) => {
    setAnchor(null);
    setBusy(true);
    await downloadExport(() => request(format, report?.value), report?.fileName ?? fileName, format);
    setBusy(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={busy ? <CircularProgress size={14} /> : <IconDownload size={16} />}
        endIcon={<IconChevronDown size={14} />}
        onClick={(event) => setAnchor(event.currentTarget)}
        disabled={busy}
        aria-haspopup="menu"
      >
        {busy ? 'Generando…' : 'Exportar'}
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {reports
          ? reports.flatMap((report) => [
              <ListSubheader key={report.value} sx={{ lineHeight: '32px' }}>
                {report.label}
              </ListSubheader>,
              ...EXPORT_FORMATS.map(({ value, label, icon: Icon }) => (
                <MenuItem key={`${report.value}-${value}`} onClick={() => run(value, report)} sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <Icon size={18} />
                  </ListItemIcon>
                  {label}
                </MenuItem>
              ))
            ])
          : EXPORT_FORMATS.map(({ value, label, icon: Icon }) => (
              <MenuItem key={value} onClick={() => run(value)}>
                <ListItemIcon>
                  <Icon size={18} />
                </ListItemIcon>
                {label}
              </MenuItem>
            ))}
      </Menu>
    </>
  );
}

ExportButton.propTypes = {
  /** `(format: 'xlsx' | 'pdf', report?: string) => Promise<{ data: Blob }>` */
  request: PropTypes.func.isRequired,
  /** Nombre base del archivo, sin fecha ni extensión. */
  fileName: PropTypes.string.isRequired,
  /** Reportes que ofrece el menú: `{ value, label, fileName }`. */
  reports: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string, fileName: PropTypes.string }))
};
