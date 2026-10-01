import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

import ActionButton from 'ui-component/extended/ActionButton';
import BaseDialog from 'ui-component/extended/BaseDialog';
import SelectSocket from 'ui-component/extended/SelectSocket';
import { getAddressTypesSelectAPI } from 'api/requests/addressTypesApi';

/**
 * Contactos de una entidad (ADR-0009): tabla + diálogo, editados en memoria y
 * guardados con su padre en una sola petición. Hoy los usa el proveedor; los
 * contactos de obra (PRO-BD-04) reutilizan este mismo componente.
 *
 * - Cada contacto: tipo de dirección (obligatorio), persona, cargo, dirección,
 *   teléfono, celular, fax, correo y observaciones, con al menos un medio de
 *   contacto (dirección, teléfono, celular o correo).
 * - "Principal" es una marca, no un tipo, y hay a lo sumo uno: marcar uno la
 *   quita de los demás. El servidor y la BD repiten ambas reglas.
 * - El tipo de dirección se elige entre los activos; el que ya tenía el
 *   contacto se conserva aunque esté inactivo (ADR-0009, decisión 9).
 *
 * Filas: `{ key, prcId?, adtId, addressType, name, position, address, phone, mobile, fax, email, observation, main }`.
 */

const EMPTY = {
  adtId: '',
  addressType: '',
  name: '',
  position: '',
  address: '',
  phone: '',
  mobile: '',
  fax: '',
  email: '',
  observation: '',
  main: false
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value) => String(value ?? '').trim();

let rowSeq = 0;
const rowKey = () => `c-new-${(rowSeq += 1)}`;

const channelsOf = (row) => [row.address, row.phone, row.mobile, row.email].map(text).filter(Boolean);

const validate = (form) => {
  const errors = {};
  if (!form.adtId) errors.adtId = 'Selecciona el tipo de dirección.';
  if (channelsOf(form).length === 0) errors.channel = 'Agrega al menos una dirección, un teléfono, un celular o un correo.';
  if (text(form.email) && !EMAIL.test(text(form.email))) errors.email = 'Correo inválido.';
  return errors;
};

const FIELDS = [
  { name: 'name', label: 'Persona de contacto', maxLength: 150, grid: { xs: 12, sm: 7 } },
  { name: 'position', label: 'Cargo', maxLength: 100, grid: { xs: 12, sm: 5 } },
  { name: 'address', label: 'Dirección', maxLength: 255, grid: { xs: 12 } },
  { name: 'phone', label: 'Teléfono', maxLength: 20, grid: { xs: 12, sm: 4 }, inputMode: 'tel' },
  { name: 'mobile', label: 'Celular', maxLength: 20, grid: { xs: 12, sm: 4 }, inputMode: 'tel' },
  { name: 'fax', label: 'Fax', maxLength: 20, grid: { xs: 12, sm: 4 }, inputMode: 'tel' },
  { name: 'email', label: 'Correo', maxLength: 255, grid: { xs: 12 }, type: 'email' },
  { name: 'observation', label: 'Observaciones', maxLength: 500, grid: { xs: 12 }, multiline: true }
];

function ContactDialog({ open, contact, onClose, onSave }) {
  const isEdit = Boolean(contact?.key);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, ...(contact ?? {}) });
      setErrors({});
    }
  }, [open, contact]);

  // El tipo que ya tenía el contacto se incluye aunque esté inactivo.
  const originalAdtId = contact?.prcId ? contact.adtId : undefined;
  const fetchAddressTypes = useCallback(() => getAddressTypesSelectAPI(originalAdtId), [originalAdtId]);

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const save = () => {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) onSave(form);
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar contacto' : 'Agregar contacto'}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={save}>
            {isEdit ? 'Guardar' : 'Agregar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <SelectSocket
            value={form.adtId}
            onChange={(value) => {
              set('adtId')(value);
              setErrors((e) => ({ ...e, adtId: undefined }));
            }}
            onOptionChange={(option) => set('addressType')(option.label)}
            label="Tipo de dirección"
            required
            error={errors.adtId ? { message: errors.adtId } : undefined}
            fetchApi={fetchAddressTypes}
            socketEvent="refresh-address-types"
          />
        </Grid>
        {FIELDS.map((field) => (
          <Grid key={field.name} size={field.grid}>
            <TextField
              value={form[field.name] ?? ''}
              onChange={(e) => set(field.name)(e.target.value)}
              label={field.label}
              size="small"
              fullWidth
              type={field.type ?? 'text'}
              multiline={field.multiline}
              minRows={field.multiline ? 2 : undefined}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              slotProps={{ htmlInput: { maxLength: field.maxLength, inputMode: field.inputMode, autoComplete: 'off' } }}
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          {errors.channel && <FormHelperText error>{errors.channel}</FormHelperText>}
          <FormControlLabel
            control={<Switch checked={Boolean(form.main)} onChange={(e) => set('main')(e.target.checked)} />}
            label="Contacto principal"
          />
          <Typography variant="caption" color="text.secondary" component="p">
            Solo uno puede ser el principal: marcar este lo quita del anterior.
          </Typography>
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

ContactDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  contact: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default function ContactsEditor({ value, onChange, error, disabled = false }) {
  const rows = Array.isArray(value) ? value : [];
  const [dialog, setDialog] = useState(null);

  const save = (form) => {
    const row = form.key ? form : { ...form, key: rowKey() };
    const list = form.key ? rows.map((r) => (r.key === form.key ? row : r)) : [...rows, row];
    onChange(row.main ? list.map((r) => (r.key === row.key ? r : { ...r, main: false })) : list);
    setDialog(null);
  };

  const remove = (row) => onChange(rows.filter((r) => r.key !== row.key));

  return (
    <Stack spacing={1}>
      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Medios</TableCell>
              <TableCell align="center" sx={{ width: 120 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Sin contactos.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{row.addressType || '—'}</span>
                      {row.main && <Chip label="Principal" size="small" color="primary" />}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
                      {text(row.name) || '—'}
                    </Typography>
                    {text(row.position) && (
                      <Typography variant="caption" color="text.secondary">
                        {row.position}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {channelsOf(row).join(' · ')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {disabled ? (
                      '—'
                    ) : (
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <ActionButton
                          item={{
                            label: `Editar contacto ${text(row.name) || row.addressType}`,
                            icon: <IconEdit size={16} />,
                            tone: 'edit'
                          }}
                          onClick={() => setDialog({ contact: row })}
                          size="small"
                        />
                        <ActionButton
                          item={{
                            label: `Quitar contacto ${text(row.name) || row.addressType}`,
                            icon: <IconTrash size={16} />,
                            tone: 'danger'
                          }}
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
      {error && <FormHelperText error>{error.message}</FormHelperText>}
      {!disabled && (
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<IconPlus size={16} />}
          onClick={() => setDialog({ contact: null })}
          sx={{ alignSelf: 'flex-start' }}
        >
          Agregar contacto
        </Button>
      )}

      <ContactDialog open={Boolean(dialog)} contact={dialog?.contact} onClose={() => setDialog(null)} onSave={save} />
    </Stack>
  );
}

ContactsEditor.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  /** Error de la lista completa (react-hook-form): `{ message }`. */
  error: PropTypes.object,
  disabled: PropTypes.bool
};
