import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconPlus, IconTrash } from '@tabler/icons-react';

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
  canAdd = true,
  canEdit = true,
  canRemove = true,
  addLabel = 'Agregar',
  emptyText = 'Sin registros.'
}) {
  const rows = Array.isArray(value) ? value : [];

  const setCell = (index, name, cellValue) => onChange(rows.map((row, i) => (i === index ? { ...row, [name]: cellValue } : row)));
  const removeRow = (index) => onChange(rows.filter((_, i) => i !== index));
  const addRow = () => onChange([...rows, newRow()]);

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

      {rows.map((row, index) => (
        <Grid container spacing={1.5} alignItems="center" key={row.key ?? index} sx={{ py: 0.75 }}>
          {columns.map((column) => (
            <Grid key={column.name} size={column.grid ?? { xs: 12, sm: true }}>
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
                  aria-label="Quitar"
                >
                  <IconTrash size={18} />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      ))}

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
  canAdd: PropTypes.bool,
  canEdit: PropTypes.bool,
  canRemove: PropTypes.bool,
  addLabel: PropTypes.string,
  emptyText: PropTypes.string
};
