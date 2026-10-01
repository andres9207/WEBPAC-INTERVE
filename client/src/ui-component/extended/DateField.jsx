import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, isValid, parse } from 'date-fns';

/**
 * Campo de fecha sin hora (DESIGN_SYSTEM, "Formatos"): DD/MM/AAAA, calendario
 * en español (LocalizationProvider en App.jsx). El valor entra y sale como
 * texto "AAAA-MM-DD", el mismo que viaja a la API, para que la zona horaria no
 * corra el día. `onChange` recibe '' si el campo queda vacío o incompleto.
 *
 * `readOnly`: solo muestra (p. ej. una fecha que calcula el servidor).
 */
const ISO = 'yyyy-MM-dd';

const toDate = (text) => {
  if (!text) return null;
  const date = parse(text, ISO, new Date());
  return isValid(date) ? date : null;
};

export default function DateField({ value, onChange, label, required = false, error, helperText, disabled = false, readOnly = false }) {
  return (
    <DatePicker
      value={toDate(value)}
      onChange={(date) => onChange?.(date && isValid(date) ? format(date, ISO) : '')}
      label={label}
      format="dd/MM/yyyy"
      disabled={disabled}
      readOnly={readOnly}
      slotProps={{
        textField: {
          size: 'small',
          fullWidth: true,
          required,
          error: Boolean(error),
          helperText: error || helperText,
          ...(readOnly ? { sx: { '& .MuiPickersInputBase-root': { bgcolor: 'grey.100' } } } : {})
        },
        // Sin botón de calendario cuando solo se muestra.
        ...(readOnly ? { openPickerButton: { sx: { display: 'none' } } } : {})
      }}
    />
  );
}

DateField.propTypes = {
  /** "AAAA-MM-DD" o '' */
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};
