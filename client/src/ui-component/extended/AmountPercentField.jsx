import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import MoneyField from './MoneyField';
import PercentField from './PercentField';

/**
 * Importe con su valor y su porcentaje juntos (DEC-065, "Valor y
 * porcentaje"): se escribe en cualquiera de las dos cajas y la otra muestra
 * lo que da. El campo del formulario es el lado que se guarda (`storedAs`);
 * el otro lo calcula el servidor (FRONTEND_STANDARD, regla 9):
 *
 * - `derived`: el otro lado, como lo devuelve la vista previa.
 * - `onAltChange(text)`: lo escrito en el otro lado, para que la vista previa
 *   lo convierta y quien lo usa guarde el resultado en el campo; null al
 *   escribir en el lado que se guarda.
 *
 * Mientras se escribe en el otro lado se muestra lo escrito; al salir, lo que
 * dio el servidor (con el % a dos decimales, puede diferir en centavos).
 */
export default function AmountPercentField({
  storedAs,
  value,
  onChange,
  onBlur,
  derived,
  onAltChange,
  label,
  required = false,
  disabled = false,
  error,
  helperText
}) {
  const [draft, setDraft] = useState(null);

  const stored = {
    value,
    onChange: (text) => {
      onAltChange(null);
      onChange(text);
    },
    onBlur,
    required,
    error,
    helperText
  };
  const alt = {
    value: draft ?? derived ?? '',
    onChange: (text) => {
      setDraft(text);
      onAltChange(text);
    },
    onBlur: () => setDraft(null)
  };
  const money = storedAs === 'money' ? stored : alt;
  const percent = storedAs === 'percent' ? stored : alt;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
      <Box sx={{ flex: 3, minWidth: 0 }}>
        <MoneyField {...money} label={label} disabled={disabled} />
      </Box>
      <Box sx={{ flex: 2, minWidth: 0 }}>
        <PercentField {...percent} label="%" disabled={disabled} />
      </Box>
    </Stack>
  );
}

AmountPercentField.propTypes = {
  /** Lado que se guarda: el valor del formulario es este. */
  storedAs: PropTypes.oneOf(['money', 'percent']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  /** El otro lado, calculado por el servidor (texto con punto decimal). */
  derived: PropTypes.string,
  onAltChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string
};
