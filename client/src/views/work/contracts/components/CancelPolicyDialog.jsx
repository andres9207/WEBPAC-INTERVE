import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { contractPoliciesApi } from 'api/requests/contractsApi';
import { getReasonsSelectAPI } from 'api/requests/reasonsApi';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';

/**
 * Anular una póliza (ADR-0018, decisión 6): cierra la versión vigente con
 * motivo del catálogo (ámbito de anulación de póliza) y observación. No se
 * elimina: la póliza y sus versiones quedan en el expediente. Los motivos se
 * recargan si cambian con el diálogo abierto (`refresh-reasons`).
 */

const EMPTY = { reaId: '', observation: '' };

export default function CancelPolicyDialog({ open, policy, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [reasons, setReasons] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });
  const socket = useSocket();

  const loadReasons = useCallback(
    () =>
      getReasonsSelectAPI('POLICY_CANCEL')
        .then(({ data }) => setReasons(data))
        .catch((err) => {
          showError(err.response?.data?.message || 'Error al cargar los motivos de anulación');
          onClose();
        }),
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    reset(EMPTY);
    setReasons(null);
    loadReasons();
  }, [open, reset, loadReasons]);

  useEffect(() => {
    if (!open || !socket) return undefined;
    socket.on('refresh-reasons', loadReasons);
    return () => socket.off('refresh-reasons', loadReasons);
  }, [open, socket, loadReasons]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await contractPoliciesApi.cancel({ polId: policy.polId, reaId: form.reaId, observation: form.observation.trim() });
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo anular la póliza');
    } finally {
      setSaving(false);
    }
  };

  const noReasons = Array.isArray(reasons) && reasons.length === 0;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Anular póliza ${policy?.number ?? ''}`}
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
            La póliza deja de amparar el concepto {policy?.conceptLabel ? `«${policy.conceptLabel}»` : ''}. No se elimina: queda en el
            expediente con su historial. No se puede deshacer.
          </Alert>
        </Grid>
        {noReasons && (
          <Grid size={12}>
            <Alert severity="info">No hay motivos de anulación de póliza activos. Créalos en Administración → Motivos.</Alert>
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
                helperText={fieldState.error?.message ?? 'Por qué se anula: queda en el historial de la póliza.'}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

CancelPolicyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Póliza del listado: `{ polId, number, conceptLabel }`. */
  policy: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
