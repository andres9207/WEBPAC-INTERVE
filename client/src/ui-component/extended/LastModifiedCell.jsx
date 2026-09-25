import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'utils/formatTime';

// Celda "Últ. modificación" de los listados: nombre del autor (lo resuelve el
// backend, `updatedByName`) y fecha en hora local del navegador. El backend
// entrega la fecha en UTC (ISO), así que el formato local es responsabilidad
// de quien la muestra.
export default function LastModifiedCell({ name, date }) {
  return (
    <Box>
      <Typography variant="caption">{name ?? 'Sistema'}</Typography>
      <Typography variant="caption" display="block" color="text.secondary">
        {date ? fDateTime(date) : '—'}
      </Typography>
    </Box>
  );
}

LastModifiedCell.propTypes = {
  name: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
