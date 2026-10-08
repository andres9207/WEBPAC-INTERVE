import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import ActionButton from 'ui-component/extended/ActionButton';
import PolicyDialog from './PolicyDialog';
import { validityText } from './PoliciesTab';
import { fPercentText } from 'utils/formatNumber';

/**
 * Pólizas que se registran junto con el contrato (PRO-BE-09, ADR-0018):
 * tabla + diálogo, en memoria. El formulario del contrato las envía con él y
 * el servidor las crea en la misma transacción, sobre el valor inicial.
 *
 * - Una póliza por tipo: el diálogo no ofrece un tipo que ya esté en la lista.
 *   El servidor repite la regla.
 * - El valor asegurado no se muestra: lo calcula el servidor al guardar.
 * - El botón "Agregar póliza" va en el encabezado de su FormSection
 *   (`adding` / `onAddingChange`), igual que ContactsEditor.
 *
 * Filas: `{ key, pltId, typeName, insId, insurerName, number, percentage, startDate, endDate, observation }`.
 */

let rowSeq = 0;
const rowKey = () => `p-new-${(rowSeq += 1)}`;

export default function PoliciesDraftEditor({ value, onChange, disabled = false, adding = false, onAddingChange }) {
  const rows = Array.isArray(value) ? value : [];
  // Editar una: `{ row }`. Agregar lo pide el encabezado de la sección (`adding`).
  const [dialog, setDialog] = useState(null);
  const open = Boolean(dialog) || adding;
  const editing = dialog?.row ?? null;

  // Estable: PolicyDialog reinicia su formulario cuando cambia onClose.
  const close = useCallback(() => {
    setDialog(null);
    onAddingChange?.(false);
  }, [onAddingChange]);

  const save = (values) => {
    if (editing) onChange(rows.map((r) => (r.key === editing.key ? { ...values, key: r.key } : r)));
    else onChange([...rows, { ...values, key: rowKey() }]);
    close();
  };

  const remove = (row) => onChange(rows.filter((r) => r.key !== row.key));

  return (
    <Stack spacing={1}>
      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Aseguradora</TableCell>
              <TableCell>Número</TableCell>
              <TableCell align="right">Porcentaje</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell align="center" sx={{ width: 120 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Sin pólizas. Son opcionales: también se registran después, desde el contrato.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>{row.typeName || '—'}</TableCell>
                  <TableCell>{row.insurerName || '—'}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell align="right">{fPercentText(row.percentage)}</TableCell>
                  <TableCell>{validityText(row)}</TableCell>
                  <TableCell align="center">
                    {disabled ? (
                      '—'
                    ) : (
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <ActionButton
                          item={{ label: `Editar póliza ${row.number}`, icon: <IconEdit size={16} />, tone: 'edit' }}
                          onClick={() => setDialog({ row })}
                          size="small"
                        />
                        <ActionButton
                          item={{ label: `Quitar póliza ${row.number}`, icon: <IconTrash size={16} />, tone: 'danger' }}
                          onClick={() => remove(row)}
                          size="small"
                        />
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PolicyDialog
        open={open}
        draft={editing}
        takenTypes={rows.filter((r) => r.key !== editing?.key).map((r) => r.pltId)}
        onClose={close}
        onDraft={save}
      />
    </Stack>
  );
}

PoliciesDraftEditor.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  /** El encabezado de la sección pidió agregar una: abre el diálogo vacío. */
  adding: PropTypes.bool,
  /** Avisa que el diálogo de alta se cerró (`false`). */
  onAddingChange: PropTypes.func
};
