import { useId, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconCheck, IconSearch } from '@tabler/icons-react';

// Sin tildes ni mayúsculas: "pagina" encuentra "Página".
const fold = (text) =>
  String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/**
 * Selección múltiple a la vista: cada opción es un chip que se marca al tocarlo,
 * con un buscador que filtra en memoria y el conteo de marcadas. Filtrar no
 * desmarca nada. Pensado para listas cortas y fijas (p. ej. páginas autorizadas).
 *
 * Se usa como campo `custom` de GenericFormSection con `hideLabel`: el título y
 * el conteo los dibuja el componente.
 */
export default function ChipMultiSelect({
  value = [],
  onChange,
  onBlur,
  options = [],
  label,
  searchPlaceholder = 'Buscar',
  emptyText = 'Ninguna opción coincide',
  error,
  disabled = false
}) {
  const [query, setQuery] = useState('');
  const labelId = useId();
  const selected = useMemo(() => new Set(value), [value]);

  const shown = useMemo(() => {
    const q = fold(query.trim());
    return q ? options.filter((opt) => fold(opt.label).includes(q)) : options;
  }, [options, query]);

  const toggle = (optValue) => onChange(selected.has(optValue) ? value.filter((v) => v !== optValue) : [...value, optValue]);

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <Typography id={labelId} variant="subtitle1" component="span">
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {selected.size} de {options.length} seleccionadas
        </Typography>
      </Stack>
      <OutlinedInput
        size="small"
        type="search"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && query) {
            e.stopPropagation();
            setQuery('');
          }
        }}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={searchPlaceholder}
        inputProps={{ 'aria-label': `Buscar en ${String(label).toLowerCase()}`, autoComplete: 'off' }}
        startAdornment={
          <InputAdornment position="start">
            <IconSearch size={16} stroke={1.5} aria-hidden="true" />
          </InputAdornment>
        }
      />
      <Box role="group" aria-labelledby={labelId} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {shown.map((opt) => {
          const on = selected.has(opt.value);
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              icon={on ? <IconCheck size={16} stroke={2} /> : undefined}
              color={on ? 'secondary' : 'default'}
              variant={on ? 'filled' : 'outlined'}
              onClick={() => toggle(opt.value)}
              disabled={disabled}
              aria-pressed={on}
              sx={on ? { bgcolor: 'secondary.light', color: 'secondary.dark', '& .MuiChip-icon': { color: 'secondary.dark' } } : undefined}
            />
          );
        })}
        {shown.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            {emptyText} con «{query.trim()}».
          </Typography>
        )}
      </Box>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </Stack>
  );
}

ChipMultiSelect.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.string.isRequired })),
  label: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
  error: PropTypes.object,
  disabled: PropTypes.bool
};
