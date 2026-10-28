import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

/**
 * Captura de un porcentaje (DEC-036): se escribe con coma decimal (`12,5`) y
 * el valor del formulario es el texto que recibe el servidor (`12.5`), con
 * hasta tres enteros y dos decimales. El rango 0–100 lo valida quien lo usa
 * (y el servidor).
 *
 * Debounce: lo escrito pasa al formulario cuando se deja de escribir
 * (`DEBOUNCE_MS`) o al salir del campo, para no validar a medio escribir. Un
 * decimal sin terminar ("2,") se muestra, pero al formulario llega sin la
 * coma ("2"): no es un error, falta el siguiente dígito.
 *
 * `signed`: admite negativos (un "-" al inicio) y más de tres enteros, para
 * el % de un importe que no es una tasa (p. ej. la glosa, DEC-092).
 */
const DEBOUNCE_MS = 400;

const toValue = (text, signed = false) => {
  const sign = signed && text.trim().startsWith('-') ? '-' : '';
  const digits = text
    .replace(/[^\d,.]/g, '')
    .replace(',', '.')
    .replace(/(\..*)\./g, '$1')
    .replace(signed ? /^(\d{0,16})\d*/ : /^(\d{0,3})\d*/, '$1')
    .replace(/(\.\d{0,2}).*/, '$1');
  return sign + digits;
};

const toText = (value) => String(value ?? '').replace('.', ',');

// Sin el punto final ni un signo solo.
const complete = (value) => value.replace(/\.$/, '').replace(/^-$/, '');

export default function PercentField({ value, onChange, onBlur, label, required, error, helperText, disabled, signed = false }) {
  const [text, setText] = useState(toText(value));
  const timer = useRef(null);
  // Último valor entregado al formulario: un `value` distinto viene de fuera
  // (reinicio, conversión del servidor) y reemplaza lo que se muestra.
  const sent = useRef(String(value ?? ''));

  useEffect(() => {
    if (String(value ?? '') === sent.current) return;
    sent.current = String(value ?? '');
    setText(toText(value));
  }, [value]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const emit = (raw) => {
    clearTimeout(timer.current);
    timer.current = null;
    sent.current = complete(raw);
    onChange(sent.current);
  };

  const handleChange = (e) => {
    const raw = toValue(e.target.value, signed);
    setText(toText(raw));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => emit(raw), DEBOUNCE_MS);
  };

  const handleBlur = () => {
    if (timer.current) emit(toValue(text, signed));
    setText(toText(complete(toValue(text, signed))));
    onBlur?.();
  };

  return (
    <TextField
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      label={label}
      required={required}
      disabled={disabled}
      size="small"
      fullWidth
      error={Boolean(error)}
      helperText={error || helperText}
      placeholder="0,00"
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
  disabled: PropTypes.bool,
  signed: PropTypes.bool
};
