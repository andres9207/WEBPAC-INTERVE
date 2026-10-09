import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { getProviderTypeFieldsAPI, saveProviderTypeFieldsAPI } from 'api/requests/providerTypesApi';
import { showError, showSuccess } from 'services/ToastService';

/**
 * Editor de la configuración de los campos del contrato de un tipo de
 * proveedor (ADR-0006, DEC-053): una matriz con los campos del catálogo que
 * entrega el servidor, con tres casillas por fila y el orden. Un proveedor
 * con varios tipos toma la unión: un campo aplica, se ve o es obligatorio si
 * lo es en alguno de ellos.
 *
 * - Jerarquía estricta: sin "Aplica" no se puede marcar "Visible", y sin
 *   "Visible" no se puede marcar "Obligatorio". Desmarcar una casilla
 *   desmarca las que dependen de ella. El servidor la vuelve a exigir.
 * - Sin el permiso "Configurar campos" (`readOnly`), la matriz se ve pero no
 *   se edita.
 * - Guardar envía la configuración completa; si algo cambió, el servidor sube
 *   la versión. Vale para los contratos nuevos y las ediciones de los
 *   proveedores del tipo; un valor ya guardado que deja de aplicar se conserva
 *   como heredado.
 */

const GROUP_NAMES = { CONTRACT: 'Datos del contrato', CONCEPT: 'Valor (valor inicial, otrosí y liquidación)' };
const DATA_TYPE_NAMES = { SELECT: 'Lista', TEXT: 'Texto', TEXTAREA: 'Texto largo', PERCENT: 'Porcentaje' };

const toRow = (field) => ({ ...field, order: String(field.order) });

/** Aplica la jerarquía al cambiar una casilla. */
const toggle = (row, attribute, checked) => {
  if (attribute === 'applies') return { ...row, applies: checked, visible: checked, required: checked ? row.required : false };
  if (attribute === 'visible') return { ...row, visible: checked, required: checked ? row.required : false };
  return { ...row, required: checked };
};

const validOrder = (value) => /^\d{1,3}$/.test(value);

export default function ProviderTypeFieldsDialog({ open, providerType, readOnly, onClose }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!open || !providerType) return;
    let cancelled = false;
    setLoading(true);
    getProviderTypeFieldsAPI(providerType.pvtId)
      .then(({ data }) => {
        if (cancelled) return;
        setConfig(data);
        setRows(data.fields.map(toRow));
      })
      .catch((err) => {
        showError(err.response?.data?.message || 'No se pudo cargar la configuración');
        onClose();
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [open, providerType, onClose]);

  const change = (cfdId, attribute, value) =>
    setRows((current) =>
      current.map((row) => {
        if (row.cfdId !== cfdId) return row;
        return attribute === 'order' ? { ...row, order: value.replace(/\D/g, '').slice(0, 3) } : toggle(row, attribute, value);
      })
    );

  const invalid = rows.some((row) => !validOrder(row.order));
  const applying = rows.filter((row) => row.applies).length;

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await saveProviderTypeFieldsAPI({
        pvtId: providerType.pvtId,
        fields: rows.map(({ cfdId, applies, visible, required, order }) => ({ cfdId, applies, visible, required, order: Number(order) }))
      });
      showSuccess(data.message);
      onClose();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar la configuración');
    } finally {
      setSaving(false);
    }
  };

  const groups = Object.keys(GROUP_NAMES).map((group) => ({ group, rows: rows.filter((row) => row.group === group) }));

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Campos del contrato del tipo «${providerType?.name ?? ''}»`}
      maxWidth="md"
      fullScreenOnMobile
      loading={loading || !config}
      actions={
        readOnly ? (
          <Button onClick={onClose}>Cerrar</Button>
        ) : (
          <>
            <Button onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button variant="contained" color="secondary" onClick={save} disabled={saving || invalid}>
              {saving ? 'Guardando…' : 'Guardar configuración'}
            </Button>
          </>
        )
      }
    >
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Versión vigente: <strong>{config?.configVersion}</strong>. {applying} de {rows.length} campos aplican. Obra, proveedor, número,
          nombre, fechas, plazo y costo directo aplican siempre: no se configuran.
        </Typography>
        {!readOnly && (
          <Alert severity="info">
            Los cambios valen para los contratos nuevos y las ediciones de todos los proveedores de este tipo, también los vigentes. Un
            proveedor con varios tipos toma la unión. Los valores ya guardados se conservan: un campo que deja de aplicar se sigue mostrando
            en solo lectura, marcado como heredado.
          </Alert>
        )}
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" aria-label="Configuración de campos">
            <TableHead>
              <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="center">Aplica</TableCell>
                <TableCell align="center">Visible</TableCell>
                <TableCell align="center">Obligatorio</TableCell>
                <TableCell align="right">Orden</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map(({ group, rows: groupRows }) => [
                <TableRow key={group}>
                  <TableCell colSpan={6} sx={{ bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2">{GROUP_NAMES[group]}</Typography>
                  </TableCell>
                </TableRow>,
                ...groupRows.map((row) => (
                  <TableRow key={row.cfdId} hover>
                    <TableCell>
                      <Typography variant="body2" color={row.applies ? 'text.primary' : 'text.secondary'}>
                        {row.label}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {DATA_TYPE_NAMES[row.dataType] ?? row.dataType}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.applies}
                        disabled={readOnly}
                        onChange={(e) => change(row.cfdId, 'applies', e.target.checked)}
                        slotProps={{ input: { 'aria-label': `${row.label}: aplica` } }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.visible}
                        disabled={readOnly || !row.applies}
                        onChange={(e) => change(row.cfdId, 'visible', e.target.checked)}
                        slotProps={{ input: { 'aria-label': `${row.label}: visible` } }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.required}
                        disabled={readOnly || !row.visible}
                        onChange={(e) => change(row.cfdId, 'required', e.target.checked)}
                        slotProps={{ input: { 'aria-label': `${row.label}: obligatorio` } }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        value={row.order}
                        onChange={(e) => change(row.cfdId, 'order', e.target.value)}
                        disabled={readOnly || !row.applies}
                        error={!validOrder(row.order)}
                        size="small"
                        sx={{ width: 72 }}
                        slotProps={{
                          htmlInput: {
                            inputMode: 'numeric',
                            'aria-label': `${row.label}: orden`,
                            style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ])}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary">
          Aplica: el campo tiene sentido para los contratos de los proveedores del tipo; si no aplica, no se muestra ni se acepta valor.
          Visible: se muestra en el formulario; un campo que aplica y no se ve toma el valor por defecto (IVA 19 %, anticipo 15 %, el resto
          0). Obligatorio: debe tener valor para guardar.
        </Typography>
      </Stack>
    </BaseDialog>
  );
}

ProviderTypeFieldsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Fila del listado: `{ pvtId, name }`. */
  providerType: PropTypes.object,
  /** Sin el permiso "Configurar campos": solo ver. */
  readOnly: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
