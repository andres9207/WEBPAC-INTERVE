import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { invoiceTransitionsApi } from 'api/requests/invoicesApi';
import { getReasonsSelectAPI } from 'api/requests/reasonsApi';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Anular una factura (ADR-0020, decisión 9): no la borra, la deja anulada con
 * motivo del catálogo (ámbito de anulación de factura) y observación. Anular
 * una aprobada exige además el permiso reforzado; lo verifica el servidor.
 * Los motivos se recargan si cambian mientras el diálogo está abierto
 * (`refresh-reasons`): se pueden crear en Administración → Motivos sin
 * cerrarlo.
 */

const EMPTY = { reaId: '', observation: '' };

export default function CancelInvoiceDialog({ open, invoice, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [reasons, setReasons] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });
  const socket = useSocket();

  const loadReasons = useCallback(
    () =>
      getReasonsSelectAPI('INVOICE_CANCEL')
        .then(({ data }) => setReasons(data))
        .catch((err) => {
          showError(err.response?.data?.message || 'Error al cargar los motivos de anulación');
          onClose();
        }),
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(newIdempotencyKey());
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
      const { data } = await invoiceTransitionsApi.cancel(
        { invId: invoice.invId, reaId: form.reaId, observation: form.observation.trim() },
        idempotencyKey
      );
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo anular la factura');
    } finally {
      setSaving(false);
    }
  };

  const noReasons = Array.isArray(reasons) && reasons.length === 0;
  const approved = invoice?.state === 'APPROVED';

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Anular factura ${invoice?.number ?? ''}`}
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
            {approved
              ? 'La factura está aprobada. Anularla la saca de todo cálculo; queda en el historial y su número sigue ocupado para el proveedor.'
              : 'La factura queda anulada: no se elimina, y su número sigue ocupado para el proveedor. No se puede deshacer.'}
          </Alert>
        </Grid>
        {noReasons && (
          <Grid size={12}>
            <Alert severity="info">No hay motivos de anulación de factura activos. Créalos en Administración → Motivos.</Alert>
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
                helperText={fieldState.error?.message ?? 'Por qué se anula: queda en el historial de la factura.'}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

CancelInvoiceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Factura del detalle: `{ invId, number, state }`. */
  invoice: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
