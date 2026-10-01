import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { IconSearch, IconX } from '@tabler/icons-react';

// Espera después de la última tecla antes de avisar: una petición por búsqueda, no por letra.
const SEARCH_DELAY_MS = 400;

/**
 * Campo de búsqueda general de un listado (DEC-024). Avisa con `onSearch(texto)`
 * cuando el usuario deja de escribir y el texto recortado cambió. La búsqueda
 * la hace el servidor (parámetro `search`), nunca en memoria.
 *
 * Con texto, muestra un botón para limpiarlo; limpiar avisa sin esperar.
 */
export default function SearchInput({ onSearch, placeholder = 'Buscar…', maxLength = 100 }) {
  const [value, setValue] = useState('');
  const lastSent = useRef('');
  const inputRef = useRef(null);

  useEffect(() => {
    const text = value.trim();
    if (text === lastSent.current) return undefined;
    const timer = setTimeout(() => {
      lastSent.current = text;
      onSearch(text);
    }, SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const clear = () => {
    setValue('');
    lastSent.current = '';
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <OutlinedInput
      size="small"
      type="search"
      value={value}
      inputRef={inputRef}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && value) clear();
      }}
      placeholder={placeholder}
      inputProps={{ 'aria-label': placeholder, maxLength }}
      startAdornment={
        <InputAdornment position="start">
          <IconSearch size={16} stroke={1.5} aria-hidden="true" />
        </InputAdornment>
      }
      endAdornment={
        value && (
          <InputAdornment position="end">
            <IconButton size="small" edge="end" aria-label="Limpiar búsqueda" onClick={clear}>
              <IconX size={16} />
            </IconButton>
          </InputAdornment>
        )
      }
      sx={{
        width: { xs: '100%', sm: 300 },
        // El navegador agrega su propia ✕ a type="search": se oculta para no duplicarla.
        '& input::-webkit-search-cancel-button': { display: 'none' }
      }}
    />
  );
}

SearchInput.propTypes = {
  /** Recibe el texto recortado; debe ser estable (useCallback) para no reiniciar la espera. */
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number
};
