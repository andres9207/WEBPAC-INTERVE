import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import SelectSocket from 'ui-component/extended/SelectSocket';
import useIdentityCheck from './useIdentityCheck';
import { getIdentityDocumentsSelectAPI } from 'api/requests/identityDocumentsApi';
import { getProviderTypesSelectAPI } from 'api/requests/providerTypesApi';
import { providersApi } from 'api/requests/providersApi';
import { showError, showSuccess } from 'services/ToastService';
import { identificationFormatError } from 'utils/identification';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * "Crear proveedor nuevo" desde la obra (ADR-0012, decisiones 6 y 7): crea el
 * proveedor en el maestro y lo asigna a la obra en una sola petición.
 *
 * Los dos flujos convergen: si el documento ya existe —lo avisa la
 * verificación mientras se escribe, o el 409 del servidor si otro usuario lo
 * registró entretanto— no se crea nada y se ofrece asignar el existente.
 *
 * Solo los datos de identidad y los básicos; los contactos se agregan
 * después, en la ficha del proveedor.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { iddId: '', identification: '', name: '', pvtId: '', email: '', assignmentDate: '', observation: '' };

export default function NewProviderDialog({ open, wrkId, onClose, onSaved, onUseExisting }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [identityOptions, setIdentityOptions] = useState([]);
  const [conflict, setConflict] = useState(null);
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, assignmentDate: today() });
      setErrors({});
      setConflict(null);
      setIdempotencyKey(newIdempotencyKey());
    }
  }, [open]);

  // Estable (useCallback): SelectSocket recarga las opciones cuando cambia.
  const keepIdentityOptions = useCallback((options) => {
    setIdentityOptions(options);
    return options;
  }, []);
  const fetchIdentityDocuments = useCallback(() => getIdentityDocumentsSelectAPI(), []);
  const fetchProviderTypes = useCallback(() => getProviderTypesSelectAPI(), []);

  const identityFormat = identityOptions.find((o) => o.value === form.iddId)?.format;
  const { existing: found } = useIdentityCheck({
    iddId: form.iddId,
    identification: form.identification,
    format: identityFormat,
    enabled: open
  });
  const existing = conflict ?? found;

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    if (field === 'iddId' || field === 'identification') setConflict(null);
  };

  const validate = () => {
    const result = {};
    if (!form.iddId) result.iddId = 'Selecciona el tipo de identificación.';
    if (!form.identification.trim()) result.identification = 'El número de documento es requerido.';
    else {
      const reason = identificationFormatError(identityFormat, form.identification);
      if (reason) result.identification = reason;
    }
    if (!form.name.trim()) result.name = 'El nombre o razón social es requerido.';
    if (!form.pvtId) result.pvtId = 'Selecciona el tipo de proveedor.';
    if (form.email.trim() && !EMAIL.test(form.email.trim())) result.email = 'Correo inválido.';
    if (!form.assignmentDate) result.assignmentDate = 'La fecha de asignación es requerida.';
    return result;
  };

  const save = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0 || existing) return;

    setSaving(true);
    try {
      const payload = {
        prvId: 0,
        iddId: form.iddId,
        identification: form.identification.trim(),
        name: form.name.trim(),
        pvtId: form.pvtId,
        email: form.email.trim(),
        contacts: [],
        assignment: { wrkId, assignmentDate: form.assignmentDate, observation: form.observation.trim() }
      };
      const { data } = await providersApi.save(payload, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      const duplicate = err.response?.status === 409 && err.response?.data?.data?.existing;
      if (duplicate) setConflict(duplicate);
      else showError(err.response?.data?.message || 'No se pudo crear el proveedor');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Crear proveedor nuevo"
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={save} disabled={saving || Boolean(existing)}>
            {saving ? 'Guardando…' : 'Crear y asignar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <SelectSocket
            value={form.iddId}
            onChange={set('iddId')}
            label="Tipo de identificación"
            required
            error={errors.iddId ? { message: errors.iddId } : undefined}
            fetchApi={fetchIdentityDocuments}
            mapOptions={keepIdentityOptions}
            socketEvent="refresh-identity-documents"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <TextField
            value={form.identification}
            onChange={(e) => set('identification')(e.target.value)}
            label="Número de documento"
            required
            size="small"
            fullWidth
            error={Boolean(errors.identification)}
            helperText={errors.identification}
            slotProps={{ htmlInput: { maxLength: 20, autoComplete: 'off' } }}
          />
        </Grid>

        {existing && (
          <Grid size={{ xs: 12 }}>
            <Alert
              severity="info"
              role="status"
              action={
                existing.staId === 1 ? (
                  <Button color="inherit" size="small" onClick={() => onUseExisting(existing)}>
                    Asignar este proveedor
                  </Button>
                ) : null
              }
            >
              Ya existe: <strong>{existing.name}</strong> ({existing.identityCode} {existing.identification}).{' '}
              {existing.staId === 1 ? 'No se crea otro: asígnalo a la obra.' : 'Está inactivo: actívalo en Proveedores para asignarlo.'}
            </Alert>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <TextField
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
            label="Nombre o razón social"
            required
            size="small"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
            slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SelectSocket
            value={form.pvtId}
            onChange={set('pvtId')}
            label="Tipo de proveedor"
            required
            error={errors.pvtId ? { message: errors.pvtId } : undefined}
            fetchApi={fetchProviderTypes}
            socketEvent="refresh-provider-types"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={form.email}
            onChange={(e) => set('email')(e.target.value)}
            label="Correo"
            type="email"
            size="small"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
            slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Participación en la obra
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }}>
          <DateField
            value={form.assignmentDate}
            onChange={set('assignmentDate')}
            label="Fecha de asignación"
            required
            error={errors.assignmentDate}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <TextField
            value={form.observation}
            onChange={(e) => set('observation')(e.target.value)}
            label="Observaciones"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { maxLength: 500 } }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="caption" color="text.secondary">
            Los contactos y el resto de datos se completan después en la ficha del proveedor.
          </Typography>
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

NewProviderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  wrkId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  /** Documento ya registrado: abre la asignación con ese proveedor elegido. */
  onUseExisting: PropTypes.func.isRequired
};
