import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

/**
 * Captura de un porcentaje (DEC-036): se escribe con coma decimal (`12,5`) y
 * el valor del formulario es el texto que recibe el servidor (`12.5`), con
 * hasta tres enteros y dos decimales. El rango 0–100 lo valida quien lo usa
 * (y el servidor).
 */
const toValue = (text) =>
  text
    .replace(/[^\d,.]/g, '')
    .replace(',', '.')
    .replace(/(\..*)\./g, '$1')
    .replace(/^(\d{0,3})\d*/, '$1')
    .replace(/(\.\d{0,2}).*/, '$1');

const toText = (value) => String(value ?? '').replace('.', ',');

export default function PercentField({ value, onChange, onBlur, label, required, error, helperText, disabled }) {
  return (
    <TextField
      value={toText(value)}
      onChange={(e) => onChange(toValue(e.target.value))}
      onBlur={onBlur}
      label={label}
      required={required}
      disabled={disabled}
      size="small"
      fullWidth
      error={Boolean(error)}
      helperText={error || helperText}
      slotProps={{
        input: { endAdornment: <InputAdornment position="end">%</InputAdornment> },
        htmlInput: { inputMode: 'decimal', autoComplete: 'off', style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' } }
      }}
    />
  );
}

PercentField.propTypes = {
  /** Texto con punto decimal, como lo recibe el servidor: "12.5". */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};
