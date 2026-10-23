import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import useSchemePalette from 'hooks/useSchemePalette';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { CONTRACT_ADVANCE_FILTER_OPTIONS } from 'utils/constants';

import { chartAmount, fMillions, paletteColor } from './workDashboard.utils';

// Barras de anticipo del tablero de la obra (DEC-079), en el resumen y en
// los gráficos: facturado frente al pactado y amortizado frente al
// facturado, con lo por aprobar. Importes, porcentajes, nivel y filtros que
// cumple cada contrato llegan del servidor; aquí solo se dibujan y se filtra.

const num = { fontVariantNumeric: 'tabular-nums' };

// Nivel de una barra de anticipo (lo decide el servidor por su porcentaje con lo por aprobar): color y nombre.
// El nombre y la cifra van en texto junto a la barra: el amarillo y el verde no llegan a 3:1 sobre el fondo
// (DESIGN_SYSTEM, "Gráficos"), así que el color no es la única señal.
const ADVANCE_LEVELS = {
  LOW: { color: 'primary.800', name: 'Menos de 50 %' },
  MEDIUM: { color: 'warning.dark', name: '50 % a 80 %' },
  HIGH: { color: 'success.dark', name: '80 % a 100 %' },
  EXCEEDED: { color: 'error.dark', name: 'Más de 100 %' }
};
// Lo por aprobar: la misma barra, rayada (forma, no opacidad).
const pendingStripes = (color) => `repeating-linear-gradient(135deg, ${color} 0 4px, transparent 4px 8px)`;

/** Barra de anticipo: lo aprobado relleno y lo por aprobar rayado; por encima de 100 %, con la marca del 100 %. */
export function AdvanceBar({ label, bar, onClick }) {
  const palette = useSchemePalette();
  const level = ADVANCE_LEVELS[bar.level] ?? ADVANCE_LEVELS.LOW;
  const color = paletteColor(palette, level.color);
  const scale = Math.max(100, chartAmount(bar.pct));
  const approved = (Math.max(0, chartAmount(bar.approvedPct)) / scale) * 100;
  const pending = (Math.max(0, chartAmount(bar.pct) - chartAmount(bar.approvedPct)) / scale) * 100;
  const hasPending = bar.pending !== '0.00';
  const description = [
    `${label}: ${fMoneyText(bar.total)}, ${fPercentText(bar.pct, 1)} (${level.name.toLowerCase()})`,
    hasPending && `incluye ${fMoneyText(bar.pending)} por aprobar`
  ]
    .filter(Boolean)
    .join(', ');
  return (
    // En el teléfono la cifra baja a su propia línea: la barra conserva el ancho.
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '80px minmax(0, 1fr)', sm: '90px minmax(0, 1fr) 170px' },
        columnGap: 1.25,
        rowGap: 0.25,
        alignItems: 'center'
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Tooltip title={description}>
        <Box
          // Con detalle es un botón (con su nombre); sin él, una imagen descrita.
          role={onClick ? undefined : 'img'}
          aria-label={description}
          {...(onClick && { component: ButtonBase, onClick })}
          sx={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: 12,
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: 'grey.100',
            ...(onClick && { cursor: 'pointer', '&:hover, &.Mui-focusVisible': { outline: 2, outlineColor: 'primary.main' } })
          }}
        >
          {/* Dentro de un botón, solo elementos en línea (span). */}
          <Box component="span" sx={{ height: '100%', width: `${approved}%`, bgcolor: color }} />
          {pending > 0 && <Box component="span" sx={{ height: '100%', width: `${pending}%`, backgroundImage: pendingStripes(color) }} />}
          {scale > 100 && (
            <Box
              component="span"
              sx={{ position: 'absolute', top: 0, bottom: 0, left: `${(100 / scale) * 100}%`, width: 2, bgcolor: 'text.primary' }}
            />
          )}
        </Box>
      </Tooltip>
      <Stack sx={{ gridColumn: { xs: 2, sm: 'auto' }, textAlign: { xs: 'left', sm: 'right' } }}>
        <Typography variant="caption" sx={{ ...num, fontWeight: 500 }}>
          {fMillions(bar.total)} · {fPercentText(bar.pct, 1)}
        </Typography>
        {(hasPending || bar.level === 'EXCEEDED') && (
          <Typography variant="caption" color={bar.level === 'EXCEEDED' ? 'error.dark' : 'text.secondary'} sx={num}>
            {[hasPending && `${fMillions(bar.pending)} por aprobar`, bar.level === 'EXCEEDED' && 'excede'].filter(Boolean).join(' · ')}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

AdvanceBar.propTypes = { label: PropTypes.string.isRequired, bar: PropTypes.object.isRequired, onClick: PropTypes.func };

const swatchSx = { display: 'inline-block', width: 12, height: 12, borderRadius: 0.75, flexShrink: 0 };

/** Leyenda de los niveles y de lo por aprobar. */
export function AdvanceLegend() {
  const palette = useSchemePalette();
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" columnGap={2} rowGap={0.5}>
      {Object.values(ADVANCE_LEVELS).map((level) => (
        <Stack key={level.name} direction="row" spacing={0.75} alignItems="center">
          <Box component="span" aria-hidden sx={{ ...swatchSx, bgcolor: paletteColor(palette, level.color) }} />
          <Typography variant="caption" color="text.secondary">
            {level.name}
          </Typography>
        </Stack>
      ))}
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Box component="span" aria-hidden sx={{ ...swatchSx, backgroundImage: pendingStripes(paletteColor(palette, 'grey.600')) }} />
        <Typography variant="caption" color="text.secondary">
          Por aprobar
        </Typography>
      </Stack>
    </Stack>
  );
}

/** Si un contrato cumple el filtro "Anticipo" (vacío: todos). Los filtros que cumple los manda el servidor. */
export const matchesAdvanceFilter = (filter) => (contract) => !filter || contract.advance.filters.includes(filter);

/** Selector del filtro "Anticipo", con las opciones del listado de contratos. */
export function AdvanceFilter({ value, onChange }) {
  return (
    <TextField
      select
      size="small"
      label="Anticipo"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ minWidth: 220, maxWidth: '100%' }}
    >
      <MenuItem value="">Todos</MenuItem>
      {CONTRACT_ADVANCE_FILTER_OPTIONS.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

AdvanceFilter.propTypes = { value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired };
