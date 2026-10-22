import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { gridSpacing } from 'store/constant';

/**
 * Indicadores del tablero, con el estilo de los de obras (DEC-033): ícono en
 * un tono de ACTION_TONES, etiqueta, cifra y una línea que dice qué cuenta.
 * Con `to`, la tarjeta lleva al listado con el mismo filtro que produjo la
 * cifra (ADR-0002, decisión 2); con `onClick`, abre el detalle de la cifra
 * en el mismo tablero (DrillDownDialog del tablero de la obra).
 */
function Indicator({ label, value, hint, icon: Icon, tone, to, onClick, dense = false }) {
  const content = (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', textAlign: 'left' }}>
      <Avatar
        variant="rounded"
        sx={{ width: dense ? 40 : 48, height: dense ? 40 : 48, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }}
        aria-hidden
      >
        <Icon size={dense ? 20 : 24} stroke={1.8} />
      </Avatar>
      <Stack sx={{ minWidth: 0 }}>
        <Typography
          variant={dense ? 'h4' : 'h2'}
          component="p"
          sx={{ fontVariantNumeric: 'tabular-nums', ...(dense ? { whiteSpace: 'nowrap' } : {}) }}
        >
          {value}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      </Stack>
    </Stack>
  );
  const box = { bgcolor: 'background.paper', borderRadius: 1, p: dense ? 2 : 2.5, border: 1, borderColor: 'divider', width: '100%' };
  if (!to && !onClick) return <Box sx={box}>{content}</Box>;
  return (
    <ButtonBase
      {...(to ? { component: RouterLink, to } : { onClick })}
      focusRipple
      sx={{ ...box, justifyContent: 'flex-start', '&:hover': { borderColor: 'primary.main' } }}
      aria-label={`${label}: ${value}. ${to ? 'Ver el listado' : 'Ver el detalle'}`}
    >
      {content}
    </ButtonBase>
  );
}

Indicator.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hint: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  tone: PropTypes.object.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  dense: PropTypes.bool
};

// `dense`: cifras de importes largos (el formulario de factura, DEC-065): la
// cifra en un tamaño menor y en una sola línea.
export default function DashboardCards({ items, dense = false, label = 'Indicadores' }) {
  if (items.length === 0) return null;
  return (
    <Box
      component="section"
      aria-label={label}
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${dense ? 240 : 220}px), 1fr))`,
        gap: dense ? 2 : gridSpacing
      }}
    >
      {items.map((item) => (
        <Indicator key={item.label} {...item} dense={dense} />
      ))}
    </Box>
  );
}

DashboardCards.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired, dense: PropTypes.bool, label: PropTypes.string };
