import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

/**
 * Aviso del filtro con el que se llegó desde el tablero (useLinkedFilters):
 * dice qué se está viendo y permite quitarlo. Sin filtro, no se dibuja.
 */
export default function LinkedFilterNotice({ label, onClear }) {
  if (!label) return null;
  return (
    <Alert
      severity="info"
      variant="outlined"
      action={
        <Button color="inherit" size="small" onClick={onClear}>
          Quitar filtro
        </Button>
      }
    >
      Filtrado desde el tablero: {label}
    </Alert>
  );
}

LinkedFilterNotice.propTypes = { label: PropTypes.string, onClear: PropTypes.func.isRequired };
