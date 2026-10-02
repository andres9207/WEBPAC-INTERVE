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
import { getAssignableWorksAPI, getProvidersSelectAPI, workProvidersApi } from 'api/requests/providersApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { STATUS_OPTIONS } from 'utils/constants';

/**
 * Asignar un proveedor a una obra, o editar una asignación (ADR-0012,
 * decisiones 2 y 10). Se guarda al momento, con endpoint propio (DEC-031): no
 * espera al guardado de la obra ni del proveedor.
 *
 * Se abre desde los dos lados, con los mismos endpoints:
 *   - desde la obra (`wrkId`): la obra es fija y se busca el proveedor entre
 *     los activos que todavía no están en ella. `preset` llega del flujo
 *     "crear nuevo" cuando el documento ya existía: el proveedor viene elegido.
 *   - desde el proveedor (`prvId`): el proveedor es fijo y se busca la obra
 *     entre las activas donde todavía no está.
 * Editar: ni la obra ni el proveedor cambian; sí la fecha, las observaciones y
 * el estado de la asignación, que es independiente del estado del proveedor.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');

export default function WorkProviderDialog({ open, wrkId, prvId, assignment, preset, onClose, onSaved }) {
  const isEdit = Boolean(assignment);
  // Lado desde el que se abre: qué se elige en el buscador.
  const fromProvider = Boolean(prvId) && !wrkId;
  const [form, setForm] = useState({ targetId: '', assignmentDate: '', observation: '', staId: 1 });
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
            targetId: fromProvider ? assignment.wrkId : assignment.prvId,
            assignmentDate: assignment.assignmentDate,
            observation: assignment.observation ?? '',
            staId: assignment.staId
          }
        : { targetId: preset?.prvId ?? '', assignmentDate: today(), observation: '', staId: 1 }
    );
    setOptions([]);
    setChosen(
      preset ? { ...preset, value: preset.prvId, label: `${preset.name} · ${preset.identityCode ?? ''} ${preset.identification}` } : null
    );
  }, [open, isEdit, fromProvider, assignment, preset]);

  // Búsqueda en el servidor (tope de 100), al dejar de escribir.
  useEffect(() => {
    if (!open || isEdit) return undefined;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const term = search.trim() ? { search: search.trim() } : {};
        const { data } = fromProvider ? await getAssignableWorksAPI({ prvId, ...term }) : await getProvidersSelectAPI({ wrkId, ...term });
        if (!cancelled) setOptions(data);
      } catch (err) {
        showError(err.response?.data?.message || (fromProvider ? 'Error al buscar obras' : 'Error al buscar proveedores'));
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, isEdit, fromProvider, wrkId, prvId, search]);

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const save = async () => {
    const found = {};
    if (!form.targetId) found.targetId = fromProvider ? 'Selecciona la obra.' : 'Selecciona el proveedor.';
    if (!form.assignmentDate) found.assignmentDate = 'La fecha de asignación es requerida.';
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      const pair = fromProvider ? { wrkId: form.targetId, prvId } : { wrkId, prvId: form.targetId };
      const payload = { ...pair, assignmentDate: form.assignmentDate, observation: form.observation.trim() };
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
  const targetLabel = fromProvider ? 'Obra' : 'Proveedor';
  const fixedText = isEdit
    ? fromProvider
      ? `${assignment.workCode} — ${assignment.workName}`
      : `${assignment.providerName} · ${assignment.identityCode ?? ''} ${assignment.identification}`
    : '';

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar asignación' : fromProvider ? 'Asignar a una obra' : 'Agregar proveedor existente'}
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
          <TextField label={targetLabel} value={fixedText} size="small" fullWidth slotProps={{ input: { readOnly: true } }} />
        ) : (
          <Autocomplete
            value={chosen}
            onChange={(_, option) => {
              setChosen(option);
              set('targetId')(option?.value ?? '');
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
            noOptionsText={
              fromProvider
                ? search
                  ? `Sin obras activas para «${search}»`
                  : 'Sin obras activas por asignar'
                : search
                  ? `Sin proveedores activos para «${search}»`
                  : 'Sin proveedores activos por asignar'
            }
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label={targetLabel}
                required
                placeholder={fromProvider ? 'Busca por código o nombre de la obra' : 'Busca por razón social o documento'}
                error={Boolean(errors.targetId)}
                helperText={errors.targetId}
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
            : fromProvider
              ? 'Solo obras activas donde el proveedor todavía no está.'
              : 'Solo proveedores activos que todavía no están en esta obra. Asignarlo no crea otro proveedor.'}
        </Typography>
      </Stack>
    </BaseDialog>
  );
}

WorkProviderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Obra fija: se elige el proveedor (pestaña Proveedores de la obra). */
  wrkId: PropTypes.number,
  /** Proveedor fijo: se elige la obra (pestaña Obras del proveedor). Se usa si no hay `wrkId`. */
  prvId: PropTypes.number,
  /** Asignación a editar (fila de pagination_work_providers, o de `works` del proveedor); null para asignar. */
  assignment: PropTypes.object,
  /** Proveedor ya elegido al llegar desde "crear nuevo" con un documento existente. */
  preset: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
