import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import { suspendContractAPI } from 'api/requests/contractsApi';
import { getReasonsSelectAPI } from 'api/requests/reasonsApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fDateOnly } from 'utils/formatTime';

/**
 * Suspender un contrato en ejecución (ADR-0017, decisión 8; DEC-039). Captura
 * motivo, fecha, condición de levantamiento, observación y si genera informe
 * de interventoría. La fecha de reanudación no se pide aquí: la trae el
 * otrosí que reanuda el contrato. Las reglas (estado, fechas, motivo activo)
 * las verifica el servidor; aquí solo se avisa antes de enviar.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');
const EMPTY = { reaId: '', suspensionDate: '', liftCondition: '', observation: '', requiresReport: false };

export default function SuspendDialog({ open, contract, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [reasons, setReasons] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    setIdempotencyKey(newIdempotencyKey());
    reset({ ...EMPTY, suspensionDate: today() });
    setReasons(null);
    getReasonsSelectAPI('SUSPENSION')
      .then(({ data }) => !cancelled && setReasons(data))
      .catch((err) => {
        showError(err.response?.data?.message || 'Error al cargar los motivos de suspensión');
        onClose();
      });
    return () => {
      cancelled = true;
    };
  }, [open, reset, onClose]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await suspendContractAPI(
        {
          ctrId: contract.ctrId,
          reaId: form.reaId,
          suspensionDate: form.suspensionDate,
          liftCondition: form.liftCondition.trim(),
          observation: form.observation.trim(),
          requiresReport: form.requiresReport
        },
        idempotencyKey
      );
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo suspender el contrato');
    } finally {
      setSaving(false);
    }
  };

  const noReasons = Array.isArray(reasons) && reasons.length === 0;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Suspender contrato ${contract?.number ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="yellow" onClick={handleSubmit(save)} disabled={saving || !reasons || noReasons}>
            {saving ? 'Suspendiendo…' : 'Suspender'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <Alert severity="warning" color="yellow">
            Mientras esté suspendido, el contrato no admite cambios. Se reanuda registrando un otrosí, y los días suspendidos alargan la
            fecha fin.
          </Alert>
        </Grid>
        {noReasons && (
          <Grid size={12}>
            <Alert severity="info">No hay motivos de suspensión activos. Créalos en Administración → Motivos.</Alert>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 7 }}>
          <Controller
            name="reaId"
            control={control}
            rules={{ required: 'Selecciona el motivo.' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label="Motivo"
                required
                size="small"
                fullWidth
                disabled={!reasons}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              >
                {(reasons ?? []).map((reason) => (
                  <MenuItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }}>
          <Controller
            name="suspensionDate"
            control={control}
            rules={{
              required: 'La fecha de suspensión es requerida.',
              validate: (value) => {
                if (value > today()) return 'No puede ser futura.';
                if (contract?.startDate && value < contract.startDate) return `No antes del inicio (${fDateOnly(contract.startDate)}).`;
                return true;
              }
            }}
            render={({ field, fieldState }) => (
              <DateField
                value={field.value ?? ''}
                onChange={field.onChange}
                label="Fecha de suspensión"
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="liftCondition"
            control={control}
            rules={{
              validate: (value) => value.trim() !== '' || 'Indica qué debe ocurrir para reanudar.',
              maxLength: { value: 500, message: 'Máximo 500 caracteres.' }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Condición de levantamiento"
                required
                multiline
                minRows={2}
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message ?? 'Qué debe ocurrir para reanudar el contrato.'}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="observation"
            control={control}
            rules={{ maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' } }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Observación"
                multiline
                minRows={2}
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="requiresReport"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Genera informe de interventoría"
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

SuspendDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Contrato del detalle: `{ ctrId, number, startDate }`. */
  contract: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
