import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * Tonos de las acciones por fila, con colores del tema (no hex fijos). Estilo
 * suave de Berry: fondo claro con ícono oscuro, y al pasar el mouse fondo
 * oscuro con ícono blanco. Cada par cumple contraste 3:1 o más (WCAG 1.4.11).
 */
export const ACTION_TONES = {
  edit: { bg: 'secondary.light', fg: 'secondary.dark', hoverBg: 'secondary.dark', hoverFg: 'common.white' },
  info: { bg: 'primary.light', fg: 'primary.800', hoverBg: 'primary.800', hoverFg: 'common.white' },
  danger: { bg: 'orange.light', fg: 'error.dark', hoverBg: 'error.dark', hoverFg: 'common.white' },
  neutral: { bg: 'grey.100', fg: 'grey.600', hoverBg: 'grey.600', hoverFg: 'common.white' },
  success: { bg: 'success.light', fg: 'grey.700', hoverBg: 'success.200', hoverFg: 'grey.900' }
};

export const toneOf = (item) => ACTION_TONES[item.tone] ?? ACTION_TONES.neutral;

/** Botón de ícono de una acción por fila. El tooltip también es su nombre accesible. */
export default function ActionButton({ item, onClick, size = 'medium' }) {
  const tone = toneOf(item);

  return (
    <Tooltip title={item.label} arrow>
      {/* span: el tooltip funciona aunque el botón esté deshabilitado. */}
      <span>
        <IconButton
          aria-label={item.label}
          onClick={(e) => {
            e.stopPropagation();
            onClick(item);
          }}
          disabled={item.disabled}
          size={size}
          sx={{
            bgcolor: tone.bg,
            color: tone.fg,
            borderRadius: 1.5,
            '&:hover': { bgcolor: tone.hoverBg, color: tone.hoverFg },
            '&.Mui-disabled': { bgcolor: 'grey.100', color: 'grey.500' }
          }}
        >
          {item.icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

ActionButton.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    tone: PropTypes.oneOf(Object.keys(ACTION_TONES)),
    disabled: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
