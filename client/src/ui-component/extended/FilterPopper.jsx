import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { IconClearAll, IconX } from '@tabler/icons-react';

import SearchSelect from 'ui-component/extended/SearchSelect';
import SelectSocket from 'ui-component/extended/SelectSocket';

/**
 * Filtros de un listado en un panel flotante (DEC-048): un campo por filtro y
 * el botón Limpiar. Controlado: muestra `filters[i].filtro` y avisa cada
 * cambio con `setFilters` (forma de setState); quien lo usa decide cuándo
 * pedir al servidor (MasterPage espera a que se deje de escribir).
 *
 * Tipos de campo (`type`):
 * - `input`: texto.
 * - `dropdown`: lista cerrada (`props.options`), con buscador (SearchSelect).
 * - `socketDropdown`: maestro que se carga con `fetchApi` y se recarga con
 *   `socketEvent` (SelectSocket).
 * - `multiSelect`: varias opciones de `props.options`.
 * - `calendar`: una fecha. `calendar-range`: desde y hasta, como `[desde, hasta]`.
 * - `selectButton`: botones exclusivos con `props.options`.
 * - `chips`: lista libre de textos.
 */

const normalizeOptions = (options = []) =>
  options.map((option) => {
    if (option && typeof option === 'object') {
      return {
        value: option.value ?? option.id ?? option,
        label: option.label ?? option.name ?? String(option.value ?? option.id ?? option)
      };
    }
    return { value: option, label: String(option) };
  });

const FilterPopper = ({ anchorEl, open, onClose, filters, setFilters, initialFilters = {}, width = 560, title = 'Filtros' }) => {
  const updateFilter = (fieldKey, value) => setFilters((prev) => ({ ...prev, [fieldKey]: value }));

  const clearFilters = () => setFilters(initialFilters);

  const renderField = (filter) => {
    const value = filter.filtro ?? '';
    const options = normalizeOptions(filter.props?.options || []);

    switch (filter.type) {
      case 'dropdown':
        return <SearchSelect value={value} onChange={(next) => updateFilter(filter.key, next)} options={options} label={filter.label} />;
      case 'socketDropdown':
        return (
          <SelectSocket
            value={value}
            onChange={(next) => updateFilter(filter.key, next)}
            label={filter.label}
            fetchApi={filter.fetchApi}
            socketEvent={filter.socketEvent}
          />
        );
      case 'multiSelect':
        return (
          <SearchSelect
            multiple
            value={Array.isArray(value) ? value : []}
            onChange={(next) => updateFilter(filter.key, next)}
            options={options}
            label={filter.label}
          />
        );
      case 'input':
        return (
          <TextField
            fullWidth
            size="small"
            label={filter.label}
            value={value}
            onChange={(event) => updateFilter(filter.key, event.target.value)}
            slotProps={{ htmlInput: { maxLength: filter.props?.maxLength } }}
          />
        );
      case 'calendar':
        return (
          <TextField
            fullWidth
            size="small"
            type="date"
            label={filter.label}
            value={value}
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={(event) => updateFilter(filter.key, event.target.value)}
          />
        );
      case 'calendar-range': {
        const range = Array.isArray(value) ? value : ['', ''];
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              {filter.label}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label={filter.props?.labelFrom || 'Desde'}
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: range[1] || undefined } }}
                value={range[0] || ''}
                onChange={(event) => updateFilter(filter.key, [event.target.value, range[1] || ''])}
              />
              <TextField
                fullWidth
                size="small"
                type="date"
                label={filter.props?.labelTo || 'Hasta'}
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: range[0] || undefined } }}
                value={range[1] || ''}
                onChange={(event) => updateFilter(filter.key, [range[0] || '', event.target.value])}
              />
            </Box>
          </Box>
        );
      }
      case 'selectButton':
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              {filter.label}
            </Typography>
            <ToggleButtonGroup
              fullWidth
              size="small"
              exclusive
              value={value || null}
              onChange={(_, next) => updateFilter(filter.key, next ?? '')}
            >
              {options.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                  {option.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        );
      case 'chips':
        return (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={Array.isArray(value) ? value : []}
            onChange={(_, next) => updateFilter(filter.key, next)}
            renderValue={(tagValue, getItemProps) =>
              tagValue.map((option, index) => {
                const { key, ...itemProps } = getItemProps({ index });
                return <Chip key={key} label={option} size="small" {...itemProps} />;
              })
            }
            renderInput={(params) => <TextField {...params} label={filter.label} size="small" />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: {
            width: { xs: 'calc(100vw - 32px)', sm: width },
            maxWidth: 'calc(100vw - 32px)',
            p: 2,
            boxShadow: 6,
            borderRadius: 2
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton size="small" onClick={onClose} aria-label="Cerrar filtros">
          <IconX size={18} />
        </IconButton>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        {filters.map((filter) => (
          <Grid key={filter.key} size={filter.grid ?? { xs: 12 }} sx={{ minWidth: 0 }}>
            {renderField(filter)}
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', mt: 2 }}>
        <Button size="small" startIcon={<IconClearAll size={16} />} onClick={clearFilters} variant="outlined">
          Limpiar
        </Button>
      </Stack>
    </Popover>
  );
};

FilterPopper.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filtro: PropTypes.any,
      props: PropTypes.object,
      grid: PropTypes.object,
      fetchApi: PropTypes.func,
      socketEvent: PropTypes.string
    })
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
  initialFilters: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string
};

export default FilterPopper;
