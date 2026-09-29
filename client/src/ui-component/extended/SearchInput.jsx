import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconSearch } from '@tabler/icons-react';

// Espera después de la última tecla antes de avisar: una petición por búsqueda, no por letra.
const SEARCH_DELAY_MS = 400;

/**
 * Campo de búsqueda general de un listado (DEC-024). Avisa con `onSearch(texto)`
 * cuando el usuario deja de escribir y el texto recortado cambió. La búsqueda
 * la hace el servidor (parámetro `search`), nunca en memoria.
 */
export default function SearchInput({ onSearch, placeholder = 'Buscar…', maxLength = 100 }) {
  const [value, setValue] = useState('');
  const lastSent = useRef('');

  useEffect(() => {
    const text = value.trim();
    if (text === lastSent.current) return undefined;
    const timer = setTimeout(() => {
      lastSent.current = text;
      onSearch(text);
    }, SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <OutlinedInput
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      inputProps={{ 'aria-label': placeholder, maxLength }}
      startAdornment={
        <InputAdornment position="start">
          <IconSearch size={16} stroke={1.5} />
        </InputAdornment>
      }
      sx={{ width: { xs: '100%', sm: 260 } }}
    />
  );
}

SearchInput.propTypes = {
  /** Recibe el texto recortado; debe ser estable (useCallback) para no reiniciar la espera. */
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number
};
