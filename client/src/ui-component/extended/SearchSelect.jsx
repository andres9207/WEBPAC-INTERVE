import { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { IconSearch } from '@tabler/icons-react';

/**
 * Desplegable con buscador (DESIGN_SYSTEM, "Componentes"). Único componente
 * para elegir una opción de una lista: los maestros (SelectSocket), los
 * usuarios responsables, las unidades, etc.
 *
 * - Filtra mientras se escribe, sin distinguir tildes ni mayúsculas.
 * - Sin coincidencias: "Sin resultados para «x»".
 * - Controlado por valor: `value` es el `value` de la opción y `onChange`
 *   recibe el valor elegido ('' si se limpia).
 */
const filterOptions = createFilterOptions({ ignoreAccents: true, ignoreCase: true, stringify: (option) => option.label ?? '' });

export default function SearchSelect({
  value,
  onChange,
  options,
  label,
  required = false,
  error,
  helperText,
  disabled = false,
  loading = false,
  placeholder,
  disableClearable = false,
  hideLabel = false,
  onOptionChange
}) {
  const selected = options.find((option) => option.value === value) ?? null;
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      value={selected}
      onChange={(_, option) => {
        onChange(option?.value ?? '');
        if (option) onOptionChange?.(option);
      }}
      options={options}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.label ?? ''}
      isOptionEqualToValue={(option, current) => option.value === current.value}
      inputValue={inputValue}
      onInputChange={(_, text) => setInputValue(text)}
      noOptionsText={inputValue && inputValue !== selected?.label ? `Sin resultados para «${inputValue}»` : 'Sin opciones'}
      loadingText="Cargando…"
      loading={loading}
      disabled={disabled}
      disableClearable={disableClearable}
      size="small"
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={hideLabel ? undefined : label}
          required={required}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={error || helperText}
          slotProps={{
            ...params.slotProps,
            htmlInput: { ...params.inputProps, ...(hideLabel ? { 'aria-label': label } : {}) },
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start" sx={{ ml: 0.5 }}>
                    <IconSearch size={16} stroke={1.5} aria-hidden="true" />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }
          }}
        />
      )}
    />
  );
}

SearchSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  /** `[{ value, label }]` */
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), label: PropTypes.string }))
    .isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  /** Mensaje de error; también marca el campo. */
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  disableClearable: PropTypes.bool,
  /** La etiqueta no se ve, pero sigue siendo el nombre accesible (p. ej. dentro de una fila). */
  hideLabel: PropTypes.bool,
  onOptionChange: PropTypes.func
};
