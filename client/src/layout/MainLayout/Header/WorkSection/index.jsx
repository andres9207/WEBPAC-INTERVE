import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import SearchSelect from 'ui-component/extended/SearchSelect';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';

/**
 * Selector de la obra activa (DEC-047), a la izquierda del usuario. Lista las
 * obras de las que el usuario es responsable; con el permiso de ver todas,
 * todas las obras y "Ver todo". Siempre hay una elegida: no se limpia.
 */
export default function WorkSection() {
  const { works, viewAll, activeWork, selectWork } = useWorkScope();

  if (works.length === 0 && !viewAll) {
    return (
      <Tooltip title="Pide que te asignen como responsable de una obra para ver sus proveedores, contratos y facturas.">
        <Chip label="Sin obras asignadas" variant="outlined" color="warning" sx={{ mr: 1 }} />
      </Tooltip>
    );
  }

  const options = [
    ...(viewAll ? [{ value: ALL_WORKS, label: 'Ver todo' }] : []),
    ...works.map((w) => ({ value: w.value, label: w.active ? w.label : `${w.label} (inactiva)` }))
  ];

  return (
    <Box sx={{ width: { xs: 180, sm: 280 }, mr: 1 }}>
      <SearchSelect
        value={activeWork ?? ''}
        onChange={(value) => value && selectWork(value)}
        options={options}
        label="Obra"
        hideLabel
        placeholder="Elige una obra"
        disableClearable
      />
    </Box>
  );
}
