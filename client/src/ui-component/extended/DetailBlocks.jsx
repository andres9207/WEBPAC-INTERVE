import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Piezas de una página de detalle (DESIGN_SYSTEM, "Página de detalle",
 * DEC-030): cifra clave, lista de datos y estado vacío de una pestaña.
 * Las usan el detalle de obra y el de proveedor.
 */

/** Cifra clave del encabezado. El valor llega ya calculado por el servidor. */
export function Figure({ label, value, hint }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50', px: 2, py: 1.5, height: '100%' }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" component="p" sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.dark', my: 0.5 }}>
        {value || '—'}
      </Typography>
      {hint && (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      )}
    </Box>
  );
}

Figure.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.node, hint: PropTypes.string };

/** Lista de etiqueta → valor. `items`: `[[etiqueta, valor], …]`. */
export function DataList({ items }) {
  return (
    <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'minmax(140px, auto) 1fr', columnGap: 2, rowGap: 1 }}>
      {items.map(([label, value]) => (
        <Box key={label} sx={{ display: 'contents' }}>
          <Typography component="dt" variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography component="dd" variant="body2" sx={{ m: 0, fontVariantNumeric: 'tabular-nums', wordBreak: 'break-word' }}>
            {value || '—'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

DataList.propTypes = { items: PropTypes.arrayOf(PropTypes.array).isRequired };

/** Pestaña vacía o parte que todavía no existe: dice qué habrá y cuándo llega. */
export function Pending({ title, text, action }) {
  return (
    <Box sx={{ border: '1px dashed', borderColor: 'grey.300', borderRadius: 2, py: 5, px: 2, textAlign: 'center' }}>
      <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
        {text}
      </Typography>
      {action && <Box sx={{ mt: 2 }}>{action}</Box>}
    </Box>
  );
}

Pending.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired, action: PropTypes.node };
