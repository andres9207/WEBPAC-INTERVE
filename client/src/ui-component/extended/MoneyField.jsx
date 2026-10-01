import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { moneyInputText, parseMoneyInput } from 'utils/formatNumber';

/**
 * Campo de importe (DEC-028, DESIGN_SYSTEM "Formatos"). Se escribe con el
 * formato colombiano, punto de miles y coma decimal ("1.234.567,50"), y el
 * valor del formulario es el texto que recibe el servidor ("1234567.50"):
 * nunca pasa por Number. Al salir del campo completa los dos decimales.
 *
 * `prefix`: "$" para importes; vacío para cantidades.
 */
export default function MoneyField({
  value,
  onChange,
  onBlur,
  label,
  required = false,
  error,
  helperText,
  disabled = false,
  prefix = '$'
}) {
  const completeDecimals = () => {
    if (value) {
      const [integer, decimals = ''] = String(value).split('.');
      const full = `${integer}.${decimals.padEnd(2, '0')}`;
      if (full !== value) onChange(full);
    }
    onBlur?.();
  };

  return (
    <TextField
      value={moneyInputText(value)}
      onChange={(e) => onChange(parseMoneyInput(e.target.value))}
      onBlur={completeDecimals}
      label={label}
      required={required}
      error={Boolean(error)}
      helperText={error || helperText}
      disabled={disabled}
      size="small"
      fullWidth
      placeholder="0,00"
      slotProps={{
        input: prefix ? { startAdornment: <InputAdornment position="start">{prefix}</InputAdornment> } : undefined,
        htmlInput: {
          inputMode: 'decimal',
          maxLength: 26,
          autoComplete: 'off',
          style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
        }
      }}
    />
  );
}

MoneyField.propTypes = {
  /** Texto con punto decimal, como lo recibe el servidor: "1234567.50". */
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.string
};
