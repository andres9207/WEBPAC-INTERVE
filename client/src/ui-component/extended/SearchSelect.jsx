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
 * - `multiple`: `value` es una lista de valores, las elegidas se ven como
 *   chips y `onChange` recibe la lista ([] si se limpia). El menú queda
 *   abierto al elegir, para marcar varias seguidas.
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
  onOptionChange,
  multiple = false
}) {
  const selected = multiple
    ? options.filter((option) => (value ?? []).includes(option.value))
    : (options.find((option) => option.value === value) ?? null);
  const [inputValue, setInputValue] = useState('');
  const searching = inputValue && (multiple || inputValue !== selected?.label);

  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={multiple}
      value={selected}
      onChange={(_, option) => {
        if (multiple) {
          onChange(option.map((o) => o.value));
          return;
        }
        onChange(option?.value ?? '');
        if (option) onOptionChange?.(option);
      }}
      options={options}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.label ?? ''}
      isOptionEqualToValue={(option, current) => option.value === current.value}
      inputValue={inputValue}
      onInputChange={(_, text) => setInputValue(text)}
      noOptionsText={searching ? `Sin resultados para «${inputValue}»` : 'Sin opciones'}
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
  /** Un valor; con `multiple`, la lista de valores elegidos. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
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
  onOptionChange: PropTypes.func,
  /** Varias opciones a la vez, como chips. */
  multiple: PropTypes.bool
};
