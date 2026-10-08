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
 * cifra (ADR-0002, decisión 2).
 */
function Indicator({ label, value, hint, icon: Icon, tone, to }) {
  const content = (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', textAlign: 'left' }}>
      <Avatar variant="rounded" sx={{ width: 48, height: 48, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }} aria-hidden>
        <Icon size={24} stroke={1.8} />
      </Avatar>
      <Stack sx={{ minWidth: 0 }}>
        <Typography variant="h2" component="p" sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
  const box = { bgcolor: 'background.paper', borderRadius: 1, p: 2.5, border: 1, borderColor: 'divider', width: '100%' };
  if (!to) return <Box sx={box}>{content}</Box>;
  return (
    <ButtonBase
      component={RouterLink}
      to={to}
      focusRipple
      sx={{ ...box, justifyContent: 'flex-start', '&:hover': { borderColor: 'primary.main' } }}
      aria-label={`${label}: ${value}. Ver el listado`}
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
  to: PropTypes.string
};

export default function DashboardCards({ items }) {
  if (items.length === 0) return null;
  return (
    <Box
      component="section"
      aria-label="Indicadores"
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: gridSpacing }}
    >
      {items.map((item) => (
        <Indicator key={item.label} {...item} />
      ))}
    </Box>
  );
}

DashboardCards.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };
