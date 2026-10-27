import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * Fila de alertas de un listado (p. ej. "Contrato vencido", "Pólizas
 * vencidas"): filtros rápidos con su conteo, aparte de las pestañas de estado
 * y combinables con ellas. Se elige una a la vez; volver a pulsar la elegida
 * la quita. Una alerta sin casos queda atenuada, pero se puede elegir.
 *
 * - `options`: `[{ id, name, color }]`, con `color` del tema del Chip
 *   (`warning`, `error`, `info`…).
 * - `counts`: conteo por `id`.
 * - `value`: la alerta elegida, o '' sin alerta.
 */
export default function AlertChips({ options, counts, value, onChange, label = 'Alertas' }) {
  if (options.length === 0) return null;
  return (
    <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }} role="group" aria-label={label}>
      <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
        {label}
      </Typography>
      {options.map((option) => {
        const selected = value === option.id;
        const count = counts[option.id] ?? 0;
        return (
          <Chip
            key={option.id}
            size="small"
            clickable
            aria-pressed={selected}
            color={selected || count > 0 ? (option.color ?? 'default') : 'default'}
            variant={selected ? 'filled' : 'outlined'}
            onClick={() => onChange(selected ? '' : option.id)}
            sx={{ opacity: selected || count > 0 ? 1 : 0.6 }}
            label={
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                {option.name}
                <Box component="span" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {count}
                </Box>
              </Box>
            }
          />
        );
      })}
    </Stack>
  );
}

AlertChips.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired, color: PropTypes.string })
  ).isRequired,
  counts: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};
