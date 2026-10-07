import { useState } from 'react';
import PropTypes from 'prop-types';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { IconFilter } from '@tabler/icons-react';

import FilterPopper from 'ui-component/extended/FilterPopper';

/**
 * Botón "Filtros" de un listado (DEC-048), con el número de filtros activos,
 * que abre FilterPopper. Recibe el estado de `useListFilters`.
 */
export default function FilterButton({ fields, values, setValues, active }) {
  const [anchor, setAnchor] = useState(null);

  return (
    <>
      <Badge badgeContent={active} color="secondary">
        <Button
          variant="outlined"
          color={active > 0 ? 'primary' : 'inherit'}
          size="small"
          startIcon={<IconFilter size={16} />}
          onClick={(event) => setAnchor(event.currentTarget)}
          aria-haspopup="dialog"
          aria-expanded={Boolean(anchor)}
        >
          Filtros
        </Button>
      </Badge>
      <FilterPopper
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        filters={fields.map((field) => ({ ...field, filtro: values[field.key] }))}
        setFilters={setValues}
      />
    </>
  );
}

FilterButton.propTypes = {
  /** Campos en el formato de FilterPopper: `{ key, type, label, props?, grid? }`. */
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  setValues: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired
};
