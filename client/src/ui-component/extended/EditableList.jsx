import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconArrowDown, IconArrowUp, IconPlus, IconTrash } from '@tabler/icons-react';

/**
 * Colección editable en memoria (alta, modificación y baja) de filas con los
 * mismos campos: las partes de un agregado que se guardan junto con su padre
 * en una sola petición (responsables y etapas de obra; más adelante, los
 * contactos de obra y de proveedor). El servidor calcula el diferencial.
 *
 * Se monta en GenericFormSection con `type: 'custom'`: recibe `value` y
 * `onChange` de react-hook-form, y la validación de la lista completa va en
 * `validation.validate` del campo (su mensaje se muestra debajo).
 *
 * `orderField`: la posición de la fila es su orden. Se mueve con flechas y el
 * campo se renumera solo (1, 2, 3…) en cada cambio; no se escribe a mano.
 *
 * Los permisos solo ocultan o deshabilitan (FRONTEND_STANDARD, regla 1): el
 * servidor exige el permiso de lo que realmente cambia.
 */
export default function EditableList({
  value,
  onChange,
  error,
  disabled = false,
  columns,
  newRow,
  orderField,
  canAdd = true,
  canEdit = true,
  canRemove = true,
  addLabel = 'Agregar',
  emptyText = 'Sin registros.',
  rowLabel = 'Fila'
}) {
  const rows = Array.isArray(value) ? value : [];

  const renumber = (list) => (orderField ? list.map((row, i) => ({ ...row, [orderField]: i + 1 })) : list);
  const commit = (list) => onChange(renumber(list));

  const setCell = (index, name, cellValue) => commit(rows.map((row, i) => (i === index ? { ...row, [name]: cellValue } : row)));
  const removeRow = (index) => commit(rows.filter((_, i) => i !== index));
  const addRow = () => commit([...rows, newRow()]);
  const moveRow = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const list = [...rows];
    [list[index], list[target]] = [list[target], list[index]];
    commit(list);
  };

  const renderCell = (column, row, index) => {
    const cellDisabled = disabled || !canEdit || (column.disabled?.(row) ?? false);
    const cellValue = row[column.name] ?? '';

    if (column.type === 'select') {
      const options = typeof column.options === 'function' ? column.options(row, rows) : column.options;
      return (
        <Autocomplete
          value={options.find((o) => o.value === cellValue) ?? null}
          onChange={(_, option) => setCell(index, column.name, option?.value ?? '')}
          options={options}
          getOptionLabel={(option) => option.label ?? ''}
          isOptionEqualToValue={(option, selected) => option.value === selected.value}
          disableClearable
          disabled={cellDisabled}
          size="small"
          fullWidth
          noOptionsText="Sin opciones"
          renderInput={(params) => <TextField {...params} label={column.label} />}
        />
      );
    }

    return (
      <TextField
        value={cellValue}
        onChange={(e) => setCell(index, column.name, column.type === 'number' ? e.target.value.replace(/\D/g, '') : e.target.value)}
        label={column.label}
        disabled={cellDisabled}
        size="small"
        fullWidth
        slotProps={{
          htmlInput: { maxLength: column.maxLength ?? 100, inputMode: column.type === 'number' ? 'numeric' : 'text', autoComplete: 'off' }
        }}
      />
    );
  };

  return (
    <Box>
      {rows.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
          {emptyText}
        </Typography>
      )}

      <Stack spacing={{ xs: 1.5, sm: 0 }}>
        {rows.map((row, index) => {
          const position = `${rowLabel} ${index + 1}`;
          return (
            <Box
              key={row.key ?? index}
              // En teléfono cada fila es un bloque con borde: se distingue dónde empieza la siguiente.
              sx={{
                py: { xs: 1.5, sm: 0.75 },
                px: { xs: 1.5, sm: 0 },
                border: { xs: '1px solid', sm: 'none' },
                borderColor: { xs: 'divider' },
                borderRadius: 1
              }}
            >
              <Grid container spacing={1.5} alignItems="center">
                {orderField && (
                  <Grid size={{ xs: 12, sm: 'auto' }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 20, textAlign: 'center' }}>
                        {index + 1}
                      </Typography>
                      <IconButton
                        size="small"
                        aria-label={`Subir ${position}`}
                        onClick={() => moveRow(index, -1)}
                        disabled={disabled || !canEdit || index === 0}
                      >
                        <IconArrowUp size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label={`Bajar ${position}`}
                        onClick={() => moveRow(index, 1)}
                        disabled={disabled || !canEdit || index === rows.length - 1}
                      >
                        <IconArrowDown size={18} />
                      </IconButton>
                    </Stack>
                  </Grid>
                )}
                {columns.map((column) => (
                  <Grid key={column.name} size={column.grid ?? { xs: 12, sm: 'grow' }}>
                    {renderCell(column, row, index)}
                  </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 'auto' }} sx={{ textAlign: 'right' }}>
                  <Tooltip title="Quitar">
                    <span>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => removeRow(index)}
                        disabled={disabled || !canRemove}
                        aria-label={`Quitar ${position}`}
                      >
                        <IconTrash size={18} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Stack>

      {error && <FormHelperText error>{error.message}</FormHelperText>}

      {canAdd && !disabled && (
        <Button size="small" startIcon={<IconPlus size={16} />} onClick={addRow} sx={{ mt: 1 }}>
          {addLabel}
        </Button>
      )}
    </Box>
  );
}

EditableList.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  /**
   * Campos de cada fila: `{ name, label, type: 'text' | 'number' | 'select', options, grid, maxLength, disabled(row) }`.
   * `options` de un select puede ser una función `(row, rows) => [{ value, label }]`.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number', 'select']),
      options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      grid: PropTypes.object,
      maxLength: PropTypes.number,
      disabled: PropTypes.func
    })
  ).isRequired,
  /** Fila vacía al agregar. */
  newRow: PropTypes.func.isRequired,
  /** Campo que guarda la posición (1, 2, 3…); muestra flechas para reordenar. */
  orderField: PropTypes.string,
  canAdd: PropTypes.bool,
  canEdit: PropTypes.bool,
  canRemove: PropTypes.bool,
  addLabel: PropTypes.string,
  emptyText: PropTypes.string,
  /** Nombre de una fila para los botones accesibles: "Subir Etapa 2". */
  rowLabel: PropTypes.string
};
