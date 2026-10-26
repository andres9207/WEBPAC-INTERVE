import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { cancelContractAPI } from 'api/requests/contractsApi';
import { getReasonsSelectAPI } from 'api/requests/reasonsApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Anular un contrato (DEC-082): desde cualquier estado, también con facturas
 * aprobadas, con motivo del catálogo (ámbito de anulación de contrato) y
 * observación. Anulado es final: el contrato queda solo para consulta, con sus
 * facturas y pólizas como estaban. La clave de idempotencia se genera al abrir.
 */

const EMPTY = { reaId: '', observation: '' };

export default function CancelContractDialog({ open, contract, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [reasons, setReasons] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    setIdempotencyKey(newIdempotencyKey());
    reset(EMPTY);
    setReasons(null);
    getReasonsSelectAPI('CONTRACT_CANCEL')
      .then(({ data }) => !cancelled && setReasons(data))
      .catch((err) => {
        showError(err.response?.data?.message || 'Error al cargar los motivos de anulación');
        onClose();
      });
    return () => {
      cancelled = true;
    };
  }, [open, reset, onClose]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await cancelContractAPI(
        { ctrId: contract.ctrId, reaId: form.reaId, observation: form.observation.trim() },
        idempotencyKey
      );
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo anular el contrato');
    } finally {
      setSaving(false);
    }
  };

  const noReasons = Array.isArray(reasons) && reasons.length === 0;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Anular contrato ${contract?.number ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit(save)} disabled={saving || !reasons || noReasons}>
            {saving ? 'Anulando…' : 'Anular'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <Alert severity="warning">
            El contrato queda anulado y solo se podrá consultar: no admite otrosí, facturas ni pólizas nuevas. Sus facturas y pólizas se
            conservan como están. No se puede deshacer.
          </Alert>
        </Grid>
        {noReasons && (
          <Grid size={12}>
            <Alert severity="info">No hay motivos de anulación de contrato activos. Créalos en Administración → Motivos.</Alert>
          </Grid>
        )}
        <Grid size={12}>
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
        <Grid size={12}>
          <Controller
            name="observation"
            control={control}
            rules={{
              validate: (value) => value.trim() !== '' || 'La observación es requerida.',
              maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Observación"
                required
                multiline
                minRows={2}
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message ?? 'Por qué se anula: queda en el historial de estado del contrato.'}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

CancelContractDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** `{ ctrId, number }`. */
  contract: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
