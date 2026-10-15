import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fMoneyText } from 'utils/formatNumber';

/**
 * Panel "Detalle" de la factura (DEC-065), a la derecha del formulario y del
 * detalle, como en el sistema que se migra: cada línea de la composición y
 * el TOTAL destacado. Solo presenta: las cifras las calcula el servidor
 * (FRONTEND_STANDARD, regla 9). `extra` son cifras aparte del total (el
 * total facturado de la simple); `note`, una aclaración o un aviso.
 */
export default function InvoiceDetailPanel({ lines, total, totalLabel = 'TOTAL', extra = [], note, warning, loading = false, stickyTop = 0 }) {
  const num = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };
  return (
    <Box
      component="section"
      aria-label="Detalle de los valores de la factura"
      aria-busy={loading}
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1.5,
        p: 2.5,
        position: { md: 'sticky' },
        top: { md: stickyTop }
      }}
    >
      <Typography variant="subtitle1" component="h3">
        Detalle
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Detalle de los valores de la factura
      </Typography>

      <Stack component="dl" divider={<Divider flexItem />} sx={{ m: 0, mt: 2, opacity: loading ? 0.6 : 1 }}>
        {lines.map((line) => (
          <Stack key={line.key} direction="row" justifyContent="space-between" spacing={2} sx={{ py: 0.75 }}>
            <Typography component="dt" variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
              {line.label}
            </Typography>
            <Typography component="dd" variant="body2" sx={{ ...num, m: 0 }}>
              {fMoneyText(line.value) || '—'}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {total !== undefined && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={2}
          sx={{ mt: 1.5, pt: 1.5, borderTop: 2, borderColor: 'divider' }}
        >
          <Typography variant="h4" component="p">
            {totalLabel}
          </Typography>
          <Typography variant="h3" component="p" sx={num}>
            {fMoneyText(total) || '—'}
          </Typography>
        </Stack>
      )}

      {extra.map((item) => (
        <Stack key={item.label} direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>
          <Stack>
            <Typography variant="body2">{item.label}</Typography>
            {item.hint && (
              <Typography variant="caption" color="text.secondary">
                {item.hint}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" sx={{ ...num, fontWeight: 500 }}>
            {fMoneyText(item.value) || '—'}
          </Typography>
        </Stack>
      ))}

      {warning && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {warning}
        </Alert>
      )}
      {note && (
        <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 2 }}>
          {note}
        </Typography>
      )}
    </Box>
  );
}

InvoiceDetailPanel.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, label: PropTypes.string.isRequired, value: PropTypes.string })
  ).isRequired,
  total: PropTypes.string,
  totalLabel: PropTypes.string,
  extra: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string, hint: PropTypes.string })),
  note: PropTypes.string,
  warning: PropTypes.string,
  loading: PropTypes.bool,
  stickyTop: PropTypes.number
};
