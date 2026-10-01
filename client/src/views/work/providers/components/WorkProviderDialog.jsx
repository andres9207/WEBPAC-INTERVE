import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { getProvidersSelectAPI, workProvidersApi } from 'api/requests/providersApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { STATUS_OPTIONS } from 'utils/constants';

/**
 * Asignar un proveedor existente a la obra, o editar una asignación
 * (ADR-0012, decisiones 2 y 10). Se guarda al momento, con endpoint propio
 * (DEC-031): no espera al guardado de la obra.
 *
 * - Asignar: búsqueda remota por razón social o documento entre los activos
 *   que todavía no están en la obra. `preset` llega del flujo "crear nuevo"
 *   cuando el documento ya existía: el proveedor viene elegido.
 * - Editar: el proveedor no cambia; sí la fecha, las observaciones y el estado
 *   de la asignación, que es independiente del estado del proveedor.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');

export default function WorkProviderDialog({ open, wrkId, assignment, preset, onClose, onSaved }) {
  const isEdit = Boolean(assignment);
  const [form, setForm] = useState({ prvId: '', assignmentDate: '', observation: '', staId: 1 });
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  // Opción elegida: se conserva aunque una búsqueda nueva no la traiga.
  const [chosen, setChosen] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setSearch('');
    setInputValue('');
    setIdempotencyKey(isEdit ? null : newIdempotencyKey());
    setForm(
      isEdit
        ? {
            prvId: assignment.prvId,
            assignmentDate: assignment.assignmentDate,
            observation: assignment.observation ?? '',
            staId: assignment.staId
          }
        : { prvId: preset?.prvId ?? '', assignmentDate: today(), observation: '', staId: 1 }
    );
    setOptions([]);
    setChosen(
      preset ? { ...preset, value: preset.prvId, label: `${preset.name} · ${preset.identityCode ?? ''} ${preset.identification}` } : null
    );
  }, [open, isEdit, assignment, preset]);

  // Búsqueda en el servidor (tope de 100), al dejar de escribir.
  useEffect(() => {
    if (!open || isEdit) return undefined;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await getProvidersSelectAPI({ wrkId, ...(search.trim() ? { search: search.trim() } : {}) });
        if (!cancelled) setOptions(data);
      } catch (err) {
        showError(err.response?.data?.message || 'Error al buscar proveedores');
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, isEdit, wrkId, search]);

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const save = async () => {
    const found = {};
    if (!form.prvId) found.prvId = 'Selecciona el proveedor.';
    if (!form.assignmentDate) found.assignmentDate = 'La fecha de asignación es requerida.';
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      const payload = { wrkId, prvId: form.prvId, assignmentDate: form.assignmentDate, observation: form.observation.trim() };
      const { data } = isEdit
        ? await workProvidersApi.update({ ...payload, staId: form.staId })
        : await workProvidersApi.assign(payload, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar la asignación');
    } finally {
      setSaving(false);
    }
  };

  const listed = chosen && !options.some((o) => o.value === chosen.value) ? [chosen, ...options] : options;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar asignación' : 'Agregar proveedor existente'}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={save} disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Asignar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        {isEdit ? (
          <TextField
            label="Proveedor"
            value={`${assignment.providerName} · ${assignment.identityCode ?? ''} ${assignment.identification}`}
            size="small"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        ) : (
          <Autocomplete
            value={chosen}
            onChange={(_, option) => {
              setChosen(option);
              set('prvId')(option?.value ?? '');
            }}
            inputValue={inputValue}
            onInputChange={(_, value, reason) => {
              setInputValue(value);
              if (reason === 'input') setSearch(value);
            }}
            options={listed}
            filterOptions={(list) => list}
            getOptionLabel={(option) => option.label ?? ''}
            isOptionEqualToValue={(option, current) => option.value === current.value}
            loading={searching}
            loadingText="Buscando…"
            noOptionsText={search ? `Sin proveedores activos para «${search}»` : 'Sin proveedores activos por asignar'}
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Proveedor"
                required
                placeholder="Busca por razón social o documento"
                error={Boolean(errors.prvId)}
                helperText={errors.prvId}
              />
            )}
          />
        )}
        <DateField
          value={form.assignmentDate}
          onChange={set('assignmentDate')}
          label="Fecha de asignación"
          required
          error={errors.assignmentDate}
        />
        <TextField
          value={form.observation}
          onChange={(e) => set('observation')(e.target.value)}
          label="Observaciones de esta participación"
          size="small"
          fullWidth
          multiline
          minRows={2}
          slotProps={{ htmlInput: { maxLength: 500 } }}
        />
        {isEdit && (
          <SearchSelect
            label="Estado de la asignación"
            value={form.staId}
            onChange={set('staId')}
            options={STATUS_OPTIONS}
            disableClearable
          />
        )}
        <Typography variant="caption" color="text.secondary">
          {isEdit
            ? 'Inactivar la asignación no cambia el proveedor ni sus otras obras.'
            : 'Solo proveedores activos que todavía no están en esta obra. Asignarlo no crea otro proveedor.'}
        </Typography>
      </Stack>
    </BaseDialog>
  );
}

WorkProviderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  wrkId: PropTypes.number.isRequired,
  /** Asignación a editar (fila de pagination_work_providers); null para asignar. */
  assignment: PropTypes.object,
  /** Proveedor ya elegido al llegar desde "crear nuevo" con un documento existente. */
  preset: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
